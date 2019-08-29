import React from "react";

const TetrisPlayerPortfolio = () => {
  return (
    <div id="portfolio-score">
      <style jsx>
        {`
          #portfolio-score {
            width: 350px;
            float: left;
            margin: 25px;
          }

          #portfolio {
            list-style: none;
            margin: 0 auto;
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
            margin: 0;
          }
        `}
      </style>
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
      <div>
        <h2>SCORE</h2>
        <p className="score">0</p>
      </div>
    </div>
  );
};

export default TetrisPlayerPortfolio;
