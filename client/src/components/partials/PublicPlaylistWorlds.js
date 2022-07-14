import { useEffect, useState } from "react";
import axios from "axios";

const PublicPlaylistWorlds = (props) => {
  // console.log("props PPW: ", props.worldId);
  const [worldTitle, setWorldTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3001/api/getWorld/${props.worldId}`)
        .then((response) => {
          // console.log("response.data.title ", response.data.name);
          setWorldTitle(response.data.name);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  // console.log("worldTitle: ", worldTitle);
  return (
    <div>
      <div>{worldTitle}</div>
    </div>
  );
};

export default PublicPlaylistWorlds;
