import { useEffect, useState } from "react";
import axios from "axios";

export default function PlaylistItem(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getWorld/${props.worldId}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setImage(response.data.image);
        setDescription(response.data.description);
      })
      .catch((error) => {});
  }, []);
  return (
    <div>
      <h1>{title}</h1>
      <h2>{author}</h2>
      <h3>{description}</h3>
      <img src={image} alt={title} />
    </div>
  );
}
