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
      return {
        loading: true
      }
    case 'GET_USER_SUCCESS':
      return {
        loading: false,
        user: action.payload
      }
    case 'GET_USER_FAIL':
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
