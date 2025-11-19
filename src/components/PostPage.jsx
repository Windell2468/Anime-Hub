import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentTitle, setCommentTitle] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    setPost(data);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: false });
    setComments(data || []);
  };

  const handleAddComment = async () => {
    if (!commentTitle.trim() || !commentText.trim()) {
      return alert("Please enter both a title and a comment.");
    }

    const { error } = await supabase.from("comments").insert({
      post_id: id,
      title: commentTitle,
      text: commentText,
    });

    if (error) return alert("Error adding comment");
    setCommentTitle("");
    setCommentText("");
    fetchComments();
  };

  const handleUpvote = async () => {
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);

    if (error) return alert("Error upvoting");
    fetchPost();
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) return alert("Error deleting post");

    navigate("/"); // Return user to home page
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          style={{
            width: "300px",
            borderRadius: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
      )}

      <p>👍 {post.upvotes} upvotes</p>
      <button
        onClick={handleUpvote}
        style={{
          marginTop: "10px",
          padding: "8px 14px",
          background: "#ffca28",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        👍 Upvote
      </button>

      <p>{new Date(post.created_at).toLocaleString()}</p>

      {/* Edit + Delete Buttons */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <Link
          to={`/edit/${id}`}
          style={{
            padding: "8px 14px",
            background: "#4caf50",
            borderRadius: "6px",
            color: "white",
            textDecoration: "none",
          }}
        >
          ✏️ Edit Post
        </Link>

        <button
          onClick={handleDelete}
          style={{
            padding: "8px 14px",
            background: "#e53935",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
          }}
        >
          🗑️ Delete Post
        </button>
      </div>

      <hr />

      {/* Add Comment */}
      <h2>Write a Comment</h2>
      <input
        type="text"
        placeholder="Comment Title"
        value={commentTitle}
        onChange={(e) => setCommentTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Comment text..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        style={{ width: "100%", padding: "10px", height: "120px" }}
      ></textarea>
      <button onClick={handleAddComment} style={{ marginTop: "10px" }}>
        Add Comment
      </button>

      <hr />

      {/* Display Comments */}
      <h2>Comments</h2>
      {comments.length === 0 && <p>No comments yet — be the first!</p>}

      {comments.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <h3 style={{ marginBottom: "6px" }}>{c.title}</h3>
          <p style={{ marginBottom: "6px" }}>{c.text}</p>
          <small>{new Date(c.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
