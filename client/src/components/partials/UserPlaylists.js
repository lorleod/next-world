import React from "react";
import UserPlaylistItem from "./UserPlaylistItem";

export default function UserPlaylists({ props, trigger }) {
  console.log("props in userplaylists: ", trigger);
  let data = [];
  if (props) {
    data = props;
  }
  const UserPlaylists = data.map((playlists) => {
    // console.log("props: ", playlists);
    return (
      <div>
        <UserPlaylistItem
          key={playlists._id}
          PlaylistTitle={playlists.title}
          PlaylistId={playlists._id}
        />
      </div>
    );
  });
  return <div>{UserPlaylists}</div>;
}
