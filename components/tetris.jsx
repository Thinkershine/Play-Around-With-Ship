import React from "react";
import Head from "next/head";

const Tetris = () => {
  return (
    <>
      <Head>
        <title>Tetris</title>
      </Head>
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
    </>
  );
};

export default Tetris;
