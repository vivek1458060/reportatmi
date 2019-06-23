const reportsReducerDefaultState = {
    reportList: [],
    loader: false
}

export default (state = reportsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_REPORTS': 
            return {
                ...state,
                reportList: action.reports
            }
        case 'SET_LOADER':
            return {
                ...state,
                loader: action.loader
            }
        default:
            return state;
    }
}

