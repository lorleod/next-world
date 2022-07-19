import "./playlistItem.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getLaunchLink } from "../../helpers/getLaunchLink.js";
import WorldCardPopup from "../partials/popups/WorldCardPopup";

export default function PlaylistItem({ edit, worldId, deleteWorldRefresh }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [popupWorld, setPopupWorld] = useState(false);

  const params = useParams();
  const redirectUrl = `/playlist/${params.id}`;

  useEffect(() => {
    axios
      .get(`/api/getWorld/${worldId}`)
      .then((response) => {
        setTitle(response.data.name);
        setAuthor(response.data.authorName);
        setImage(response.data.thumbnailImageUrl);
        setDescription(response.data.description);
      })
      .catch((error) => {});
  }, []);

  const deleteWorld = function () {
    let playlistId = params.id;

    let confirm = window.confirm("Are you sure you want to delete this world?");

    if (confirm) {
      console.log("Deleting world");

      axios
        .delete(`/api/playlist/deleteworld`, {
          data: {
            playlistId: playlistId,
            worldId: worldId,
          },
        })
        .then((response) => {
          console.log("response.data: ", response.data);
          console.log("response.data.success: ", response);
          if (response.data === "deleted world") {
            deleteWorldRefresh(true);
          }
        })
        .catch((error) => {});
    }
  };

  const launchWorld = function () {
    window.open(getLaunchLink(worldId));
  };

  const showWorldInfo = function () {
    setPopupWorld(true);
    console.log("showWorldInfo");
  };

  return (
    <div className="playlist-world-item-container">
      <div className="playlist-world-wrapper" onClick={showWorldInfo}>
        <img className="playlist-world-item-img" src={image} alt={title} />

        <h3 className="playlist-world-item-title">{title}</h3>
      </div>
      <div className="playlist-world-button-wrapper">
        <a className="playlist-world-item-launch-item" onClick={launchWorld}>
          Launch Link
        </a>

        {edit ? (
          <a
            className="playlist-world-item-delete-button"
            onClick={deleteWorld}
          >
            Delete World
          </a>
        ) : null}
      </div>
      <WorldCardPopup
        trigger={popupWorld}
        setTrigger={setPopupWorld}
        world_id={worldId}
      >
        <img className="playlist-world-item-img" src={image} alt={title} />

        <h3 className="playlist-world-popup-title">{title}</h3>
        <h5 className="playlist-world-item-author">Author: {author}</h5>
        <div className="playlist-world-item-description">{description}</div>
      </WorldCardPopup>
    </div>
  );
}
