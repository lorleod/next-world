import React from "react";
import PlaylistItem from "./PlaylistItem";

function WorldPlaylist({ props, edit }) {
  const worldPlayist = props.map((worldId) => {
    return <PlaylistItem key={worldId} worldId={worldId} edit={edit} />;
  });
  return (
    <div>
      <h1>{worldPlayist}</h1>
    </div>
  );
}

export default WorldPlaylist;
