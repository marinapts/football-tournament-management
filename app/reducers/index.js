
const initialState = {
    fetching: false,
    teams: {},
    locationBeforeTransitions: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            console.log( action);
            return {
                ...state,
                url: action.payload.pathname
            }
        case 'STORE_TEAMS':
            return {
                ...state,
                teams: action.teams
            }
        default:
            return state
    }
}

export default appReducer;
