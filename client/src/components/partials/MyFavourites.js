import React from "react";
import MyFavouritesItem from "./MyFavouritesItem";

// component lists all user's favourited playlists
export default function MyFavourites(props) {

   // Let data = empty array.. to prevent errors if it's empty?
  let data = [];
  if (props.favourites) {
    data = props.favourites;
  }

  //map favourites objects to MyFavouritesItems
  const myFavourites = data.map((favourites, index) => {
    // combine id and index for unique key that solves dubplicate key errors
    const key = favourites._id.concat(index);
    return (
      <div>
        <MyFavouritesItem
          key={key}
          playlistId={favourites.playlist_id}
        />
      </div>
    );
  });
  return <div>{myFavourites}</div>;
}
