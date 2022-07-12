import World from "./World";

function Playlist({ results }) {
  console.log("results at worldlist", results.data)
  //Makes data empty array so not read as undefined
  let data = [];
  //Changes data to results if present
  if (results.data) {
    data = results.data;
  }

  console.log("Playlist data", data)

  //Maps through data and adds as prop to world.js
  let playlist = data.map((item) => <WorldExpanded
    key={item.id}
    world={item}
    title={item.name}
    image={item.thumbnailImageUrl}
    author={item.authorName}
  />);
  return <div className="result">{playlist}</div>;
}

export default Playlist;
