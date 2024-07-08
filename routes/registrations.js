const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Get all registrations
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search for registration by name or F00ID
router.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const registrations = await Registration.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },  // Case-insensitive regex search
                { F00ID: { $regex: query, $options: 'i' } } // Case-insensitive regex search
            ]
        });
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new registration
router.post('/', async (req, res) => {
    const { name, F00ID, semester, modeOfStudy, CGPA, workExperience, field } = req.body;

    try {
        const existingRegistration = await Registration.findOne({ $or: [{ name }, { F00ID }] });
        if (existingRegistration) {
            return res.status(400).json({ message: 'Duplicate registration' });
        }

        const registration = new Registration({ name, F00ID, semester, modeOfStudy, CGPA, workExperience, field });
        await registration.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
