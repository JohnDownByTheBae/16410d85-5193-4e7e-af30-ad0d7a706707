import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import CallManager from "./CallManager.jsx";

const App = () => {
  return (
    <div className="container">
      <div className="container-view">
        <Header />
        <CallManager />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
