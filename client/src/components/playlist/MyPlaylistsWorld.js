import { useEffect, useState } from "react";
import axios from "axios";
import WorldCardPopup from "../partials/popups/WorldCardPopup";

const MyPlaylistsWorld = (props) => {
  const [worldTitle, setWorldTitle] = useState("");
  const [worldImage, setWorldImage] = useState("");
  const [worldDescription, setWorldDescription] = useState("");
  const [worldAuthor, setWorldAuthor] = useState("");
  const [popupWorldInfo, setPopupWorldInfo] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`/api/getWorld/${props.worldId}`)
        .then((response) => {
          setWorldTitle(response.data.name);
          setWorldImage(response.data.thumbnailImageUrl);
          setWorldDescription(response.data.description);
          setWorldAuthor(response.data.authorName);
        })
        .catch((error) => {
          console.log("error:", error)
        });
    };
    fetchData();
  }, []);

  const worldInfo = () => {
    setPopupWorldInfo(true);
  };

  return (
    <div>
      <div className="public-playlist-image-container" onClick={worldInfo}>
        <img className="public-playlist-image" src={worldImage} alt="world" />
      </div>
      <WorldCardPopup
        trigger={popupWorldInfo}
        setTrigger={setPopupWorldInfo}
        world_id={props.worldId}
      >
        <img
          className="playlist-world-item-img"
          src={worldImage}
          alt={worldTitle}
        />

        <h3 className="playlist-world-popup-title">{worldTitle}</h3>
        <h5 className="playlist-world-item-author">Author: {worldAuthor}</h5>
        <div className="playlist-world-item-description">
          {worldDescription}
        </div>
      </WorldCardPopup>
    </div>
  );
};

export default MyPlaylistsWorld;
