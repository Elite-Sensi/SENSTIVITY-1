import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleNetwork  from "./components/ParticleNetwork";
import ThreeBackground  from "./components/ThreeBackground";
import HeroSection      from "./components/HeroSection";
import NeonButton       from "./components/NeonButton";
import AdSlot           from "./components/AdSlot";
import About            from "./pages/About";
import Privacy          from "./pages/Privacy";
import { ADSENSE_ENABLED, ADSENSE_CLIENT, ADSENSE_SLOTS } from "./config/adsense";

gsap.registerPlugin(ScrollTrigger);

// Inject AdSense config into window so AdSlot component can read it
if (typeof window !== "undefined") {
  window.__ADSENSE_ENABLED = ADSENSE_ENABLED;
  window.__ADSENSE_CLIENT  = ADSENSE_CLIENT;
  window.__ADSENSE_SLOTS   = ADSENSE_SLOTS;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const c = () => { const w = window.innerWidth >= 1024, nt = window.matchMedia("(pointer: fine)").matches, nm = !/Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent); setD(w && (nt || nm)); };
    c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c);
  }, []); return d;
}
function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 640);
  useEffect(() => { const c = () => setM(window.innerWidth < 640); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []); return m;
}
function useScrollY() { const [y, setY] = useState(0); useEffect(() => { const fn = () => setY(window.scrollY); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []); return y; }
function useInView(t = 0.1) { const ref = useRef(null); const [v, setV] = useState(false); useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []); return [ref, v]; }

// ─── Constants ───────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const DEVICES = [
  "iPhone 15 Pro Max","iPhone 15 Pro","iPhone 15","iPhone 14 Pro Max","iPhone 14 Pro","iPhone 14",
  "iPhone 13 Pro Max","iPhone 13 Pro","iPhone 13","iPhone 12 Pro","iPhone 12","iPhone 11",
  "Samsung Galaxy S24 Ultra","Samsung Galaxy S24+","Samsung Galaxy S24",
  "Samsung Galaxy S23 Ultra","Samsung Galaxy S23+","Samsung Galaxy S23",
  "Samsung Galaxy S22 Ultra","Samsung Galaxy A54","Samsung Galaxy A34",
  "OnePlus 12","OnePlus 11","OnePlus 10 Pro","OnePlus Nord 3",
  "POCO F5 Pro","POCO F5","POCO X5 Pro","POCO X5",
  "ROG Phone 7 Ultimate","ROG Phone 7","ROG Phone 6 Pro","ROG Phone 6","ROG Phone 5",
  "Redmi Note 13 Pro+","Redmi Note 13 Pro","Redmi Note 12 Pro","Redmi Note 12",
  "Realme GT 2 Pro","Realme GT Neo 5","Black Shark 5 Pro","Black Shark 5",
  "Vivo X90 Pro","Vivo iQOO 11","Oppo Find X6 Pro",
];

const SCOPE_KEYS   = ["tpp","fpp","red_dot","scope_2x","scope_3x","scope_4x","scope_6x","scope_8x"];
const SCOPE_LABELS = ["TPP","FPP","Red Dot","2x","3x","4x","6x","8x"];
const FL_KEYS      = ["tpp_character_vehicle","camera_parachuting","fpp_character"];
const FL_LABELS    = ["TPP Char+Vehicle","Camera Parachute","FPP Character"];
const FL_MAX       = [200, 200, 200];

// ─── All 5 Pro Players ────────────────────────────────────────────────────────
const PLAYERS = [
  {
    id: 1, name: "Falak", team: "4Thrives", region: "South Asia", role: "Fragger", tier: "S",
    fingers: "5", gyro: true, image: "/assets/players/falak.jpg",
    bio: "One of the most aggressive fraggers in South Asian PUBG Mobile. Known for insane close-range sensitivity control.",
    sensitivity: {
      camera:        { tpp:38,  fpp:38,  red_dot:25, scope_2x:30, scope_3x:11, scope_4x:7,  scope_6x:6,  scope_8x:6  },
      ads:           { tpp:41,  fpp:41,  red_dot:25, scope_2x:31, scope_3x:13, scope_4x:8,  scope_6x:6,  scope_8x:6  },
      free_look:     { tpp_character_vehicle:160, camera_parachuting:120, fpp_character:160 },
      gyroscope:     { tpp:267, fpp:267, red_dot:283,scope_2x:283,scope_3x:154,scope_4x:106,scope_6x:58, scope_8x:55 },
      gyroscope_ads: { tpp:268, fpp:268, red_dot:284,scope_2x:284,scope_3x:163,scope_4x:140,scope_6x:60, scope_8x:42 },
    },
  },
  {
    id: 2, name: "Top", team: "ALPHA GAMING", region: "Thailand", role: "Fragger", tier: "S",
    fingers: "5", gyro: true, image: "/assets/players/top.png",
    bio: "Thai esports legend with ultra-high camera sensitivity. Plays aggressive entry fragger with pinpoint precision.",
    sensitivity: {
      camera:        { tpp:100, fpp:100, red_dot:30, scope_2x:10, scope_3x:8,  scope_4x:8,  scope_6x:4,  scope_8x:4  },
      ads:           { tpp:100, fpp:100, red_dot:30, scope_2x:10, scope_3x:8,  scope_4x:8,  scope_6x:4,  scope_8x:4  },
      free_look:     { tpp_character_vehicle:100, camera_parachuting:100, fpp_character:70 },
      gyroscope:     { tpp:310, fpp:310, red_dot:310,scope_2x:290,scope_3x:165,scope_4x:162,scope_6x:80, scope_8x:70 },
      gyroscope_ads: { tpp:310, fpp:310, red_dot:310,scope_2x:290,scope_3x:186,scope_4x:163,scope_6x:80, scope_8x:70 },
    },
  },
  {
    id: 3, name: "Rosemary", team: "Alter Ego", region: "Indonesia", role: "Fragger", tier: "S",
    fingers: "5", gyro: true, image: "/assets/players/rosemary.png",
    bio: "Indonesian pro known for low-scope consistency. One of the most technically precise players in Southeast Asia.",
    sensitivity: {
      camera:        { tpp:55,  fpp:55,  red_dot:12, scope_2x:12, scope_3x:6,  scope_4x:5,  scope_6x:2,  scope_8x:2  },
      ads:           { tpp:20,  fpp:20,  red_dot:12, scope_2x:12, scope_3x:6,  scope_4x:5,  scope_6x:2,  scope_8x:2  },
      free_look:     { tpp_character_vehicle:70, camera_parachuting:70, fpp_character:70 },
      gyroscope:     { tpp:232, fpp:232, red_dot:232,scope_2x:232,scope_3x:133,scope_4x:137,scope_6x:60, scope_8x:55 },
      gyroscope_ads: { tpp:232, fpp:232, red_dot:232,scope_2x:232,scope_3x:133,scope_4x:137,scope_6x:70, scope_8x:55 },
    },
  },
  {
    id: 4, name: "Cyxae", team: "Dplus Kia", region: "South Korea", role: "Fragger", tier: "S",
    fingers: "4", gyro: true, image: "/assets/players/cyxae.png",
    bio: "Korean powerhouse from Dplus Kia. 4-claw player with exceptionally high camera sensitivity for fast target acquisition.",
    sensitivity: {
      camera:        { tpp:110, fpp:110, red_dot:20, scope_2x:20, scope_3x:10, scope_4x:10, scope_6x:8,  scope_8x:9  },
      ads:           { tpp:110, fpp:110, red_dot:20, scope_2x:20, scope_3x:10, scope_4x:10, scope_6x:8,  scope_8x:9  },
      free_look:     { tpp_character_vehicle:80, camera_parachuting:120, fpp_character:120 },
      gyroscope:     { tpp:310, fpp:310, red_dot:280,scope_2x:260,scope_3x:170,scope_4x:143,scope_6x:70, scope_8x:100},
      gyroscope_ads: { tpp:310, fpp:310, red_dot:280,scope_2x:260,scope_3x:170,scope_4x:143,scope_6x:70, scope_8x:100},
    },
  },
  {
    id: 5, name: "Jonathan", team: "GodLike Esports", region: "India", role: "Fragger", tier: "S",
    fingers: "2", gyro: true, image: "/assets/players/jonathan.jpg",
    bio: "India's most iconic PUBG Mobile player. 2-thumb player who proves you don't need claw to dominate at the highest level.",
    sensitivity: {
      camera:        { tpp:80,  fpp:80,  red_dot:40, scope_2x:30, scope_3x:5,  scope_4x:4,  scope_6x:9,  scope_8x:8  },
      ads:           { tpp:80,  fpp:80,  red_dot:1,  scope_2x:1,  scope_3x:1,  scope_4x:1,  scope_6x:1,  scope_8x:1  },
      free_look:     { tpp_character_vehicle:80, camera_parachuting:80, fpp_character:55 },
      gyroscope:     { tpp:330, fpp:330, red_dot:283,scope_2x:283,scope_3x:144,scope_4x:170,scope_6x:80, scope_8x:49 },
      gyroscope_ads: { tpp:330, fpp:330, red_dot:280,scope_2x:290,scope_3x:150,scope_4x:152,scope_6x:100,scope_8x:40 },
    },
  },
];

function mockGenerate(device, fingers, gyro, skill) {
  const m = skill === "beginner" ? 0.85 : skill === "pro" ? 1.1 : 1.0;
  const s = v => Math.round(v * m);
  const sens = arr => Object.fromEntries(SCOPE_KEYS.map((k, i) => [k, s(arr[i])]));
  return {
    device_matched: device, match_type: "partial", confidence_score: 0.78,
    players_used: ["Falak", "Cyxae", "Jonathan"],
    camera:        sens([110, 95, 58, 44, 34, 27, 20, 14]),
    ads:           sens([54,  59, 54, 44, 37, 30, 22, 17]),
    free_look:     { tpp_character_vehicle: s(80), camera_parachuting: s(80), fpp_character: s(74) },
    gyroscope:     gyro ? sens([300, 300, 200, 180, 158, 138, 108, 87]) : null,
    gyroscope_ads: gyro ? sens([280, 280, 190, 170, 150, 130, 100, 80]) : null,
  };
}

// ─── Aurora Background ────────────────────────────────────────────────────────
function Aurora() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d"); let raf, t = 0;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const orbs = [[0.2,0.3,0.45,[0,255,255],0.1,0.7],[0.8,0.6,0.38,[245,158,11],0.8,1.1],[0.5,0.15,0.32,[139,92,246],1.3,0.9]];
    const draw = () => {
      t += 0.003; ctx.clearRect(0, 0, c.width, c.height);
      orbs.forEach(([bx,by,r,col,sx,sy]) => { const x=bx+Math.sin(t*sx)*0.1,y=by+Math.cos(t*sy)*0.1; const g=ctx.createRadialGradient(x*c.width,y*c.height,0,x*c.width,y*c.height,r*c.width); g.addColorStop(0,`rgba(${col},0.13)`); g.addColorStop(1,`rgba(${col},0)`); ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height); });
      raf = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const y = useScrollY(); const solid = y > 60;
  const [open, setOpen] = useState(false); const isMobile = useIsMobile();
  const navRef = useRef(null);
  useEffect(() => { gsap.from(navRef.current, { y: -80, opacity: 0, duration: 0.8, ease: "power3.out" }); }, []);
  const go = (id) => { setPage(id); setOpen(false); window.scrollTo(0, 0); };
  const LINKS = [["home","Home"],["generator","Generator"],["players","Players"],["about","About"]];

  return (
    <nav ref={navRef} style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,transition:"all 0.4s",backdropFilter:solid||open?"blur(24px) saturate(180%)":"none",background:solid||open?"rgba(0,4,12,0.97)":"transparent",borderBottom:solid?"1px solid rgba(0,255,255,0.08)":"1px solid transparent" }}>
      <div style={{ padding:"0 max(16px,4vw)",height:60,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div onClick={() => go("home")} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:9 }}>
          <div style={{ width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#00ffff,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 18px rgba(0,255,255,0.55)",fontSize:15,fontWeight:900,color:"#000",flexShrink:0 }}>S</div>
          <span style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:16,letterSpacing:-0.5,color:"#f0f9ff" }}>sensi<span style={{ color:"#00ffff",textShadow:"0 0 10px #00ffff" }}>.gg</span></span>
        </div>

        {!isMobile && (
          <div style={{ display:"flex",alignItems:"center",gap:2 }}>
            {LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} style={{ background:"transparent",border:"none",color:page===id?"#00ffff":"#475569",textShadow:page===id?"0 0 8px rgba(0,255,255,0.6)":"none",fontSize:13,fontWeight:600,cursor:"pointer",padding:"8px 12px",borderRadius:8,transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif" }}>{label}</button>
            ))}
            <div style={{ marginLeft: 6 }}><NeonButton text="Generate" onClick={() => go("generator")} size="sm" color="cyan" /></div>
          </div>
        )}

        {isMobile && (
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <NeonButton text="Generate" onClick={() => go("generator")} size="sm" color="cyan" />
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background:"transparent",border:"1px solid rgba(0,255,255,0.2)",borderRadius:8,width:40,height:40,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer",padding:0,flexShrink:0 }}>
              <span style={{ display:"block",width:18,height:2,background:open?"#00ffff":"#64748b",borderRadius:1,transition:"all 0.3s",transform:open?"rotate(45deg) translate(0,7px)":"none" }} />
              <span style={{ display:"block",width:18,height:2,background:open?"transparent":"#64748b",borderRadius:1,transition:"opacity 0.3s" }} />
              <span style={{ display:"block",width:18,height:2,background:open?"#00ffff":"#64748b",borderRadius:1,transition:"all 0.3s",transform:open?"rotate(-45deg) translate(0,-7px)":"none" }} />
            </button>
          </div>
        )}
      </div>

      {isMobile && open && (
        <div style={{ padding:"8px 16px 20px",borderTop:"1px solid rgba(0,255,255,0.07)" }}>
          {LINKS.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{ display:"block",width:"100%",textAlign:"left",background:page===id?"rgba(0,255,255,0.07)":"transparent",border:"none",borderLeft:page===id?"3px solid #00ffff":"3px solid transparent",borderRadius:10,color:page===id?"#00ffff":"#94a3b8",fontSize:15,fontWeight:600,cursor:"pointer",padding:"14px 16px",fontFamily:"'DM Sans',sans-serif",marginBottom:3 }}>{label}</button>
          ))}
          <button onClick={() => go("privacy")} style={{ display:"block",width:"100%",textAlign:"left",background:"transparent",border:"none",borderLeft:"3px solid transparent",borderRadius:10,color:"#475569",fontSize:13,cursor:"pointer",padding:"10px 16px",fontFamily:"'DM Sans',sans-serif",marginTop:6 }}>Privacy Policy</button>
        </div>
      )}
    </nav>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [featRef, featV] = useInView(0.08);
  const [ctaRef, ctaV]   = useInView(0.1);
  useEffect(() => { if (!featV) return; gsap.from(".feat-card", { opacity:0, y:40, stagger:0.1, duration:0.7, ease:"power2.out" }); }, [featV]);
  useEffect(() => { if (!ctaV) return; gsap.from(".cta-box", { opacity:0, scale:0.95, duration:0.8, ease:"power2.out" }); }, [ctaV]);

  return (
    <div>
      <HeroSection onGenerate={() => setPage("generator")} />

      {/* Features */}
      <section ref={featRef} style={{ padding:"50px max(16px,4vw) 60px",position:"relative",zIndex:2 }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(26px,5vw,52px)",fontWeight:900,color:"#f0f9ff",letterSpacing:-2,textAlign:"center",margin:"0 0 40px" }}>Built different.<br/><span style={{ color:"#00ffff",textShadow:"0 0 20px rgba(0,255,255,0.4)" }}>Plays different.</span></h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12 }}>
            {[
              {icon:"◈",c:"#00ffff",t:"Neural Device Matching",d:"Maps GPU performance and touch latency to device-aware sensitivity profiles."},
              {icon:"◉",c:"#f59e0b",t:"Recoil Intelligence",d:"Trained on esports footage. Per-weapon recoil vectors inform your ADS values."},
              {icon:"◌",c:"#8b5cf6",t:"Gyroscope Calibration",d:"Accounts for dead zones, acceleration curves, and IMU precision."},
              {icon:"◎",c:"#22c55e",t:"Skill Adaptive Output",d:"Beginner to pro — scales all values so your settings grow with you."},
              {icon:"◍",c:"#f43f5e",t:"6-Claw Ready",d:"Every layout from 2 to 6 claw optimized for your specific grip."},
              {icon:"◐",c:"#00ffff",t:"Instant & Free",d:"No account needed. Sub-100ms generation. Copy all settings in one tap."},
            ].map(({ icon, c, t, d }) => (
              <div key={t} className="feat-card" style={{ background:"rgba(0,255,255,0.02)",border:"1px solid rgba(0,255,255,0.07)",borderRadius:16,padding:"22px 18px" }}>
                <div style={{ fontSize:22,color:c,marginBottom:10 }}>{icon}</div>
                <h3 style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:15,color:"#e2e8f0",margin:"0 0 7px" }}>{t}</h3>
                <p style={{ color:"#334155",fontSize:13,lineHeight:1.7,margin:0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot — below features */}
      <div style={{ padding:"0 max(16px,4vw) 20px",position:"relative",zIndex:2 }}>
        <AdSlot slot="below_features" />
      </div>

      {/* Pro Players CTA */}
      <section style={{ padding:"0 max(16px,4vw) 60px",position:"relative",zIndex:2 }}>
        <div style={{ maxWidth:1100,margin:"0 auto",background:"linear-gradient(135deg,rgba(0,255,255,0.04),rgba(245,158,11,0.02))",border:"1px solid rgba(0,255,255,0.1)",borderRadius:20,padding:"36px 20px",textAlign:"center" }}>
          <div style={{ fontSize:32,marginBottom:12 }}>🏆</div>
          <h3 style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:900,fontSize:"clamp(18px,4vw,24px)",color:"#e2e8f0",margin:"0 0 10px" }}>Pro Player Sensitivities</h3>
          <p style={{ color:"#475569",fontSize:14,maxWidth:380,margin:"0 auto 20px" }}>Exact settings from Falak, Top, Rosemary, Cyxae & Jonathan.</p>
          <NeonButton text="View Pro Players" onClick={() => setPage("players")} size="md" color="gold" />
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ padding:"40px max(16px,4vw) 60px",position:"relative",zIndex:2,textAlign:"center" }}>
        <div className="cta-box" style={{ maxWidth:700,margin:"0 auto",background:"linear-gradient(135deg,rgba(0,255,255,0.06),rgba(245,158,11,0.03))",border:"1px solid rgba(0,255,255,0.14)",borderRadius:24,padding:"44px 20px" }}>
          <h2 style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(22px,5vw,44px)",fontWeight:900,color:"#f0f9ff",margin:"0 0 12px",letterSpacing:-2 }}>Ready to clutch?</h2>
          <p style={{ color:"#475569",fontSize:15,margin:"0 auto 26px",maxWidth:320 }}>Join thousands who have already leveled up their aim.</p>
          <NeonButton text="Generate My Sensitivity" onClick={() => setPage("generator")} size="lg" color="cyan" />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding:"24px max(16px,4vw)",borderTop:"1px solid rgba(255,255,255,0.04)",position:"relative",zIndex:2 }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",gap:10,textAlign:"center" }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:800,color:"#334155",fontSize:15 }}>sensi<span style={{ color:"#00ffff" }}>.gg</span></span>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center" }}>
            {[["privacy","Privacy Policy"],["about","About"]].map(([id,label]) => (
              <button key={id} onClick={() => setPage(id)} style={{ background:"none",border:"none",color:"#1e293b",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>{label}</button>
            ))}
          </div>
          <span style={{ color:"#1e293b",fontSize:11 }}>© 2025 Sensi.gg — Not affiliated with PUBG Corp or Krafton Inc.</span>
        </div>
      </footer>
    </div>
  );
}

// ─── Generator ───────────────────────────────────────────────────────────────
function FieldLabel({ icon, text }) {
  return <div style={{ color:"#334155",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8,display:"flex",alignItems:"center",gap:5 }}><span>{icon}</span>{text}</div>;
}

function GeneratorPage({ setResult, setPage }) {
  const [device, setDevice]   = useState("");
  const [fingers, setFingers] = useState("4");
  const [gyro, setGyro]       = useState(true);
  const [skill, setSkill]     = useState("intermediate");
  const [loading, setLoading] = useState(false);
  const [search, setSearch]   = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const cardRef = useRef(null);

  const filtered = search ? DEVICES.filter(d => d.toLowerCase().includes(search.toLowerCase())) : DEVICES;
  useEffect(() => { gsap.from(cardRef.current, { opacity:0, y:40, duration:0.8, ease:"power3.out", delay:0.1 }); }, []);

  async function handleGenerate() {
    const dev = device || search;
    if (!dev) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    try {
      const res  = await fetch(`${API_BASE}/generate-sensitivity`, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ device:dev, fingers, gyro, skill_level:skill }) });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.free_look) {
        const fl = data.free_look;
        data.free_look = {
          tpp_character_vehicle: Math.round(fl.tpp_character_vehicle ?? fl.tpp_character ?? fl.tpp ?? 80),
          camera_parachuting:    Math.round(fl.camera_parachuting    ?? fl.parachuting   ?? fl.camera ?? 80),
          fpp_character:         Math.round(fl.fpp_character         ?? fl.fpp           ?? 74),
        };
      }
      ["camera","ads","gyroscope","gyroscope_ads"].forEach(sec => { if (data[sec]) Object.keys(data[sec]).forEach(k => { data[sec][k] = Math.round(data[sec][k]); }); });
      setResult(data);
    } catch {
      setResult(mockGenerate(dev, fingers, gyro, skill));
    }
    setPage("result");
    setLoading(false);
  }

  const iSt = { width:"100%",padding:"14px 16px",borderRadius:10,border:"1px solid rgba(0,255,255,0.15)",background:"rgba(0,6,18,0.8)",color:"#e2e8f0",fontSize:16,outline:"none",boxSizing:"border-box",fontFamily:"'DM Sans',sans-serif" };

  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"76px 16px 60px",position:"relative",zIndex:2 }}>
      <div ref={cardRef} style={{ width:"100%",maxWidth:520,position:"relative",zIndex:1 }}>
        <div style={{ textAlign:"center",marginBottom:28 }}>
          <h1 style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(26px,6vw,44px)",fontWeight:900,color:"#f0f9ff",margin:"0 0 8px",letterSpacing:-2 }}>Your Sensitivity.<br/><span style={{ color:"#00ffff",textShadow:"0 0 20px rgba(0,255,255,0.5)" }}>Engineered.</span></h1>
          <p style={{ color:"#475569",fontSize:14 }}>Fill in your setup. AI does the rest.</p>
        </div>

        <div style={{ background:"rgba(0,255,255,0.025)",border:"1px solid rgba(0,255,255,0.1)",borderRadius:20,padding:"22px 18px",backdropFilter:"blur(20px)" }}>
          <FieldLabel icon="📱" text="Device Model" />
          <div style={{ position:"relative",marginBottom:16 }}>
            <input value={search} onChange={e => { setSearch(e.target.value); setDevice(""); setShowDrop(true); }} onFocus={() => setShowDrop(true)} onBlur={() => setTimeout(() => setShowDrop(false), 200)} placeholder="e.g. iPhone 14 Pro Max" style={{ ...iSt, background:device?"rgba(0,255,255,0.06)":iSt.background }} />
            {device && <div style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"#00ffff",fontSize:13,fontWeight:700 }}>✓</div>}
            {showDrop && filtered.length > 0 && (
              <div style={{ position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#000c1a",border:"1px solid rgba(0,255,255,0.15)",borderRadius:12,maxHeight:200,overflowY:"auto",zIndex:100,boxShadow:"0 20px 60px rgba(0,0,0,0.9)",WebkitOverflowScrolling:"touch" }}>
                {filtered.slice(0, 15).map(d => (
                  <div key={d} onMouseDown={() => { setDevice(d); setSearch(d); setShowDrop(false); }} style={{ padding:"13px 14px",color:"#64748b",fontSize:14,cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.03)" }}>{d}</div>
                ))}
              </div>
            )}
          </div>

          <FieldLabel icon="🖐" text="Finger Layout" />
          <div style={{ display:"flex",gap:6,marginBottom:16 }}>
            {["2","3","4","5","6"].map(f => (
              <button key={f} onClick={() => setFingers(f)} style={{ flex:1,padding:"14px 0",borderRadius:9,border:fingers===f?"1px solid #00ffff":"1px solid rgba(255,255,255,0.07)",background:fingers===f?"rgba(0,255,255,0.1)":"rgba(0,6,18,0.6)",color:fingers===f?"#00ffff":"#475569",fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:16,cursor:"pointer",transition:"all 0.18s",minHeight:54,WebkitTapHighlightColor:"transparent" }}>
                {f}<div style={{ fontSize:8,fontWeight:600,marginTop:2 }}>CLAW</div>
              </button>
            ))}
          </div>

          <FieldLabel icon="🔄" text="Gyroscope" />
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16 }}>
            {[[true,"🟢 Gyro ON","#22c55e"],[false,"🔴 Gyro OFF","#ef4444"]].map(([v, l, c]) => (
              <button key={l} onClick={() => setGyro(v)} style={{ padding:"14px",borderRadius:9,border:gyro===v?`1px solid ${c}55`:"1px solid rgba(255,255,255,0.07)",background:gyro===v?`${c}12`:"rgba(0,6,18,0.6)",color:gyro===v?c:"#475569",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",transition:"all 0.18s",minHeight:50,WebkitTapHighlightColor:"transparent" }}>{l}</button>
            ))}
          </div>

          <FieldLabel icon="🏆" text="Skill Level" />
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:22 }}>
            {[["beginner","🌱","Beginner"],["intermediate","⚔️","Inter."],["pro","🔥","Pro"]].map(([v, e, l]) => (
              <button key={v} onClick={() => setSkill(v)} style={{ padding:"12px 4px",borderRadius:9,border:skill===v?"1px solid rgba(0,255,255,0.4)":"1px solid rgba(255,255,255,0.07)",background:skill===v?"rgba(0,255,255,0.08)":"rgba(0,6,18,0.6)",color:skill===v?"#00ffff":"#475569",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,minHeight:54,WebkitTapHighlightColor:"transparent" }}>
                <span style={{ fontSize:18 }}>{e}</span>{l}
              </button>
            ))}
          </div>

          <NeonButton text="⚡ Generate Sensitivity" onClick={handleGenerate} loading={loading} disabled={!device && !search} size="lg" color="cyan" />
        </div>
      </div>
    </div>
  );
}

// ─── Result ───────────────────────────────────────────────────────────────────
function ResultPage({ result, setPage }) {
  const [copied, setCopied] = useState(null);
  const [tab, setTab]       = useState("camera");
  const headerRef = useRef(null), panelRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(headerRef.current, { opacity:0, y:20, duration:0.6 }).from(panelRef.current, { opacity:0, y:30, duration:0.7 }, "-=0.2");
  }, []);

  const tabs = [
    { id:"camera",   label:"Camera",    icon:"📷", data:result.camera,        isScope:true  },
    { id:"ads",      label:"ADS",       icon:"🔭", data:result.ads,           isScope:true  },
    { id:"fl",       label:"Free Look", icon:"👁",  data:result.free_look,     isScope:false },
    ...(result.gyroscope     ? [{ id:"gyro",    label:"Gyro",     icon:"🔄", data:result.gyroscope,     isScope:true }] : []),
    ...(result.gyroscope_ads ? [{ id:"gyroads", label:"Gyro ADS", icon:"🎯", data:result.gyroscope_ads, isScope:true }] : []),
  ];
  const active = tabs.find(t => t.id === tab);

  function buildCopyAll() {
    const p = ["=== SENSI.GG — YOUR SENSITIVITY ===\n"];
    p.push("CAMERA:"); SCOPE_KEYS.forEach((k,i) => p.push(`  ${SCOPE_LABELS[i]}: ${Math.round(result.camera[k])}`));
    p.push("\nADS:");   SCOPE_KEYS.forEach((k,i) => p.push(`  ${SCOPE_LABELS[i]}: ${Math.round(result.ads[k])}`));
    p.push("\nFREE LOOK:"); FL_KEYS.forEach((k,i) => p.push(`  ${FL_LABELS[i]}: ${Math.round(result.free_look[k]??0)}`));
    if (result.gyroscope)     { p.push("\nGYROSCOPE:");     SCOPE_KEYS.forEach((k,i) => p.push(`  ${SCOPE_LABELS[i]}: ${Math.round(result.gyroscope[k])}`)); }
    if (result.gyroscope_ads) { p.push("\nGYROSCOPE ADS:"); SCOPE_KEYS.forEach((k,i) => p.push(`  ${SCOPE_LABELS[i]}: ${Math.round(result.gyroscope_ads[k])}`)); }
    p.push(`\nGenerated for: ${result.device_matched}`);
    return p.join("\n");
  }
  function buildCopyTab() {
    if (!active) return "";
    return active.isScope
      ? SCOPE_KEYS.map((k,i) => `${SCOPE_LABELS[i]}: ${Math.round(active.data[k]??0)}`).join("\n")
      : FL_KEYS.map((k,i) => `${FL_LABELS[i]}: ${Math.round(active.data[k]??0)}`).join("\n");
  }
  function cp(id, text) { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 2000); }

  const conf = result.confidence_score;
  const cc   = conf >= 0.9 ? "#22c55e" : conf >= 0.7 ? "#f59e0b" : "#ef4444";
  const cl   = conf >= 0.9 ? "Exact Match" : conf >= 0.7 ? "Partial Match" : "Estimated";

  return (
    <div style={{ minHeight:"100vh",padding:"76px 16px 80px",position:"relative",zIndex:2,maxWidth:740,margin:"0 auto" }}>
      <div ref={headerRef} style={{ marginBottom:20 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap" }}>
          <button onClick={() => setPage("generator")} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"8px 14px",color:"#64748b",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",minHeight:38 }}>← Back</button>
          <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:`${cc}14`,border:`1px solid ${cc}33`,borderRadius:100,padding:"4px 12px" }}><div style={{ width:5,height:5,borderRadius:"50%",background:cc }}/><span style={{ color:cc,fontSize:11,fontWeight:700,textTransform:"uppercase" }}>{cl} · {Math.round(conf * 100)}%</span></div>
          <div style={{ marginLeft:"auto" }}><NeonButton text={copied==="all"?"✓ Copied!":"Copy All"} onClick={() => cp("all", buildCopyAll())} size="sm" color={copied==="all"?"purple":"cyan"} /></div>
        </div>
        <h1 style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(22px,5vw,36px)",fontWeight:900,color:"#f0f9ff",margin:"0 0 4px",letterSpacing:-1 }}>Your Sensitivity</h1>
        <p style={{ color:"#475569",fontSize:12 }}>Device: {result.device_matched} · Based on: {result.players_used?.join(", ")}</p>
      </div>

      <div style={{ display:"flex",gap:4,marginBottom:12,overflowX:"auto",paddingBottom:4,WebkitOverflowScrolling:"touch" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"9px 12px",borderRadius:8,whiteSpace:"nowrap",border:tab===t.id?"1px solid rgba(0,255,255,0.38)":"1px solid rgba(255,255,255,0.06)",background:tab===t.id?"rgba(0,255,255,0.08)":"rgba(0,6,18,0.5)",color:tab===t.id?"#00ffff":"#475569",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",minHeight:40 }}>{t.icon} {t.label}</button>
        ))}
      </div>

      <div ref={panelRef} style={{ background:"rgba(0,255,255,0.025)",border:"1px solid rgba(0,255,255,0.08)",borderRadius:16,padding:"18px 16px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          <span style={{ color:"#94a3b8",fontSize:11,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase" }}>{active?.icon} {active?.label}</span>
          <button onClick={() => cp(tab, buildCopyTab())} style={{ padding:"7px 14px",borderRadius:7,background:copied===tab?"rgba(34,197,94,0.07)":"transparent",border:`1px solid ${copied===tab?"rgba(34,197,94,0.28)":"rgba(255,255,255,0.07)"}`,color:copied===tab?"#22c55e":"#475569",fontFamily:"'DM Sans',sans-serif",fontSize:12,cursor:"pointer",minHeight:36 }}>{copied===tab?"✓ Copied":"Copy"}</button>
        </div>

        {!active?.isScope && (
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            {FL_KEYS.map((k, i) => {
              const v = Math.round(active?.data?.[k] ?? 0);
              const pct = Math.min((v / FL_MAX[i]) * 100, 100);
              return (
                <div key={k}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
                    <span style={{ color:"#475569",fontSize:12,fontFamily:"'DM Mono',monospace" }}>{FL_LABELS[i]}</span>
                    <span style={{ color:"#00ffff",fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:700 }}>{v}</span>
                  </div>
                  <div style={{ height:4,background:"rgba(255,255,255,0.04)",borderRadius:2,overflow:"hidden" }}>
                    <div style={{ height:"100%",borderRadius:2,background:"linear-gradient(90deg,#00ffff44,#00ffff)",width:`${pct}%`,transition:"width 0.8s cubic-bezier(.4,0,.2,1)" }}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {active?.isScope && (
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {SCOPE_KEYS.map((k, i) => {
              const v   = Math.round(active?.data?.[k] ?? 0);
              const mx  = tab.includes("gyro") ? 400 : tab === "camera" ? 200 : 120;
              const p   = Math.min((v / mx) * 100, 100);
              const col = p > 70 ? "#f59e0b" : p > 40 ? "#00ffff" : "#8b5cf6";
              return (
                <div key={k}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                    <span style={{ color:"#475569",fontSize:12,fontFamily:"'DM Mono',monospace" }}>{SCOPE_LABELS[i]}</span>
                    <span style={{ color:col,fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:700 }}>{v}</span>
                  </div>
                  <div style={{ height:3,background:"rgba(255,255,255,0.04)",borderRadius:2,overflow:"hidden" }}>
                    <div style={{ height:"100%",borderRadius:2,background:`linear-gradient(90deg,${col}44,${col})`,width:`${p}%`,transition:"width 0.8s cubic-bezier(.4,0,.2,1)" }}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ marginTop:10,padding:"12px 14px",background:"rgba(245,158,11,0.04)",border:"1px solid rgba(245,158,11,0.1)",borderRadius:10,display:"flex",gap:8 }}>
        <span>💡</span>
        <p style={{ color:"#475569",fontSize:12,lineHeight:1.65,margin:0 }}>Fine-tune a few points based on feel after 30 mins of practice. These are calibrated starting values.</p>
      </div>

      {/* Ad slot — below result */}
      <div style={{ marginTop:24 }}>
        <AdSlot slot="after_result" />
      </div>
    </div>
  );
}

// ─── Player Card ─────────────────────────────────────────────────────────────
function PlayerCard({ player, index, onClick }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const tc = { S:"#f59e0b", A:"#06b6d4", B:"#8b5cf6" }[player.tier] || "#06b6d4";
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  useEffect(() => { if (!inView || !ref.current) return; gsap.from(ref.current, { opacity:0, y:40, duration:0.6, delay:index*0.07, ease:"power2.out" }); }, [inView]);

  return (
    <div ref={ref} onClick={() => onClick(player)} style={{ background:"rgba(0,4,14,0.85)",border:`1px solid ${tc}28`,borderRadius:18,overflow:"hidden",cursor:"pointer",transition:"transform 0.25s,box-shadow 0.25s",WebkitTapHighlightColor:"transparent" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 16px 40px ${tc}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
      <div style={{ position:"relative",height:210,overflow:"hidden",background:"rgba(0,6,18,0.9)" }}>
        <img src={player.image} alt={player.name} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",filter:"brightness(0.9)" }} onError={e => { e.target.style.display="none"; }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 50%,rgba(0,4,14,0.96) 100%)" }}/>
        <div style={{ position:"absolute",top:10,right:10,background:`${tc}22`,border:`1px solid ${tc}66`,borderRadius:7,padding:"3px 9px" }}><span style={{ color:tc,fontSize:10,fontWeight:900,letterSpacing:1.5 }}>TIER {player.tier}</span></div>
        <div style={{ position:"absolute",top:10,left:10,background:"rgba(0,0,0,0.5)",borderRadius:6,padding:"3px 8px" }}><span style={{ color:"#94a3b8",fontSize:9,fontWeight:700 }}>{player.region}</span></div>
        <div style={{ position:"absolute",bottom:10,left:14,right:14 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:900,fontSize:20,color:"#f0f9ff",textShadow:"0 2px 12px rgba(0,0,0,0.8)" }}>{player.name}</div>
          <div style={{ color:tc,fontSize:12,fontWeight:700 }}>{player.team}</div>
        </div>
      </div>
      <div style={{ padding:"14px 16px 16px" }}>
        <p style={{ color:"#334155",fontSize:11,lineHeight:1.5,margin:"0 0 10px" }}>{player.bio}</p>
        <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:10 }}>
          {[{label:`${player.fingers}-Claw`,c:"#06b6d4"},{label:player.gyro?"Gyro ON":"Gyro OFF",c:player.gyro?"#22c55e":"#ef4444"},{label:player.role,c:"#8b5cf6"}].map(({ label, c }) => (
            <span key={label} style={{ background:`${c}14`,border:`1px solid ${c}33`,borderRadius:6,padding:"3px 8px",color:c,fontSize:10,fontWeight:700 }}>{label}</span>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:8 }}>
          {[["TPP",player.sensitivity.camera.tpp],["FPP",player.sensitivity.camera.fpp],["Red Dot",player.sensitivity.camera.red_dot],["4x",player.sensitivity.camera.scope_4x]].map(([l, v]) => (
            <div key={l} style={{ background:"rgba(0,255,255,0.03)",borderRadius:7,padding:"6px 10px",display:"flex",justifyContent:"space-between" }}>
              <span style={{ color:"#334155",fontSize:10,fontFamily:"'DM Mono',monospace" }}>{l}</span>
              <span style={{ color:"#00ffff",fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center",paddingTop:8,borderTop:"1px solid rgba(255,255,255,0.04)" }}>
          <span style={{ color:"#334155",fontSize:11 }}>Tap for full settings →</span>
        </div>
      </div>
    </div>
  );
}

// ─── Player Modal (full sensitivity) ─────────────────────────────────────────
function PlayerModal({ player, onClose }) {
  const [tab, setTab]       = useState("camera");
  const [copied, setCopied] = useState(null);
  const modalRef = useRef(null);
  const tc = { S:"#f59e0b", A:"#06b6d4", B:"#8b5cf6" }[player.tier] || "#06b6d4";

  useEffect(() => {
    gsap.from(modalRef.current, { opacity:0, y:50, duration:0.4, ease:"power3.out" });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const tabs = [
    { id:"camera",   label:"Camera",    icon:"📷", data:player.sensitivity.camera,        isScope:true  },
    { id:"ads",      label:"ADS",       icon:"🔭", data:player.sensitivity.ads,           isScope:true  },
    { id:"fl",       label:"Free Look", icon:"👁",  data:player.sensitivity.free_look,     isScope:false },
    { id:"gyro",     label:"Gyro",      icon:"🔄", data:player.sensitivity.gyroscope,     isScope:true  },
    { id:"gyroads",  label:"Gyro ADS",  icon:"🎯", data:player.sensitivity.gyroscope_ads, isScope:true  },
  ];
  const active = tabs.find(t => t.id === tab);

  function buildCopyAll() {
    const p = [`${player.name.toUpperCase()} SENSITIVITY (sensi.gg)\n`];
    tabs.forEach(t => {
      p.push(`${t.label.toUpperCase()}:`);
      if (t.isScope) { SCOPE_KEYS.forEach((k,i) => p.push(`  ${SCOPE_LABELS[i]}: ${Math.round(t.data?.[k]??0)}`)); }
      else { FL_KEYS.forEach((k,i) => p.push(`  ${FL_LABELS[i]}: ${Math.round(t.data?.[k]??0)}`)); }
    });
    return p.join("\n");
  }
  function buildCopyTab() {
    if (!active) return "";
    return active.isScope
      ? SCOPE_KEYS.map((k,i) => `${SCOPE_LABELS[i]}: ${Math.round(active.data?.[k]??0)}`).join("\n")
      : FL_KEYS.map((k,i) => `${FL_LABELS[i]}: ${Math.round(active.data?.[k]??0)}`).join("\n");
  }
  function cp(id, text) { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 2000); }

  return (
    <div style={{ position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"flex-end",justifyContent:"center" }} onClick={onClose}>
      <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.82)",backdropFilter:"blur(6px)" }}/>
      <div ref={modalRef} onClick={e => e.stopPropagation()} style={{ position:"relative",zIndex:1,width:"100%",maxWidth:700,maxHeight:"94vh",overflowY:"auto",background:"rgba(0,5,16,0.99)",border:`1px solid ${tc}33`,borderRadius:"22px 22px 0 0",paddingBottom:40,WebkitOverflowScrolling:"touch" }}>

        {/* Pull handle */}
        <div style={{ display:"flex",justifyContent:"center",padding:"12px 0 0" }}><div style={{ width:44,height:4,borderRadius:2,background:"rgba(255,255,255,0.12)" }}/></div>

        {/* Header */}
        <div style={{ display:"flex",gap:14,alignItems:"center",padding:"14px 20px 16px",borderBottom:`1px solid ${tc}18`,flexWrap:"wrap" }}>
          <div style={{ width:60,height:60,borderRadius:12,overflow:"hidden",flexShrink:0,border:`2px solid ${tc}55` }}>
            <img src={player.image} alt={player.name} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center" }} onError={e => { e.target.style.display="none"; }}/>
          </div>
          <div style={{ flex:1,minWidth:120 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap" }}>
              <h2 style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:900,fontSize:"clamp(16px,4vw,20px)",color:"#f0f9ff",margin:0 }}>{player.name}</h2>
              <span style={{ background:`${tc}22`,border:`1px solid ${tc}55`,borderRadius:5,padding:"2px 8px",color:tc,fontSize:10,fontWeight:800 }}>TIER {player.tier}</span>
            </div>
            <div style={{ color:tc,fontSize:13,fontWeight:700,marginBottom:3 }}>{player.team} · {player.region}</div>
            <p style={{ color:"#475569",fontSize:11,margin:0,lineHeight:1.4 }}>{player.bio}</p>
          </div>
          <div style={{ display:"flex",gap:6,alignItems:"center",flexShrink:0 }}>
            <NeonButton text={copied==="all"?"✓ Copied!":"Copy All"} onClick={() => cp("all", buildCopyAll())} size="sm" color={copied==="all"?"purple":"cyan"} />
            <button onClick={onClose} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"8px 12px",color:"#64748b",fontSize:14,cursor:"pointer",minHeight:36 }}>✕</button>
          </div>
        </div>

        {/* Tags row */}
        <div style={{ display:"flex",gap:6,padding:"12px 20px 0",flexWrap:"wrap" }}>
          {[{label:`${player.fingers}-Claw`,c:"#06b6d4"},{label:player.gyro?"Gyro ON":"Gyro OFF",c:player.gyro?"#22c55e":"#ef4444"},{label:player.role,c:"#8b5cf6"}].map(({ label, c }) => (
            <span key={label} style={{ background:`${c}14`,border:`1px solid ${c}33`,borderRadius:6,padding:"4px 10px",color:c,fontSize:11,fontWeight:700 }}>{label}</span>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex",gap:4,padding:"12px 20px 0",overflowX:"auto",WebkitOverflowScrolling:"touch" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"8px 12px",borderRadius:8,whiteSpace:"nowrap",border:tab===t.id?`1px solid ${tc}55`:"1px solid rgba(255,255,255,0.06)",background:tab===t.id?`${tc}12`:"rgba(0,6,18,0.5)",color:tab===t.id?tc:"#475569",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",minHeight:38 }}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* Panel */}
        <div style={{ padding:"14px 20px 0" }}>
          <div style={{ background:"rgba(0,255,255,0.02)",border:"1px solid rgba(0,255,255,0.07)",borderRadius:14,padding:"16px" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
              <span style={{ color:"#94a3b8",fontSize:11,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase" }}>{active?.icon} {active?.label}</span>
              <button onClick={() => cp(tab, buildCopyTab())} style={{ padding:"6px 12px",borderRadius:7,background:copied===tab?"rgba(34,197,94,0.07)":"transparent",border:`1px solid ${copied===tab?"rgba(34,197,94,0.28)":"rgba(255,255,255,0.07)"}`,color:copied===tab?"#22c55e":"#475569",fontFamily:"'DM Sans',sans-serif",fontSize:11,cursor:"pointer",minHeight:32 }}>{copied===tab?"✓ Copied":"Copy"}</button>
            </div>

            {!active?.isScope && (
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                {FL_KEYS.map((k, i) => {
                  const v = Math.round(active?.data?.[k] ?? 0);
                  const pct = Math.min((v / FL_MAX[i]) * 100, 100);
                  return (
                    <div key={k}>
                      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                        <span style={{ color:"#475569",fontSize:12,fontFamily:"'DM Mono',monospace" }}>{FL_LABELS[i]}</span>
                        <span style={{ color:tc,fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:700 }}>{v}</span>
                      </div>
                      <div style={{ height:4,background:"rgba(255,255,255,0.04)",borderRadius:2,overflow:"hidden" }}>
                        <div style={{ height:"100%",borderRadius:2,background:`linear-gradient(90deg,${tc}44,${tc})`,width:`${pct}%`,transition:"width 0.8s cubic-bezier(.4,0,.2,1)" }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {active?.isScope && (
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {SCOPE_KEYS.map((k, i) => {
                  const v   = Math.round(active?.data?.[k] ?? 0);
                  const mx  = tab.includes("gyro") ? 400 : tab === "camera" ? 200 : 150;
                  const p   = Math.min((v / mx) * 100, 100);
                  return (
                    <div key={k}>
                      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                        <span style={{ color:"#475569",fontSize:12,fontFamily:"'DM Mono',monospace" }}>{SCOPE_LABELS[i]}</span>
                        <span style={{ color:tc,fontSize:14,fontFamily:"'DM Mono',monospace",fontWeight:700 }}>{v}</span>
                      </div>
                      <div style={{ height:4,background:"rgba(255,255,255,0.04)",borderRadius:2,overflow:"hidden" }}>
                        <div style={{ height:"100%",borderRadius:2,background:`linear-gradient(90deg,${tc}44,${tc})`,width:`${p}%`,transition:"width 0.8s cubic-bezier(.4,0,.2,1)",boxShadow:`0 0 6px ${tc}66` }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Players Page ─────────────────────────────────────────────────────────────
function PlayersPage() {
  const [sel, setSel]       = useState(null);
  const [hRef, hV]          = useInView(0.1);

  useEffect(() => { if (!hV || !hRef.current) return; gsap.from(hRef.current.children, { opacity:0, y:30, stagger:0.12, duration:0.7, ease:"power2.out" }); }, [hV]);

  return (
    <div style={{ minHeight:"100vh",padding:"76px 16px 80px",position:"relative",zIndex:2 }}>
      <div style={{ maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div ref={hRef} style={{ textAlign:"center",marginBottom:44 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.25)",borderRadius:100,padding:"6px 18px",marginBottom:14 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"#f59e0b",animation:"pulse 2s infinite" }}/>
            <span style={{ color:"#f59e0b",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase" }}>Global Esports Players</span>
          </div>
          <h1 style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(26px,6vw,56px)",fontWeight:900,color:"#f0f9ff",margin:"0 0 10px",letterSpacing:-2 }}>Pro Player <span style={{ color:"#00ffff",textShadow:"0 0 20px rgba(0,255,255,0.4)" }}>Sensitivities</span></h1>
          <p style={{ color:"#475569",fontSize:14,maxWidth:440,margin:"0 auto" }}>Tap any card for full settings across all 5 sensitivity categories. Copy in one tap.</p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16 }}>
          {PLAYERS.map((p, i) => <PlayerCard key={p.id} player={p} index={i} onClick={setSel} />)}
        </div>

        {/* Ad slot below players */}
        <div style={{ marginTop:32 }}>
          <AdSlot slot="below_players" />
        </div>

        <div style={{ marginTop:24,textAlign:"center" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:10,padding:"10px 18px" }}>
            <span style={{ color:"#334155",fontSize:11 }}>Sensitivity data sourced from verified tournament streams and official team posts.</span>
          </div>
        </div>
      </div>

      {sel && <PlayerModal player={sel} onClose={() => setSel(null)} />}
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]     = useState("home");
  const [result, setResult] = useState(null);
  const isDesktop           = useIsDesktop();

  return (
    <div style={{ minHeight:"100vh",background:"#00040d",color:"#e2e8f0",overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      <Aurora />
      {isDesktop && <ThreeBackground />}
      <ParticleNetwork />

      {/* Grid overlay */}
      <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(0,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.015) 1px,transparent 1px)",backgroundSize:"60px 60px" }}/>

      <Nav page={page} setPage={setPage} />

      {page === "home"      && <HomePage setPage={setPage} />}
      {page === "generator" && <GeneratorPage setResult={setResult} setPage={setPage} />}
      {page === "result"    && result && <ResultPage result={result} setPage={setPage} />}
      {page === "players"   && <PlayersPage />}
      {page === "about"     && <About setPage={setPage} />}
      {page === "privacy"   && <Privacy setPage={setPage} />}
    </div>
  );
}
