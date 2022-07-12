import "./world.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
function World(props) {
  const submit = () => {
    console.log("posts to database");
  };

  console.log("props in world", props)
  return (
    <div className="world-box">
      <div>
        <h2>{props.title}</h2>
        <h3>{props.author}</h3>
        <img className="img-world" src={props.image} />
      </div>
      <div className="world-desc">
        <p>summary</p>
      </div>
      <button onClick={submit}>
        <i className="bi bi-plus-circle-fill fa-lg"></i>
      </button>
    </div>
  );
}

export default World;
