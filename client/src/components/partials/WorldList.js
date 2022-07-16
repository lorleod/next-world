import World from "./World";

function WorldList(props) {
  //Makes an empty array so not read as undefined before search is submitted
  let data = [];

  //Updates data with search results when present
  if (props.results.data) {
    data = props.results.data;
  }

  //Maps through data and adds as props to world.js
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

  return <div className="result-worlds">{worldList}</div>;
}

export default WorldList;
