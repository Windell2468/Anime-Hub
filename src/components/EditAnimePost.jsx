import { useEffect, useState} from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../client"

const EditAnimePost = () => {
    const {id} = useParams()
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imageURL, setImageUrl] = useState("")

    useEffect(() => {
        const fetchPost = async () => {
            const {data, error} = await supabase
            .from("posts")
            .select("*")
            .eq("id", id)
            .single();

            if(!error){
                setTitle(data.title)
                setContent(data.content)
                setImageUrl(data.imageURL)
            }
        };
        fetchPost();
    },[id])

    const handleUpvote = async (e) => {
        e.preventDefault();

        const {error} = await supabase
        .from("posts")
        .update({title, content, imageURL: imageURL})
        .eq("id", id);

        if (!error) {
            navigate(`/post/${id}`)
        }

    };

  return (
    <div className="edit-post">
        <h2>Edit Anime Post</h2>

        <form onSubmit={handleUpvote}>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
            />
            <label>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required
            />
            <label>ImageURL</label>
            <input type="text" value={imageURL} onChange={(e) => setImageUrl(e.target.value)} required
            />
            <button type="submit button">Save Changes</button>
        </form>
    </div>
    
  )
}

export default EditAnimePost