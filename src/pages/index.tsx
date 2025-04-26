import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'
import Chart from 'chart.js/auto'

export default function Home() {
  useEffect(() => {
    const ctx = document.getElementById('overviewChart')
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],
          datasets: [{
            data: [5,6,5.5,6.5,7.2,7.8,8.2,9],
            fill: false,
            borderColor: '#1E87F0',
            tension: 0.4,
            pointRadius: 0
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: false, grid: { color: '#eee' } }
          }
        }
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>StockVision</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fs-3 fw-bold text-white" href="#">STOCKVISION</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#">Trade</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Research</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Portfolio</a></li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#">Account</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Support</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Log Out</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-5 bg-white">
        <div className="container text-center">
          <h1 className="display-4 text-blue-500 text-uppercase">STOCKVISION</h1>
          <p className="lead">Where Data Meets Destiny</p>
          <div className="d-flex justify-content-center">
            <input className="form-control w-25 me-2" type="search" placeholder="Enter a stock" />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </header>

      {/* Biggest Losers/Winners */}
      <div className="container mb-5">
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
                  <small className="text-muted">Stocks with the largest percentage decrease today.</small>
                </div>
                <ul className="list-group list-group-flush">
                  {/* BZLFY */}
                  <li className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://logo.clearbit.com/bunzl.com?size=80" width="32" height="32" alt="Bunzl plc logo" />
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
                  {/* WRID */}
                  <li className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://logo.clearbit.com/weride.ai?size=80" width="32" height="32" alt="WeRide Inc logo" />
                      <div>
                        <div className="fw-medium">WeRide Inc</div>
                        <div className="text-muted small">WRID</div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-medium">$8.63</div>
                      <div className="text-danger small">−0.83 (−8.77%)</div>
                    </div>
                  </li>
                  {/* HIMS */}
                  <li className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://logo.clearbit.com/hims.com?size=80" width="32" height="32" alt="Hims & Hers Health logo" />
                      <div>
                        <div className="fw-medium">Hims & Hers Health INC</div>
                        <div className="text-muted small">HIMS</div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-medium">$26.95</div>
                      <div className="text-danger small">−2.51 (−8.52%)</div>
                    </div>
                  </li>
                </ul>
                <div className="card-body text-end">
                  <button className="btn btn-outline-danger btn-sm">View All Losers</button>
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
                    <h5 className="mb-0 text-success">Today's Biggest Winners</h5>
                  </div>
                  <small className="text-muted">Stocks with the largest percentage increase today.</small>
                </div>
                <ul className="list-group list-group-flush">
                  {/* NVDA */}
                  <li className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://logo.clearbit.com/nvidia.com?size=80" width="32" height="32" alt="NVIDIA logo" />
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
                  {/* TSLA */}
                  <li className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://logo.clearbit.com/tesla.com?size=80" width="32" height="32" alt="Tesla logo" />
                      <div>
                        <div className="fw-medium">Tesla, INC</div>
                        <div className="text-muted small">TSLA</div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-medium">$254.11</div>
                      <div className="text-success small">+1.06 (+0.40%)</div>
                    </div>
                  </li>
                  {/* F */}
                  <li className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://cdn.simpleicons.org/ford/003478?size=32" width="32" height="32" alt="Ford Motor Company logo" />
                      <div>
                        <div className="fw-medium">Ford Motor Company</div>
                        <div className="text-muted small">F</div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-medium">$9.45</div>
                      <div className="text-success small">+0.26 (+2.29%)</div>
                    </div>
                  </li>
                </ul>
                <div className="card-body text-end">
                  <button className="btn btn-outline-success btn-sm">View All Winners</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What is StockVision */}
      <div className="container mb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2>What is StockVision?</h2>
            <p>An AI-powered platform that analyzes real-time financial news, market sentiment, earnings reports and historical stock data to generate actionable insights and trend forecasts. It provides risk assessments, visualized reports and predictive analytics to help users make data-driven investment decisions.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="col-md-6">
            <canvas id="overviewChart" height="200"></canvas>
          </div>
        </div>
      </div>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
    </>
  )
}
