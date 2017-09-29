const initState = {
    level: 1,
    score: 0,
    alienSpeed: 1,
    maxLevel: 4,
    player_pos: 0,
    enemy_pos_x: 0,
    enemy_pos_y: 40,
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
        case 'SET_PLAYER_POS':
            return {
                ...state,
                player_pos: action.pos,
            };
        case 'SET_ENEMY_POS':
            return {
                ...state,
                [`enemy_pos_${action.axis}`]: action.pos,
            };
        default:
            return state;
    }
}

const store = Redux.createStore(
    mainReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        maxAge: Infinity,
    })
);

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
    },
    setPlayerPos(pos) {
        return {
            type: 'SET_PLAYER_POS',
            pos,
        };
    },
    setEnemyPos(axis, pos) {
        return {
            type: 'SET_ENEMY_POS',
            axis,
            pos,
        };
    },
}