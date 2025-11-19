import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

export default function PostList({ search }) {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchPosts();
  }, [sortBy]); // fetch when sort changes

  const fetchPosts = async () => {
    let query = supabase.from("posts").select("*");

    query = sortBy === "newest"
      ? query.order("created_at", { ascending: false })
      : query.order("upvotes", { ascending: false });

    const { data } = await query;
    setPosts(data || []);
  };

  // 🔥 filter using navbar search
  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="post-list">
      <h1>Anime Posts</h1>

      {/* Sort buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setSortBy("newest")}
          className={`sort-btn ${sortBy === "newest" ? "active" : ""}`}
        >
          Newest
        </button>

        <button
          onClick={() => setSortBy("upvotes")}
          className={`sort-btn ${sortBy === "upvotes" ? "active" : ""}`}
        >
          Most Upvoted
        </button>
      </div>

      {/* No posts */}
      {filteredPosts.length === 0 && <p>No posts found.</p>}

      {/* Show posts */}
      {filteredPosts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id} className="post-card">
          {post.image_url && (
            <img scr={post.image_url} alt={post.title} className="post-thumb" />
          )}
          <h2>{post.title}</h2>
          <p> {post.upvotes} upvotes</p>
          <p className="created-date">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
