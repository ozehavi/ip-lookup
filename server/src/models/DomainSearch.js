const mongoose = require('mongoose');

const domainSearchSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
        index: true 
    },
    ip: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    success: {
        type: Boolean,
        required: true
    }
});

const DomainSearch = mongoose.model('DomainSearch', domainSearchSchema);

module.exports = DomainSearch;