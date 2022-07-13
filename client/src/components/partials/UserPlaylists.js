import React from "react";
import UserPlaylistItem from "./UserPlaylistItem";

export default function UserPlaylists({ props }) {
  let data = [];
  if (props) {
    data = props;
    // console.log("data", data);
  }
  const UserPlaylists = data.map((playlists) => {
    // console.log("props: ", playlists.title);
    return (
      <UserPlaylistItem
        key={playlists._id}
        PlaylistTitle={playlists.title}
        PlaylistId={playlists._id}
      />
    );
  });
  return <div>{UserPlaylists}</div>;
}
