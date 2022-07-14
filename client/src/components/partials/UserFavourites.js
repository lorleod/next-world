import React from "react";
import UserFavouriteItem from "./UserFavouriteItem";

export default function UserPlaylists({ props }) {
  let data = [];
  if (props) {
    data = props;
  }
  const UserPlaylists = data.map((playlists) => {
    console.log("props: ", playlists);
    return (
      <div>
        <UserFavouriteItem
          key={playlists._id}
          PlaylistId={playlists.playlist_id}
        />
      </div>
    );
  });
  return <div>{UserPlaylists}</div>;
}
