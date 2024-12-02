
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Login from './pages/Login';
import RegisterForm from './pages/Register';
import UserProfile from './pages/userProfile';
import ViewProfile from './pages/ViewProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='blogs' element={<Blog/>}></Route>
        <Route path='create-blog' element={<BlogPost/>}></Route>
        <Route path= "login" element={<Login/>}></Route>
        <Route path= "register" element={<RegisterForm/>}></Route>
        <Route path="edit-profile" element={<UserProfile/>}></Route>
        <Route path="view-profile" element={<ViewProfile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
