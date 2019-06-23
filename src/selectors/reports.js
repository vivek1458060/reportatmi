import moment from 'moment';

export default (reports, { text, sortBy, minCost, maxCost, startDate, endDate }) => {
    return reports.filter((report) => {
        const publishedAtMoment = moment(report.publishedAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(publishedAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(publishedAtMoment, 'day') : true;
        const minCostMatch = minCost ? report.cost >= parseFloat(minCost) : true;
        const maxCostMatch = maxCost ? report.cost <= parseFloat(maxCost) : true;
        const textMatch = 
            report.description.toLowerCase().includes(text.toLowerCase()) || 
            report.title.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch && minCostMatch && maxCostMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.publishedAt < b.publishedAt ? 1 : -1;
        } else if (sortBy === 'cost')
            return a.cost < b.cost ? 1 : -1;
    })
}