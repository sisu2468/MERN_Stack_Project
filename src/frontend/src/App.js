import logo from './logo.svg';
import './App.css';
import SignIn from './MyComponents/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './Services/ProtectedRoute';
import { ProtectLogin } from './Services/ProtectLogin';
import { Navbar } from './MyComponents/Navbar';
import { AddLoc } from './MyComponents/AddLoc';
import { AddRobot } from './MyComponents/AddRobot';
import { Profile } from './MyComponents/Profile';



function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            {/* protecting from going anywhere but login */}
            <Route path='/' element={<Navbar />}></Route>
            <Route path='/addLocation' element={<AddLoc />}></Route>
            <Route path='/addRobot' element={<AddRobot />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            {/* <Route path='/profile' element={<Profile />}></Route>
            <Route path='/mySubGreddiit' element={<My_SubGreddiit />}></Route>
            <Route path='/createSubGreddiit' element={<Post_SubGreddiit />}></Route>
            <Route path='/subGreddiit' element={<SubGreddiit />}></Route>
            <Route path='/user/:id' element={<Posts />}></Route>
            <Route path='/savedPosts' element={<SavedPosts />}></Route>
            <Route path='/user-update' element={<UpdateProfile />}></Route>
            <Route path='/mysub/:id' element={<In_My_Sub />}></Route> */}
        </Route>
        <Route path="/" element={<ProtectLogin />}>
          {/* protecting from going to login */}
          <Route path='/login' element={<SignIn />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
