const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Config EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Multer pour upload PDF
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ================= IMAGES (simulation table SQL) =================
const images = [
    // EXISTING IMAGES
    { name: 'AppelCreationFonctions', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/AppelCr%C3%A9ationdeFonctions.jpg?raw=true' },
    { name: 'AuthentificationAutorisation', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/AuthentificationetAutorisation.jpg?raw=true' },
    { name: 'CSharp', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/CSharp.png?raw=true' },
    { name: 'InsertionValidationDonnees', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/InsertionetValidationdesDonn%C3%A9es.png?raw=true' },
    { name: 'IntroductionPython', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Introduction%20%C3%A0%20Python.jpg?raw=true' },
    { name: 'IntroductionProgrammation', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Introduction%C3%A0laProgrammation.jpg?raw=true' },
    { name: 'JavaScriptAvance', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/JavaScriptAvanc%C3%A9.jpg?raw=true' },
    { name: 'MVCContenu', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/MVCetLivraisondeContenu.jpg?raw=true' },
    { name: 'OAuthSecuriteAPI', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/OAuthetS%C3%A9curit%C3%A9desAPI.jpg?raw=true' },
    { name: 'ProgrammationFonctionsIntro', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Pr4ogrammationaveclesFonctionsIntroduction.png?raw=true' },
    { name: 'ProgrammationAvanceeCSharp', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/ProgrammationAvanc%C3%A9eeC%23.png?raw=true' },
    { name: 'RESTValidation', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/RESTAlternativesetValidation.jpg?raw=true' },
    { name: 'ReactFondamentaux', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/ReactFondamentauxetProjetsInitiaux.jpg?raw=true' },
    { name: 'HTTPDocumentationAPI', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Requ%C3%AAtesHTTPetDocumentationdAPI.jpg?raw=true' },
    { name: 'TestsDebugErreurs', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/TestsD%C3%A9bogageetGestiondesErreurs.jpg?raw=true' },
    { name: 'WDD130', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/WDD130WebFundamentals.jpg?raw=true' },
    { name: 'WebBackend', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Web-Backend.jpg?raw=true' },
    { name: 'WebFrontend', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/WebFrontend.jpg?raw=true' },
    { name: 'WebFullStackIntro', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/WebFull-StackD%C3%A9veloppementIntroduction.png?raw=true' },

    // NEW IMAGES (FROM image/ FOLDER)
    { name: 'API', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/api.png?raw=true' },
    { name: 'ArtificialIntelligence', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/artificial-intelligence-8953936_1280.png?raw=true' },
    { name: 'BigData', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/big-data-7216839_1280.png?raw=true' },
    { name: 'CSharpAlt', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/csharpc.png?raw=true' },
    { name: 'IntroProgrammingAlt', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/introduction-to-programming.png?raw=true' },
    { name: 'TabletLearning', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/ipad-632394_1280.jpg?raw=true' },
    { name: 'OfficeWork', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/office-620822_1280.jpg?raw=true' },
    { name: 'TeamWork1', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/pexels-anete-lusina-5239917.jpg?raw=true' },
    { name: 'TeamWork2', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/pexels-fauxels-3182800.jpg?raw=true' },
    { name: 'CodeWorkspace', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/pexels-markusspiske-177598.jpg?raw=true' },
    { name: 'DeveloperDesk', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/pexels-mizunokozuki-12899188.jpg?raw=true' },
    { name: 'LearningSession', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/pexels-shkrabaanthony-5475793.jpg?raw=true' },
    { name: 'TestingErrors', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/image/testin%20error.png?raw=true' }
];

// ================= ROUTES =================

// Home
app.get('/', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) return res.send('Impossible de lire les fichiers');
        const pdfs = files.filter(f => f.endsWith('.pdf'));
        res.render('index', { pdfs, images });
    });
});

// Upload PDF
app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
});

// Download PDF
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    if (path.extname(filename).toLowerCase() !== '.pdf') {
        return res.status(403).send('Téléchargement interdit');
    }
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath);
});

// Start server
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
