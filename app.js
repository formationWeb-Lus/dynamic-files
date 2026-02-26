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

const images = [
    // EXISTING IMAGES (remplacées si elles correspondent à tes liens)
    { name: 'basededonnees', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/basededonnees.jpg' },
    { name: 'MVCContenu', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/MVCetLivraisondeContenu.jpg' },
    { name: 'OAuthSecuriteAPI', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/OAuthetS%C3%A9curit%C3%A9desAPI.jpg' },
    { name: 'Programmation', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/Programmation.jpg' },
    { name: 'ProgrammationFonctionsIntro', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/ProgrammationaveclesFonctionsIntroduction.png' },
    { name: 'RESTValidation', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/RESTAlternativesetValidation.jpg' },
    { name: 'ReactFondamentaux', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/ReactFondamentauxetProjetsInitiaux.jpg' },
    { name: 'HTTPDocumentationAPI', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/Requ%C3%AAtesHTTPetDocumentationdAPI.jpg' },
    { name: 'TestsDebugErreurs', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/TestsD%C3%A9bogageetGestiondesErreurs.jpg' },
    { name: 'WDD130', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/WDD130WebFundamentals.jpg' },
    { name: 'WebBackend', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/Web-Backend.jpg' },
    { name: 'WebFrontend', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/WebFrontend.jpg' },
    { name: 'WebFullStackIntro', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/WebFull-StackD%C3%A9veloppementIntroduction.png' },
    { name: 'basededonnees2', url: 'https://raw.githubusercontent.com/formationWeb-Lus/coderise-images/main/images/basededonnees.jpg' }, // si tu veux garder une double occurrence

    // AUTRES IMAGES (NE TOUCHER PAS)
    { name: 'AppelCreationFonctions', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/AppelCr%C3%A9ationdeFonctions.jpg?raw=true' },
    { name: 'AuthentificationAutorisation', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/AuthentificationetAutorisation.jpg?raw=true' },
    { name: 'CSharp', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/CSharp.png?raw=true' },
    { name: 'InsertionValidationDonnees', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/InsertionetValidationdesDonn%C3%A9es.png?raw=true' },
    { name: 'IntroductionProgrammation', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Introduction%C3%A0laProgrammation.jpg?raw=true' },
    { name: 'JavaScriptAvance', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/JavaScriptAvanc%C3%A9.jpg?raw=true' },
    { name: 'ProgrammationAvanceeCSharp', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/ProgrammationAvanc%C3%A9eeC%23.png?raw=true' },

    // NEW IMAGES (FROM image/ FOLDER) ← NE PAS TOUCHER
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
// je suis enfant de die

// 

//------------------

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
