import React from 'react'
import { useAppDispatch, useAppSelector } from '.'
import { fetchUser } from '../state/thunks/userThunk'
import { selectUser } from '../state/reducers/userReducer'
import Axios from '../state/api/Utils'

export const useUser = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const fetchUserFromAPI = React.useCallback(() => {
    dispatch(fetchUser())
  }, [])

  const updateHeaders = React.useCallback((userId: string) => {
    Axios.updateHeadersWithUserInfo(userId)
  }, [])

  return { user, fetchUserFromAPI, updateHeaders }
}
