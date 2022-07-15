import React from "react";
import UserPlaylistItem from "./UserPlaylistItem";

export default function UserPlaylists(props) {

  // lete data = empty array.. to prevent errors if it's empty?
  let data = [];
  if (props.playlists) {
    data = props.playlists;
  }

  //map playlist objects to UserPlaylistItems
  const UserPlaylists = data.map((playlist, index) => {
    // combine id and index for unique key that solves dubplicate key errors
    const key = playlist._id.concat(index);
    return (
      <div>
        <UserPlaylistItem
          key={key}
          PlaylistTitle={playlist.title}
          PlaylistId={playlist._id}
        />
      </div>
    );
  });
  return <div>{UserPlaylists}</div>;
}
