import World from "./World";

function WorldList({ results }) {
  let data = [];
  if (results.data) {
    data = results.data.Search || [];
  }
  console.log(data);
  return (
    <div className="result">
      <World />
    </div>
  );
}

export default WorldList;
