import React from "react";
import UserFavouriteItem from "./UserFavouriteItem";

// component lists all user's favourited playlists
export default function MyFavourites({ props }) {
  let data = [];
  if (props) {
    data = props;
  }
  const UserPlaylists = data.map((playlists) => {
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
