import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

// component to display each individual playlist created by current user
export default function MyPlaylistItem(props) {
  const playlistUrl = `/playlist/${props.PlaylistId}`;

  // pop up a confirmation then delete playlist if confirmed by user
  const deletePlaylist = () => {
    // confirm equals true if user clicks "ok" on pop up
    let confirm = window.confirm(
      "Are you sure you want to delete this playlist?"
    );

    //if confirm equals true, send DELETE request to backend
    if (confirm) {
      const response = axios
        .delete(`http://localhost:3001/playlist/delete`, {
          data: { _id: props.PlaylistId },
        })
        .then((response) => {
          const data = response.data;
          //if response confirms delete, alert user then redirect back to dashboard
          if (data === "deleted") {
            alert("Playlist deleted");
            window.location.href = "/user";
          }
        })
        .catch((error) => {
          console.log("Error deleting playlist: ", error);
        });
    }
  };

  return (
    <div>
      <h3>
        <Link to={playlistUrl}>{props.PlaylistTitle}</Link>
        <i className="bi bi-trash" onClick={deletePlaylist}></i>
      </h3>
    </div>
  );
}
