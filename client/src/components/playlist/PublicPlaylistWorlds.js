import { useEffect, useState } from "react";
import axios from "axios";
import BasicPopup from "../partials/popups/BasicPopup";

const PublicPlaylistWorlds = (props) => {
  // console.log("props PPW: ", props.worldId);
  const [worldTitle, setWorldTitle] = useState("");
  const [worldImage, setWorldImage] = useState("");
  const [worldDescription, setWorldDescription] = useState("");
  const [worldAuthor, setWorldAuthor] = useState("");
  const [popupWorldInfo, setPopupWorldInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/getWorld/${props.worldId}`)
        .then((response) => {
          // console.log("response.data.title ", response.data.thumbnailImageUrl);
          setWorldTitle(response.data.name);
          setWorldImage(response.data.thumbnailImageUrl);
          setWorldDescription(response.data.description);
          setWorldAuthor(response.data.authorName);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  const worldInfo = () => {
    console.log("worldInfo");
    setPopupWorldInfo(true);
  };
  return (
    <div>
      <div className="public-playlist-image-container" onClick={worldInfo}>
        <img className="public-playlist-image" src={worldImage} alt="world" />
      </div>
      <BasicPopup trigger={popupWorldInfo} setTrigger={setPopupWorldInfo}>
        <img
          className="playlist-world-item-img"
          src={worldImage}
          alt={worldTitle}
        />

        <h3 className="playlist-world-item-title">{worldTitle}</h3>
        <h5 className="playlist-world-item-author">Author: {worldAuthor}</h5>
        <div className="playlist-world-item-description">
          {worldDescription}
        </div>
      </BasicPopup>
    </div>
  );
};

export default PublicPlaylistWorlds;
