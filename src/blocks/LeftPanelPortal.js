import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export function LeftPanelPortal({ children }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (document.getElementById("left-panel-portal")) {
      setOk(true);
    }
  }, []);

  return ok
    ? ReactDOM.createPortal(
        children,
        document.getElementById("left-panel-portal")
      )
    : null;
}
