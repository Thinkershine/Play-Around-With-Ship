import React, { useEffect } from "react";
import Head from "next/head";
import { version } from "../package.json";

const Tetris = () => {
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
          `}
        </style>
      </Head>
      <h1>Crypto Blocks</h1>
      <div>
        <canvas id="tetris" width="240" height="400" />
      </div>
      <p id="score">0</p>
      <p className="version">V {version}</p>
      <script src="/static/models/tetrisArena.js" />
      <script src="/static/models/tetrisPlayer.js" />
      <script src="/static/models/tetris.js" />
      <script src="/static/engines/tetrisEngine.js" />
    </>
  );
};

export default Tetris;
