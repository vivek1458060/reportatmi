import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
    setTextFilter, sortByDate, sortByCost,
    setMinCostFilter, setMaxCostFilter,
    setStartDate, setEndDate
} from '../actions/filters';

let textTimeoutOnInputBlur;

export class ReportListFilters extends React.Component {
    state = {
        calenderFocused: null,
        text: '',
        minCost: '',
        maxCost: '',
        prevTextSearches: [],
        autoCompletionTextValues: []
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }
    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    }
    onCostChange = (e, fieldName) => {
        const value = e.target.value;
        if(!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState({
                [fieldName]: value
            })
        }
    }
    onCostInputBlur = (e, propFunByField) => {
        this.props[propFunByField](e.target.value)
    }
    onTextInputChange = (e) => {
        const text = e.target.value;
        this.setState({
            text,
            autoCompletionTextValues: text ? this.state.prevTextSearches.filter(value =>
                value.toLocaleLowerCase().includes(text.toLocaleLowerCase())
            ) : []
        })
    }
    onTextBlur = (e) => {
        const text = e.target.value;
        textTimeoutOnInputBlur = setTimeout(() => {
            let prevTextSearches = this.state.prevTextSearches;
            if(text) {
                const prevTextSearcheDuplicates = prevTextSearches.filter((value) => value.toLowerCase() === text.toLowerCase())[0]
                if(!prevTextSearcheDuplicates) {
                    prevTextSearches = [...prevTextSearches, text]
                }
            }
            
            this.setState({
                text,
                autoCompletionTextValues: [],
                prevTextSearches
            })
            this.props.setTextFilter(text)
            const json = JSON.stringify(prevTextSearches)
            localStorage.setItem("prevTextSearches", json);
        }, 300)
    }
    onSortChange = (e) => {
        e.target.value === 'date' ? this.props.sortByDate() : this.props.sortByCost();
    }
    handleAutoCompleteTextSelection = (value) => {
        clearTimeout(textTimeoutOnInputBlur);
        this.setState({
            text: value,
            autoCompletionTextValues: []
        })
        this.props.setTextFilter(value)
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('prevTextSearches')
            const prevTextSearches = JSON.parse(json)

            if(prevTextSearches) {
                this.setState({ prevTextSearches })
            }
        } catch(e) {

        }
    }
    render() {
        const { autoCompletionTextValues } = this.state;
        return (
            <div>
                <div className="input-group input-group--top autocomplete">
                    <div className="input-group__item" onBlur={this.onTextBlur}>
                        <input
                            className="text-input"
                            placeholder="Search Reports"
                            autoComplete="off"
                            style={{ width: '336px' }}
                            type="text"
                            value={this.state.text}
                            onChange={this.onTextInputChange}
                        />
                        <ul className="autocomplete-list">
                            {
                                autoCompletionTextValues.map((value, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="autocomplete-list__item"
                                            onClick={() => this.handleAutoCompleteTextSelection(value)}
                                        >
                                            {value}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="input-group input-group--top">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="input-group__item" style={{ marginRight: 0 }}>
                            <input
                                className="text-input"
                                placeholder="$0.00"
                                type="text"
                                style={{ width: '85px' }}
                                value={this.state.minCost}
                                onChange={(e) => this.onCostChange(e, 'minCost')}
                                onBlur={(e) => this.onCostInputBlur(e, 'setMinCostFilter')}
                            />
                        </div>
                        <span style={{ padding: '0 5px' }}>to</span>
                        <div className="input-group__item">
                            <input
                                className="text-input"
                                placeholder="$0.00"
                                type="text"
                                style={{ width: '85px' }}
                                value={this.state.maxCost}
                                onChange={(e) => this.onCostChange(e, 'maxCost')}
                                onBlur={(e) => this.onCostInputBlur(e, 'setMaxCostFilter')}
                            />
                        </div>
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            style={{ width: '130px' }}
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}
                        >
                            <option value="date">Date</option>
                            <option value="cost">Cost</option>
                        </select>
                    </div>
                </div>
                <div className="input-group input-group--bottom">
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calenderFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    setMinCostFilter: (cost) => dispatch(setMinCostFilter(cost)),
    setMaxCostFilter: (cost) => dispatch(setMaxCostFilter(cost)),
    sortByDate: () => dispatch(sortByDate()),
    sortByCost: () => dispatch(sortByCost()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportListFilters);