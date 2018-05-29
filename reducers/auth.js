const pre = '@todo-concore/auth'

const LOGIN = `${pre}/LOGIN`
const LOGOUT = `${pre}/LOGOUT`
const LOGIN_SUCCESS = `${pre}/LOGIN_SUCCESS`
const LOGIN_FAILED = `${pre}/LOGIN_FAILED`

export const authActions = {
  login: () => ({
    type: LOGIN
  }),
  logout: () => ({
    type: LOGOUT
  }),
  loginSuccess: user => ({
    type: LOGIN_SUCCESS,
    user
  }),
  loginFailed: error => ({
    type: LOGIN_FAILED,
    error
  })
}

export const defaultState = {
  user: null,
  loggingIn: false,
  loginError: null
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loginError: null,
        loggingIn: true
      }
    }
    case LOGOUT: {
      return { ...state }
    }
    case LOGIN_SUCCESS: {
      const { user } = action
      return {
        ...state,
        loginError: null,
        loggingIn: false,
        user
      }
    }
    case LOGIN_FAILED: {
      const { error } = action
      return {
        ...state,
        loggingIn: false,
        loginError: error
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default authReducer
