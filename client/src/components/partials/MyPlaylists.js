import React from "react";
import MyPlaylistItem from "./MyPlaylistItem";

export default function MyPlaylists(props) {

  // lete data = empty array.. to prevent errors if it's empty?
  let data = [];
  if (props.playlists) {
    data = props.playlists;
  }

  //map playlist objects to MyPlaylistItems
  const myPlaylists = data.map((playlist, index) => {
    // combine id and index for unique key that solves dubplicate key errors
    const key = playlist._id.concat(index);
    return (
      <div>
        <MyPlaylistItem
          key={key}
          PlaylistTitle={playlist.title}
          PlaylistId={playlist._id}
        />
      </div>
    );
  });
  return <div>{myPlaylists}</div>;
}
