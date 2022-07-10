function World(props) {
  const { show } = props.show;
  return (
    <div>
      <div className="show-world">
        <div>
          <h2>{show.name}</h2>
          <img className="img-world" src="" />
        </div>
        <div className="world-desc">
          <p>{show.summary}</p>
        </div>
      </div>
    </div>
  );
}

export default World;
