import {useState,useEffect} from 'react'
import {motion,AnimatePresence,useSpring,useMotionValue,useTransform} from 'framer-motion'
import {D,TILE,Spr,Ic,Scene,Leaves} from './art'
const ease=[.2,.7,.1,1],spring={stiffness:150,damping:15}
const L=[["Home","top"],["Shop","shop"],["Our Story","values"],["Contact","contact"]]
const Logo=({h})=><><img className="lgl" src="/logo-brown.png" alt="Lovely Habit"/><img className="lgd" src="/logo-gold.png" alt="Lovely Habit"/></>
const Rv=({d=0,children,cls=""})=><motion.div className={cls} initial={{opacity:0,y:34}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:1.1,ease,delay:d}}>{children}</motion.div>
function Card({x,i,onAdd,added}){
 const mx=useMotionValue(0),my=useMotionValue(0),rx=useSpring(useTransform(my,[-.5,.5],[12,-12]),spring),ry=useSpring(useTransform(mx,[-.5,.5],[-16,16]),spring)
 const move=e=>{const r=e.currentTarget.getBoundingClientRect();mx.set((e.clientX-r.left)/r.width-.5);my.set((e.clientY-r.top)/r.height-.5)}
 return <Rv d={i*.1}><motion.div className="cd" style={{"--t":x.t}} whileHover="h" onPointerMove={move} onPointerLeave={()=>{mx.set(0);my.set(0)}}>
  <Spr k={x.k}/>{[0,1,2,3,4].map(b=><motion.span key={b} className="bb" style={{left:`${12+b*17}%`}} variants={{h:{opacity:[0,.95,0],y:-170,transition:{duration:1.9+b*.25,repeat:Infinity,delay:b*.2}}}}/>)}
  <motion.div style={{rotateX:rx,rotateY:ry,transformPerspective:700}}><div className="sb" style={{"--c":x.c,"--c2":x.c2,"--sp":x.sp}}><i/><img className="stamp" src="/logo-brown.png" alt=""/></div></motion.div>
  <h3>{x.n}</h3><p>{x.d}</p><div className="cr"><span className="pc">₹{x.p}</span>
  <motion.button whileTap={{scale:.92}} className={"add"+(added?" ok":"")} onClick={onAdd}>{added?"Added ✓":"Add to bag"}</motion.button></div></motion.div></Rv>}
export default function App(){
 const [bag,setBag]=useState({}),[open,setOpen]=useState(false),[sc,setSc]=useState(false),[mn,setMn]=useState(false),[go,setGo]=useState(false),[sp,setSp]=useState("top"),[ad,setAd]=useState(null)
 const hx=useMotionValue(0),hy=useMotionValue(0),px=useSpring(hx,{stiffness:60,damping:18}),py=useSpring(hy,{stiffness:60,damping:18})
 useEffect(()=>{const t=setTimeout(()=>setGo(true),matchMedia("(prefers-reduced-motion:reduce)").matches?0:1800);return()=>clearTimeout(t)},[])
 useEffect(()=>{let q=0;const R=document.documentElement.style;const f=()=>{q||(q=requestAnimationFrame(()=>{q=0;R.setProperty("--sy",scrollY);setSc(scrollY>20)}))};f();addEventListener("scroll",f,{passive:true})
  const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setSp(e.target.id)),{rootMargin:"-45% 0px -50% 0px"});L.forEach(l=>o.observe(document.getElementById(l[1])))
  return()=>{removeEventListener("scroll",f);o.disconnect()}},[])
 useEffect(()=>{document.body.style.overflow=mn||open||!go?"hidden":""},[mn,open,go])
 const n=Object.values(bag).reduce((a,b)=>a+b,0),tot=D.reduce((a,x,i)=>a+(bag[i]||0)*x.p,0)
 const chg=(i,d)=>setBag(b=>({...b,[i]:Math.max(0,(b[i]||0)+d)})),add=i=>{chg(i,1);setOpen(true);setAd(i);setTimeout(()=>setAd(null),1400)},close=()=>setMn(false)
 return <div className={go?"go":""}>
  <div className={"ld "+(go?"x":"")}><img className="big" src="/logo-brown.png" alt="Lovely Habit"/><motion.img src="/flower-brown.png" alt="" width="34" animate={{rotate:360}} transition={{duration:3,repeat:Infinity,ease:"linear"}}/></div>
 <div className="tb">Free shipping on orders above ₹999</div>
 <header className={sc?"s":""}><div className="w nv"><a href="#top" className="lg" onClick={close}><motion.span style={{display:"block"}} whileHover={{rotate:-3,scale:1.05}}><Logo/></motion.span></a>
  <nav>{L.map(l=><a key={l[1]} href={"#"+l[1]} className={sp===l[1]?"c":""}>{l[0]}</a>)}</nav>
  <div className="ic"><a className="ib" href="#shop" aria-label="Search"><Ic d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3"/></a>
   <button className="ib" aria-label="Bag" onClick={()=>setOpen(true)}><Ic d="M6 8h12l1 12H5L6 8zM9 8a3 3 0 0 1 6 0"/>{n?<b key={n}>{n}</b>:null}</button>
   <button className={"ib hb "+(mn?"o":"")} aria-label="Menu" onClick={()=>setMn(!mn)}><i/><i/></button></div></div></header>
 <div className={"mn "+(mn?"o":"")}>{L.map(l=><a key={l[1]} href={"#"+l[1]} onClick={close}>{l[0]}</a>)}</div>

 <div className="hero" id="top" onPointerMove={e=>{hx.set((e.clientX/innerWidth-.5)*-26);hy.set((e.clientY/innerHeight-.5)*-18)}}><Leaves/>
  <motion.div aria-hidden className="absolute -z-[1] right-[6%] top-[18%] h-[420px] w-[420px] rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(255,244,214,.75),rgba(255,244,214,0) 68%)",filter:"blur(8px)"}} animate={{scale:[1,1.08,1],opacity:[.55,.85,.55]}} transition={{duration:9,repeat:Infinity,ease:"easeInOut"}}/>
  <motion.div aria-hidden className="absolute -z-[1] inset-y-0 left-0 w-[28%] pointer-events-none" style={{background:"linear-gradient(100deg,transparent,rgba(255,255,255,.3),transparent)",skewX:-14}} initial={{x:"-60%"}} animate={{x:"420%"}} transition={{duration:2.6,ease:[.4,0,.2,1],repeat:Infinity,repeatDelay:8,delay:2.2}}/>
  <div className="hg"><div>
   <div className="eb fd" style={{animationDelay:".4s"}}>Indian botanical soaps</div>
   <h1><span className="mk"><span style={{animationDelay:".2s"}}>Care, Crafted</span></span><span className="mk"><span style={{animationDelay:".38s"}}>with Nature</span></span></h1>
   <p className="ht fd" style={{animationDelay:".8s"}}>Soap bars that bring together botanical goodness and timeless self-care rituals.</p>
   <motion.a className="bt fd" href="#shop" style={{animationDelay:"1s"}} whileHover={{scale:1.04}} whileTap={{scale:.96}}><span>Shop Now</span><Ic d="M5 12h14M13 6l6 6-6 6" w={18}/></motion.a></div>
  <div className="sc"><Scene px={px} py={py}/></div></div></div>
 <div className="f4">{["Botanical Ingredients","Small Batch","Gentle on Skin","Thoughtfully Made"].map((t,i)=><motion.div key={t} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.12,duration:.7}}>{t}</motion.div>)}</div>

 <section id="shop"><div className="w"><Rv><div className="sh"><h2>Our Soaps</h2><span>Cold-process · Small batch</span></div></Rv>
  <div className="gr">{D.map((x,i)=><Card key={i} x={x} i={i} added={ad===i} onAdd={()=>add(i)}/>)}</div></div></section>

 <div className="tl" style={{backgroundImage:TILE}}/>
 <section className="vl" id="values"><motion.img src="/flower-gold.png" alt="" aria-hidden animate={{rotate:360}} transition={{duration:80,repeat:Infinity,ease:"linear"}} className="absolute -right-20 top-10 w-[360px] opacity-[.06] pointer-events-none"/>
  <div className="w"><Rv><div className="eb" style={{marginBottom:14}}>Our story</div><h2 style={{fontSize:"clamp(36px,5vw,66px)",lineHeight:1.04,maxWidth:720}}>Nature, thoughtful ingredients, and the pleasure of ritual.</h2></Rv>
  <div className="vg">{[["Botanical First","Plant-based ingredients chosen with intention and care."],["Small Batch","Made in small batches, the way good soap should be."],["Gentle on Skin","Herbs, flowers and plant oils, chosen for how they feel."],["Everyday Rituals","Cold-process soaps designed for daily use, not just special occasions."]].map((r,i)=>
   <motion.div key={r[0]} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.14,duration:.9,ease}}><i>0{i+1}</i><h3>{r[0]}</h3><p>{r[1]}</p></motion.div>)}</div></div></section>

 <footer className="ftr" id="contact"><div className="w"><motion.div className="big" initial={{y:"40%",opacity:0}} whileInView={{y:0,opacity:.95}} viewport={{once:true}} transition={{duration:1.2,ease}}>Lovely Habit</motion.div>
  <div className="fg"><div><img src="/logo-gold.png" alt="Lovely Habit" width="190" style={{marginBottom:22}}/><h4>Small rituals. Lovely habits.</h4><p style={{maxWidth:340,margin:0}}>Join us for new batches and quiet notes.</p>
   <form onSubmit={e=>{e.preventDefault();e.target.reset()}}><input type="email" required placeholder="Email address" aria-label="Email"/><button>Subscribe</button></form></div>
  <div><h4>Explore</h4><a href="#top">Home</a><a href="#shop">Shop</a><a href="#values">Our Story</a></div>
  <div><h4>Contact</h4><a href="#contact">hello@lovelyhabit.in</a><a href="#contact">Instagram</a></div></div><div className="cp">© 2026 Lovely Habit™</div></div></footer>

 <AnimatePresence>{open&&<>
  <motion.div key="k" className="sk o" style={{transition:"none"}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/>
  <motion.aside key="d" className="dw o" style={{transition:"none"}} initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:32,stiffness:260}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h3 style={{fontSize:32}}>Your bag</h3><button className="add" onClick={()=>setOpen(false)}>Close</button></div>
   <div style={{flex:1,overflow:"auto",marginTop:20}}><AnimatePresence initial={false}>{n?D.map((x,i)=>bag[i]?<motion.div layout key={i} className="it" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,height:0,paddingBlock:0}}><span>{x.n}<br/><small style={{color:"var(--soft)"}}>₹{x.p}</small></span>
    <span className="qty"><button aria-label="Remove one" onClick={()=>chg(i,-1)}>−</button><b>{bag[i]}</b><button aria-label="Add one" onClick={()=>chg(i,1)}>+</button></span><span>₹{x.p*bag[i]}</span></motion.div>:null):<p style={{color:"var(--soft)"}}>Your bag is empty.</p>}</AnimatePresence></div>
   <div className="it" style={{border:0}}><span className="eb">Total</span><motion.span key={tot} initial={{scale:1.25}} animate={{scale:1}} className="sf" style={{fontSize:28}}>₹{tot}</motion.span></div>
   <button className="bt" style={{justifyContent:"center"}}><span>Checkout</span></button></motion.aside></>}</AnimatePresence>
 </div>}
