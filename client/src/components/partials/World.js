import "./world.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
function World(props) {
  const submit = () => {
    console.log("posts to database");
  };
  const { show } = props.show;
  return (
    <div className="world-box">
      <div>
        <h2>{show.name}</h2>
        <img className="img-world" src="" />
      </div>
      <div className="world-desc">
        <p>{show.summary}</p>
      </div>
      <button onClick={submit}>
        <i className="bi bi-plus-circle-fill fa-lg"></i>
      </button>
    </div>
  );
}

export default World;
