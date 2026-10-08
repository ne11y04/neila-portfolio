// Drawn thumbnails for the project cards. Each one is a small SVG scene on a 400x225 canvas.
const V = '#a78bfa'
const B = '#5b93ff'
const INK = '#ecebf7'
const MUTE = '#8f92b8'
const MONO = 'JetBrains Mono, ui-monospace, monospace'

function Frame({ id, from, to, glow = V, children }) {
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={glow} stopOpacity=".45" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#fff" strokeOpacity=".05" />
        </pattern>
      </defs>
      <rect width="400" height="225" fill={`url(#${id}-bg)`} />
      <rect width="400" height="225" fill={`url(#${id}-grid)`} />
      <circle cx="310" cy="40" r="170" fill={`url(#${id}-glow)`} />
      {children}
    </svg>
  )
}

function Network() {
  const layers = [[60, 112, 164], [40, 85, 130, 175], [55, 100, 145, 190].map((y) => y - 10), [85, 140]]
  const pts = layers.map((ys, i) => ys.map((y) => [70 + i * 85, y]))
  const lines = []
  for (let i = 0; i < pts.length - 1; i++)
    for (const [x1, y1] of pts[i]) for (const [x2, y2] of pts[i + 1]) lines.push(`M${x1} ${y1}L${x2} ${y2}`)
  return (
    <Frame id="net" from="#1d1450" to="#070a1e">
      <path d={lines.join('')} stroke={V} strokeOpacity=".28" strokeWidth="1" fill="none" />
      {pts.flat().map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r={x > 300 ? 9 : 6} fill={x > 300 ? B : '#0d0f26'} stroke={x > 300 ? B : V} strokeWidth="2" />
      ))}
      <text x="342" y="89" fill={INK} fontFamily={MONO} fontSize="11">0.82</text>
      <text x="342" y="144" fill={MUTE} fontFamily={MONO} fontSize="11">0.18</text>
      <text x="22" y="208" fill={MUTE} fontFamily={MONO} fontSize="10">p(churn) · recall 0.87</text>
    </Frame>
  )
}

function Dashboard() {
  const bars = [52, 70, 44, 88, 64, 96, 78]
  return (
    <Frame id="dash" from="#14193f" to="#080a1a" glow={B}>
      {[['Revenue', '€1.24M'], ['Growth', '+8.4%'], ['Orders', '3,912']].map(([k, v], i) => (
        <g key={k} transform={`translate(${24 + i * 122} 22)`}>
          <rect width="110" height="52" rx="8" fill="#fff" fillOpacity=".05" stroke="#fff" strokeOpacity=".12" />
          <text x="12" y="20" fill={MUTE} fontFamily={MONO} fontSize="9">{k}</text>
          <text x="12" y="40" fill={i === 1 ? '#7ee2a8' : INK} fontFamily={MONO} fontSize="15" fontWeight="600">{v}</text>
        </g>
      ))}
      <rect x="24" y="88" width="232" height="116" rx="8" fill="#fff" fillOpacity=".04" stroke="#fff" strokeOpacity=".1" />
      {bars.map((h, i) => (
        <rect key={i} x={44 + i * 30} y={190 - h} width="16" height={h} rx="3" fill={i === 5 ? V : B} fillOpacity={i === 5 ? 1 : 0.55} />
      ))}
      <rect x="268" y="88" width="110" height="116" rx="8" fill="#fff" fillOpacity=".04" stroke="#fff" strokeOpacity=".1" />
      <circle cx="323" cy="146" r="34" fill="none" stroke="#fff" strokeOpacity=".08" strokeWidth="12" />
      <circle cx="323" cy="146" r="34" fill="none" stroke={V} strokeWidth="12" strokeDasharray="128 214" transform="rotate(-90 323 146)" />
      <circle cx="323" cy="146" r="34" fill="none" stroke={B} strokeWidth="12" strokeDasharray="0 128 52 214" transform="rotate(-90 323 146)" />
    </Frame>
  )
}

function Pipeline() {
  const boxes = [['S3', 'raw/'], ['λ', 'clean'], ['Athena', 'query']]
  return (
    <Frame id="pipe" from="#0c2147" to="#090a1d" glow={B}>
      <g transform="translate(28 78)">
        <path d="M0 0h34l14 14v50H0Z" fill="#fff" fillOpacity=".06" stroke={MUTE} strokeWidth="1.5" />
        <path d="M34 0v14h14" fill="none" stroke={MUTE} strokeWidth="1.5" />
        <text x="6" y="44" fill={INK} fontFamily={MONO} fontSize="9">.csv</text>
      </g>
      {boxes.map(([t, s], i) => (
        <g key={t} transform={`translate(${104 + i * 96} 76)`}>
          <rect width="72" height="72" rx="14" fill="#0d1230" stroke={i === 1 ? V : B} strokeWidth="1.5" />
          <text x="36" y="38" textAnchor="middle" fill={INK} fontFamily={MONO} fontSize={t.length > 2 ? 12 : 22} fontWeight="600">{t}</text>
          <text x="36" y="58" textAnchor="middle" fill={MUTE} fontFamily={MONO} fontSize="9">{s}</text>
        </g>
      ))}
      <path d="M80 112h24M176 112h24M272 112h24" stroke={V} strokeWidth="1.5" strokeDasharray="3 4" className="flow" />
      <path d="M100 108l4 4-4 4M196 108l4 4-4 4M292 108l4 4-4 4" stroke={V} strokeWidth="1.5" fill="none" />
      <text x="24" y="206" fill={MUTE} fontFamily={MONO} fontSize="10">event: s3:ObjectCreated → ~1.2s to queryable</text>
    </Frame>
  )
}

function Stack() {
  const layers = [['React UI', B], ['REST API', V], ['Domain', V], ['PostgreSQL', B]]
  return (
    <Frame id="stack" from="#1a1648" to="#070918">
      {layers.map(([t, c], i) => (
        <g key={t} transform={`translate(${70 + i * 22} ${30 + i * 42})`}>
          <rect width="220" height="34" rx="9" fill={c} fillOpacity={0.1 + i * 0.03} stroke={c} strokeOpacity=".8" />
          <text x="16" y="22" fill={INK} fontFamily={MONO} fontSize="12">{t}</text>
          <circle cx="202" cy="17" r="3.5" fill={c} />
        </g>
      ))}
      <path d="M95 64v8M117 106v8M139 148v8" stroke={MUTE} strokeWidth="1.5" />
      <text x="342" y="210" textAnchor="end" fill={MUTE} fontFamily={MONO} fontSize="10">tests: 142 passing</text>
    </Frame>
  )
}

function Laps() {
  // Two stints of slowly rising lap times with a pit stop between them.
  const pts = []
  for (let lap = 1; lap <= 40; lap++) {
    const stint = lap <= 22 ? lap : lap - 22
    const t = 92.4 + stint * 0.06 + (lap <= 22 ? 0.3 : -0.2) + Math.sin(lap * 2.3) * 0.18
    pts.push([lap, lap === 22 ? 112 : t])
  }
  const x = (l) => 34 + (l - 1) * 8.6
  const y = (t) => 180 - (t - 92) * 52
  return (
    <Frame id="laps" from="#0d1c3f" to="#0a0a1c" glow={B}>
      <path d="M30 186H380M30 30V186" stroke="#fff" strokeOpacity=".15" />
      <path d={`M${x(1)} ${y(92.7)}L${x(21)} ${y(94.0)}`} stroke={V} strokeOpacity=".7" strokeWidth="2" strokeDasharray="4 4" />
      <path d={`M${x(23)} ${y(92.3)}L${x(40)} ${y(93.3)}`} stroke={B} strokeOpacity=".7" strokeWidth="2" strokeDasharray="4 4" />
      {pts.filter(([l]) => l !== 22).map(([l, t]) => (
        <circle key={l} cx={x(l)} cy={y(t)} r="3" fill={l < 22 ? V : B} />
      ))}
      <path d={`M${x(22)} 36V186`} stroke={INK} strokeOpacity=".35" strokeDasharray="2 4" />
      <text x={x(22) + 6} y="46" fill={INK} fontFamily={MONO} fontSize="10">PIT · L22</text>
      <text x="40" y="208" fill={MUTE} fontFamily={MONO} fontSize="10">deg +0.06 s/lap</text>
      <text x="380" y="208" textAnchor="end" fill={MUTE} fontFamily={MONO} fontSize="10">lap time (s)</text>
    </Frame>
  )
}

function Phone() {
  return (
    <Frame id="phone" from="#1f1450" to="#0a1230">
      <g transform="rotate(-10 150 120)" opacity=".45">
        <rect x="104" y="24" width="96" height="180" rx="18" fill="#0d1030" stroke={B} strokeWidth="1.5" />
      </g>
      <rect x="170" y="18" width="104" height="194" rx="20" fill="#0c0f2b" stroke={V} strokeWidth="1.8" />
      <rect x="204" y="26" width="36" height="6" rx="3" fill="#fff" fillOpacity=".15" />
      <text x="184" y="54" fill={INK} fontFamily={MONO} fontSize="10" fontWeight="600">This week</text>
      <circle cx="222" cy="92" r="24" fill="none" stroke="#fff" strokeOpacity=".1" strokeWidth="6" />
      <circle cx="222" cy="92" r="24" fill="none" stroke={V} strokeWidth="6" strokeLinecap="round" strokeDasharray="110 151" transform="rotate(-90 222 92)" />
      <text x="222" y="96" textAnchor="middle" fill={INK} fontFamily={MONO} fontSize="11">73%</text>
      {['Algorithms', 'Statistics', 'Databases'].map((t, i) => (
        <g key={t} transform={`translate(182 ${130 + i * 24})`}>
          <rect width="80" height="18" rx="5" fill="#fff" fillOpacity=".06" />
          <circle cx="9" cy="9" r="3" fill={i === 0 ? B : V} />
          <text x="18" y="12.5" fill={INK} fontFamily={MONO} fontSize="8">{t}</text>
        </g>
      ))}
    </Frame>
  )
}

function Game() {
  return (
    <Frame id="game" from="#2a0f3a" to="#0a0c22">
      <rect x="40" y="30" width="320" height="165" rx="10" fill="#fff" fillOpacity=".03" stroke="#fff" strokeOpacity=".12" />
      <path d="M200 30v165" stroke="#fff" strokeOpacity=".18" strokeDasharray="6 6" />
      {/* Car seen from above */}
      <g transform="translate(200 112)">
        <rect x="-22" y="-62" width="44" height="124" rx="20" fill="#13163a" stroke={V} strokeWidth="2" />
        <rect x="-36" y="-56" width="72" height="10" rx="3" fill={V} fillOpacity=".7" />
        <rect x="-30" y="52" width="60" height="8" rx="3" fill={V} fillOpacity=".7" />
        {[[-40, -38], [28, -38], [-40, 22], [28, 22]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="12" height="24" rx="3" fill={i === 1 ? B : '#2a2f5c'} stroke={i === 1 ? B : MUTE} />
        ))}
        <circle cx="0" cy="-8" r="8" fill={B} fillOpacity=".8" />
      </g>
      <circle cx="268" cy="62" r="16" fill="none" stroke={B} strokeWidth="2" className="pulse" />
      <text x="56" y="56" fill={INK} fontFamily={MONO} fontSize="20" fontWeight="600">2.31s</text>
      <text x="56" y="74" fill={MUTE} fontFamily={MONO} fontSize="10">best 2.08s</text>
      <text x="344" y="182" textAnchor="end" fill={MUTE} fontFamily={MONO} fontSize="10">TAP: FRONT-R</text>
    </Frame>
  )
}

function Art() {
  const swatches = ['#f2c6a8', '#c08bff', '#5b93ff', '#2a2350', '#ffd27a']
  return (
    <Frame id="art" from="#25124a" to="#0b0d26">
      <path d="M40 190C90 120 130 210 180 150S270 70 360 120" stroke={V} strokeOpacity=".22" strokeWidth="16" fill="none" strokeLinecap="round" />
      <g transform="translate(170 50)">
        <path d="M-58 150c6-40 30-58 58-58s52 18 58 58Z" fill="#3a2a7a" />
        <circle cx="0" cy="40" r="40" fill="#f2c6a8" />
        <path d="M-44 36c0-34 22-48 46-48 30 0 46 22 44 52-10-14-30-22-48-24 0 10-14 22-42 20Z" fill="#2a2350" />
        <path d="M-6 0c10-18 34-26 50-12" stroke={V} strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="-13" cy="46" r="3.5" fill="#1a1530" />
        <circle cx="15" cy="46" r="3.5" fill="#1a1530" />
        <path d="M-6 62q6 5 12 0" stroke="#1a1530" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {swatches.map((c, i) => (
        <circle key={c} cx="330" cy={48 + i * 32} r="11" fill={c} stroke="#fff" strokeOpacity=".2" />
      ))}
      <text x="26" y="40" fill={MUTE} fontFamily={MONO} fontSize="10">turnaround · front</text>
      <path d="M30 196h70" stroke={MUTE} strokeOpacity=".5" />
    </Frame>
  )
}

function Teams() {
  // Two linked tables: one team has many drivers (team_id -> teams.id).
  const drivers = [['01', 'Driver A', 1], ['02', 'Driver B', 1], ['03', 'Driver C', 2], ['04', 'Driver D', 2]]
  return (
    <Frame id="teams" from="#1d1243" to="#08091c">
      <g transform="translate(24 30)">
        <rect width="140" height="128" rx="10" fill="#0d1030" stroke={V} strokeWidth="1.5" />
        <text x="14" y="22" fill={V} fontFamily={MONO} fontSize="10" fontWeight="600">teams</text>
        <path d="M0 32h140" stroke="#fff" strokeOpacity=".12" />
        {[['1', 'Team Violet'], ['2', 'Team Azure']].map(([id, n], i) => (
          <g key={id} transform={`translate(14 ${54 + i * 26})`}>
            <text fill={MUTE} fontFamily={MONO} fontSize="9">{id}</text>
            <text x="18" fill={INK} fontFamily={MONO} fontSize="10">{n}</text>
          </g>
        ))}
        <rect x="14" y="104" width="52" height="14" rx="4" fill={V} fillOpacity=".2" />
        <text x="21" y="114" fill={INK} fontFamily={MONO} fontSize="8">+ team</text>
      </g>
      <g transform="translate(222 22)">
        <rect width="156" height="160" rx="10" fill="#0d1030" stroke={B} strokeWidth="1.5" />
        <text x="14" y="22" fill={B} fontFamily={MONO} fontSize="10" fontWeight="600">drivers</text>
        <path d="M0 32h156" stroke="#fff" strokeOpacity=".12" />
        {drivers.map(([no, n, t], i) => (
          <g key={no} transform={`translate(14 ${54 + i * 26})`}>
            <text fill={MUTE} fontFamily={MONO} fontSize="9">#{no}</text>
            <text x="30" fill={INK} fontFamily={MONO} fontSize="10">{n}</text>
            <circle cx="122" cy="-3.5" r="4" fill={t === 1 ? V : B} />
          </g>
        ))}
      </g>
      <path d="M164 80C192 80 194 76 222 76M164 106C196 106 192 128 222 128" stroke={MUTE} strokeWidth="1.3" fill="none" strokeDasharray="3 3" className="flow" />
      <text x="24" y="190" fill={MUTE} fontFamily={MONO} fontSize="9">team_id → teams.id · 1 : n</text>
      <text x="24" y="206" fill={MUTE} fontFamily={MONO} fontSize="9">GET POST PUT DELETE /api/drivers</text>
    </Frame>
  )
}

const thumbs = { teams: Teams, network: Network, dashboard: Dashboard, pipeline: Pipeline, stack: Stack, laps: Laps, phone: Phone, game: Game, art: Art }

export default function Thumb({ name }) {
  const Drawing = thumbs[name]
  return Drawing ? <Drawing /> : null
}
