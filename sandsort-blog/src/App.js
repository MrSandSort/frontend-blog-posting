
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='blogs/' element={<Blog/>}></Route>
        <Route path='create-blog' element={<BlogPost/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
