const DomainSearch = require('./models/domainSearch');

const dbHandler = {
    async saveSearchRecord(data) {
        const search = new DomainSearch(data);
        return await search.save();
    },

    async getSearchHistory(page = 1, limit = 10) {
        const startIndex = (page - 1) * limit;
        
        const [items, total] = await Promise.all([
            DomainSearch.find()
                .sort({ timestamp: -1 })
                .skip(startIndex)
                .limit(limit),
            DomainSearch.countDocuments()
        ]);
        
        const totalPages = Math.ceil(total / limit);
        
        return {
            items,
            total,
            totalPages,
            currentPage: page
        };
    },

    async clearSearchHistory() {
        return await DomainSearch.deleteMany({});
    }
};

module.exports = dbHandler;