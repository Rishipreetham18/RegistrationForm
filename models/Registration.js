const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    F00ID: { type: String, unique: true, required: true },
    semester: { type: Number, required: true, max:4 },
    modeOfStudy: { type: String, required: true },
    CGPA: { type: Number, required: true, max: 4 },
    workExperience: { type: Number, required: true },
    field: { type: String, required: true }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
