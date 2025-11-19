import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import CreateAnimePost from "./components/CreateAnimePost.jsx";
import PostList from "./components/PostList.jsx";
import EditAnimePost from "./components/EditAnimePost.jsx";
import PostPage from "./components/PostPage.jsx";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">AnimeHub</Link>

        {/* Search bar connected to state */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/create">Create Post</Link>
        </div>
      </nav>

      {/* Pass search to PostList */}
      <Routes>
        <Route path="/" element={<PostList search={search} />} />
        <Route path="/create" element={<CreateAnimePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditAnimePost />} />
      </Routes>
    </>
  );
}

export default App;
