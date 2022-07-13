export default function UserPlaylistItem(props) {
  console.log("props userplaylistitem: ", props);
  return (
    <div>
      <h3>
        <a>{props.PlaylistTitle}</a>
      </h3>
    </div>
  );
}
