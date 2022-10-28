import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"


// importing screens
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"
import EditProfile from "./screens/EditProfile"
import CreateStory from "./screens/CreateStory"
import Stories from "./screens/Stories"
import CreateEvent from "./screens/CreateEvent"
import ShowEvent from "./screens/ShowEvent"
import EditEvent from "./screens/EditEvent"
import Events from "./screens/Events"
import ShowStory from "./screens/ShowStory"
import EditStory from "./screens/EditStory"
import NotFound from "./screens/NotFound"
import Membership from "./screens/Membership"
import Team from "./screens/Team"
import Support from "./screens/Support"
import Profiles from "./screens/Profiles"

// importing components
import { Layout, PrivateRoute, AppContainer, AdminOrSuperAdmin } from "./components"

// css
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/signup" element={<SignUp />} exact></Route> 
          <Route path ="/signin" element={<SignIn />} exact></Route>
          <Route path="/profile/" element={<> <Layout><Profiles /></Layout> </>} exact></Route>
          <Route path="/profile/:id" element={<> <Layout><ProfileScreen /></Layout> </>} exact></Route>
          <Route path="/profile/:id/edit" element={<PrivateRoute> <><EditProfile /></> </PrivateRoute>} exact></Route>
          
          <Route path="/story" element={<> <Layout><Stories /></Layout> </>} exact></Route>
          <Route path="/story/:id" element={<> <Layout><ShowStory /></Layout> </>} exact></Route>
          <Route path="/story/create" element={<PrivateRoute> <Layout><CreateStory /></Layout> </PrivateRoute>} exact></Route>
          <Route path="/story/:id/edit" element={<PrivateRoute> <Layout><EditStory /></Layout> </PrivateRoute>} exact></Route>
          
          <Route path="/event" element={<> <Layout><Events /></Layout> </>} exact></Route>
          <Route path="/event/:id" element={<> <><ShowEvent /></> </>} exact></Route>
          <Route path="/event/create" element={<PrivateRoute> <Layout>  <AdminOrSuperAdmin>  <CreateEvent /> </AdminOrSuperAdmin> </Layout> </PrivateRoute>} exact></Route>
          <Route path="/event/:id/edit" element={<PrivateRoute> <Layout>  <AdminOrSuperAdmin>  <EditEvent /> </AdminOrSuperAdmin> </Layout> </PrivateRoute>} exact></Route>
          {/* <Route path="/event/:id/edit" element={<PrivateRoute> <Layout><EditStory /></Layout> </PrivateRoute>} exact></Route> */}
          
          <Route path="/membership" element={<> <Layout><Membership /></Layout> </>} exact></Route>
          <Route path="/support" element={<> <Layout><Support /></Layout> </>} exact></Route>
          <Route path="/team" element={<> <Layout><Team /></Layout> </>} exact></Route>
          
          <Route path="/" element={<Layout><HomeScreen /> </Layout> } exact></Route>
          <Route path="*" element={<NotFound /> }></Route>
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
