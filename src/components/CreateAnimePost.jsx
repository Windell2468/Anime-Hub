import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";


const CreateAnimePost = () => {
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL,setImageUrl] = useState("");
  

  const createPost = async () => {
    const { error } = await  supabase
    .from("posts")
    .insert([{title, content, imageURL: imageURL}])

    if (!error) {
        navigate("/");
    } else {
        console.error(error);
    }
  };


  return (
    <div>
      <h2>Create Anime Post</h2>
      <input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)}
      />
      <textarea placeholder="Description" value={content} onChange={(e) => setContent(e.target.value)}
       />
      <input type="text" placeholder="Image URL" value={inputValue} onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={createPost}>Submit Post Button</button>
    </div>
  );
};

export default CreateAnimePost;



