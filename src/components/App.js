import React from "react";
import styles from "./app.scss";

const App = ({ greeting }) => {
  return (
    <>
      <div className={styles.greeting}>{greeting}</div>
    </>
  );
};

export default App;
