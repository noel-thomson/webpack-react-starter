import React from "react";
import styles from "../css/App.css";

const App = ({ greeting }) => {
  return (
    <app>
      <div className={styles.greeting}>{greeting}</div>
    </app>
  );
};

export default App;
