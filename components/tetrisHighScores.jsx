import React, { useState } from "react";
import ls from "local-storage";
import Head from "next/head";

const TetrisHighScores = () => {
  const [highScores] = useState(ls.get("HIGHSCORES"));

  const displayHighScores = hs => {
    var toReturn = hs.map((score, index) => (
      <li key={score.toString() + index} style={{ textAlign: "left" }}>
        <b style={{ marginRight: 25 }}>{index + 1}</b> {score}
      </li>
    ));
    return toReturn;
  };

  return (
    <>
      <Head>
        <style jsx>
          {`
            #high-scores {
              float: left;
            }
            #high-scores ul {
              list-style: none;
            }
            .score {
              font-size: 2em;
            }
          `}
        </style>
      </Head>
      <div id="high-scores">
        <h2>HighScores</h2>
        <ul>{highScores !== null && displayHighScores(highScores)}</ul>
      </div>
    </>
  );
};

export default TetrisHighScores;
