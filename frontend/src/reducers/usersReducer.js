export const usersReducer = () => ((state = {users: []} , action) => {

  switch (action.type) {
    case 'ALL_USERS_SUCCESS':
      return {
        loading: false,
        users: action.payload
      }

    default:
      return state
  }
})

export const profileReducer = (state = {user: {}} , action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST':
    case 'UPDATE_USER_REQUEST':
    case 'NEW_USER_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case 'NEW_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        isCreated: action.payload
      }
    case 'GET_USER_FAIL':
    case 'NEW_USER_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'UPDATE_USER_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUpdated:false
      }
    case 'CLEAR_ERRORS':
      return  {
        ...state,
        isUpdated:false,
        error:null

      }
    case 'LOGOUT':
      return {
        loading: false,
        user: null

      }
    default:
      return state
  }
}
