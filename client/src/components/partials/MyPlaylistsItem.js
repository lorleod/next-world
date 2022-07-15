import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import RedirectPopup from "./popups/RedirectPopup";
import ConfirmPopup from "./popups/ConfirmPopup";

export default function UserPlaylistItem(props) {
  const [popupDeleted, setPopupDeleted] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  // console.log("props userplaylistitem: ", props);
  // console.log("playlistid", props.PlaylistId);
  const playlistUrl = `/playlist/${props.PlaylistId}`;
  const redirectUrl = `/user`;
  console.log("props trigger: ", props.trigger);
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

  return (
    <div>
      <h3>
        <Link to={playlistUrl}>{props.PlaylistTitle}</Link>
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
