import React from "react";
import Head from "next/head";

const Index = () => {
  return (
    <div>
      <Head>
        <title>Tetris</title>
      </Head>
      <h1>Tetris With Engine</h1>
      <div>
        <canvas id="tetris" width="240" height="400" />
      </div>
      <p id="score" />
      <script src="/static/engines/tetris.js" />
    </div>
  );
};

export default Index;
