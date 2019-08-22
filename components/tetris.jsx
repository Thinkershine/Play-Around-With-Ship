import React from "react";
import Head from "next/head";

const Tetris = () => {
  return (
    <>
      <Head>
        <title>Tetris</title>

        <style jsx-global>
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
          `}
        </style>
      </Head>
      <h1>Crypto Blocks</h1>
      <div>
        <canvas id="tetris" width="240" height="400" />
      </div>
      <p id="score">0</p>
      <script src="/static/engines/tetris.js" />
    </>
  );
};

export default Tetris;
