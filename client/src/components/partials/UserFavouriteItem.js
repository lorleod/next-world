import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

export default function UserFavouritesItem(props) {
  const [title, setTitle] = useState("");
  const playlistUrl = `/playlist/${props.PlaylistId}`;
  console.log("props playlistid", props.PlaylistId);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/favourites/user/${props.PlaylistId}`)
      .then((response) => {
        setTitle(response.data[0].title);
      });
  }, []);

  console.log("title", title);
  const deleteFavourite = () => {
    let confirm = window.confirm(
      "Are you sure you want to delete this playlist?"
    );
    if (confirm) {
      console.log("delete");
      const response = axios
        .delete(`http://localhost:3001/favourites/delete/${props.PlaylistId}`, {
          data: { _id: props.PlaylistId },
        })
        .then((response) => {
          const data = response.data;
          console.log("data in playlistitem: ", data);
          if (data === "deleted") {
            alert("Playlist deleted from Favorites");
            window.location.href = "/user";
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <h3>
        <Link to={playlistUrl}>{title}</Link>
        <i className="bi bi-trash" onClick={deleteFavourite}></i>
      </h3>
    </div>
  );
}
