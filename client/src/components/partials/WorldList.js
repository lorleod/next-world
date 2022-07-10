import World from "./World";

function WorldList({ results }) {
  //Makes data empty array so not read as undefined
  let data = [];
  //Changes data to results if present
  if (results.data) {
    data = results.data;
  }

  //Maps through data and adds as prop to world.js
  let showList = data.map((item) => <World key={item.show.id} show={item} />);
  return <div className="result">{showList}</div>;
}

export default WorldList;
