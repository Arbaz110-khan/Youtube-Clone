import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddVideo from './addvideo';
import Videos from './videos';
import Video from './getvideo';
import UpdateVideo from './editvideo';
import SignUp from './signup';
import SignIn from './signin';
import Profile from './profile';
import EditProfile from './editprofile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (

    <ChakraProvider>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
    <BrowserRouter>
    <Routes>
      <Route path='/addvideo'       element={<AddVideo/>} ></Route>
      <Route path='/videos'       element={<Videos/>}></Route>
      <Route path='/video/:Id'     element={<Video/>}></Route>
      <Route path='/editvideo/:Id'  element={<UpdateVideo/>}></Route>
      <Route path='/signup'       element={<SignUp/>}></Route>
      <Route path='/signin'        element={<SignIn/>}></Route>
      <Route path='/profile'        element={<Profile/>}></Route>
      <Route path='/editprofile/:Id'     element={<EditProfile/>}></Route>
    </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
