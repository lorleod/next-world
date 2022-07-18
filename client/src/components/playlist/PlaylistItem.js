import "./playlistItem.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getLaunchLink } from "../../helpers/getLaunchLink.js";
import RedirectPopup from "../partials/popups/RedirectPopup.js";
import BasicPopup from "../partials/popups/BasicPopup.js";

export default function PlaylistItem(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [popupDeleted, setPopupDeleted] = useState(false);
  const [popupWorld, setPopupWorld] = useState(false);
  const edit = props.edit;

  const params = useParams();
  const redirectUrl = `/playlist/${params.id}`;

  useEffect(() => {
    axios
      .get(`/api/getWorld/${props.worldId}`)
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
        .delete(`/playlist/deleteworld`, {
          data: {
            playlistId: playlistId,
            worldId: props.worldId,
          },
        })
        .then((response) => {
          console.log("response.data: ", response.data);
          if (response.data === "deleted world") {
            setPopupDeleted(true);
          }
        })
        .catch((error) => {});
    }
  };

  const launchWorld = function () {
    const confirm = window.confirm(
      "Are you sure you want to launch this world? Will open in a new tab."
    );

    if (confirm) {
      window.open(getLaunchLink(props.worldId));
    }
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
      {/* <a href={getLaunchLink(props.worldId)}>Launch Link</a> */}
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
      <RedirectPopup
        trigger={popupDeleted}
        setTrigger={setPopupDeleted}
        redirectUrl={redirectUrl}
      >
        <h1>World Deleted From Playlist</h1>
      </RedirectPopup>
      <BasicPopup trigger={popupWorld} setTrigger={setPopupWorld}>
        <img className="playlist-world-item-img" src={image} alt={title} />

        <h3 className="playlist-world-item-title">{title}</h3>
        <h5 className="playlist-world-item-author">Author: {author}</h5>
        <div className="playlist-world-item-description">{description}</div>
      </BasicPopup>
    </div>
  );
}
