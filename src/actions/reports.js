import axios from 'axios'

export const setReports = (reports) => ({
    type: 'SET_REPORTS',
    reports
})

export const setLoader = (loader) => ({
    type: 'SET_LOADER',
    loader
})

let requestId = 1, requestTimeInterval;
export const startSetReports = () => {
    return (dispatch, getState) => {
        dispatch(setLoader(true))
        axios.get(`/reports/${requestId}`).then((response) => {
            dispatch(setLoader(false))
            dispatch(setReports(response.data.reports))
            clearInterval(requestTimeInterval)
            requestTimeInterval = setInterval(() => {
                if (confirm('Update screen with new reports data')) {
                    requestId++;
                    dispatch(startSetReports())
                }
            }, 50000)
        }).catch((e) => {
            dispatch(setLoader(false))
            console.log(e);
        })
    }
}

