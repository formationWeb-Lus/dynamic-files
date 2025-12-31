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

// **Simuler une table SQL pour images** (tu peux remplacer par vraie requête SQL)
const images = [
    { name: 'Logo', url: 'https://raw.githubusercontent.com/username/repo/master/images/logo.png' },
    { name: 'Cover', url: 'https://raw.githubusercontent.com/username/repo/master/images/cover.png' },
    { name: 'Aerocar', url: 'https://raw.githubusercontent.com/formationWeb-Lus/web_backend/main/public/images/vehicles/aerocar.jpg' }
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
