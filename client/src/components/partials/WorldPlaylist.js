import "./worldPlaylist.scss";
import React from "react";
import PlaylistItem from "./PlaylistItem";

function WorldPlaylist({ props, edit }) {
  const worldPlayist = props.map((worldId, index) => {
    let key = worldId.concat(index);
    return <PlaylistItem key={key} worldId={worldId} edit={edit} />;
  });
  return (
    <div className="playlist-world-container">
      {worldPlayist}
    </div>
  );
}

export default WorldPlaylist;
