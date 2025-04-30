// src/pages/index.tsx

import React from "react";

export default function StockVision() {
  return (
    <div>
      {/* HERO SECTION */}
      <header className="text-center py-12 bg-white">
        <div className="container">
          <h1 className="display-4 fw-bold text-primary">STOCKVISION</h1>
          <p className="lead">Where Data Meets Destiny</p>
          <form className="d-flex justify-content-center mt-4">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Enter a stock"
              aria-label="Search"
              style={{ maxWidth: "300px" }}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </header>

      {/* LOSERS / WINNERS CARDS */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Losers */}
          <div className="col-md-6">
            <div className="card shadow-sm rounded">
              <div className="card-body">
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-arrow-down-circle-fill fs-4 text-danger"></i>
                    <h5 className="mb-0 text-danger">Today's Biggest Losers</h5>
                  </div>
                  <small className="text-muted">
                    Stocks with the largest percentage decrease today.
                  </small>
                </div>
                <ul className="list-group list-group-flush">
                  {/* Example Loser */}
                  <li className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src="https://logo.clearbit.com/bunzl.com?size=80"
                        width="32"
                        height="32"
                        alt="Bunzl plc"
                      />
                      <div>
                        <div className="fw-medium">Bunzl plc</div>
                        <div className="text-muted small">BZLFY</div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-medium">$15.30</div>
                      <div className="text-danger small">−5.14 (−25.15%)</div>
                    </div>
                  </li>
                </ul>
                <div className="card-body text-end">
                  <button className="btn btn-outline-danger btn-sm">
                    View All Losers
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Winners */}
          <div className="col-md-6">
            <div className="card shadow-sm rounded">
              <div className="card-body">
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-arrow-up-circle-fill fs-4 text-success"></i>
                    <h5 className="mb-0 text-success">
                      Today's Biggest Winners
                    </h5>
                  </div>
                  <small className="text-muted">
                    Stocks with the largest percentage increase today.
                  </small>
                </div>
                <ul className="list-group list-group-flush">
                  {/* Example Winner */}
                  <li className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src="https://logo.clearbit.com/nvidia.com?size=80"
                        width="32"
                        height="32"
                        alt="NVIDIA"
                      />
                      <div>
                        <div className="fw-medium">NVIDIA Corporation</div>
                        <div className="text-muted small">NVDA</div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-medium">$112.20</div>
                      <div className="text-success small">+1.16 (+0.59%)</div>
                    </div>
                  </li>
                </ul>
                <div className="card-body text-end">
                  <button className="btn btn-outline-success btn-sm">
                    View All Winners
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT IS STOCKVISION SECTION */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2>What is StockVision?</h2>
            <p>
              An AI-powered platform that analyzes real-time financial news,
              market sentiment, earnings reports and historical stock data to
              generate actionable insights and trend forecasts.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="col-md-6">
            <canvas id="overviewChart" height="200"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
