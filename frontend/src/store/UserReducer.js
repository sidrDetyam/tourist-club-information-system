
const defaultState = {
    isAuth: false
}

const SET_IS_AUTH = "SET_IS_AUTH"
const USER_INFO = "USER_INFO"

export const userReducer = (state = defaultState, action) => {
    switch (action.type){
        case SET_IS_AUTH:
            return {...state, isAuth: action.payload}

        case USER_INFO:
            return {...state, userInfo: action.payload}

        default:
            return state;
    }
}

export const setIsAuthAction = (isAuth) => ({type: SET_IS_AUTH, payload: isAuth})
export const setUserInfo = (info) => ({type: USER_INFO, payload: info})