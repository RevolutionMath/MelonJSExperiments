const initState = {
    level: 1,
    score: 0,
    alienSpeed: 1,
    maxLevel: 4,
}

const actions = {
    incrementLevel() {
        return {
            type: 'INCREMENT_LEVEL',
        };
    },
    incrementScore() {
        return {
            type: 'INCREMENT_SCORE',
        };
    },
    setAlienSpeed(speed) {
        return {
            type: 'SET_ALIEN_SPEED',
            speed,
        };
    }
}

function mainReducer(state = initState, action) {
    switch (action.type) {
        case 'INCREMENT_LEVEL':
            return {
                ...state,
                level: state.level + 1,
            };
        case 'INCREMENT_SCORE':
            return {
                ...state,
                score: state.score + 1,
            };
        case 'SET_ALIEN_SPEED':
            return {
                ...state,
                alienSpeed: action.speed,
            };
        default:
            return state;
    }
}

const store = Redux.createStore(
    mainReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);