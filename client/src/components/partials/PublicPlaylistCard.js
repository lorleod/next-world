import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicPlaylistCard (props) {
  const [worlds, setWorlds] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${props.authorId}`)
      .then((response) => {
        setAuthor(response.data.author);
      })
      .catch((error) => {});

    // axios
    //   .get(`http://localhost:3001/api/getWorld/${props.authorId}`)
    //   .then((response) => {
    //     setTitle(response.data.title);
    //     setAuthor(response.data.author);
    //     setImage(response.data.image);
    //     setDescription(response.data.description);
    //   })
    //   .catch((error) => {});

  }, []);


  return (
    <div>
      <h3>{props.playlistTitle}</h3>
      <p>{props.playlistDesc}</p>
      <p>Author: {author}</p>
    </div>
  );
};