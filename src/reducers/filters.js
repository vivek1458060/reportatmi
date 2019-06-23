import moment from 'moment';

const filtersReducerDefaultState = {
  text: '',
  minCost: '',
  maxCost: '',
  sortBy: 'date',
  startDate: moment([2018]).startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_COST':
      return {
        ...state,
        sortBy: 'cost'
      };
    case 'SET_MIN_COST_FILTER':
      return {
        ...state,
        minCost: action.cost
      }
    case 'SET_MAX_COST_FILTER':
      return {
        ...state,
        maxCost: action.cost
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
