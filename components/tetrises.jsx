import React from "react";
import Head from "next/head";
import { version } from "../package.json";
import Tetris from "./tetris";
import TetrisHighScores from "./tetrisHighScores.jsx";

const Tetrises = () => {

  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-146774792-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'UA-146774792-1');
        </script>

        <title>Tetrises</title>

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
              margin: 20px;
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
          `}
        </style>
      </Head>
      <h1>Crypto Blocks</h1>
      <div className="gameBoard">
        <Tetris/>
        <TetrisHighScores />
      </div>

      <p className="version">V {version}</p>

      <script src="/static/models/tetrisArena.js" />
      <script src="/static/models/tetrisPlayer.js" />
      <script src="/static/models/tetris.js" />
      <script src="/static/engines/tetrisEngine.js" />
    </>
  );
};

export default Tetrises;
