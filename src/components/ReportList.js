import React from 'react';
import { connect } from 'react-redux';
import ReportListItem from './ReportListItem';
import selectReports from '../selectors/reports';

export const ReportList = (props) => (
    <div className="reportList">
        <div className="list-header">
            <div>Reports</div>
        </div>
        {
            props.loader ? (
                <div className="list-item list-item--message">
                    <img src="/images/loader.gif" width="50px"/>
                </div>
            ) : (
                    <div className="list-body">
                        {
                            props.reports.length === 0 ? (
                                <div className="list-item list-item--message">
                                    <p>No Report</p>
                                </div>
                            ) : (
                                    props.reports.map(report => (
                                        <ReportListItem
                                            {...report}
                                            key={report.id}
                                        />
                                    ))
                                )
                        }
                    </div>
                )
        }
    </div>
)

const mapStateToProps = (state) => {
    return {
        reports: selectReports(state.reports.reportList, state.filters),
        loader: state.reports.loader
    }
};

export default connect(mapStateToProps)(ReportList);
