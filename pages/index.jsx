// pages/index.js
import React from 'react'
import { Headset, User, LogOut } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// Dummy market data
const marketData = [
  { label: 'DJIA',             value: '42,149.18', change: '+159.22 (+0.38%)' },
  { label: 'NASDAQ Composite', value: '17,533.90', change: '+84.01 (+0.48%)' },
  { label: 'S&P 500 INDEX',    value: '5,655.07',  change: '+22.00 (+0.39%)' },
  { label: 'Russell 2000',     value: '2,028.80',  change: '+16.56 (+0.84%)' },
]

// Dummy portfolio performance over time
const portfolioData = [
  { date: 'Jan', value: 4000 },
  { date: 'Feb', value: 4500 },
  { date: 'Mar', value: 5000 },
  { date: 'Apr', value: 4800 },
  { date: 'May', value: 5200 },
  { date: 'Jun', value: 6000 },
  { date: 'Jul', value: 5800 },
  { date: 'Aug', value: 6500 },
]

// Dummy positions data
const positions = [
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc Class A',
    qty: '1.0046',
    price: '$144.70',
    priceChange: '-$2.05',
    marketValue: '$145.37',
    dayChange: '-$2.06',
    costBasis: '$159.57',
    gainLoss: '-$13.90',
    pct: '2.73%',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    qty: '1.0075',
    price: '$335.44',
    priceChange: '-$2.42',
    marketValue: '$358.11',
    dayChange: '-$2.44',
    costBasis: '$427.44',
    gainLoss: '-$69.33',
    pct: '6.73%',
  },
  {
    symbol: 'NVDA',
    name: 'Nvidia Corp',
    qty: '50.0083',
    price: '$96.30',
    priceChange: '-$1.34',
    marketValue: '$4,815.80',
    dayChange: '-$67.01',
    costBasis: '$7,031.00',
    gainLoss: '-$2,215.20',
    pct: '90.53%',
  },
]

export default function Home() {
  const btnStyle = {
    padding: '4px 8px',
    borderRadius: '999px',
    border: '1px solid #ccc',
    background: '#f5f5f5',
    fontSize: '0.75rem',
    cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav
        style={{
          background: '#007AFF',
          display: 'flex',
          alignItems: 'center',
          padding: '1rem 1.5rem',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            marginRight: '2rem',
          }}
        >
          STOCKVISION
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            marginRight: 'auto',
            color: '#fff',
            fontSize: '1.1rem',
          }}
        >
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
            Account
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
            Trade
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
            Research
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            color: '#fff',
            fontSize: '1.1rem',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Headset size={20} /> <span>Support</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <User size={20} /> <span>Profile</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <LogOut size={20} /> <span>Log Out</span>
          </div>
        </div>
      </nav>

      {/* Content + Sidebar */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start' }}>
        {/* Main area */}
        <main style={{ flex: 1, padding: '16px' }}>
          {/* Total Portfolio */}
          <section>
            <h2 style={{ color: '#007AFF', fontSize: '1.25rem', margin: '0 0 8px' }}>
              Total Portfolio
            </h2>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#444' }}>Total Value</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$6,054.82</div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#444' }}>Day Change</div>
                <div style={{ color: 'green', fontWeight: 'bold' }}>+$4.06 (+0.07%)</div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#444' }}>6-Month Change</div>
                <div style={{ color: 'green', fontWeight: 'bold' }}>
                  +$5,452.71 (+905.60%)
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                {['1 Mo', '3 Mo', '6 Mo', 'YTD', '1 Yr'].map((label) => (
                  <button key={label} style={btnStyle}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* Chart */}
            <div style={{ width: '100%', height: 250, marginTop: 16 }}>
              <ResponsiveContainer>
                <LineChart
                  data={portfolioData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#007AFF"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Positions */}
          <section style={{ marginTop: '32px' }}>
            <h2 style={{ color: '#007AFF', fontSize: '1.25rem', margin: '0 0 8px' }}>
              Positions
            </h2>
            <div style={{ fontSize: '1rem', color: '#666', margin: '0 0 8px' }}>
              Equities
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #444' }}>
                  {[
                    'Symbol / Name',
                    'Quantity',
                    'Price',
                    'Price / Change',
                    'Market Value',
                    'Day Change',
                    'Cost Basis',
                    'Gain / Loss',
                    '% of Holding',
                  ].map((hdr) => (
                    <th
                      key={hdr}
                      style={{
                        textAlign: 'left',
                        padding: '8px 4px',
                        color: '#007AFF',
                        fontSize: '0.9rem',
                        fontWeight: 'normal',
                      }}
                    >
                      {hdr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {positions.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '8px 4px' }}>
                      <div>{p.symbol}</div>
                      <small style={{ color: '#666' }}>{p.name.toUpperCase()}</small>
                    </td>
                    <td style={{ padding: '8px 4px' }}>{p.qty}</td>
                    <td style={{ padding: '8px 4px' }}>{p.price}</td>
                    <td style={{ padding: '8px 4px', color: p.priceChange.startsWith('-') ? 'red' : 'green' }}>
                      {p.priceChange}
                    </td>
                    <td style={{ padding: '8px 4px' }}>{p.marketValue}</td>
                    <td style={{ padding: '8px 4px', color: p.dayChange.startsWith('-') ? 'red' : 'green' }}>
                      {p.dayChange}
                    </td>
                    <td style={{ padding: '8px 4px' }}>{p.costBasis}</td>
                    <td style={{ padding: '8px 4px', color: p.gainLoss.startsWith('-') ? 'red' : 'green' }}>
                      {p.gainLoss}
                    </td>
                    <td style={{ padding: '8px 4px' }}>{p.pct}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #444', fontWeight: 'bold' }}>
                  <td style={{ padding: '8px 4px' }}>Equities Total</td>
                  <td />
                  <td />
                  <td />
                  <td style={{ padding: '8px 4px' }}>$5,319.28</td>
                  <td style={{ padding: '8px 4px', color: 'red' }}>-$71.51</td>
                  <td style={{ padding: '8px 4px' }}>$7,617.71</td>
                  <td style={{ padding: '8px 4px', color: 'red' }}>-$2,298.43</td>
                  <td style={{ padding: '8px 4px' }}>100.00%</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>

        {/* Sidebar */}
        <aside
          style={{
            width: 280,
            padding: '16px',
            borderLeft: '1px solid #ddd',
            boxSizing: 'border-box',
          }}
        >
          <h2 style={{ color: '#007AFF', fontSize: '1.25rem', margin: '0 0 8px 0' }}>
            Market
          </h2>
          
          <hr style={{ border: 0, borderTop: '1px solid #ddd', margin: '0 0 8px 0' }} />

          {marketData.map((m, index) => (
            <React.Fragment key={m.label}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                }}
              >
                <div>
                  <a
                    href="#"
                    style={{ color: '#007AFF', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'normal' }}
                  >
                    {m.label}
                  </a>
                  <div style={{ fontSize: '0.7rem', color: '#555', marginTop: '2px' }}>Today</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{m.value}</div>
                  <div style={{ color: 'green', fontSize: '0.8rem' }}>{m.change}</div>
                </div>
              </div>
              <hr style={{ 
                border: 0, 
                borderTop: '1px solid #eee', 
                margin: '6px 0', 
              }} />
            </React.Fragment>
          ))}

          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <a
              href="#"
              style={{ color: '#007AFF', textDecoration: 'none', fontSize: '0.85rem' }}
            >
              Go to Market
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}