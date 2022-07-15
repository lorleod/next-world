import React from "react";
import PlaylistItem from "./PlaylistItem";

function WorldPlaylist({ props, edit }) {
  const worldPlayist = props.map((worldId, index) => {
    let key = worldId.concat(index);
    return <PlaylistItem key={key} worldId={worldId} edit={edit} />;
  });
  return (
    <div>
      <h1>{worldPlayist}</h1>
    </div>
  );
}

export default WorldPlaylist;
