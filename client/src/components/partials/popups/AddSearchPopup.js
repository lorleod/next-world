import "./Popup.scss";
import axios from "axios";
import { useState } from "react";
import BasicPopup from "./BasicPopup";

function AddSearchPopup({
  trigger,
  setTrigger,
  worldId,
  playlists,
  worldTitle,
}) {
  const [popupAdded, setPopupAdded] = useState(false);
  const [title, setTitle] = useState("");
  const close = () => {
    setTrigger(false);
  };

  const mappedPlaylists = playlists.map((playlist) => {
    const addWorld = async () => {
      console.log("add world", playlist._id);
      await axios
        .post(
          "/playlist/addworld",
          {
            worldId: worldId,
            playlistId: playlist._id,
          },
          { withCredentials: true, credentials: "include" }
        )
        .then((data) => {
          console.log("addworld .then");
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

  return trigger ? (
    <div>
      <div className="popup">
        <div className="popup-inner-playlist">
          {" "}
          {mappedPlaylists}{" "}
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
