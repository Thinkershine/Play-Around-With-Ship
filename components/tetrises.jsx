import React from "react";
import Head from "next/head";
import { version } from "../package.json";
import Tetris from "./tetris";
import TetrisHighScores from "./tetrisHighScores.jsx";

const Tetrises = () => {
  return (
    <>
      <Head>
        <title>Tetris</title>

        <style jsx-global="true">
          {`
            body {
              background: #202028;
              color: #fff;
              font-family: sans-serif;
              font-size: 2em;
              text-align: center;
            }
            h1, h2 {
              margin: 0;
              padding: 5px;
            }
            canvas {
              border: 1px solid #fff;
            }
            .version {
                font-size: 0.5em;
                color:rgba(255, 255, 255, 0.1);
                font-weight: bold;
                position: absolute;
                bottom: 0px;
            }
            .version:hover {
                color:rgba(255, 255, 255, 1);
                cursor: pointer;
            }
            .gameBoard {
              display: flex;
            }
            .player {
              flex: 1 1 auto;
            }

            #portfolio-score {
              float: left;
            }

            #portfolio {
              list-style: none;
              float: left;
              margin-top: 0;
            }
            #portfolio li {
              font-size: 0.9em;
            }
            #portfolio li > p {
              text-align: right;
            }
            .coin-icon {
              margin-right: 5px;
              margin-left: 5px;
            }
            .score {
              font-size: 2em;
            }
            #high-scores {
              float: left;
            }
            #high-scores ul {
              list-style: none;
            }
          `}
        </style>
      </Head>
      <h1>Crypto Blocks</h1>
      <div className="gameBoard">
        <Tetris />
        <Tetris />
      </div>

      <TetrisHighScores />
      <p className="version">V {version}</p>

      <script src="/static/models/tetrisArena.js" />
      <script src="/static/models/tetrisPlayer.js" />
      <script src="/static/models/tetris.js" />
      <script src="/static/engines/tetrisEngine.js" />
    </>
  );
};

export default Tetrises;
