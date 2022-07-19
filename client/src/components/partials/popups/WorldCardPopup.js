import "./Popup.scss";
import { Link } from "react-router-dom";

function WorldCardPopup({ trigger, setTrigger, children, world_id }) {
  const close = () => {
    setTrigger(false);
  };

  const redirectUrl = `/world/${world_id}`;
  return trigger ? (
    <div>
      <div className="popup">
        <div className="popup-inner">
          {children}{" "}
          <h2 className="cancel" onClick={close}>
            Cancel
          </h2>
          <Link to={redirectUrl}>
            <h2 className="cancel">View World</h2>
          </Link>
        </div>
      </div>
    </div>
  ) : null;
}

export default WorldCardPopup;
