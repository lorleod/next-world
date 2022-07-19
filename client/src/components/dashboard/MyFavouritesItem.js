import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import MyPlaylistsWorld from "../playlist/MyPlaylistsWorld";
import Cookies from "js-cookie";
import BasicPopup from "../partials/popups/BasicPopup";

// component to display each individual favourited playlist of current user
export default function MyFavouritesItem({
  playlistId,
  handleRemoveFavourite,
}) {
  const [title, setTitle] = useState("");
  const [worldIds, setWorldIds] = useState([]);
  const [popupRemoveFavourite, setPopupRemoveFavourite] = useState(false);
  const playlistUrl = `/playlist/${playlistId}`;
  const token = Cookies.get("jwt");

  useEffect(() => {
    axios.get(`/api/favourites/user/${playlistId}`)
      .then((response) => {
        setTitle(response.data[0].title);
        setWorldIds(response.data[0].worldIds);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, []);

  // pop up a confirmation then unfavourite if confirmed by user
  const unFavourite = async () => {
    // confirm equals true if user clicks "ok" on pop up
    let confirm = window.confirm(
      "Are you sure you want to un-favourite this playlist?"
    );
    //if confirm equals true, send DELETE request to backend

    if (confirm) {
      await axios.delete(`/api/favourites/delete/${token}/${playlistId}`)
        .then((response) => {
          handleRemoveFavourite(true);
        })
        .catch((error) => {
          console.log("error:", error)
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
      <BasicPopup
        trigger={popupRemoveFavourite}
        setTrigger={setPopupRemoveFavourite}
      >
        <h1>Favourite Removed</h1>
      </BasicPopup>
    </div>
  );
}
