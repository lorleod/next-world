import "./publicPLaylistCard.scss";
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
    const fetchData = () => {
      axios.get(`/api/user/home/${props.authorId}`)
        .then((response) => {
          setAuthor([response.data.username]);
        })
        .catch((error) => {
          console.log((error) => {
            console.log("error:", error)
          })
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`/api/favourites/count/${props.playlistId}`)
        .then((response) => {
          const favouritesCount = response.data.length;
          setFavourites(favouritesCount);
        })
        .catch((error) => {
          console.log("error:", error)
        });
    };
    fetchData();
  }, []);

  const mappedPlaysWorlds = props.worldIds.map((world, index) => {
    //generate a unique key for child - worldID alone breaks if two of same world
    let key = world.concat(index);
    return <PublicPlaylistWorlds key={key} worldId={world} />;
  });

  return (
    <div className="public-playlist-container">
      <h3 className="public-playlist-title">
        <Link className="public-playlist-title-link" to={playlistUrl}>
          {props.playlistTitle}
        </Link>
      </h3>
      <div className="public-playlist-right-container">
        <div className="public-playlist-info-container">
          <div className="public-playlist-description">
            {props.playlistDesc}
          </div>
          <div className="public-playlist-author">Author: {author}</div>

          <div className="public-playlist-favourites">
            Favourited: {favourites}
          </div>
        </div>
        <div className="public-playlist-worlds-container">
          <div className="public-playlist-world-list">{mappedPlaysWorlds}</div>
        </div>
      </div>
    </div>
  );
}
