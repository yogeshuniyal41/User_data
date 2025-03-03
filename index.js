const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Data = require('./model'); 

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors()); 


const MONGO_URI = 'mongodb+srv://yuniyal4444:Yuniyal41@cluster0.bfrz8ux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/data', async (req, res) => {
    try {
        const { name, email, education, contact, college } = req.body;
        const newData = new Data({ name, email, education, contact, college });
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
