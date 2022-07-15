import "./world.scss";
import "./worldList.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function World(props) {
  const params = useParams();
  console.log("params: ", params);
  const submit = async (event) => {
    event.preventDefault();
    console.log("addworld submit");
    await axios
      .post(
        "http://localhost:3001/playlist/addworld",
        {
          worldId: props.world.id,
          playlistId: params.id,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((data) => {
        console.log("addworld .then");
        if (data) {
          alert("World added");
          window.location.href = `/playlist/${props.playlistId}`;
        } else {
          alert("World add unsuccessful");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  // console.log("props in world", props);
  return (
    <div className="world-box">
      <img className="img-world" src={props.image} />
      <div className="search-world-info-container">
        <h2 className="search-world-title">{props.title}</h2>
        <h5 className="search-world-author">{props.author}</h5>
        <div className="search-world-description">
          <p className="search-world-description-p">summary</p>
        </div>
      </div>
      <button className="search-world-add-button" onClick={submit}>
        Add
      </button>
    </div>
  );
}

export default World;
