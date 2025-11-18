import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComments] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setPost(data);
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
        const {data} = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: false})
    setComments(data);
    };
    fetchComments()
  }, [id])

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    const {error} = await supabase
    .from("comments")
    .insert([{ post_id: id, text: newComment}]);

    if (!error){
        setNewComments("");
        const {data} = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", {ascending: false});
    setComments(data);
    }
  }

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id)
      .select()
      .single();

    if (!error) setPost(data);
  };

  const handleDelete = async () => {
    await supabase.from("posts").delete().eq("id", id);
    navigate("/");
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="post-page">
      <h2>{post.title}</h2>

      {post.image_url && (
        <img src={post.image_url} alt={post.title} className="post-image" />
      )}

      <p>{post.content}</p>

      <p><strong>Created:</strong> {new Date(post.created_at).toLocaleString()}</p>
      <p><strong>Upvotes:</strong> {post.upvotes}</p>

      <button onClick={handleUpvote}> Upvote</button>

      <div className="post-actions">
        <Link to={`/edit/${id}`} className="edit-btn">✏ Edit</Link>
        <button onClick={handleDelete} className="delete-btn">🗑 Delete</button>
      </div>

      <Link to="/" className="back-btn">⬅ Back to Posts</Link>
    </div>
  );
}

export default PostPage;
