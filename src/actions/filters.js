export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

export const sortByCost = () => ({
    type: 'SORT_BY_COST',
})

export const sortByDate = () => ({
    type: 'SORT_BY_DATE',
})

export const setMinCostFilter = (cost = '') => ({
    type: 'SET_MIN_COST_FILTER',
    cost
})

export const setMaxCostFilter = (cost = '') => ({
    type: 'SET_MAX_COST_FILTER',
    cost
})


export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})