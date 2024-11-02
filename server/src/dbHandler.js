const DomainSearch = require('./models/domainSearch');

const dbHandler = {
    async saveSearchRecord(data) {
        const search = new DomainSearch(data);
        return await search.save();
    },

    async getSearchHistory(page = 1, limit = 10) {
        const searches = await DomainSearch.find()
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        
        const total = await DomainSearch.countDocuments();
        return { searches, total, page };
    },

    async clearSearchHistory() {
        return await DomainSearch.deleteMany({});
    }
};

module.exports = dbHandler;