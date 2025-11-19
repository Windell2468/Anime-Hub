import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setImageURL(data.image_url);
    }
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        image_url: imageURL,
      })
      .eq("id", id);

    if (error) return alert("Error updating post");
    navigate(`/post/${id}`);
  };

  return (
    <div className="edit-post" style={{ maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Edit Anime Post</h1>

      {/* Title */}
      <label style={{ fontWeight: "bold" }}>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "6px",
          border: "1px solid #bbb",
        }}
      />

      {/* Content */}
      <label style={{ fontWeight: "bold" }}>Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          height: "140px",
          borderRadius: "6px",
          border: "1px solid #bbb",
        }}
      />

      {/* Image URL */}
      <label style={{ fontWeight: "bold" }}>Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "6px",
          border: "1px solid #bbb",
        }}
      />

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          width: "100%",
          padding: "12px",
          background: "#4caf50",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      >
        Save Changes
      </button>
    </div>
  );
}
