import { useEffect, useRef, useState } from "react";
import { links, icons, fields, facts, skillGroups, filters, projects, certs } from "./data";
import Thumb from "./Thumbs";

const YEAR = new Date().getFullYear();

const SECTIONS = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
];

// The circuit drawn around the N (an invented layout).
const LAP =
  "M50 10C64 9 78 15 84 27C89 37 81 44 86 54C92 66 84 82 70 88C60 92 54 85 44 89C30 94 16 84 13 70C10 58 19 52 15 42C11 30 20 16 34 12C40 10 45 10 50 10Z";

// Where each hero card sits around the N, in percent of the orbit box.
const ORBIT = fields.map((_, k) => {
  const a = ((-90 + k * 45) * Math.PI) / 180;
  return { x: 50 + 37 * Math.cos(a), y: 50 + 40 * Math.sin(a) };
});

function Icon({ name, className = "ico" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name].map((p, k) =>
        typeof p === "string" ? <path key={k} d={p} /> : <path key={k} d={p.d} transform={p.t} />
      )}
    </svg>
  );
}

function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--lap", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="wrap bar">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          NEILA<i>.</i>
        </a>
        <ul id="nav-links">
          {SECTIONS.slice(0, 4).map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? "on" : ""} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn sm ghost nav-cta" href="#contact">Let's talk</a>
        <button
          className="menu"
          type="button"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <span className="lap" ref={bar} aria-hidden="true" />
      </div>
    </nav>
  );
}

function Orbit({ onPick }) {
  const box = useRef(null);
  const [hot, setHot] = useState(-1);

  // The cards drift a little towards the pointer, nearer cards more than farther ones.
  const tilt = (px, py) => {
    box.current.style.setProperty("--px", px.toFixed(3));
    box.current.style.setProperty("--py", py.toFixed(3));
  };
  const onMove = (e) => {
    const r = box.current.getBoundingClientRect();
    tilt((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className="orbit" ref={box} onPointerMove={onMove} onPointerLeave={() => tilt(0, 0)}>
      <svg className="lines" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="beam" cx="50" cy="50" r="45" gradientUnits="userSpaceOnUse">
            <stop offset=".3" stopColor="#a78bfa" stopOpacity=".9" />
            <stop offset="1" stopColor="#5b93ff" stopOpacity=".15" />
          </radialGradient>
        </defs>
        <path className="track" id="lap" d={LAP} />
        <path className="racing" d={LAP} />
        <path className="sf" d="M50 8.2v3.6" />
        <circle className="ring dash" cx="50" cy="50" r="25" />
        <circle className="ring" cx="50" cy="50" r="29.5" />
        {ORBIT.map(({ x, y }, k) => (
          <g key={k} className={hot === k ? "on" : ""}>
            <line className="beam" x1="50" y1="50" x2={x} y2={y} />
            <line className="packet" x1="50" y1="50" x2={x} y2={y} style={{ animationDelay: `${-k * 0.45}s` }} />
          </g>
        ))}
        <circle className="car" r="1.1">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
            <mpath href="#lap" />
          </animateMotion>
        </circle>
      </svg>

      <div className="core">
        <span>N</span>
      </div>

      {fields.map((f, k) => (
        <div
          className="node"
          key={f.label}
          style={{ "--x": `${ORBIT[k].x}%`, "--y": `${ORBIT[k].y}%`, "--depth": 14 + ((k * 7) % 4) * 6 }}
        >
          <button
            type="button"
            className="glass field"
            style={{ "--t": `${4.5 + (k % 3) * 0.8}s`, "--dl": `${-k * 0.7}s` }}
            onPointerEnter={() => setHot(k)}
            onPointerLeave={() => setHot(-1)}
            onFocus={() => setHot(k)}
            onBlur={() => setHot(-1)}
            onClick={() => onPick(f.area)}
            title={`See ${f.label} projects`}
          >
            <span className="chip"><Icon name={f.icon} /></span>
            <span>{f.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

// Five red lights come on one by one, then all go out.
function StartLights() {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = [700, 700, 700, 700, 700, 1300, 3800];
    let k = 0;
    let id;
    const tick = () => {
      k = (k + 1) % steps.length;
      setLit(k <= 5 ? k : 0);
      id = setTimeout(tick, steps[k]);
    };
    id = setTimeout(tick, steps[0]);
    return () => clearTimeout(id);
  }, []);
  return (
    <span className="lights" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => <b key={n} className={lit >= n && lit < 6 ? "on" : ""} />)}
    </span>
  );
}

function Hero({ onPick }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="status"><StartLights />Lights out · Open to internships</span>
          <h1>neila<span className="dot">.</span></h1>
          <p className="role">Software &amp; Data Engineering Student</p>
          <p className="lede">
            I work like a race engineer: read the telemetry, model the strategy, ship the upgrade. Data pipelines,
            machine learning and cloud services on one side of the garage. Apps, games and character art on the other.
          </p>
          <div className="cta">
            <a className="btn primary" href="#projects">
              View My Work <Icon name="arrow" className="ico arrow" />
            </a>
            <a className="btn ghost" href="#contact">Contact Me</a>
          </div>
          <ul className="socials">
            <li><a href={links.github} target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub</a></li>
            <li><a href={`mailto:${links.email}`}><Icon name="mail" />{links.email}</a></li>
          </ul>
        </div>
        <Orbit onPick={onPick} />
      </div>
    </header>
  );
}

// Portfolio at a glance, styled like a timing tower. Colours follow F1 timing: purple = fastest, green = personal best.
function Timing() {
  const cells = [
    ["S1", "Fields", fields.length, "purple"],
    ["S2", "Tools", skillGroups.reduce((n, g) => n + g.skills.length, 0), "green"],
    ["S3", "Projects", projects.length, "purple"],
    ["FL", "Certs", certs.length, "yellow"],
  ];
  return (
    <div className="wrap">
      <div className="glass timing reveal" aria-label="Portfolio at a glance">
        {cells.map(([sector, label, count, tone]) => (
          <div key={label} className={`sector ${tone}`}>
            <span className="label">{sector} · {label}</span>
            <strong>{String(count).padStart(2, "0")}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kerb() {
  return <div className="wrap"><div className="kerb" aria-hidden="true" /></div>;
}

function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionHead eyebrow="Driver profile · About me" title="Engineering with a creative streak." />
        <div className="about">
          <div className="copy reveal">
            <p className="big">
              I study how software is built and how data turns into decisions. Outside class I make <em>games</em>,{" "}
              <em>interfaces</em> and <em>character art</em>.
            </p>
            <p>
              The engineering side gives me structure: clean architecture, reproducible pipelines and models I can
              measure. The creative side gives me taste. I care how a dashboard reads at a glance, how an app feels in
              the hand, and whether a system makes sense to the person using it.
            </p>
            <p>
              I can train the model, deploy the service that runs it, and design the screen that explains it.
            </p>
          </div>
          <div className="glass code reveal" aria-label="Profile summary as JSON">
            <div className="code-top">
              <span className="dots"><i /><i /><i /></span>
              <span>neila.json</span>
            </div>
            <pre>
{`{
  `}<b>"studying"</b>: <s>"Software & Data Engineering"</s>{`,
  `}<b>"builds"</b>: [<s>"models"</s>, <s>"pipelines"</s>, <s>"apps"</s>, <s>"games"</s>]{`,
  `}<b>"draws"</b>: <s>"original characters"</s>{`,
  `}<b>"stack"</b>: [<s>"Python"</s>, <s>"SQL"</s>, <s>"React"</s>, <s>"AWS"</s>]{`,
  `}<b>"currently"</b>: <s>"AWS data services"</s>{`,
  `}<b>"paddock"</b>: <s>"Formula 1"</s>{`,
  `}<b>"open_to"</b>: <u>true</u>{`
}`}
            </pre>
          </div>
        </div>
        <div className="facts">
          {facts.map((f) => (
            <div className="glass lift fact reveal" key={f.title}>
              <span className="chip"><Icon name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              {[].concat(f.meta).map((m) => <span className="meta" key={m}>{m}</span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <SectionHead eyebrow="The garage · Skills & technologies" title="The full setup, from query to canvas.">
          The languages, platforms and creative tools I use across data, software and design.
        </SectionHead>
        <div className="skill-groups">
          {skillGroups.map((g) => (
            <div className="glass group reveal" key={g.title}>
              <h3 className="label">{g.title}</h3>
              <ul>
                {g.skills.map((s) => (
                  <li className="skill" key={s.name}>
                    <span className="chip"><Icon name={s.icon} /></span>
                    <span>
                      <b>{s.name}</b>
                      <small>{s.detail}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, round }) {
  return (
    <article className="glass lift proj">
      <div className="thumb"><Thumb name={p.thumb} /></div>
      <div className="proj-body">
        <span className="label"><em>R{String(round).padStart(2, "0")}</em> · {p.category}</span>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <ul className="tags">
          {p.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="actions">
          <a className="btn primary sm" href={p.link}>View Project <Icon name="arrow" className="ico arrow" /></a>
          <a className="btn ghost sm" href={p.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" /> GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects({ filter, setFilter }) {
  const shown = projects.filter((p) => filter === "all" || p.area === filter);
  return (
    <section id="projects">
      <div className="wrap">
        <SectionHead eyebrow="Race calendar · Featured projects" title="Three rounds across data and software.">
          Each round is a different circuit: a different question, and a different part of the toolkit to answer it.
        </SectionHead>
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const count = f.id === "all" ? projects.length : projects.filter((p) => p.area === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label} <span>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="projects" key={filter}>
          {shown.map((p) => <ProjectCard key={p.title} p={p} round={projects.indexOf(p) + 1} />)}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications">
      <div className="wrap">
        <SectionHead eyebrow="Super licence · Certifications" title="Points on the licence.">
          Cloud, data and creative-technology certifications.
        </SectionHead>
        <div className="certs">
          {certs.map((c) => (
            <a className="glass lift cert reveal" key={c.name} href={c.link} style={{ "--tone": c.tone }}>
              <div className="cert-top">
                <span className={`mark mark-${c.mark.toLowerCase()}`}>{c.mark}</span>
                <span className="year">{c.year}</span>
              </div>
              <h3>{c.name}</h3>
              <div className="cert-foot">
                <span>{c.issuer}</span>
                <span className="verify">Verify <Icon name="external" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const field = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: select the address so it can be copied by hand.
      const range = document.createRange();
      range.selectNodeContents(field.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="glass contact reveal">
          <div>
            <span className="eyebrow">Team radio · Contact</span>
            <h2>Box, box. Let's talk<span className="dot">.</span></h2>
            <p>
              I'm looking for internships and projects in data, ML, cloud or creative technology. If you have a role,
              an idea or a question, write to me.
            </p>
          </div>
          <div className="reach">
            <div className="mail">
              <code ref={field}>{links.email}</code>
              <button className="btn primary sm" type="button" onClick={copy}>
                <Icon name={copied ? "check" : "copy"} /> {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <ul className="reach-links">
              <li><a href={links.github} target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub<Icon name="arrow" className="ico arrow" /></a></li>
        
              <li><a href={`mailto:${links.email}`}><Icon name="mail" />Send an email<Icon name="arrow" className="ico arrow" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="chequer" aria-hidden="true" />
      <div className="wrap foot">
        <span className="brand">neila<i>.</i></span>
        <span>© {YEAR} Neila · Designed and built with React</span>
        <a href="#top">Back to the grid ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");

  // Soft highlight that follows the pointer across any glass card.
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest?.(".glass");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // A hero card opens the matching project filter.
  const pick = (area) => {
    setFilter(area);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="ambient" aria-hidden="true"><i /><i /><i /></div>
      <Nav />
      <Hero onPick={pick} />
      <main>
        <Timing />
        <Kerb />
        <About />
        <Skills />
        <Projects filter={filter} setFilter={setFilter} />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
