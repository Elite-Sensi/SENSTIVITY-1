import { useEffect } from "react";
import NeonButton from "../components/NeonButton";

export default function About({ setPage }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "80px 16px 80px", position: "relative", zIndex: 2 }}>

      {/* Hero */}
      <div style={{ maxWidth: 860, margin: "0 auto 48px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,255,255,0.06)", border: "1px solid rgba(0,255,255,0.2)", borderRadius: 100, padding: "6px 18px", marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ffff", animation: "pulse 2s infinite", display: "inline-block" }} />
          <span style={{ color: "#00ffff", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>AI-Powered Sensitivity Tool</span>
        </div>
        <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 900, fontSize: "clamp(24px,5vw,44px)", color: "#f0f9ff", margin: "0 0 18px", letterSpacing: -1, lineHeight: 1.2 }}>
          Best PUBG &amp; BGMI Sensitivity Generator —<br />
          <span style={{ color: "#00ffff", textShadow: "0 0 20px rgba(0,255,255,0.4)" }}>Perfect Settings for Your Device</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "clamp(14px,2.5vw,17px)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
          If you want better aim, smoother recoil control, and faster reactions in PUBG Mobile and BGMI, the most important thing you must optimize is your sensitivity settings.
        </p>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        <P>Many players search online for <KW>PUBG sensitivity</KW>, <KW>BGMI sensitivity</KW>, or <KW>PUBG best sensitivity</KW>, but copying settings from other players does not always work. Every player uses a different phone, finger setup, and gyroscope configuration.</P>
        <P>Our <KW>PUBG sensitivity generator</KW> and <KW>BGMI sensitivity generator</KW> create perfect sensitivity settings based on your device and gameplay style.</P>

        <Sec title="Why Sensitivity Settings Are Important">
          <P>In PUBG Mobile, sensitivity controls how fast your camera moves, how accurately you track enemies, and how well you control weapon recoil. Using the correct <KW>PUBG gyro sensitivity</KW> or <KW>BGMI gyro sensitivity</KW> can improve:</P>
          <UL items={["Recoil control", "Headshot accuracy", "Close-range fights", "Scope tracking", "Reaction speed"]} />
        </Sec>

        <Sec title="Generate Your Custom PUBG & BGMI Sensitivity">
          <Box title="1. Select Your Device">
            <P>Different phones respond differently. Players search for <KW>PUBG sensitivity iPhone</KW>, <KW>PUBG sensitivity Android</KW>, <KW>BGMI sensitivity 90fps</KW>, and <KW>BGMI sensitivity 120fps</KW>. Our generator analyzes your device and generates the best possible values.</P>
          </Box>
          <Box title="2. Choose Your Finger Setup">
            <P>Common playstyles include <KW>PUBG 2 finger sensitivity</KW>, <KW>PUBG 3 finger sensitivity</KW>, <KW>PUBG 4 finger claw sensitivity</KW>, and <KW>PUBG 5 finger sensitivity</KW>. Claw players usually need slightly lower camera sensitivity for better recoil control.</P>
          </Box>
          <Box title="3. Gyroscope Settings">
            <P>Gyroscope is used by competitive players for precise recoil control. Our generator adjusts both ADS and gyroscope sensitivity depending on whether you use <KW>PUBG gyro sensitivity</KW> or <KW>PUBG no gyro sensitivity</KW>.</P>
          </Box>
        </Sec>

        <Sec title="Scope Sensitivity Optimization">
          <P>Scopes require different sensitivity levels. We optimize values for <KW>PUBG red dot sensitivity</KW>, <KW>PUBG 3x sensitivity</KW>, <KW>PUBG 4x sensitivity</KW>, <KW>PUBG 6x sensitivity</KW>, and all other scopes so you can control recoil at any range.</P>
        </Sec>

        <Sec title="Tips to Improve Your Aim">
          <ol style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
            {["Spend time practicing recoil control in training mode.",
              "Use the same sensitivity for several days before changing.",
              "Adjust sensitivity gradually instead of making large changes.",
              "Focus on crosshair placement for faster headshots.",
              "Watch pro player streams to understand their movement style."].map((tip, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "6px 0", color: "#94a3b8", fontSize: 15, lineHeight: 1.6 }}>
                <span style={{ background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.2)", borderRadius: 6, padding: "1px 9px", fontWeight: 800, color: "#00ffff", flexShrink: 0, fontSize: 12 }}>{i + 1}</span>
                {tip}
              </li>
            ))}
          </ol>
        </Sec>

        {/* Tag cloud */}
        <Sec title="Popular Sensitivity Searches">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 16px" }}>
            {["best PUBG sensitivity for recoil", "best BGMI sensitivity for headshots", "PUBG sensitivity for gyroscope players", "BGMI sensitivity for iPhone", "PUBG sensitivity for 4 finger claw", "BGMI sensitivity for smooth recoil", "PUBG mobile sensitivity 2025", "BGMI pro player sensitivity"].map(tag => (
              <span key={tag} style={{ background: "rgba(0,255,255,0.06)", border: "1px solid rgba(0,255,255,0.15)", borderRadius: 20, padding: "5px 13px", fontSize: 12, color: "#64748b" }}>{tag}</span>
            ))}
          </div>
        </Sec>

        {/* CTA */}
        <div style={{ marginTop: 52, background: "linear-gradient(135deg,rgba(0,255,255,0.06),rgba(245,158,11,0.03))", border: "1px solid rgba(0,255,255,0.14)", borderRadius: 20, padding: "clamp(28px,5vw,52px)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 900, fontSize: "clamp(22px,4vw,34px)", color: "#f0f9ff", margin: "0 0 12px", letterSpacing: -1 }}>Create Your Sensitivity Now</h2>
          <p style={{ color: "#475569", fontSize: 15, margin: "0 0 28px", maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>Enter your device, finger setup, and gyroscope preference to instantly generate the best sensitivity.</p>
          <NeonButton text="Generate My Sensitivity →" onClick={() => setPage("generator")} size="lg" color="cyan" />
        </div>

      </div>
    </div>
  );
}

function Sec({ title, children }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div style={{ width: 4, height: 28, borderRadius: 2, background: "linear-gradient(180deg,#00ffff,#06b6d4)", flexShrink: 0 }} />
        <h2 style={{ fontSize: "clamp(17px,3vw,23px)", fontWeight: 800, margin: 0, color: "#e2e8f0", fontFamily: "'DM Sans',sans-serif" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
function Box({ title, children }) {
  return (
    <div style={{ background: "rgba(0,255,255,0.02)", border: "1px solid rgba(0,255,255,0.07)", borderRadius: 12, padding: "20px 20px", marginBottom: 12 }}>
      <h3 style={{ color: "#00ffff", fontWeight: 700, fontSize: 15, margin: "0 0 10px", fontFamily: "'DM Sans',sans-serif" }}>{title}</h3>
      {children}
    </div>
  );
}
function P({ children }) { return <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, margin: "0 0 14px" }}>{children}</p>; }
function KW({ children }) { return <strong style={{ color: "#a5f3fc", fontWeight: 600 }}>{children}</strong>; }
function UL({ items }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 10, padding: "5px 0", color: "#94a3b8", fontSize: 15 }}>
          <span style={{ color: "#00ffff", flexShrink: 0 }}>▸</span>{item}
        </li>
      ))}
    </ul>
  );
}
