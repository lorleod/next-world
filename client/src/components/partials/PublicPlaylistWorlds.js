import { useEffect, useState } from "react";
import axios from "axios";
import publicPLayistCard from "./PublicPlaylistCard";

const PublicPlaylistWorlds = (props) => {
  // console.log("props PPW: ", props.worldId);
  const [worldTitle, setWorldTitle] = useState("");
  const [worldImage, setWorldImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/api/getWorld/${props.worldId}`)
        .then((response) => {
          // console.log("response.data.title ", response.data.thumbnailImageUrl);
          setWorldTitle(response.data.name);
          setWorldImage(response.data.thumbnailImageUrl);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  // console.log("worldTitle: ", worldTitle);
  return (
    <div>
      {/* <div>{worldTitle}</div> */}
      <div className="public-playlist-image-container">
        <img className="public-playlist-image" src={worldImage} alt="world" />
      </div>
    </div>
  );
};

export default PublicPlaylistWorlds;
