import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Createblog from './pages/Createblog';
import Blog from './pages/Blog';
import Edit  from './pages/Edit';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createpost' element={<Createblog/>}/>
        <Route path='/blog' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
