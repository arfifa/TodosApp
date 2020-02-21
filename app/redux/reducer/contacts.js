const initialState = {
  count: 0,
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true
}

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTACTS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'GET_CONTACTS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case 'GET_CONTACTS_FULFILLED':
      return {
        count: action.payload.data.length,
        data: action.payload.data,
        isLoading: false,
        isError: false
      }
    case 'POST_CONTACT_PENDING':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false
      }
    case 'POST_CONTACT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true
      }
    case 'POST_CONTACT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false
      }
    default:
      return state
  }
}

export default contacts