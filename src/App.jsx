import { Route, Routes, Link } from "react-router-dom"
import CreateAnimePost from "./components/CreateAnimePost.jsx"
import PostList from "./components/PostList.jsx"
import EditAnimePost from "./components/EditAnimePost.jsx"
import PostPage from "./components/PostPage.jsx"
import "./App.css"

function App() {
  return (
    <>
     <nav className="navbar">
  <div className="nav-left">
    <Link to="/" className="logo">AnimeHub</Link>
  </div>

  <div className="nav-center">
    <input type="text" placeholder="Search" className="search-bar" />
  </div>

  <div className="nav-right">
    <Link to="/">Home</Link>
    <Link to="/create">Create Post</Link>
  </div>
</nav>


      {/* Routes */}
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<CreateAnimePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditAnimePost />} />
      </Routes>
    </>
  )
}

export default App
