import { useEffect, useState } from "react";
import axios from "axios";
import PublicPlaylistWorlds from "./PublicPlaylistWorlds";

export default function PublicPlaylistCard(props) {
  const [author, setAuthor] = useState("");

  // console.log("props PPC: ", props.worldIds);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/user/home/${props.authorId}`)
        .then((response) => {
          // console.log("response.data.username ", response.data.username);
          setAuthor([response.data.username]);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  const mappedPlaysWorlds = props.worldIds.map((world) => {
    return <PublicPlaylistWorlds key={world} worldId={world} />;
  });

  return (
    <div>
      <h3>{props.playlistTitle}</h3>
      <p>Number of likes: {props.numberOfLikes}</p>
      <p>{props.playlistDesc}</p>
      <p>Author: {author}</p>
      <p>Worlds in Playlist:{mappedPlaysWorlds} </p>
    </div>
  );
}
