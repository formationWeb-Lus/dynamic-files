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

// **Table simulée pour images** (tu peux remplacer par vraie requête SQL)
const images = [
    { name: 'AppelCréationdeFonctions', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/AppelCr%C3%A9ationdeFonctions.jpg?raw=true' },
    { name: 'AuthentificationetAutorisation', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/AuthentificationetAutorisation.jpg?raw=true' },
    { name: 'CSharp', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/CSharp.png?raw=true' },
    { name: 'InsertionetValidationdesDonnées', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/InsertionetValidationdesDonn%C3%A9es.png?raw=true' },
    { name: 'IntroductionàPython', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Introduction%20%C3%A0%20Python.jpg?raw=true' },
    { name: 'IntroductionàlaProgrammation', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Introduction%C3%A0laProgrammation.jpg?raw=true' },
    { name: 'JavaScriptAvancé', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/JavaScriptAvanc%C3%A9.jpg?raw=true' },
    { name: 'MVCetLivraisondeContenu', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/MVCetLivraisondeContenu.jpg?raw=true' },
    { name: 'OAuthetSécuritédesAPI', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/OAuthetS%C3%A9curit%C3%A9desAPI.jpg?raw=true' },
    { name: 'ProgrammationaveclesFonctionsIntroduction', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Pr4ogrammationaveclesFonctionsIntroduction.png?raw=true' },
    { name: 'ProgrammationAvancéeCSharp', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/ProgrammationAvanc%C3%A9eC%23.png?raw=true' },
    { name: 'RESTAlternativesetValidation', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/RESTAlternativesetValidation.jpg?raw=true' },
    { name: 'ReactFondamentauxetProjetsInitiaux', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/ReactFondamentauxetProjetsInitiaux.jpg?raw=true' },
    { name: 'RequêtesHTTPetDocumentationdAPI', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Requ%C3%AAtesHTTPetDocumentationdAPI.jpg?raw=true' },
    { name: 'TestsDébogageetGestiondesErreurs', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/TestsD%C3%A9bogageetGestiondesErreurs.jpg?raw=true' },
    { name: 'WDD130WebFundamentals', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/WDD130WebFundamentals.jpg?raw=true' },
    { name: 'Web-Backend', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/Web-Backend.jpg?raw=true' },
    { name: 'WebFrontend', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/WebFrontend.jpg?raw=true' },
    { name: 'WebFull-StackDéveloppementIntroduction', url: 'https://github.com/formationWeb-Lus/coderise-images/blob/main/images/WebFull-StackD%C3%A9veloppementIntroduction.png?raw=true' }
];

// Route principale
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

// Télécharger PDF
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    if (path.extname(filename).toLowerCase() !== '.pdf') {
        return res.status(403).send('Téléchargement interdit');
    }
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath);
});

// Démarrer serveur
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
