import * as React from "react";
import { useLogic } from "../../context/main-context";
import Options from "./options";

export default function MovXchg() {
  const { dispatch } = useLogic();
  const [currentToIndex, setCurrentToIndex] = React.useState("1");
  const [currentFromIndex, setCurrentFromIndex] = React.useState("1");

  const [currentToIndexXchg, setCurrentToIndexXchg] = React.useState("1");
  const [currentFromIndexXchg, setCurrentFromIndexXchg] = React.useState("1");

  const [movError, setMovError] = React.useState("");
  const [xchgError, setXchgError] = React.useState("");

  function showError(type) {
    if (type) {
      return setMovError("The same options. Please change options.");
    }
    return setXchgError("The same options. Please change options.");
  }

  function checkValues(type) {
    if (type) {
      if (currentToIndex === currentFromIndex) {
        return showError(type);
      }

      dispatch({
        type: "mov",
        state: { to: currentToIndex, from: currentFromIndex },
      });
      setMovError("");
    } else {
      if (currentToIndexXchg === currentFromIndexXchg) {
        return showError(type);
      }

      dispatch({
        type: "xchg",
        state: { to: currentToIndexXchg, from: currentFromIndexXchg },
      });
      setXchgError("");
    }
  }

  return (
    <div className="memory">
      <div className="mov">
        <div className="mov__title">MOV</div>
        <div className="mov__options">
          <Options fn={setCurrentToIndex} value={currentToIndex} />
        </div>
        <div className="mov__options">
          <Options fn={setCurrentFromIndex} value={currentFromIndex} />
        </div>
        <button onClick={() => checkValues(true)}>OK</button>
        <p className="memory__error">{movError}</p>
      </div>

      <div className="mov">
        <div className="mov__title">XCHG</div>
        <div className="mov__options">
          <Options fn={setCurrentToIndexXchg} value={currentToIndexXchg} />
        </div>
        <div className="mov__options">
          <Options fn={setCurrentFromIndexXchg} value={currentFromIndexXchg} />
        </div>
        <button onClick={() => checkValues(false)}>OK</button>
        <p className="memory__error">{xchgError}</p>
      </div>
    </div>
  );
}
