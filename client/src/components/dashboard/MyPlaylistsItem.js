import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import ConfirmPopup from "../partials/popups/ConfirmPopup";
import "../playlist/publicPLaylistCard.scss";
import MyPlaylistsWorld from "../playlist/MyPlaylistsWorld";
import BasicPopup from "../partials/popups/BasicPopup";

export default function MyPlaylistsItem({ playlistId, handleDeleteRefresh }) {
  const [popupDeleted, setPopupDeleted] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [worldIds, setWorldIds] = useState([]);
  const playlistUrl = `/playlist/${playlistId}`;

  useEffect(() => {
    axios.get(`/api/playlist/${playlistId}`)
    .then((response) => {
      setTitle(response.data.title);
      setWorldIds(response.data.worldIds);
    }).catch((error) => {
      console.log("error:", error)
    });
  }, []);

  const deletePlaylist = () => {
    let confirm = window.confirm(
      "Are you sure you want to delete this playlist?"
    );
    if (confirm === true) {
      axios.delete(`/api/playlist/delete`, {
          data: { _id: playlistId },
        })
        .then((response) => {
          const data = response.data;
          //if response confirms delete, alert user then redirect back to dashboard
          if (data === "deleted") {
            handleDeleteRefresh(true);
          }
        })
        .catch((error) => {
          console.log("Error deleting playlist: ", error);
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
            onClick={deletePlaylist}
          >
            Delete
          </div>
        </div>
      </div>
      <BasicPopup trigger={popupDeleted} setTrigger={setPopupDeleted}>
        <h1>Playlist Deleted</h1>
      </BasicPopup>
      <ConfirmPopup
        trigger={confirmPopup}
        setTrigger={setConfirmPopup}
      >
        <h1>Delete This Playlist?</h1>
      </ConfirmPopup>
    </div>
  );
}
