import { useEffect } from "react";
import axios from "axios";

export default function UserPlaylistItem(props) {
  const playlistId = props.PlaylistId;
  console.log(playlistId);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${playlistId}`)
      .then((response) => {})
      .catch((error) => {});
  }, []);
  return <div></div>;
}
