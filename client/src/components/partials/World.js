import "./world.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function World(props) {
  const params = useParams();
  console.log("params: ", params);
  const submit = () => {
    axios
      .post("http://localhost:3001/playlist/addworld", {
        worldId: props.world.id,
        playlistId: params.id,
      })
      .then((data) => {
        // console.log("Inside World axios put: ", data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  // console.log("props in world", props);
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
