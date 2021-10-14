import React, { useState} from "react";

const AlertContext = React.createContext();

function AlertProvider({ children }) {
  const [isVisible, setVisible] = useState(false);

  function hide() {
    setVisible(false);
  }
  function show() {
      console.log("called")
    setVisible(true);
  }
  return (
    <AlertContext.Provider value={{ isVisible, hide, show }}>
      {children}
    </AlertContext.Provider>
  );
}

export { AlertProvider, AlertContext };
