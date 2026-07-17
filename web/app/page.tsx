import Image from "next/image";
import { BASE_PATH } from "../base-path";
import { Clock, Reveal, SplitFlap } from "./components";
import { builds, education, ledger, roles, stack, type Build } from "./data";

/* Plain <a href> is not rewritten by basePath the way next/link is, so the
   prefix has to be written in. */
const RESUME = `${BASE_PATH}/Donald_Chung_Resume_v5.pdf`;

/* The tally is derived, not typed. Hand-written counts go stale the moment
   a build is added to data.ts. This one cannot. */
const WORDS = [
  "No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve",
];

function tally() {
  const total = builds.length;
  const lab = builds.filter((b) => !b.shipped).length;
  const running = total - lab;
  const word = (n: number) => WORDS[n] ?? String(n);

  return {
    total: `${word(total)} build${total === 1 ? "" : "s"}.`,
    running: `${word(running)} deployed and running.`,
    lab: lab
      ? `${word(lab)} still in the lab.`
      : null,
  };
}

/* In-house builds have nothing public to open, so they render as a plain
   row: no anchor, no ↗, no hover affordance promising a link that isn't
   there. The status column still carries their state. */
function BoardRow({ build: b, index }: { build: Build; index: number }) {
  const inner = (
    <>
      <div className="r-head">
        <div className="r-name">{b.name}</div>
        <div className="r-year">{b.year}</div>
      </div>
      <p className="r-what">{b.what}</p>
      <p className="r-stack">
        {b.stack.map((s, j) => (
          <span key={s}>
            {s}
            {j < b.stack.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div className="r-end">
        <SplitFlap
          text={b.status}
          delay={260 + index * 110}
          className={`r-status ${b.shipped ? "live" : "dim"}`}
        />
        {/* Kept in the layout even when there's nothing to open, so every
            status in the column shares one right edge. */}
        <span className={`r-go${b.href ? "" : " is-blank"}`} aria-hidden="true">
          ↗
        </span>
      </div>
    </>
  );

  if (!b.href) {
    return <div className="board-row is-static">{inner}</div>;
  }

  return (
    <a className="board-row" href={b.href} target="_blank" rel="noopener">
      {inner}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#top">
        Skip to content
      </a>

      <header className="bar">
        <div className="bar-in">
          <a href="#top" className="bar-name">
            Donald Chung
          </a>
          <div className="bar-right">
            <Clock />
            <a className="bar-cv" href={RESUME} download="Donald-Chung-Resume.pdf">
              Résumé
            </a>
            <a href="#hire" className="bar-status">
              <span className="lamp" aria-hidden="true" />
              Open to work
            </a>
          </div>
        </div>
      </header>

      <main id="top" tabIndex={-1}>
        {/* ── Hero: the introduction comes before anything else ─ */}
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Computer engineering, UNSW · Sydney</p>
            <h1>Donald Chung</h1>
            <p className="hero-lede">
              I&apos;m a computer engineering student at UNSW and the lead growth
              engineer at Habeas. I build products end to end, then{" "}
              <em>sell them, staff them, and keep them alive</em>. Open to full-stack
              and product engineering roles in Sydney.
            </p>
          </div>
        </section>

        {/* ── The board ────────────────────────────────────── */}
        <section className="band-board">
          <div className="shell">
            <h2 className="board-title">
              What&apos;s still <span className="open">open</span>
            </h2>
            <p className="board-lede">
              My first real product answers one question about Sydney at 1am:{" "}
              <em>what&apos;s still open?</em> This is the same board, pointed at my
              own work.
            </p>

            <div className="board">
              <div className="board-head" aria-hidden="true">
                <span>Build</span>
                <span>What it does</span>
                <span>Stack</span>
                <span style={{ textAlign: "right" }}>Status</span>
              </div>

              {builds.map((b, i) => (
                <BoardRow key={b.name} build={b} index={i} />
              ))}
            </div>

            <p className="board-foot">
              {tally().total} <b>{tally().running}</b> {tally().lab}
            </p>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────── */}
        <section className="band" id="about">
          <div className="shell">
            <p className="kicker">Who&apos;s behind the counter</p>
            <div className="about">
              <Reveal>
                <Image
                  src={`${BASE_PATH}/photos/headshot.webp`}
                  alt="Donald Chung"
                  className="about-shot"
                  width={800}
                  height={800}
                />
                <p className="about-cap">Sydney, Australia</p>
              </Reveal>

              <Reveal>
                <h2>
                  The rare part
                  <br />
                  isn&apos;t the <span>code</span>
                </h2>
                <p>
                  I&apos;m a computer engineering student at UNSW, and I can build the
                  thing end to end. So can a lot of people. What&apos;s less common is
                  that I&apos;ve also had to{" "}
                  <strong>sell it, staff it, and keep it alive</strong> once it was
                  out.
                </p>
                <p>
                  I founded a studio and grew it to 110k monthly viewers while
                  managing a team of artists. I led $100k of revenue in my first two
                  months at Snap Wireless, then built the dashboard that team now runs
                  on. That&apos;s why <strong>Snap Ops exists</strong>. I was the user
                  before I was the engineer.
                </p>
                <p>
                  Right now I lead growth at <strong>Habeas</strong>, where I own the
                  growth cycles end to end and the SEO and GEO content that feeds
                  them. It&apos;s the same loop as the engineering, just measured in
                  traffic instead of tests.
                </p>
                <p>
                  Outside that: Events Director at UNSW Golf Society, ex state rower,
                  and a violinist for longer than I&apos;ve been a programmer.
                </p>

                <div className="ledger">
                  {ledger.map((row) => (
                    <div className="led-row" key={row.n}>
                      <div className="led-n">{row.n}</div>
                      <p className="led-l">{row.l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────── */}
        <section className="band-tight" id="work">
          <div className="shell">
            <h2 className="kicker">Where I&apos;ve worked</h2>
            <Reveal>
              <div className="tbl">
                {roles.map((r) => (
                  <div className="tbl-row" key={r.role + r.org}>
                    <div>
                      <div className="t-role">{r.role}</div>
                      <div className="t-org">{r.org}</div>
                    </div>
                    <span className="t-when">{r.when}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <h2 className="kicker" style={{ marginTop: 72 }}>
              What I studied
            </h2>
            <Reveal>
              <div className="tbl">
                {education.map((e) => (
                  <div className="tbl-row" key={e.role}>
                    <div>
                      <div className="t-role">{e.role}</div>
                      <div className="t-org">{e.org}</div>
                    </div>
                    <span className="t-when">{e.when}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <h2 className="kicker" style={{ marginTop: 72 }}>
              What I build with
            </h2>
            <Reveal>
              <div className="stack">
                {stack.map((s) => (
                  <div className="st-row" key={s.k}>
                    <div className="st-k">{s.k}</div>
                    <div className="st-v">{s.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────── */}
        <section className="close" id="hire">
          <div className="shell">
            <h2>
              Still <span>open</span>
            </h2>
            <p className="close-lede">
              Looking for a full-stack or product engineering role at an early-stage
              team, somewhere small enough that shipping it and selling it are the
              same job. Sydney-based, available now.
            </p>
            <div className="close-links">
              <a className="lnk fill" href="mailto:donaldchung.work@gmail.com">
                Email me
              </a>
              <a className="lnk" href={RESUME} download="Donald-Chung-Resume.pdf">
                Résumé (PDF)
              </a>
              <a
                className="lnk"
                href="https://github.com/donaldchunggit"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
              <a
                className="lnk"
                href="https://linkedin.com/in/donald-chung-45229b350"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="foot-in">
          <span>Built and designed by Donald Chung</span>
          <span>Sydney · 2026</span>
        </div>
      </footer>
    </>
  );
}
