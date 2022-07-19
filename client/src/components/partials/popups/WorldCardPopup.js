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
          <div className="popup-button-wrapper">
            <h2 className="view">
              <Link to={redirectUrl}>View World</Link>
            </h2>
            <h2 className="cancel" onClick={close}>
              Close
            </h2>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default WorldCardPopup;
