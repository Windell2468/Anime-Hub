import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function CreateAnimePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) return alert("Title is required!");

    const { error } = await supabase.from("posts").insert([
      {
        title,
        content,
        image_url: imageUrl, //  MUST match Supabase column
        upvotes: 0,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error creating post");
    } else {
      navigate("/"); // back to home
    }
  };

  return (
    <div className="create-post">
  <h1>Create a New Post</h1>

  <div className="form-group">
    <input
      type="text"
      placeholder="Title"
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      placeholder="Content (Optional)"
      onChange={(e) => setContent(e.target.value)}
    ></textarea>

    <input
      type="text"
      placeholder="Image URL (Optional)"
      onChange={(e) => setImageUrl(e.target.value)}
    />

    <button onClick={handleSubmit}>Create Post</button>
  </div>
</div>

  );
}
