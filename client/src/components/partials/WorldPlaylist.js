import React from "react";
import PlaylistItem from "./PlaylistItem";

function WorldPlaylist({ props }) {
  const worldPlayist = props.map((worldId) => {
    // console.log("worldId: ", worldId);
    return <PlaylistItem key={worldId} worldId={worldId} />;
  });
  return (
    <div>
      <h1>{worldPlayist}</h1>
    </div>
  );
}

export default WorldPlaylist;
