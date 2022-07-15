import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import RedirectPopup from "./popups/RedirectPopup";

export default function UserPlaylistItem(props) {
  const [popupDeleted, setPopupDeleted] = useState(false);
  // console.log("props userplaylistitem: ", props);
  // console.log("playlistid", props.PlaylistId);
  const playlistUrl = `/playlist/${props.PlaylistId}`;
  const redirectUrl = `/user`;
  const deletePlaylist = () => {
    // confirm equals true if user clicks "ok" on pop up
    let confirm = window.confirm(
      "Are you sure you want to delete this playlist?"
    );

    //if confirm equals true, send DELETE request to backend
    if (confirm) {
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
            }, 2000);
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
    </div>
  );
}
