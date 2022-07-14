import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PublicPlaylistWorlds from "./PublicPlaylistWorlds";

export default function PublicPlaylistCard(props) {
  const [author, setAuthor] = useState("");
  const [favourites, setFavourites] = useState([]);
  const playlistUrl = `/playlist/${props.playlistId}`;
  // console.log("props PPC: ", props);
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

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/favourites/count/${props.playlistId}`)
        .then((response) => {
          const favouritesCount = response.data.length;
          console.log("favouritesCount ", favouritesCount);
          setFavourites(favouritesCount);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  const mappedPlaysWorlds = props.worldIds.map((world) => {
    return <PublicPlaylistWorlds key={world} worldId={world} />;
  });

  // console.log("favourites: ", favourites);
  return (
    <div>
<<<<<<< HEAD
      <h3>{props.playlistTitle}</h3>
      <p>Number of likes: {}</p>
=======
      <h3>
        <Link to={playlistUrl}>{props.playlistTitle}</Link>
      </h3>
      <p>Times Favourited: {favourites}</p>
>>>>>>> 7b3fb881d1e586663d8983fa647b2b6d52991f00
      <p>{props.playlistDesc}</p>
      <p>Author: {author}</p>
      <p>Worlds in Playlist:{mappedPlaysWorlds} </p>
    </div>
  );
}
