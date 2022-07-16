import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import MyPlaylistsWorld from "./MyPlaylistsWorld";
import UserDashboard from "../Dashboard";

// component to display each individual favourited playlist of current user
export default function MyFavouritesItem({
  playlistId,
  handleRemoveFavourite,
}) {
  const [title, setTitle] = useState("");
  const [worldIds, setWorldIds] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const playlistUrl = `/playlist/${playlistId}`;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/favourites/user/${playlistId}`)
      .then((response) => {
        setTitle(response.data[0].title);
        setWorldIds(response.data[0].worldIds);
        console.log("worldIds in favourites", worldIds);
        console.log("response in favourites", response.data);
      });
  }, []);

  // pop up a confirmation then unfavourite if confirmed by user
  const unFavourite = () => {
    // confirm equals true if user clicks "ok" on pop up
    let confirm = window.confirm(
      "Are you sure you want to un-favourite this playlist?"
    );
    //if confirm equals true, send DELETE request to backend

    if (confirm) {
      axios
        .delete(`http://localhost:3001/favourites/delete/${playlistId}`, {
          data: { _id: playlistId },
        })
        .then((response) => {
          const data = response.data;
          //if response confirms delete, alert user then redirect back to dashboard
          if (data === "deleted") {
            handleRemoveFavourite(true);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  const mappedPlaysWorlds = worldIds.map((world, index) => {
    //generate a unique key for child - worldID alone breaks if two of same world
    let key = world.concat(index);
    return <MyPlaylistsWorld key={key} worldId={world} />;
  });

  return (
    <div>
      <div className="public-playlist-container">
        <h3 className="public-playlist-title">
          <Link className="public-playlist-title-link" to={playlistUrl}>
            {title}
          </Link>
        </h3>
        <div className="public-playlist-right-container">
          <div className="public-playlist-worlds-title"> Worlds</div>
          <div className="public-playlist-worlds-container">
            <div className="public-playlist-world-list">
              {mappedPlaysWorlds}
            </div>
          </div>
          <div
            className="public-playlist-delete-container"
            onClick={unFavourite}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
}
