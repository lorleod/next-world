import World from "./World";

function WorldList(props) {
  console.log("props at worldlist", props);
  //Makes data empty array so not read as undefined
  let data = [];
  //Changes data to results if present
  if (props.results.data) {
    data = props.results.data;
  }

  // console.log("worldlist data", data);

  //Maps through data and adds as prop to world.js
  let worldList = data.map((item) => (
    <World
      key={item.id}
      world={item}
      title={item.name}
      image={item.thumbnailImageUrl}
      author={item.authorName}
      playlistId={props.playlistId}
    />
  ));

  return <div className="result">{worldList}</div>;
}

export default WorldList;
