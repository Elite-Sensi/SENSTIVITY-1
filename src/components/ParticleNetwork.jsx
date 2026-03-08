import { useEffect, useRef } from "react";

export default function ParticleNetwork() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const count = Math.min(60, Math.floor(window.innerWidth / 20));
    const pts = Array.from({length: count}, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()-0.5)*0.0004, vy: (Math.random()-0.5)*0.0004,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      pts.forEach(p => { p.x=(p.x+p.vx+1)%1; p.y=(p.y+p.vy+1)%1; });
      pts.forEach((a, i) => {
        pts.slice(i+1).forEach(b => {
          const dx=(a.x-b.x)*w, dy=(a.y-b.y)*h, dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<120){
            ctx.strokeStyle=`rgba(0,255,255,${(1-dist/120)*0.12})`;
            ctx.lineWidth=0.5;
            ctx.beginPath(); ctx.moveTo(a.x*w,a.y*h); ctx.lineTo(b.x*w,b.y*h); ctx.stroke();
          }
        });
        ctx.beginPath(); ctx.arc(a.x*w,a.y*h,1.2,0,Math.PI*2);
        ctx.fillStyle="rgba(0,255,255,0.25)"; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}
