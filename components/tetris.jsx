import React from "react";
import Head from "next/head";
import TetrisPlayerPortfolio from "./tetrisPlayerPortfolio";

const Tetris = () => {
  return (
    <>
      <Head>
        <title>Tetris</title>
      </Head>
      <div className="player">
        <TetrisPlayerPortfolio />
        <canvas id="tetris" width="480" height="800" />
      </div>
    </>
  );
};

export default Tetris;
