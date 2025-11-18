import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setPosts(data);
      } else {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      <h2>Great Anime Posts</h2>

      {posts.length === 0 ? (
        <p>No posts yet — make one!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <Link to={`/post/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
            <p>Created: {new Date(post.created_at).toLocaleString()}</p>
            <p>Upvotes: {post.upvotes}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
