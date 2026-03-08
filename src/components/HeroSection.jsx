import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NeonButton from "./NeonButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onGenerate }) {
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const btnRef     = useRef(null);
  const mockupRef  = useRef(null);
  const statsRef   = useRef(null);
  const scanRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(eyebrowRef.current, { opacity:0, y:30, duration:0.8 })
        .from(headingRef.current, { opacity:0, y:50, duration:1.0 }, "-=0.4")
        .from(subRef.current,     { opacity:0, y:30, duration:0.9 }, "-=0.5")
        .from(btnRef.current,     { opacity:0, y:20, duration:0.7 }, "-=0.4")
        .from(mockupRef.current,  { opacity:0, y:40, scale:0.96, duration:1.0 }, "-=0.3");
      if(statsRef.current){ gsap.from(statsRef.current.children,{opacity:0,y:30,stagger:0.12,duration:0.7,ease:"power2.out",scrollTrigger:{trigger:statsRef.current,start:"top 85%"}}); }
      if(scanRef.current){ gsap.to(scanRef.current,{scaleX:1,duration:1.2,ease:"power2.inOut",delay:0.4}); }
    });
    return () => ctx.revert();
  }, []);

  const mockVals = [
    { l:"TPP Camera", v:110, max:200, c:"#06b6d4" },
    { l:"Red Dot ADS", v:58,  max:120, c:"#f59e0b" },
    { l:"4× Scope",   v:27,  max:80,  c:"#8b5cf6" },
    { l:"Gyro TPP",   v:300, max:400, c:"#22c55e" },
  ];

  return (
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"100px 16px 60px",textAlign:"center",position:"relative",zIndex:2}}>

      <div ref={eyebrowRef} style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,255,255,0.06)",border:"1px solid rgba(0,255,255,0.22)",borderRadius:100,padding:"6px 16px",marginBottom:24}}>
        <span style={{width:6,height:6,borderRadius:"50%",background:"#00ffff",boxShadow:"0 0 8px #00ffff",display:"inline-block",animation:"pulse 2s infinite"}}/>
        <span style={{color:"#00ffff",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>AI-Powered · Esports Grade · Free</span>
      </div>

      <div ref={headingRef} style={{position:"relative",marginBottom:20,width:"100%"}}>
        <h1 style={{fontFamily:"'DM Sans',sans-serif",fontWeight:900,fontSize:"clamp(46px,13vw,118px)",lineHeight:0.92,letterSpacing:"-0.04em",margin:0,textShadow:"0 0 40px rgba(0,255,255,0.15)"}}>
          <span style={{display:"block",color:"#f0f9ff"}}>Precision</span>
          <span style={{display:"block",background:"linear-gradient(90deg,#00ffff 0%,#06b6d4 35%,#f59e0b 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:"drop-shadow(0 0 20px rgba(0,255,255,0.3))"}}>Engineered.</span>
        </h1>
        <span ref={scanRef} style={{display:"block",height:2,background:"linear-gradient(90deg,transparent,#00ffff,transparent)",transformOrigin:"left",transform:"scaleX(0)",marginTop:8,borderRadius:1,boxShadow:"0 0 12px #00ffff"}}/>
      </div>

      <p ref={subRef} style={{color:"#64748b",fontSize:"clamp(14px,3.5vw,18px)",maxWidth:460,lineHeight:1.7,margin:"0 auto 32px",fontFamily:"'DM Sans',sans-serif",padding:"0 8px"}}>
        The only PUBG Mobile sensitivity tool trained on real esports data. Machine learning meets millisecond precision.
      </p>

      <div ref={btnRef}>
        <NeonButton text="Generate Sensitivity" onClick={onGenerate} size="lg" color="cyan"/>
      </div>

      <div ref={mockupRef} style={{marginTop:48,width:"min(600px,92vw)"}}>
        <div style={{background:"rgba(0,255,255,0.03)",border:"1px solid rgba(0,255,255,0.12)",borderRadius:18,padding:2,boxShadow:"0 0 60px rgba(0,255,255,0.07),0 30px 70px rgba(0,0,0,0.7)"}}>
          <div style={{background:"rgba(0,4,14,0.97)",borderRadius:16,padding:"18px 18px"}}>
            <div style={{display:"flex",gap:6,marginBottom:14}}>
              {["#ef4444","#f59e0b","#22c55e"].map(c=><div key={c} style={{width:9,height:9,borderRadius:"50%",background:c}}/>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {mockVals.map(({l,v,max,c})=>(
                <div key={l}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#475569",fontSize:10,fontFamily:"'DM Mono',monospace"}}>{l}</span>
                    <span style={{color:c,fontSize:11,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{v}</span>
                  </div>
                  <div style={{height:3,background:"rgba(255,255,255,0.05)",borderRadius:2}}>
                    <div style={{height:"100%",borderRadius:2,width:`${(v/max)*100}%`,background:`linear-gradient(90deg,${c}55,${c})`,boxShadow:`0 0 6px ${c}88`}}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,padding:"10px 12px",background:"rgba(0,255,255,0.05)",borderRadius:9,border:"1px solid rgba(0,255,255,0.12)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#475569",fontSize:10,fontFamily:"'DM Mono',monospace"}}>confidence</span>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 6px #22c55e"}}/>
                <span style={{color:"#22c55e",fontSize:11,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>98% — Exact Match</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={statsRef} style={{display:"flex",gap:"clamp(18px,6vw,48px)",flexWrap:"wrap",justifyContent:"center",marginTop:44}}>
        {[["50+","Pro Players"],["32","Sensitivity Fields"],["3-Tier","AI Matching"],["<80ms","Response Time"]].map(([n,l])=>(
          <div key={l} style={{textAlign:"center",minWidth:60}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(20px,5vw,42px)",fontWeight:900,color:"#00ffff",lineHeight:1,letterSpacing:-1,textShadow:"0 0 20px rgba(0,255,255,0.5)"}}>{n}</div>
            <div style={{color:"#334155",fontSize:11,marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
