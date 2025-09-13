const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple login API (demo only)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Default credentials
    if (username === 'admin@zionite.com' && password === 'Admin123') {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials.' });
    }
});

// Events API
app.get('/api/events', (req, res) => {
    fs.readFile(path.join(__dirname, 'events.json'), (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data));
    });
});
app.post('/api/events', (req, res) => {
    const { title, date, desc } = req.body;
    if (!title || !date || !desc) return res.json({ success: false, message: 'Missing fields.' });
    fs.readFile(path.join(__dirname, 'events.json'), (err, data) => {
        let events = [];
        if (!err) events = JSON.parse(data);
        events.push({ title, date, desc });
        fs.writeFile(path.join(__dirname, 'events.json'), JSON.stringify(events, null, 2), err => {
            if (err) return res.json({ success: false });
            res.json({ success: true });
        });
    });
});

// Gallery API
app.get('/api/gallery', (req, res) => {
    fs.readFile(path.join(__dirname, 'gallery.json'), (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data));
    });
});
app.post('/api/gallery', upload.single('galleryFile'), (req, res) => {
    const file = req.file;
    const caption = req.body.galleryCaption;
    if (!file || !caption) return res.json({ success: false, message: 'Missing file or caption.' });
    let type = 'image';
    if (file.mimetype.startsWith('video')) type = 'video';
    const url = `/uploads/${file.filename}`;
    fs.readFile(path.join(__dirname, 'gallery.json'), (err, data) => {
        let gallery = [];
        if (!err) gallery = JSON.parse(data);
        gallery.push({ url, caption, type });
        fs.writeFile(path.join(__dirname, 'gallery.json'), JSON.stringify(gallery, null, 2), err => {
            if (err) return res.json({ success: false });
            res.json({ success: true });
        });
    });
});

// Founder API
app.get('/api/founder', (req, res) => {
    fs.readFile(path.join(__dirname, 'founder.json'), (err, data) => {
        if (err) return res.json({});
        res.json(JSON.parse(data));
    });
});
app.post('/api/founder', upload.single('founderFile'), (req, res) => {
    const file = req.file;
    const name = req.body.founderName;
    if (!file || !name) return res.json({ success: false, message: 'Missing file or name.' });
    const url = `/uploads/${file.filename}`;
    const founder = { url, name };
    fs.writeFile(path.join(__dirname, 'founder.json'), JSON.stringify(founder, null, 2), err => {
        if (err) return res.json({ success: false });
        res.json({ success: true });
    });
});

// Pastor API
app.get('/api/pastor', (req, res) => {
    fs.readFile(path.join(__dirname, 'pastor.json'), (err, data) => {
        if (err) return res.json({});
        res.json(JSON.parse(data));
    });
});
app.post('/api/pastor', upload.single('pastorFile'), (req, res) => {
    const file = req.file;
    const name = req.body.pastorName;
    if (!file || !name) return res.json({ success: false, message: 'Missing file or name.' });
    const url = `/uploads/${file.filename}`;
    const pastor = { url, name };
    fs.writeFile(path.join(__dirname, 'pastor.json'), JSON.stringify(pastor, null, 2), err => {
        if (err) return res.json({ success: false });
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
