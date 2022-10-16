import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// functions
import { getUser } from "../../actions"

const AppContainer =props => {
    const dispatch = useDispatch()

  const { 
    currentUser, 
    token ,
    successDeleteUser,
    successSignOut,
    successUpdateUser,
  }=  useSelector(state => state.userStore)

  useEffect(() => {
    if(token && !currentUser.email){
      dispatch(getUser())
    }
  }, [currentUser, token, dispatch])

  useEffect(() => {
    if(successDeleteUser || successSignOut || successUpdateUser){
      dispatch(getUser())
    }
  }, [dispatch, successDeleteUser, successSignOut, successUpdateUser])

  return (
    <div>{props.children}</div> 
  )
}

export default AppContainer