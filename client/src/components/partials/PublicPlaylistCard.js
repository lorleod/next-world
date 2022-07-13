

export default function PublicPlaylistCard (props) {

  return (
    <div>
      <h3>Public Playlist Card</h3>
      <h3>{props.playlistTitle}</h3>
      <p>{props.playlistDesc}</p>
    </div>
  );
};