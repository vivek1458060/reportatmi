export default (reports = []) => {
    var reportsTotal = 0;
    reports.forEach(({ cost }) => {
        reportsTotal += cost;
    })
    return reportsTotal;
}

