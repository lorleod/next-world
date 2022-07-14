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
    <div className="public-playlists-container">
      <h3 className="public-playlist-title">
        <Link className="public-playlist-title-link" to={playlistUrl}>
          {props.playlistTitle}
        </Link>
      </h3>
      <div className="public-playlist-favourites">
        Times Favourited: {favourites}
      </div>
      <div className="public-playlist-description">{props.playlistDesc}</div>
      <div className="public-playlist-author">Author: {author}</div>
      <div className="public-playlist-worlds-container">
        <div className="public-playlist-worlds-title">
          Worlds in Playlist:
          <div />
          <div className="public-playlist-world-list">{mappedPlaysWorlds}</div>
        </div>
      </div>
    </div>
  );
}
