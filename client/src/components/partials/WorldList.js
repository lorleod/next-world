import World from "./World";

function WorldList({ results }) {
  let data = [];
  if (results.data) {
    data = results.data;
  }

  let showList = data.map((item) => <World key={item.show.id} show={item} />);
  console.log("data in worldlist", data);
  return (
    <div className="result">
      {showList}
      {/* <World show={data} /> */}
    </div>
  );
}

export default WorldList;
