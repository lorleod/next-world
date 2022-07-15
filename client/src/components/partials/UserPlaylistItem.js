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
    let confirm = window.confirm(
      "Are you sure you want to delete this playlist?"
    );
    if (confirm) {
      console.log("delete");
      const response = axios
        .delete(`http://localhost:3001/playlist/delete`, {
          data: { _id: props.PlaylistId },
        })
        .then((response) => {
          const data = response.data;
          console.log("data in playlistitem: ", data);
          if (data === "deleted") {
            setPopupDeleted(true);
          }
        })
        .catch((error) => {});
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
