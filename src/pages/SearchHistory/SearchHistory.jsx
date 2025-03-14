import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchHistory } from '../../_core/features/historySlice'
import { useLocation } from 'react-router-dom'

const SearchHistory = () => {
  const location= useLocation()
  const dispatch = useDispatch()
  const {SearchHistory,isSearchHistoryLoading,errorSearchHistory}=useSelector((state)=>state.history)
  const userData = useSelector((state) => state.auth.userData)
  useEffect(() => {
    if (userData?.token) {
      dispatch(
        getSearchHistory(userData.token)
      )
    }
  }, [dispatch, userData?.token],location.state)
  console.log("searchHistory data",SearchHistory)
  return (
    <div>SearchHistory</div>
  )
}

export default SearchHistory