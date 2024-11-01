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

async function addSearchRecord(searchData) {
    try {
        const newSearch = new DomainSearch({
            domain: searchData.domain,
            ip: searchData.ip,
            timestamp: new Date(searchData.timestamp),
            success: searchData.success
        });
        return await newSearch.save();
    } catch (error) {
        console.error('Error adding search record:', error);
        throw error;
    }
}

async function getSearchHistory(page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        const searches = await DomainSearch.find()
            .sort({ timestamp: -1 }) 
            .skip(skip)
            .limit(limit);
        
        const total = await DomainSearch.countDocuments();
        
        return {
            searches,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        };
    } catch (error) {
        console.error('Error getting search history:', error);
        throw error;
    }
}

async function getSearchesByDomain(domain) {
    try {
        return await DomainSearch.find({ domain })
            .sort({ timestamp: -1 });
    } catch (error) {
        console.error('Error getting searches by domain:', error);
        throw error;
    }
}

// Function to clear old search history (optional)
async function clearOldSearches(daysToKeep = 30) {
    try {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
        
        const result = await DomainSearch.deleteMany({
            timestamp: { $lt: cutoffDate }
        });
        
        return result;
    } catch (error) {
        console.error('Error clearing old searches:', error);
        throw error;
    }
}

async function clearAllSearches() {
    try {
        const result = await DomainSearch.deleteMany({});
        return {
            acknowledged: result.acknowledged,
            deletedCount: result.deletedCount
        };
    } catch (error) {
        console.error('Error clearing all searches:', error);
        throw error;
    }
}

module.exports = {
    DomainSearch,
    addSearchRecord,
    getSearchHistory,
    getSearchesByDomain,
    clearOldSearches,
    clearAllSearches
};