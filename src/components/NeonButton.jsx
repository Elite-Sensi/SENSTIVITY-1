import { useRef } from "react";
import gsap from "gsap";

const COLORS = {
  cyan:   { main: "#00ffff", glow: "rgba(0,255,255,",   textColor: "#000" },
  gold:   { main: "#f59e0b", glow: "rgba(245,158,11,",  textColor: "#000" },
  purple: { main: "#8b5cf6", glow: "rgba(139,92,246,",  textColor: "#fff" },
};
const SIZES = {
  sm: { padding: "9px 20px",  fontSize: "12px", minHeight: "36px" },
  md: { padding: "13px 32px", fontSize: "14px", minHeight: "44px" },
  lg: { padding: "16px 44px", fontSize: "16px", minHeight: "52px" },
};

export default function NeonButton({ text, onClick, color="cyan", size="md", disabled=false, loading=false }) {
  const btnRef = useRef(null);
  const { main, glow } = COLORS[color] || COLORS.cyan;
  const { padding, fontSize, minHeight } = SIZES[size] || SIZES.md;

  const onEnter = () => { if(disabled||loading)return; gsap.to(btnRef.current,{scale:1.06,duration:0.2,ease:"power2.out",boxShadow:`0 0 22px ${glow}0.9), 0 0 44px ${glow}0.5)`}); };
  const onLeave = () => { if(disabled||loading)return; gsap.to(btnRef.current,{scale:1,duration:0.25,ease:"power2.inOut",boxShadow:`0 0 10px ${glow}0.55), 0 0 22px ${glow}0.28)`}); };
  const onPress = (e) => { if(disabled||loading)return; gsap.fromTo(btnRef.current,{scale:0.96},{scale:1,duration:0.15,ease:"power2.out"}); onClick&&onClick(e); };

  return (
    <button
      ref={btnRef}
      onClick={onPress}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      disabled={disabled||loading}
      style={{
        padding, fontSize, minHeight,
        fontFamily:"'DM Sans',sans-serif", fontWeight:800,
        letterSpacing:"0.06em", textTransform:"uppercase",
        cursor: disabled||loading ? "not-allowed" : "pointer",
        border: `1.5px solid ${disabled?"#334155":main}`,
        borderRadius: 10,
        background: disabled ? "rgba(255,255,255,0.03)" : `linear-gradient(135deg,${glow}0.13) 0%,${glow}0.04) 100%)`,
        color: disabled ? "#475569" : main,
        boxShadow: disabled ? "none" : `0 0 10px ${glow}0.55), 0 0 22px ${glow}0.28)`,
        display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        position:"relative", overflow:"hidden",
        WebkitTapHighlightColor:"transparent",
      }}
    >
      {!disabled&&!loading&&(
        <span style={{position:"absolute",inset:0,background:`linear-gradient(90deg,transparent 0%,${glow}0.12) 50%,transparent 100%)`,animation:"shimmer 2.5s infinite",pointerEvents:"none"}}/>
      )}
      {loading&&(
        <span style={{width:14,height:14,border:`2px solid ${glow}0.3)`,borderTopColor:main,borderRadius:"50%",animation:"spin 0.7s linear infinite",flexShrink:0}}/>
      )}
      <span style={{position:"relative",zIndex:1}}>{loading?"Processing...":text}</span>
    </button>
  );
}
