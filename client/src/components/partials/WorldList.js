import World from "./World";

function WorldList({ results }) {
  console.log("results at worldlist", results.data);
  //Makes data empty array so not read as undefined
  let data = [];
  //Changes data to results if present
  if (results.data) {
    data = results.data;
  }

  console.log("worldlist data", data);

  //Maps through data and adds as prop to world.js
  let worldList = data.map((item) => (
    <World
      key={item.id}
      world={item}
      title={item.name}
      image={item.thumbnailImageUrl}
      author={item.authorName}
    />
  ));

  return <div className="result">{worldList}</div>;
}

export default WorldList;
