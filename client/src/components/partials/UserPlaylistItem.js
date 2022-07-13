import { Link } from "react-router-dom";

export default function UserPlaylistItem(props) {
  // console.log("props userplaylistitem: ", props);
  // console.log("playlistid", props.PlaylistId);
  const playlistUrl = `/playlist/${props.PlaylistId}`;

  return (
    <div>
      <h3>
        <Link to={playlistUrl}>{props.PlaylistTitle}</Link>
      </h3>
    </div>
  );
}
