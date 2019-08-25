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
                <p>
                  BTC
                  <img className="coin-icon" src="/static/graphics/1.svg" />
                  <span className="btc-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  ETH
                  <img className="coin-icon" src="/static/graphics/2.svg" />
                  <span className="eth-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  TRX
                  <img className="coin-icon" src="/static/graphics/4.svg" />
                  <span className="trx-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  USDT
                  <img className="coin-icon" src="/static/graphics/5.svg" />
                  <span className="usdt-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  VTC
                  <img className="coin-icon" src="/static/graphics/6.svg" />
                  <span className="vtc-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  LTC
                  <img className="coin-icon" src="/static/graphics/3.svg" />
                  <span className="ltc-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  XMR
                  <img className="coin-icon" src="/static/graphics/7.svg" />
                  <span className="xmr-score">0.0000</span>
                </p>
              </li>
            </ul>
            <div className="score">SCORE : 0</div>
          </div>
          <canvas id="tetris" width="480" height="800" />
        </div>

        <div className="player">
          <div id="portfolio-score">
            <h2>Portfolio</h2>
            <ul id="portfolio">
              <li>
                <p>
                  BTC
                  <img className="coin-icon" src="/static/graphics/1.svg" />
                  <span className="btc-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  ETH
                  <img className="coin-icon" src="/static/graphics/2.svg" />
                  <span className="eth-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  TRX
                  <img className="coin-icon" src="/static/graphics/4.svg" />
                  <span className="trx-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  USDT
                  <img className="coin-icon" src="/static/graphics/5.svg" />
                  <span className="usdt-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  VTC
                  <img className="coin-icon" src="/static/graphics/6.svg" />
                  <span className="vtc-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  LTC
                  <img className="coin-icon" src="/static/graphics/3.svg" />
                  <span className="ltc-score">0.0000</span>
                </p>
              </li>
              <li>
                <p>
                  XMR
                  <img className="coin-icon" src="/static/graphics/7.svg" />
                  <span className="xmr-score">0.0000</span>
                </p>
              </li>
            </ul>
            <div className="score">SCORE : 0</div>
          </div>
          {/* <canvas id="tetris" width="240" height="400" /> */}
          <canvas id="tetris" width="480" height="800" />
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
