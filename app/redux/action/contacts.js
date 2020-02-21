import axios from 'axios'
// import qs from 'qs'

import { APP_URL } from '../../config/api'
const url = APP_URL.concat('contacts')

export const getContacts = () => {
  return {
    type: 'GET_CONTACTS',
    payload: axios.get(url)
  }
}

export const postContact = (data) => {
  return {
    type: 'POST_CONTACT',
    payload: axios.post(url, data)
  }
}