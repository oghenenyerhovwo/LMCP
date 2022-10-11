import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom"


// importing screens
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"
import EditProfile from "./screens/EditProfile"
import CreateStory from "./screens/CreateStory"
import Stories from "./screens/Stories"
import ShowStory from "./screens/ShowStory"
import EditStory from "./screens/EditStory"
import NotFound from "./screens/NotFound"

// importing components
import { Layout, Feedback, PrivateRoute } from "./components"


// functions
import { getUser } from "./actions"

// css
import "./App.css"

function App() {

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
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} exact></Route> 
        <Route path ="/signin" element={<SignIn />} exact></Route>
        <Route path="/profile/:id" element={<PrivateRoute> <Layout><ProfileScreen /></Layout> </PrivateRoute>} exact></Route>
        <Route path="/profile/:id/edit" element={<PrivateRoute> <><EditProfile /></> </PrivateRoute>} exact></Route>
        
        <Route path="/story" element={<> <Layout><Stories /></Layout> </>} exact></Route>
        <Route path="/story/:id" element={<> <Layout><ShowStory /></Layout> </>} exact></Route>
        <Route path="/story/create" element={<PrivateRoute> <Layout><CreateStory /></Layout> </PrivateRoute>} exact></Route>
        <Route path="/story/:id/edit" element={<PrivateRoute> <Layout><EditStory /></Layout> </PrivateRoute>} exact></Route>
        
        <Route path="/" element={<Layout><HomeScreen /> <Feedback />  </Layout> } exact></Route>
        <Route path="*" element={<NotFound /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
