import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicPlaylistCard (props) {
  const [author, setAuthor] = useState("");



  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${props.authorId}`)
      .then((response) => {
        console.log("response.data.username ", response.data.username);
        setAuthor([response.data.username]);
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
      <p>Number of likes: {props.numberOfLikes}</p>
      <p>{props.playlistDesc}</p>
      <p>Author: {author}</p>
    </div>
  );
};