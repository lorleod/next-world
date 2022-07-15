import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import RedirectPopup from "./popups/RedirectPopup";
import ConfirmPopup from "./popups/ConfirmPopup";
import "./publicPLaylistCard.scss";
import MyPlaylistsWorld from "./MyPlaylistsWorld";

export default function MyPlaylistsItem(props) {
  const [popupDeleted, setPopupDeleted] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [worldId, setWorldId] = useState([]);
  // console.log("props userplaylistitem: ", props);
  // console.log("playlistid", props.PlaylistId);
  const playlistUrl = `/playlist/${props.PlaylistId}`;
  const redirectUrl = `/user`;
  // console.log("props trigger: ", props);
  const deletePlaylist = () => {
    setConfirmPopup(true);
    if (confirmPopup === true) {
      console.log("confirmPopup: ");
    }
    if ("") {
      console.log("delete");
      const response = axios
        .delete(`http://localhost:3001/playlist/delete`, {
          data: { _id: props.PlaylistId },
        })
        .then((response) => {
          const data = response.data;
          //if response confirms delete, alert user then redirect back to dashboard
          if (data === "deleted") {
            setPopupDeleted(true);
            setInterval(() => {
              setPopupDeleted(false);
              window.location.href = redirectUrl;
            }, 5000);
          }
        })
        .catch((error) => {
          console.log("Error deleting playlist: ", error);
        });
    }
  };

  const mappedPlaysWorlds = props.worldIds.map((world, index) => {
    //generate a unique key for child - worldID alone breaks if two of same world
    let key = world.concat(index);
    return <MyPlaylistsWorld key={key} worldId={world} />;
  });

  return (
    <div>
      <h3>
        <div className="public-playlist-container">
          <h3 className="public-playlist-title">
            <Link className="public-playlist-title-link" to={playlistUrl}>
              {props.playlistTitle}
            </Link>
          </h3>
          <div className="public-playlist-right-container">
            <div className="public-playlist-worlds-title"> Worlds:</div>
            <div className="public-playlist-worlds-container">
              <div className="public-playlist-world-list">
                {mappedPlaysWorlds}
              </div>
            </div>
          </div>
        </div>
        <i className="bi bi-trash" onClick={deletePlaylist}></i>
      </h3>
      <RedirectPopup
        trigger={popupDeleted}
        setTrigger={setPopupDeleted}
        redirectUrl={redirectUrl}
      >
        <h1>Playlist Deleted</h1>
      </RedirectPopup>
      <ConfirmPopup trigger={confirmPopup} setTrigger={setConfirmPopup}>
        <h1>Delete This Playlist?</h1>
      </ConfirmPopup>
    </div>
  );
}
