import "./worldPlaylist.scss";
import React from "react";
import PlaylistItem from "./PlaylistItem";

function WorldPlaylist({ props, edit }) {
  const worldPlayist = props.map((worldId) => {
    return <PlaylistItem key={worldId} worldId={worldId} edit={edit} />;
  });
  return (
    <div className="playlist-world-container">
      {worldPlayist}
    </div>
  );
}

export default WorldPlaylist;
