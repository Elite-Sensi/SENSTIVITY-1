import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;
    const stars = Array.from({length: 200}, () => ({x:Math.random(),y:Math.random(),r:Math.random()*1.1+0.2,op:Math.random()*0.4+0.05}));
    function torusKnot(t2){const r=Math.cos(3*t2)+2;return{x:r*Math.cos(2*t2),y:r*Math.sin(2*t2),z:-Math.sin(3*t2)};}
    function project(x,y,z,rot){const c=Math.cos(rot),s=Math.sin(rot),x2=x*c-z*s,z2=x*s+z*c,sc=32/(z2+6);return{sx:cx()+x2*sc*Math.min(canvas.width,canvas.height)/8,sy:cy()+y*sc*Math.min(canvas.width,canvas.height)/8,depth:z2};}
    const STEPS = 160;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s=>{ctx.beginPath();ctx.arc(s.x*canvas.width,s.y*canvas.height,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(6,182,212,${s.op})`;ctx.fill();});
      const pts=[];
      for(let i=0;i<=STEPS;i++){const a=(i/STEPS)*Math.PI*2;const p=torusKnot(a);pts.push(project(p.x,p.y,p.z,t));}
      for(let i=1;i<pts.length;i++){const a=Math.max(0.03,Math.min(0.45,(pts[i].depth+4)/8));ctx.strokeStyle=`rgba(0,255,255,${a})`;ctx.lineWidth=0.7;ctx.beginPath();ctx.moveTo(pts[i-1].sx,pts[i-1].sy);ctx.lineTo(pts[i].sx,pts[i].sy);ctx.stroke();}
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:0.55}}/>;
}
