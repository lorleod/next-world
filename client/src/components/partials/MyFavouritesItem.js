import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

// component to display each individual favourited playlist of current user
export default function MyFavouritesItem(props) {
  const [title, setTitle] = useState("");
  const playlistUrl = `/playlist/${props.playlistId}`;

  useEffect(() => {
    axios
      .get(`/favourites/user/${props.playlistId}`)
      .then((response) => {
        setTitle(response.data[0].title);
      });
  }, []);

  // pop up a confirmation then unfavourite if confirmed by user
  const unFavourite = () => {
    // confirm equals true if user clicks "ok" on pop up
    let confirm = window.confirm(
      "Are you sure you want to un-favourite this playlist?"
    );

    //if confirm equals true, send DELETE request to backend
    if (confirm) {
      axios
        .delete(`/favourites/delete/${props.playlistId}`, {
          data: { _id: props.playlistId },
        })
        .then((response) => {
          const data = response.data;
          //if response confirms delete, alert user then redirect back to dashboard
          if (data === "deleted") {
            alert("Playlist removed from your favourites");
            window.location.href = "/user";
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  return (
    <div>
      <h3>
        <Link to={playlistUrl}>{title}</Link>
        <i className="bi bi-trash" onClick={unFavourite}></i>
      </h3>
    </div>
  );
}
