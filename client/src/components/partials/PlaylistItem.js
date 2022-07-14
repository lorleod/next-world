import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getLaunchLink } from "../../helpers/getLaunchLink.js";

export default function PlaylistItem(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [remove, setRemove] = useState(props.edit);
  const edit = props.edit;

  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getWorld/${props.worldId}`)
      .then((response) => {
        setTitle(response.data.name);
        setAuthor(response.data.authorName);
        setImage(response.data.thumbnailImageUrl);
        setDescription(response.data.description);
      })
      .catch((error) => {});
  }, []);

  const deleteWorld = function () {
    let playlistId = params.id;

    let confirm = window.confirm("Are you sure you want to delete this world?");

    if (confirm) {
      console.log("Deleting world");

      axios
        .delete(`http://localhost:3001/playlist/deleteworld`, {
          data: {
            playlistId: playlistId,
            worldId: props.worldId,
          },
        })
        .then((response) => {
          console.log("response.data: ", response.data);
          if (response.data === "deleted world") {
            alert("World deleted");
            window.location.href = `/playlist/${playlistId}`;
          }
        })
        .catch((error) => {});
    }
  };

  const launchWorld = function () {
    const confirm = window.confirm(
      "Are you sure you want to launch this world? Will open in a new tab."
    );

    if (confirm) {
      window.open(getLaunchLink(props.worldId));
    }
  };

  return (
    <div>
      <h1>Title: {title}</h1>
      <h2>Author: {author}</h2>
      <h3>Description: {description}</h3>
      <img src={image} alt={title} />
      <div>
        {/* <a href={getLaunchLink(props.worldId)}>Launch Link</a> */}
        <a onClick={launchWorld}>Launch Link</a>
      </div>
      {edit ? <button onClick={deleteWorld}>Delete World</button> : null}
    </div>
  );
}
