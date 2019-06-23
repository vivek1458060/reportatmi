import React from 'react';
import { connect } from 'react-redux';
import selectReportsTotal from '../selectors/reports-total';
import selectReports from '../selectors/reports';
import numeral from 'numeral';

export const ReportSummary = ({ reportCount, reportsTotal }) => {
    const reportWord = reportCount === 1 ? 'report' : 'reports';
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{reportCount}</span> {reportWord} totalling <span>{numeral(reportsTotal).format('$0,0.00')}</span></h1>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleReports = selectReports(state.reports.reportList, state.filters);
    return {
        reportCount: visibleReports.length,
        reportsTotal: selectReportsTotal(visibleReports)
    }
}

export default connect(mapStateToProps)(ReportSummary);