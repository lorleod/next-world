import "./Popup.scss";
import { useState } from "react";

function ConfirmPopup(props) {
  const [triggerSend, setTriggerSend] = useState(false);
  const close = () => {
    props.setTrigger(false);
  };

  const confirm = () => {
    setTriggerSend(true);
  };

  // console.log("triggerSend in confirm: ", triggerSend);

  return props.trigger ? (
    <div>
      <button className="close-btn">
        <div className="popup">
          <div className="popup-inner">
            {props.children}
            <button className="btn" onClick={close}>
              Close
            </button>
            <button className="btn" onClick={confirm}>
              Confirm
            </button>
          </div>
        </div>
      </button>
    </div>
  ) : null;
}

export default ConfirmPopup;
