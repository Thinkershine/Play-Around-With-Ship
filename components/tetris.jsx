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
            h2 {
              margin: 0;
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
          `}
        </style>
      </Head>
      <h1>Crypto Blocks</h1>
      <div className="gameBoard">
        <div className="player">
          <div id="portfolio-score">
            <h2>Portfolio</h2>
            <ul id="portfolio">
              <li>
                <p className="btc-score">
                  BTC
                  <img className="coin-icon" src="/static/graphics/1.svg" />
                  0.00000000
                </p>
              </li>
              <li>
                <p className="eth-score">
                  ETH
                  <img className="coin-icon" src="/static/graphics/2.svg" />
                  0.00000000
                </p>
              </li>
              <li>
                <p className="trx-score">
                  TRX
                  <img className="coin-icon" src="/static/graphics/4.svg" />
                  0.00000000
                </p>
              </li>
              <li>
                <p className="usdt-score">
                  USDT
                  <img className="coin-icon" src="/static/graphics/5.svg" />
                  0.00000000
                </p>
              </li>
              <li>
                <p className="vtc-score">
                  VTC
                  <img className="coin-icon" src="/static/graphics/6.svg" />
                  0.00000000
                </p>
              </li>
              <li>
                <p className="ltc-score">
                  LTC
                  <img className="coin-icon" src="/static/graphics/3.svg" />
                  0.00000000
                </p>
              </li>
              <li>
                <p className="xmr-score">
                  XMR
                  <img className="coin-icon" src="/static/graphics/7.svg" />
                  0.00000000
                </p>
              </li>
            </ul>
            <div className="score">SCORE : 0</div>
          </div>
          <canvas id="tetris" width="240" height="400" />
        </div>

        <div className="player">
          <div className="score">SCORE : 0</div>
          <canvas id="tetris" width="240" height="400" />
        </div>
      </div>
      <p className="version">V {version}</p>

      <script src="/static/models/tetrisArena.js" />
      <script src="/static/models/tetrisPlayer.js" />
      <script src="/static/models/tetris.js" />
      <script src="/static/engines/tetrisEngine.js" />
    </>
  );
};

export default Tetris;
