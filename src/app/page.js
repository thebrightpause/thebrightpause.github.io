"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const styles = `
  :root {
    --ink:         oklch(0.96 0.010 85);
    --ink-soft:    oklch(0.88 0.015 85 / 0.82);
    --ink-quiet:   oklch(0.82 0.015 85 / 0.55);
    --gold:        oklch(0.83 0.14 85);
    --gold-soft:   oklch(0.83 0.14 85 / 0.55);
    --dusk-1:      oklch(0.46 0.055 255);
    --dusk-2:      oklch(0.38 0.065 258);
    --dusk-3:      oklch(0.28 0.060 262);
    --dusk-4:      oklch(0.20 0.055 265);
    --hair:        oklch(1 0 0 / 0.12);
    --hair-strong: oklch(1 0 0 / 0.22);
  }

  html, body {
    background-color: var(--dusk-4);
  }

  .tbp-body {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color: var(--ink);
    background:
      radial-gradient(1200px 900px at 20% 10%, oklch(0.55 0.07 250 / 0.55), transparent 60%),
      radial-gradient(900px 700px at 85% 90%, oklch(0.30 0.05 265 / 0.7), transparent 55%),
      linear-gradient(180deg, var(--dusk-1), var(--dusk-3) 60%, var(--dusk-4));
    background-attachment: fixed;
    min-height: 100dvh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    font-feature-settings: "ss01", "ss02";
  }

  .tbp-sky { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .tbp-sky .dot {
    position: absolute; width: 2px; height: 2px; border-radius: 50%;
    background: var(--ink); opacity: .35;
    animation: tbp-drift linear infinite, tbp-twinkle ease-in-out infinite;
  }
  @keyframes tbp-twinkle { 0%,100%{opacity:.15} 50%{opacity:.55} }
  @keyframes tbp-drift { from{transform:translateY(0)} to{transform:translateY(-100dvh)} }

  .tbp-grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 1;
    background: radial-gradient(ellipse at center, transparent 40%, oklch(0.15 0.04 265 / 0.35) 100%);
    mix-blend-mode: multiply;
  }

  .tbp-chrome { position: relative; z-index: 3; }

  /* nav */
  nav.tbp-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 48px;
    padding-top: calc(28px + env(safe-area-inset-top));
    letter-spacing: .02em; gap: 16px;
  }
  .tbp-wordmark {
    display: inline-flex; align-items: center;
    text-decoration: none; color: inherit;
  }
  .tbp-mark {
    height: 44px; width: auto;
  }
  .tbp-nav .links {
    display: flex; gap: 28px; font-size: 13px; color: var(--ink-soft);
    text-transform: uppercase; letter-spacing: .14em;
  }
  .tbp-nav .links a { color: inherit; text-decoration: none; transition: color .3s; cursor: pointer; }
  .tbp-nav .links a:hover { color: var(--gold); }

  /* layout */
  #tbp-app { min-height: 100dvh; display: flex; flex-direction: column; padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right); }
  #tbp-app main { flex: 1; display: flex; position: relative; }

  /* editorial layout */
  .tbp-vb {
    flex: 1; display: grid; grid-template-columns: 1.05fr 1fr;
    gap: 0; padding: 20px 48px 48px;
  }
  .tbp-left {
    padding: 40px 40px 40px 0;
    display: flex; flex-direction: column; justify-content: center;
    border-right: 1px solid var(--hair); position: relative;
  }
  .tbp-left::after {
    content: ''; position: absolute; right: -1px; top: 30%; bottom: 30%;
    width: 1px; background: linear-gradient(180deg, transparent, var(--gold-soft), transparent);
  }
  .tbp-eyebrow {
    font-size: 11px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
    display: flex; align-items: center; gap: 12px;
  }
  .tbp-eyebrow .num { font-family: 'Newsreader', serif; font-style: italic; font-size: 14px; color: var(--ink-soft); letter-spacing: .05em; text-transform: none; }
  .tbp-left h1 {
    font-family: 'Newsreader', serif; font-weight: 300;
    font-size: clamp(44px, 5.2vw, 80px);
    line-height: 1.05; letter-spacing: -0.01em;
    margin: 0 0 28px; max-width: 11ch;
  }
  .tbp-left h1 em { font-style: italic; color: var(--gold); font-weight: 300; }
  .tbp-lede {
    font-size: 16px; line-height: 1.75; color: var(--ink-soft);
    max-width: 44ch; font-weight: 300; margin: 0 0 36px;
  }
  .tbp-pullquote {
    border-top: 1px solid var(--hair); padding-top: 28px; margin-top: 12px; max-width: 46ch;
  }
  .tbp-pullquote .q {
    font-family: 'Newsreader', serif; font-style: italic; font-weight: 300;
    font-size: 22px; line-height: 1.5; color: var(--ink);
  }
  .tbp-pullquote .q::before { content: '“'; color: var(--gold); margin-right: 2px; }
  .tbp-pullquote .q::after  { content: '”'; color: var(--gold); margin-left: 2px; }
  .tbp-pullquote .attr { margin-top: 14px; font-size: 11px; letter-spacing: .22em; text-transform: uppercase; color: var(--ink-quiet); }

  .tbp-right {
    padding: 10px 0 10px 56px;
    display: flex; flex-direction: column; justify-content: space-between; position: relative;
  }

  /* breath stage */
  .tbp-breath-stage {
    position: relative;
    width: min(560px, 92%); aspect-ratio: 1/1;
    margin: 0 auto 28px;
    display: grid; place-items: center;
  }
  .tbp-breath-ring {
    position: absolute; inset: 0; border-radius: 50%;
    border: 1px solid var(--hair-strong);
    animation: tbp-breathe 6s ease-in-out infinite;
    box-shadow: 0 0 80px 0 oklch(0.83 0.14 85 / 0.08) inset, 0 0 120px 0 oklch(0.83 0.14 85 / 0.05);
  }
  .tbp-breath-ring.r2 { inset: 12%; border-color: oklch(1 0 0 / 0.18); animation-delay: .15s; }
  .tbp-breath-ring.r3 { inset: 24%; border-color: oklch(1 0 0 / 0.24); animation-delay: .30s; }
  .tbp-breath-core {
    position: absolute; inset: 38%; border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, oklch(0.95 0.08 85 / 0.9), oklch(0.80 0.14 85 / 0.35) 60%, transparent 75%);
    filter: blur(1px);
    animation: tbp-breathe 6s ease-in-out infinite; animation-delay: .4s;
  }
  @keyframes tbp-breathe {
    0%,100% { transform: scale(.82); opacity: .75; }
    50%      { transform: scale(1.06); opacity: 1; }
  }
  .tbp-breath-label {
    position: relative; z-index: 2;
    font-family: 'Newsreader', serif; font-style: italic; font-weight: 300;
    font-size: clamp(18px, 1.6vw, 22px); color: var(--ink-soft); letter-spacing: .01em;
    display: inline-block;
  }
  .tbp-swap { position: relative; display: inline-grid; }
  .tbp-swap span { grid-area: 1/1; transition: opacity 1s ease; }
  .tbp-swap .in  { opacity: 1; animation: tbp-fadeIn  6s ease-in-out infinite; }
  .tbp-swap .out { opacity: 0; animation: tbp-fadeOut 6s ease-in-out infinite; }
  @keyframes tbp-fadeIn  { 0%{opacity:0} 8%{opacity:1} 45%{opacity:1} 55%{opacity:0} 100%{opacity:0} }
  @keyframes tbp-fadeOut { 0%{opacity:0} 50%{opacity:0} 58%{opacity:1} 95%{opacity:1} 100%{opacity:0} }

  /* now strip */
  .tbp-now { display: flex; gap: 40px; padding-top: 28px; border-top: 1px solid var(--hair); color: var(--ink-soft); }
  .tbp-now .cell { flex: 1; }
  .tbp-now .cell .k { font-size: 10px; letter-spacing: .28em; text-transform: uppercase; color: var(--ink-quiet); margin-bottom: 10px; }
  .tbp-now .cell .v { font-family: 'Newsreader', serif; font-weight: 300; font-size: 20px; line-height: 1.4; }
  .tbp-now .cell .v em { font-style: italic; color: var(--gold); }

  /* cta */
  .tbp-cta-row {
    margin-top: 36px; display: flex; gap: 18px; flex-wrap: wrap; align-items: center;
    justify-content: flex-start;
  }
  .tbp-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 22px; border-radius: 999px;
    font-size: 13px; letter-spacing: .14em; text-transform: uppercase;
    text-decoration: none; color: var(--ink); font-weight: 500;
    border: 1px solid var(--hair-strong);
    background: oklch(1 0 0 / 0.04);
    backdrop-filter: blur(8px);
    transition: all .3s ease; cursor: pointer;
    font-family: 'Inter', sans-serif;
  }
  .tbp-btn:hover { background: oklch(1 0 0 / 0.08); border-color: var(--gold-soft); color: var(--gold); }
  .tbp-btn.primary { background: oklch(0.83 0.14 85 / 0.95); color: oklch(0.22 0.05 265); border-color: transparent; }
  .tbp-btn.primary:hover { background: var(--gold); color: oklch(0.18 0.05 265); }
  .tbp-arrow { display: inline-block; transition: transform .3s; }
  .tbp-btn:hover .tbp-arrow { transform: translateX(4px); }

  /* footer */
  footer.tbp-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 48px; border-top: 1px solid var(--hair);
    color: var(--ink-quiet); font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
    backdrop-filter: blur(6px); background: oklch(0.22 0.05 265 / 0.2);
  }
  footer.tbp-foot .social { display: flex; gap: 14px; align-items: center; }
  footer.tbp-foot .social a {
    width: 32px; height: 32px; border-radius: 50%;
    display: grid; place-items: center; color: var(--ink-soft);
    background: oklch(0.18 0.04 265 / 0.8); border: 1px solid var(--hair);
    transition: all .3s;
  }
  footer.tbp-foot .social a:hover { color: var(--gold); border-color: var(--gold-soft); }
  footer.tbp-foot .social svg { width: 14px; height: 14px; }
  footer.tbp-foot .divider { width: 1px; height: 18px; background: var(--hair-strong); margin: 0 6px; }

  /* snackbar */
  #tbp-snack {
    position: fixed; left: 50%; bottom: 92px;
    transform: translate(-50%, 20px);
    z-index: 100; display: flex; align-items: center; gap: 14px;
    padding: 14px 18px 14px 16px;
    background: oklch(0.18 0.04 265 / 0.92);
    border: 1px solid var(--hair-strong); border-radius: 999px;
    backdrop-filter: blur(14px); color: var(--ink);
    font-size: 13px; letter-spacing: .02em;
    box-shadow: 0 20px 50px oklch(0 0 0 / 0.35);
    opacity: 0; pointer-events: none;
    transition: opacity .35s ease, transform .35s cubic-bezier(.2,.8,.2,1);
    max-width: min(520px, calc(100vw - 32px));
  }
  #tbp-snack.on { opacity: 1; transform: translate(-50%, 0); pointer-events: auto; }
  #tbp-snack .ico {
    width: 28px; height: 28px; flex: none; border-radius: 50%;
    display: grid; place-items: center;
    background: oklch(0.83 0.14 85 / 0.18); color: var(--gold);
  }
  #tbp-snack .ico svg { width: 14px; height: 14px; }
  #tbp-snack .msg { flex: 1; line-height: 1.4; }
  #tbp-snack .msg .t { font-family: 'Newsreader', serif; font-style: italic; color: var(--gold); font-size: 14px; margin-right: 6px; }
  #tbp-snack .close {
    background: transparent; border: 0; color: var(--ink-quiet); cursor: pointer;
    width: 24px; height: 24px; border-radius: 50%;
    display: grid; place-items: center; transition: all .2s;
  }
  #tbp-snack .close:hover { color: var(--ink); background: oklch(1 0 0 / 0.08); }

  /* tablet */
  @media (max-width: 860px) {
    nav.tbp-nav { padding: 20px 22px; padding-top: calc(20px + env(safe-area-inset-top)); }
    .tbp-nav .links { gap: 20px; font-size: 12px; }
    .tbp-vb { grid-template-columns: 1fr; padding: 20px 22px 32px; gap: 24px; }
    .tbp-left { padding: 20px 0; border-right: none; border-top: 1px solid var(--hair); order: 2; }
    .tbp-left::after { display: none; }
    .tbp-right { padding: 20px 0; order: 1; }
    .tbp-breath-stage { width: min(440px, 80%); margin: 16px auto 20px; }
    footer.tbp-foot { padding: 22px; padding-bottom: calc(22px + env(safe-area-inset-bottom)); flex-direction: column; gap: 16px; text-align: center; }
    footer.tbp-foot .social { flex-wrap: wrap; justify-content: center; }
  }

  /* phone */
  @media (max-width: 560px) {
    nav.tbp-nav { padding: 16px 20px; padding-top: calc(16px + env(safe-area-inset-top)); }
    .tbp-nav .links { gap: 14px; font-size: 10.5px; }
    .tbp-nav .links a:nth-child(2) { display: none; }
    .tbp-left h1 { font-size: clamp(34px, 9.5vw, 48px); }
    .tbp-lede { font-size: 15px; }
    .tbp-cta-row { flex-direction: column; align-items: stretch; gap: 10px; }
    .tbp-btn { justify-content: center; padding: 15px 22px; font-size: 12px; }
    .tbp-now { gap: 20px; flex-wrap: wrap; }
    #tbp-snack { bottom: 20px; padding: 12px 14px; font-size: 12.5px; left: 16px; right: 16px; transform: translateY(20px); max-width: none; }
    #tbp-snack.on { transform: translateY(0); }
    footer.tbp-foot { padding: 20px; padding-bottom: calc(20px + env(safe-area-inset-bottom)); font-size: 10.5px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tbp-breath-ring, .tbp-breath-core { animation: none !important; }
    .tbp-swap .in  { opacity: 1 !important; animation: none !important; }
    .tbp-swap .out { opacity: 0 !important; animation: none !important; }
    .tbp-sky .dot  { animation: tbp-twinkle 4s ease-in-out infinite !important; }
  }
`;

const SNACK_MESSAGES = {
  Journal:          { t: "Coming soon.", b: "The Journal is still being written. Please check back." },
  Pauses:           { t: "Coming soon.", b: "A library of pauses is on the way. Please check back." },
  About:            { t: "Coming soon.", b: "We’re writing our story. Please check back." },
  "Begin a pause":  { t: "Almost ready.", b: "The first guided pause is being tuned. Please check back soon." },
  "Why we made this": { t: "Coming soon.", b: "We’re putting this page together. Please check back." },
};

export default function Home() {
  const skyRef = useRef(null);
  const stageRef = useRef(null);
  const [snack, setSnack] = useState({ visible: false, title: "", body: "" });
  const snackTimer = useRef(null);

  // build starfield
  useEffect(() => {
    const sky = skyRef.current;
    if (!sky) return;
    const N = window.innerWidth < 560 ? 32 : window.innerWidth < 900 ? 48 : 64;
    for (let i = 0; i < N; i++) {
      const d = document.createElement("div");
      d.className = "dot";
      const size = Math.random() * 2 + 0.6;
      d.style.width = d.style.height = size + "px";
      d.style.left = Math.random() * 100 + "vw";
      d.style.top = Math.random() * 100 + 100 + "vh";
      const dur = 60 + Math.random() * 80;
      const twinkleDur = 3 + Math.random() * 5;
      d.style.animationDuration = `${dur}s, ${twinkleDur}s`;
      d.style.animationDelay = `-${Math.random() * dur}s, -${Math.random() * twinkleDur}s`;
      d.style.opacity = 0.15 + Math.random() * 0.35;
      sky.appendChild(d);
    }
    return () => { sky.innerHTML = ""; };
  }, []);

  // parallax
  useEffect(() => {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 12;
      ty = (e.clientY / window.innerHeight - 0.5) * 12;
    };
    const loop = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      if (stageRef.current) {
        stageRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  function showSnack(label) {
    clearTimeout(snackTimer.current);
    const m = SNACK_MESSAGES[label] || { t: "Coming soon.", b: "Please check back." };
    setSnack({ visible: true, title: m.t, body: m.b });
    snackTimer.current = setTimeout(() => setSnack((s) => ({ ...s, visible: false })), 4200);
  }

  function dismissSnack() {
    clearTimeout(snackTimer.current);
    setSnack((s) => ({ ...s, visible: false }));
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="tbp-body">
        <div className="tbp-sky" ref={skyRef} />
        <div className="tbp-grain" />

        <div id="tbp-app" className="tbp-chrome">
          <nav className="tbp-nav">
            <Link href="/" className="tbp-wordmark" aria-label="The Bright Pause">
              <img src="/logo.png" alt="The Bright Pause" className="tbp-mark" />
            </Link>
            <div className="links">
              <a onClick={() => showSnack("Journal")}>Journal</a>
              <a onClick={() => showSnack("Pauses")}>Pauses</a>
              <a onClick={() => showSnack("About")}>About</a>
            </div>
          </nav>

          <main>
            <section style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div className="tbp-vb">
                <div className="tbp-left">
                  <div className="tbp-eyebrow">
                    <span>A moment, on purpose</span>
                    <span className="num">№ 01</span>
                  </div>
                  <h1>Reality isn&apos;t as bad as the scroll <em>suggests</em>.</h1>
                  <p className="tbp-lede">
                    LinkedIn makes you question your career. Twitter leaves you feeling dumb.
                    Instagram makes life look thinner than it is. We&apos;re making room for the
                    opposite — small, real, optimistic.
                  </p>
                  <div className="tbp-pullquote">
                    <div className="q">Look up. The sky does this every evening and nobody&apos;s watching.</div>
                    <div className="attr">Issue 1 · Field Notes</div>
                  </div>
                  <div className="tbp-cta-row">
                    <button className="tbp-btn primary" onClick={() => showSnack("Begin a pause")}>
                      Begin a pause <span className="tbp-arrow">→</span>
                    </button>
                    <button className="tbp-btn" onClick={() => showSnack("Why we made this")}>
                      Why we made this
                    </button>
                  </div>
                </div>

                <div className="tbp-right">
                  <div className="tbp-breath-stage" ref={stageRef} aria-hidden="true">
                    <div className="tbp-breath-ring" />
                    <div className="tbp-breath-ring r2" />
                    <div className="tbp-breath-ring r3" />
                    <div className="tbp-breath-core" />
                    <div className="tbp-breath-label">
                      <span className="tbp-swap">
                        <span className="in">breathe in</span>
                        <span className="out">breathe out</span>
                      </span>
                    </div>
                  </div>

                  <div className="tbp-now">
                    <div className="cell">
                      <div className="k">Today&apos;s pause</div>
                      <div className="v">A walk without <em>a podcast</em>.</div>
                    </div>
                    <div className="cell">
                      <div className="k">Read time</div>
                      <div className="v"><em>2</em> minutes.</div>
                    </div>
                    <div className="cell">
                      <div className="k">Mood after</div>
                      <div className="v">Lighter, usually.</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="tbp-foot">
            <div>© 2026 · The Bright Pause</div>
            <div className="social">
              <span>Find more bright pauses at</span>
              <span className="divider" />
              <a href="https://www.instagram.com/thebrightpause" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://x.com/thebrightpause" aria-label="X" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/thebrightpause" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.58 0h4.37v1.9h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v7.47h-4.56v-6.62c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.54 1.72-2.54 3.5V22H7.8V8z"/></svg>
              </a>
            </div>
          </footer>
        </div>

        {/* Snackbar */}
        <div id="tbp-snack" className={snack.visible ? "on" : ""} role="status" aria-live="polite">
          <span className="ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          </span>
          <span className="msg">
            <span className="t">{snack.title}</span>
            <span>{" " + snack.body}</span>
          </span>
          <button className="close" aria-label="Dismiss" onClick={dismissSnack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
