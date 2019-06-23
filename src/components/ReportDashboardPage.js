import React from 'react';
import ReportList from './ReportList';
import ReportListFilters from './ReportListFilters';
import ReportSummary from './ReportSummary';

export const ReportDashboardPage = () => (
    <div>
        <ReportSummary />
        <div className="content-container">
            <div className="filtersAndReports-container">
                <ReportListFilters />
                <ReportList />
            </div>
        </div>
    </div>
);

export default ReportDashboardPage;
