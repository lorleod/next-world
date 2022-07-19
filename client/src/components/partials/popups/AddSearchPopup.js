import "./Popup.scss";
import axios from "axios";
import { useState } from "react";
import BasicPopup from "./BasicPopup";
import { useNavigate } from "react-router-dom";

function AddSearchPopup({
  trigger,
  setTrigger,
  worldId,
  playlists,
  worldTitle,
}) {
  const [popupAdded, setPopupAdded] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const close = () => {
    setTrigger(false);
  };

  const mappedPlaylists = playlists.map((playlist) => {
    const addWorld = async () => {
      await axios
        .post(
          "/api/playlist/addworld",
          {
            worldId: worldId,
            playlistId: playlist._id,
          },
          { withCredentials: true, credentials: "include" }
        )
        .then((data) => {
          if (data) {
            setTitle(playlist.title);
            setPopupAdded(true);
          } else {
            alert("World add unsuccessful");
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    };
    return (
      <h3 className="playlist-titles" key={playlist._id} onClick={addWorld}>
        {playlist.title}
      </h3>
    );
  });

  const create = async () => {
    navigate("/playlist/create");
  };
  return trigger ? (
    <div>
      <div className="popup">
        <div className="popup-inner-playlist">
          <h2>Your Playlists</h2> {mappedPlaylists}{" "}
          <h2 className="create" onClick={create}>
            Create Playlist
          </h2>
          <h2 className="cancel" onClick={close}>
            Cancel
          </h2>
        </div>
      </div>
      <BasicPopup trigger={popupAdded} setTrigger={setPopupAdded}>
        <h1>
          Added {worldTitle} to {title}
        </h1>
      </BasicPopup>
    </div>
  ) : null;
}

export default AddSearchPopup;
