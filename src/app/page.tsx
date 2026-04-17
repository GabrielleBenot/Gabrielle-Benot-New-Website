"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionTemplate } from 'framer-motion';
import Lenis from 'lenis';

const artwork = [
  { slug: 'equine', srcs: ['/art1.png', '/art2.png', '/art3.png', '/art1.png'], title: 'EQUINE ART', desc: 'ORIGINALS', galleryLink: 'https://gabriellebenot.com/' },
  { slug: 'faces', srcs: ['/art3.png', '/art1.png', '/art2.png', '/art3.png'], title: 'FACES', desc: 'MIXED MEDIA', galleryLink: 'https://gabriellebenot.com/' },
  { slug: 'abstracts', srcs: ['/art2.png', '/art3.png', '/art1.png', '/art2.png'], title: 'ABSTRACTS', desc: 'MULTIMEDIA', galleryLink: 'https://gabriellebenot.com/' },
  { slug: 'flora', srcs: ['/art3.png', '/art1.png', '/art2.png', '/art3.png'], title: 'FLORA & FAUNA', desc: 'NATURE STUDIES', galleryLink: 'https://gabriellebenot.com/' },
  { slug: 'metal', srcs: ['/art1.png', '/art2.png', '/art3.png', '/art1.png'], title: 'WORKS ON METAL', desc: 'INDUSTRIAL', galleryLink: 'https://gabriellebenot.com/' },
  { slug: 'parallax', srcs: ['/art2.png', '/art3.png', '/art1.png', '/art2.png'], title: 'PARALLAX ART', desc: 'SPECIAL EFFECTS', galleryLink: 'https://gabriellebenot.com/' },
  { slug: 'speed', srcs: ['/art3.png', '/art1.png', '/art2.png', '/art3.png'], title: 'SPEED', desc: 'AUTOMOTIVE SERIES', galleryLink: 'https://gabriellebenot.com/' },
  { slug: 'textiles', srcs: ['/art1.png', '/art2.png', '/art1.png', '/art3.png'], title: 'BESPOKE TEXTILES', desc: 'RUGS & ARCHITECTURAL OBJECTS', galleryLink: '#' },
];

const navGroups = [
  {
    title: '[ COLLECTIONS ]',
    links: [
      { name: 'EQUINE ART', href: '#equine', isGallery: true, slug: 'equine' },
      { name: 'FACES', href: '#faces', isGallery: true, slug: 'faces' },
      { name: 'ABSTRACTS', href: '#abstracts', isGallery: true, slug: 'abstracts' },
    ]
  },
  {
    title: '[ EXPLORATIONS ]',
    links: [
      { name: 'FLORA & FAUNA', href: '#flora', isGallery: true, slug: 'flora' },
      { name: 'WORKS ON METAL', href: '#metal', isGallery: true, slug: 'metal' },
      { name: 'PARALLAX ART', href: '#parallax', isGallery: true, slug: 'parallax' },
      { name: 'SPEED', href: '#speed', isGallery: true, slug: 'speed' },
      { name: 'TEXTILES & RUGS', href: '#textiles', isGallery: true, slug: 'textiles' }
    ]
  },
  {
    title: '[ INFO ]',
    links: [
      { name: 'BIOGRAPHY', href: '#bio' },
      { name: 'COMMISSIONS', href: '#', isAction: true, action: 'INQUIRY' }
    ]
  }
];

function TypewriterText({ text, delay = 0, speed = 25, className, style }: { text: string, delay?: number, speed?: number, className?: string, style?: any }) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, iteration));
      if (iteration > text.length) clearInterval(interval);
      iteration++;
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return <div className={className} style={{...style, whiteSpace: 'pre-line'}}>{displayText}</div>;
}

function IndependentFlipTile({ src, idx, title, onSelect }: { src: string, idx: number, title: string, onSelect: () => void }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const dimensionStyle = { aspectRatio: '1/1' };
  
  // Archival Museum Meta-Data generated on flip
  const ART_QUOTES = [
     `[ CATALOGUE NO. 0${Math.floor(Math.random()*99)} // OIL & ACRYLIC ON LINEN // 120x180 CM ]`,
     `[ COMPOSITION: INDUSTRIAL METAL, RAW PIGMENT, KINETIC FRICTION ]`,
     `[ ORIGIN: LOS ANGELES STUDIO // ACQUISITION STATUS: AVAILABLE ]`,
     `[ VELOCITY . TENSION . RUPTURE ]`,
     `[ CATALOGUE NO. 0${Math.floor(Math.random()*99)} // MIXED MEDIA IMPASTO // ARCHIVALLY ISOLATED ]`,
     `[ EXHIBITION STATUS: PRIVATE RESIDENCE COLLECTION // NOT FOR SALE ]`,
     `[ DECONSTRUCTION . ABSTRACT FORM . PERCEPTUAL SHIFT ]`
  ];
  const myQuote = useRef(ART_QUOTES[Math.floor(Math.random()*ART_QUOTES.length)]);
  
  const [overlayText, setOverlayText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRevealed) {
      let iteration = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setOverlayText(myQuote.current.slice(0, Math.floor(iteration)));
        if (iteration >= myQuote.current.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        iteration += 0.8;
      }, 20);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setOverlayText("");
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); }
  }, [isRevealed]);

  return (
    <div className="flip-scene" style={{ ...dimensionStyle, cursor: isRevealed ? 'zoom-in' : 'crosshair' }}  
         onMouseEnter={() => setIsRevealed(true)}
         onMouseLeave={() => setIsRevealed(false)}
         onClick={() => { if (isRevealed) onSelect(); }}
    >
      <div className="flip-card" style={{ transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div className="flip-face flip-face--front">
           <h3 className="typewriter" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em', opacity: 0.8 }}>VOL. {idx + 1}</h3>
        </div>
        <div className="flip-face flip-face--back liquid-hover" style={{ position: 'relative' }}>
           <Image src={src} fill style={{ objectFit: 'cover', filter: 'contrast(1.1)' }} alt={`${title} Piece ${idx+1}`}/>
           {/* Edgy Fragment Overlay */}
           {isRevealed && (
               <div className="typewriter" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '4rem 2rem 2rem 2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)', color: '#eaeaea', fontSize: '0.8rem', lineHeight: '1.4', letterSpacing: '0.15em', zIndex: 10 }}>
                   {overlayText}<span style={{ animation: 'jitter 1s infinite', opacity: overlayText.length >= myQuote.current.length ? 0 : 1 }}>_</span>
               </div>
           )}
        </div>
      </div>
    </div>
  );
}

function ParallaxImage({ src, alt }: { src: string, alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <motion.div style={{ position: 'absolute', top: '-15%', left: '-15%', width: '130%', height: '130%', y }}>
         <Image src={src} fill style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} alt={alt} />
      </motion.div>
    </div>
  );
}

function CodeScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = "010101010987654321!@#$%^*XO";
    const original = text;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.6) return; // Sporadic trigger
      
      const idx = Math.floor(Math.random() * original.length);
      // Don't glitch empty space or slashes
      if (original[idx] === ' ' || original[idx] === '/' || original[idx] === '[' || original[idx] === ']') return;
      
      const scrambledArray = original.split('');
      const glitchLength = Math.floor(Math.random() * 5) + 3; // scrambles chunk of 3-7 chars
      
      for(let i=0; i<glitchLength; i++) {
         if (scrambledArray[idx+i] && scrambledArray[idx+i] !== ' ' && scrambledArray[idx+i] !== '/') {
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            scrambledArray[idx+i] = `<span style="color: var(--dada-red); text-shadow: 0 0 8px var(--dada-red)">${randomChar}</span>`;
         }
      }
      ref.current!.innerHTML = scrambledArray.join('');
      
      // Glitch snapback
      setTimeout(() => {
         if (ref.current) ref.current.innerHTML = original;
      }, 120);
      
    }, 400);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span ref={ref} style={{ color: '#fff' }}>{text}</span>;
}

function InfiniteMarquee() {
  const text = " MULTIMEDIA EXPERIMENTATION /// THE GUSCIO TECHNIQUE /// KINETIC ABSTRACTION /// COLLISION OF CULTURE /// ";
  return (
    <div style={{ position: 'relative', width: 'calc(100% + 12vw)', overflow: 'hidden', padding: 'clamp(0.6rem, 1.5vw, 1.2rem) 0', margin: '6rem -6vw', backgroundColor: '#050505', whiteSpace: 'nowrap', display: 'flex', borderTop: '1px dashed var(--dada-red)', borderBottom: '1px dashed var(--dada-red)', zIndex: 0 }}>
       <div className="marquee-content typewriter" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', letterSpacing: '0.2em', fontWeight: 'bold', display: 'inline-block', lineHeight: 1 }}>
           <CodeScrambleText text={text} />
           <CodeScrambleText text={text} />
           <CodeScrambleText text={text} />
           <CodeScrambleText text={text} />
       </div>
    </div>
  );
}

const GalleryView = ({ slug, onBack, setExpandedImage, isDesktop }: { slug: string, onBack: () => void, setExpandedImage: any, isDesktop: boolean }) => {
   const collection = artwork.find(a => a.slug === slug);
   if (!collection) return null;
   
   // Simulating an extended deep archive with 16 placeholder images instead of just the 4 front pieces
   const extendedArchive = [...collection.srcs, ...collection.srcs, ...collection.srcs, ...collection.srcs];
   
   return (
     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ flex: 1, minWidth: 0, padding: isDesktop ? '4rem 8vw 10rem 8vw' : '1rem 6vw 10rem 6vw', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'sticky', top: isDesktop ? '1rem' : '70px', zIndex: 10, backgroundColor: 'var(--background)', padding: '1rem 0', alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
           <button onClick={onBack} onMouseEnter={(e)=>e.currentTarget.style.color='var(--dada-red)'} onMouseLeave={(e)=>e.currentTarget.style.color='#111'} className="typewriter" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', letterSpacing: '0.2em', color: '#111', padding: 0, transition: 'color 0.2s', borderBottom: '1px solid transparent' }}>
              [ ← RETURN TO FEED ]
           </button>
        </div>
        <div style={{ marginTop: '2rem', borderBottom: '2px solid #111', paddingBottom: '2rem', marginBottom: '4rem' }}>
          <h2 className="typewriter" style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)', fontWeight: 'bold', letterSpacing: '0.05em' }}>{collection.title}</h2>
          <p style={{ fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', color: '#555', marginTop: '1rem', letterSpacing: '0.1em' }} className="typewriter">{collection.desc} // EXTENDED STUDIO ARCHIVE</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: isDesktop ? '2rem' : '1rem' }}>
           {extendedArchive.map((src, i) => (
               <div key={i} onClick={() => setExpandedImage(src)} style={{ width: '100%', aspectRatio: '1/1', position: 'relative', border: '1px solid #111', cursor: 'zoom-in', overflow: 'hidden' }}>
                  <ParallaxImage src={src} alt={`${collection.title} Archive Piece ${i + 1}`} />
               </div>
           ))}
        </div>
     </motion.div>
   )
}

function GlitchLink({ link, setShowInquiryModal, setActiveGallery, isDesktop }: { link: any, setShowInquiryModal: any, setActiveGallery?: any, isDesktop: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const CHARS = "0101010987321!@#$%^*";
  const [displayText, setDisplayText] = useState(link.name);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      let iteration = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplayText(link.name.split('').map((char: string, index: number) => {
          if (index < iteration) return link.name[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join(''));
        if (iteration >= link.name.length) if (intervalRef.current) clearInterval(intervalRef.current);
        iteration += 1 / 3;
      }, 30);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(link.name);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, link.name]);

  // Magnetic Physics
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (ref.current && isDesktop) {
       const { height, width, left, top } = ref.current.getBoundingClientRect();
       const middleX = clientX - (left + width / 2);
       const middleY = clientY - (top + height / 2);
       setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
    }
  };
  const reset = () => setPosition({ x: 0, y: 0 });
  const smoothX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
       ref={ref}
       onMouseMove={handleMouse}
       onMouseLeave={() => { setIsHovered(false); reset(); }}
       onMouseEnter={() => setIsHovered(true)}
       style={{ x: smoothX, y: smoothY, display: 'inline-block' }}
    >
      <a 
        href={link.href}
        onClick={(e) => {
             if (link.isAction && link.action === 'INQUIRY') {
                 e.preventDefault();
                 setShowInquiryModal(true);
             } else if (link.isGallery && setActiveGallery) {
                 e.preventDefault();
                 setActiveGallery(link.slug);
             }
        }}
        style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: isHovered ? 'var(--dada-red)' : '#444', textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer', position: 'relative', display: 'block', padding: '0.5rem 0' }}
      >
        <span data-text={link.name}>{displayText}</span>
      </a>
    </motion.div>
  );
}

function SpotlightStatement({ isDesktop, mousePos }: { isDesktop: boolean, mousePos: {x:number, y:number} }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localMouse, setLocalMouse] = useState({ x: 500, y: 500 });
  
  // Interactive scroll-driven spotlight for mobile phones
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scrollYMapped = useTransform(scrollYProgress, [0, 1], [-20, 120]); // percentages
  const maskMobile = useMotionTemplate`radial-gradient(circle 200px at 50% ${scrollYMapped}%, black 10%, transparent 80%)`;
  const maskDesktop = `radial-gradient(circle 350px at ${localMouse.x}px ${localMouse.y}px, black 10%, transparent 80%)`;
  
  useEffect(() => {
    if (containerRef.current) {
       const rect = containerRef.current.getBoundingClientRect();
       setLocalMouse({ x: mousePos.x - rect.left, y: mousePos.y - rect.top });
    }
  }, [mousePos]);

  const statementText = "My art is an exploration of grace, movement, and the unseen threads that connect us. Through my signature 'Guscio' technique, I layer rich, sculptural textures that invite a deeply personal, tactile connection. Whether capturing the untamed spirit of equine silhouettes, the quiet harmony of biophilic forms, or the sweeping elegance of the Speed collection, my work seeks to transcend the canvas. It is a collision of high culture and raw human emotion - an invitation to pause, feel, and experience the world with renewed wonder.";

  return (
    <div ref={containerRef} style={{ marginTop: '8rem', paddingTop: '6rem', position: 'relative', overflow: 'hidden', paddingBottom: '6rem', backgroundColor: '#050505', color: '#111' }}>
       {/* Background text (Dark/Hidden) */}
       <div style={{ position: 'relative', zIndex: 1, padding: isDesktop ? '0 4rem' : '0 2rem' }}>
         <h2 className="typewriter" style={{ fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '3rem', color: '#222' }}>ARTIST STATEMENT</h2>
         <p style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', lineHeight: '1.6', maxWidth: '1000px', fontWeight: 'lighter', fontFamily: '"Didot", "Bodoni MT", "Garamond", serif', letterSpacing: '0.05em' }}>
            {statementText}
         </p>
       </div>
       
       {/* Illuminated text (Masked by mouse or scroll) */}
       <motion.div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: isDesktop ? '6rem 4rem' : '6rem 2rem', zIndex: 2, pointerEvents: 'none',
            backgroundColor: '#050505',
            color: '#fff',
            WebkitMaskImage: isDesktop ? maskDesktop : maskMobile,
            maskImage: isDesktop ? maskDesktop : maskMobile
       }}>
         <h2 className="typewriter" style={{ fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '3rem', color: 'var(--dada-red)' }}>ARTIST STATEMENT</h2>
         <p style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', lineHeight: '1.6', maxWidth: '1000px', fontWeight: 'lighter', fontFamily: '"Didot", "Bodoni MT", "Garamond", serif', letterSpacing: '0.05em' }}>
            {statementText}
         </p>
       </motion.div>
    </div>
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="typewriter"
      style={{
        position: 'absolute',
        top: '1.5rem',
        right: '5vw',
        background: 'none',
        border: '1px solid #333',
        backgroundColor: '#050505',
        color: 'var(--dada-red)',
        fontSize: '0.85rem',
        padding: '0.5rem 1rem',
        letterSpacing: '0.15em',
        cursor: 'pointer',
        zIndex: 10000
      }}
    >
      {copied ? '[ LINK COPIED ]' : '[ COPY LINK ]'}
    </button>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 800);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, width: '60px', height: '60px' }}
        >
           {/* Slow rotating dashed ring */}
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '1px dashed #555', borderRadius: '50%', pointerEvents: 'none' }}
           />
           
           {/* Interactive Core */}
           <motion.button
             whileHover={{ backgroundColor: '#fff', color: 'var(--dada-red)', scale: 0.8 }}
             whileTap={{ scale: 0.7 }}
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             style={{ 
               width: '100%', height: '100%', border: 'none', background: 'var(--dada-red)', color: '#fff', 
               borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', 
               fontSize: '1rem', transition: 'background-color 0.3s'
             }}
           >
             <span style={{ transform: 'translateY(-2px)' }}>▲</span>
           </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [introText, setIntroText] = useState("");
  
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedVideo, setExpandedVideo] = useState(false);
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Global Cursor physics
  const cursorX = useSpring(0, { damping: 30, stiffness: 400, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 400, mass: 0.5 });

  // Advanced States
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const beatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isInverted, setIsInverted] = useState(false);

  const toggleAudio = () => {
    if (!audioEnabled) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      
      // Crucial for iOS Safari / Mobile Browsers
      if (ctx.state === 'suspended') {
         ctx.resume();
      }
      
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.5; 
      masterGain.connect(ctx.destination);

      // --- TOM FORD / BALENCIAGA CATWALK CLOCK (100 BPM 8th Notes) ---
      let step = 0;
      const bassScale = [32.70, 36.71, 43.65, 49.00]; // Ultra deep sub-bass (C1 range)
      
      const playSequencerStep = () => {
         // --- STRUT KICK (On the beat) ---
         if (step % 2 === 0) {
            const osc = ctx.createOscillator();
            const amp = ctx.createGain();
            osc.frequency.setValueAtTime(70, ctx.currentTime); // Deeper, heavier punch
            osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            amp.gain.setValueAtTime(2.0, ctx.currentTime);
            amp.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.connect(amp);
            amp.connect(masterGain);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.4);
         }
         
         // --- HEAVY THROBBING BASS (Syncopated swelling on offbeats) ---
         if (step % 2 !== 0) {
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const amp = ctx.createGain();
            
            osc.type = 'triangle'; // Smoother deep sub-bass throb
            osc.frequency.setValueAtTime(bassScale[Math.floor(Math.random() * bassScale.length)], ctx.currentTime);
            
            // Sub-bass frequency limit
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(150, ctx.currentTime);
            
            // Swelling "Throb" Envelope (Slow attack, deep tail)
            amp.gain.setValueAtTime(0.01, ctx.currentTime);
            amp.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.15); // swells up
            amp.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45); // tails out
            
            osc.connect(filter);
            filter.connect(amp);
            amp.connect(masterGain);
            
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.5);
         }

         // Minimalist high-hat click for texture on the 2nd beat
         if (step % 4 === 2) {
             const osc = ctx.createOscillator();
             const amp = ctx.createGain();
             osc.type = 'square';
             osc.frequency.setValueAtTime(5000, ctx.currentTime);
             amp.gain.setValueAtTime(0.02, ctx.currentTime);
             amp.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
             osc.connect(amp);
             amp.connect(masterGain);
             osc.start(ctx.currentTime);
             osc.stop(ctx.currentTime + 0.05);
         }
         step++;
      };

      // 100 BPM = 600ms per beat = 300ms per 8th note precision clock
      beatIntervalRef.current = setInterval(playSequencerStep, 300); 
      
      audioCtxRef.current = ctx;
      setAudioEnabled(true);
    } else {
      if (beatIntervalRef.current) clearInterval(beatIntervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
      setAudioEnabled(false);
    }
  };

  const toggleInvert = () => {
    const nextState = !isInverted;
    setIsInverted(nextState);
    if (nextState) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) {
       lenis.raf(time);
       requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleGlobalMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY }); // Spotlight dependency
    };
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleGlobalMouse);
    }
    
    return () => {
       lenis.destroy();
       window.removeEventListener('mousemove', handleGlobalMouse);
    };
  }, []);

  useEffect(() => {
     // Intro Sequence Logic
     const INTRO_STRING = "GABRIELLE BENOT - STUDIO ARCHIVE";
     let i = 0;
     const typeInterval = setInterval(() => {
        setIntroText(INTRO_STRING.slice(0, i));
        i++;
        if (i > INTRO_STRING.length) clearInterval(typeInterval);
     }, 100);
     
     setTimeout(() => {
         setIntroDone(true);
     }, 5000);

     return () => clearInterval(typeInterval);
  }, []);

  if (!introDone) {
     return (
       <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#080808', color: 'var(--dada-red)', fontSize: '0.9rem', letterSpacing: '0.25em', padding: '2rem' }}>
          <span className="typewriter">{introText}<span style={{ animation: 'jitter 1s infinite' }}>_</span></span>
       </div>
     );
  }

  return (
    <main style={{ position: 'relative', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: isDesktop ? 'row' : 'column', minHeight: '100vh', backgroundColor: 'var(--background)', color: '#111', fontFamily: 'var(--font-general)', boxShadow: '0 0 40px rgba(0,0,0,0.03)' }}>

      {/* Cinematic Theater Loading Sequence */}
      <motion.div
         initial={{ display: 'flex' }}
         animate={{ display: 'none', transition: { delay: 2 } }}
         style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 100000, pointerEvents: 'none', flexDirection: 'column' }}
      >
        {/* Top Door */}
        <motion.div 
           initial={{ y: 0 }}
           animate={{ y: '-50vh' }}
           transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.6 }}
           style={{ flex: 1, backgroundColor: '#050505', borderBottom: '1px solid rgba(255,255,255,0.05)' }} 
        />
        {/* Expanding Horizon Line */}
        <motion.div 
           initial={{ scaleX: 0, opacity: 1 }}
           animate={{ scaleX: 1, opacity: 0 }}
           transition={{ scaleX: { duration: 0.8, ease: 'easeInOut' }, opacity: { duration: 0.1, delay: 0.8 } }}
           style={{ position: 'absolute', top: '50%', left: 0, width: '100vw', height: '2px', backgroundColor: 'var(--dada-red)', transformOrigin: 'center' }}
        />
        {/* Bottom Door */}
        <motion.div 
           initial={{ y: 0 }}
           animate={{ y: '50vh' }}
           transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.6 }}
           style={{ flex: 1, backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }} 
        />
      </motion.div>
      
      {/* Navigation (Desktop Sidebar / Mobile Topbar) */}
      {isDesktop ? (
         <aside className="hide-scrollbar" style={{ 
         width: '280px', 
         position: 'sticky', 
         top: 0, 
         height: '100vh', 
         padding: '1.5rem 2vw',
         display: 'flex',
         flexDirection: 'column',
         borderRight: '2px solid #111111',
         flexShrink: 0,
         overflowY: 'auto'
      }}>
        <h1 
           onClick={() => setActiveGallery && setActiveGallery(null)}
           className="typewriter" 
           style={{ cursor: 'pointer', fontSize: 'clamp(1.4rem, 1.5vw, 1.6rem)', letterSpacing: '0.1em', marginBottom: '1.5rem', fontWeight: 'bold', lineHeight: 1.2, transition: 'opacity 0.2s' }}
           onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
           onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
           GABRIELLE<br/>BENOT
        </h1>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           {/* Global State Toggles */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '1rem', borderBottom: '1px dashed #ccc' }}>
              <button 
                onClick={(e) => { e.preventDefault(); toggleAudio(); }} 
                className="typewriter" 
                style={{ background: 'none', border: 'none', color: audioEnabled ? 'var(--dada-red)' : '#444', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.1em', padding: 0, transition: 'color 0.2s', fontWeight: audioEnabled ? 'bold' : 'normal' }}
              >
                 <span data-text={`[ ${audioEnabled ? 'DISABLE' : 'ENABLE'} AUDIO ]`}>[ {audioEnabled ? 'DISABLE' : 'ENABLE'} AUDIO ]</span>
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); toggleInvert(); }} 
                className="typewriter" 
                style={{ background: 'none', border: 'none', color: isInverted ? 'var(--dada-red)' : '#444', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.1em', padding: 0, transition: 'color 0.2s', fontWeight: isInverted ? 'bold' : 'normal' }}
              >
                 <span data-text="[ INVERT THEME ]">[ INVERT THEME ]</span>
              </button>
           </div>
          {navGroups.map((group) => (
             <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <span className="typewriter" style={{ fontSize: '0.75rem', color: '#111', letterSpacing: '0.15em', fontWeight: 'bold' }}>{group.title}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '1rem' }}>
                  {group.links.map((link) => (
                     <GlitchLink key={link.name} link={link} setShowInquiryModal={setShowInquiryModal} setActiveGallery={setActiveGallery} isDesktop={isDesktop} />
                  ))}
                </div>
             </div>
          ))}

          <a 
             href="https://gabriellebenot.com/"
             target="_blank" rel="noopener noreferrer"
             style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--dada-red)', fontWeight: 'bold', textDecoration: 'underline', marginTop: '0.2rem', transition: 'opacity 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
             onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
             SHOP PRINTS ↗
          </a>

        </nav>

        <div style={{ marginTop: 'auto', fontSize: '0.7rem', color: '#111', letterSpacing: '0.05em', borderTop: '1px solid #111', paddingTop: '1rem' }}>
          © GB {new Date().getFullYear()}
        </div>
      </aside>
      ) : (
         <>
          <div style={{ position: 'sticky', top: 0, width: '100vw', padding: '1.2rem 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050505', borderBottom: '1px solid #333', zIndex: 100, color: '#fff' }}>
             <h1 onClick={() => setActiveGallery && setActiveGallery(null)} className="typewriter" style={{ fontSize: '1.2rem', letterSpacing: '0.1em', fontWeight: 'bold', margin: 0, cursor: 'pointer' }}>GABRIELLE BENOT</h1>
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="typewriter" style={{ background: 'none', border: '1px solid #fff', color: '#fff', fontSize: '0.8rem', padding: '0.5rem 1rem', cursor: 'pointer', letterSpacing: '0.1em' }}>
                {mobileMenuOpen ? '[ CLOSE ]' : '[ MENU ]'}
             </button>
          </div>
          
          <AnimatePresence>
             {mobileMenuOpen && (
               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'calc(100vh - 70px)' }} exit={{ opacity: 0, height: 0 }} style={{ position: 'fixed', top: '70px', left: 0, width: '100vw', backgroundColor: '#050505', color: '#eaeaea', zIndex: 99, display: 'flex', flexDirection: 'column', padding: '2rem 6vw', overflowY: 'auto' }}>
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onClick={() => setMobileMenuOpen(false)}>
                     {/* Global State Toggles */}
                     <div style={{ display: 'flex', gap: '2rem', paddingBottom: '1.5rem', borderBottom: '1px dashed #333' }}>
                        <button onClick={(e) => { e.stopPropagation(); toggleAudio(); }} className="typewriter" style={{ background: 'none', border: 'none', color: audioEnabled ? 'var(--dada-red)' : '#eaeaea', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.1em', padding: 0 }}>
                           [ AUDIO {audioEnabled ? 'ON' : 'OFF'} ]
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); toggleInvert(); }} className="typewriter" style={{ background: 'none', border: 'none', color: isInverted ? 'var(--dada-red)' : '#eaeaea', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.1em', padding: 0 }}>
                           [ INVERT ]
                        </button>
                     </div>
                     {navGroups.map((group) => (
                        <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <span className="typewriter" style={{ fontSize: '0.85rem', color: '#888', letterSpacing: '0.15em', fontWeight: 'bold' }}>{group.title}</span>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem' }}>
                             {group.links.map((link: any) => (
                                <div key={link.name} style={{ display: 'inline-block' }}>
                                   <a 
                                     href={link.href}
                                     onClick={(e) => {
                                          if (link.isAction && link.action === 'INQUIRY') {
                                              e.preventDefault();
                                              setShowInquiryModal(true);
                                          } else if (link.isGallery && setActiveGallery) {
                                              e.preventDefault();
                                              setActiveGallery(link.slug);
                                          }
                                     }}
                                     className="typewriter"
                                     style={{ fontSize: '1rem', letterSpacing: '0.1em', color: '#fff', textDecoration: 'none', display: 'block' }}
                                   >
                                     {link.name}
                                   </a>
                                </div>
                             ))}
                           </div>
                        </div>
                     ))}
                     
                     {/* Isolated Store Link Mobile */}
                     <a 
                        href="https://gabriellebenot.com/"
                        target="_blank" rel="noopener noreferrer"
                        className="typewriter"
                        style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--dada-red)', fontWeight: 'bold', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}
                     >
                        SHOP PRINTS ↗
                     </a>
                  </nav>
               </motion.div>
             )}
          </AnimatePresence>
         </>
      )}

      {/* Main Content Area */}
      {activeGallery ? (
         <GalleryView slug={activeGallery} onBack={() => setActiveGallery(null)} setExpandedImage={setExpandedImage} isDesktop={isDesktop} />
      ) : (
         <section style={{ flex: 1, minWidth: 0, padding: '4rem 6vw', display: 'flex', flexDirection: 'column' }}>
          
        {/* Gallery Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {artwork.map((art) => {
             return (
              <div 
                id={art.slug} 
                key={art.slug} 
                onMouseEnter={() => setHoveredSlug(art.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                style={{ 
                   display: 'flex', 
                   flexDirection: 'column', 
                   gap: '2rem',
                   opacity: isDesktop && hoveredSlug && hoveredSlug !== art.slug ? 0.2 : 1,
                   transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                
                {/* Collection Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #111', paddingBottom: '1rem' }}>
                  <h2 className="typewriter" style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)', fontWeight: 'bold', letterSpacing: '0.1em' }}>{art.title}</h2>
                  <span style={{ fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', color: 'var(--dada-red)', letterSpacing: '0.2em' }}>{art.desc}</span>
                </div>
                
                {/* Grid Sizing */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isDesktop ? '0' : '5px', maxWidth: '800px' }}>
                   {art.srcs.map((src, idx) => (
                      <IndependentFlipTile key={idx} src={src} idx={idx} title={art.title} onSelect={() => setExpandedImage(src)} />
                   ))}
                </div>

                <a href="#" onClick={(e) => { e.preventDefault(); setActiveGallery(art.slug); }} className="typewriter" style={{ cursor: 'pointer', color: 'var(--dada-red)', fontSize: '1rem', letterSpacing: '0.15em', textDecoration: 'underline', marginTop: '0.5rem', alignSelf: 'flex-start', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  [ OPEN EXTENDED ARCHIVE ]
                </a>

              </div>
             )
          })}
        </div>

        {/* Biography Section 1: Philosophy */}
        <div id="bio" style={{ paddingTop: '6rem', marginTop: '6rem', borderTop: '2px dashed #111', display: 'flex', gap: '6vw', flexDirection: isDesktop ? 'row' : 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: isDesktop ? '45%' : '100%', aspectRatio: '3/4', border: '1px solid #111' }}>
               <Image src="/artist.png" alt="Gabrielle Benot" fill style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
            </div>
            
            <div style={{ flex: 1, paddingBottom: '2rem', maxWidth: '750px' }}>
              <h2 className="typewriter" style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)', marginBottom: '2.5rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>PHILOSOPHY</h2>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.8, color: '#111', marginBottom: '2.5rem', borderLeft: '4px solid var(--dada-red)', paddingLeft: '2rem' }}>
                "THE CONVENTIONAL DEFINITION OF REALITY AND THE IDEA OF NORMAL LIFE MEAN NOTHING."<br/><span style={{ fontSize: '0.9rem', color: 'var(--dada-red)'}}>- SIGMAR POLKE</span>
              </p>
              <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, marginBottom: '1.5rem', paddingRight: '1rem' }}>
                As a multimedia artist, I love working with a variety of styles and keep up the tradition of experimental art techniques of the great masters such as Roy Lichtenstein, Sigmar Polke, and James Rosenquist. Whether it is an aesthetically pleasing high art, thought-provoking conceptual minimalism, or just a visually ambivalent mixture of things, I try to create a collision of high and low culture.
              </p>
            </div>
        </div>

        {/* Biography Section 2: Technique & Process (Text & Brutalist Video Frame) */}
        <div style={{ paddingTop: '4rem', paddingBottom: '2rem', borderBottom: '1px solid #111', marginBottom: '2rem' }}>
          <h2 className="typewriter" style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)', marginBottom: '2.5rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>TECHNIQUE & PROCESS</h2>
          <div style={{ display: 'flex', gap: '6vw', alignItems: 'center', flexDirection: isDesktop ? 'row' : 'column-reverse' }}>
             <div style={{ flex: 1, maxWidth: '750px' }}>
               <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, marginBottom: '1.5rem', paddingRight: '1rem' }}>
                 At the heart of my practice lies the 'Guscio' technique - a signature multimedia methodology I developed that breathes tactile life into the canvas. By freely mixing wet and dry brushes, palette knives, oil pastels, and textured pastes, I build profound sculptural layers that demand to be felt as much as they are seen.
               </p>
               <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, marginBottom: '1.5rem', paddingRight: '1rem' }}>
                 This textural approach bridges my diverse subjects. In my expressive equine art and biophilic pieces, these layered forms capture the organic, breathing spirit of the natural world. In stark contrast, my Speed collection strips away the recognizable silhouettes of luxury automotive design, translating the kinetic velocity of modern racing into pure, soaring abstraction.
               </p>
            </div>
            {/* The Interactive Cinematic Output Terminal */}
            <motion.div 
               layoutId="cinematic-video-block"
               onClick={() => setExpandedVideo(true)}
               style={{ cursor: 'zoom-in', position: 'relative', flex: isDesktop ? 1.2 : 'none', width: isDesktop ? 'auto' : '100%', minWidth: isDesktop ? '400px' : '0', aspectRatio: '4/3', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333', overflow: 'hidden' }}
            >
               {!expandedVideo && (
                 <>
                   {/* Tactical Viewfinder HUD */}
                   <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: '30px', height: '30px', borderTop: '2px solid #555', borderLeft: '2px solid #555', zIndex: 3 }}></div>
                   <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '30px', height: '30px', borderTop: '2px solid #555', borderRight: '2px solid #555', zIndex: 3 }}></div>
                   <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', width: '30px', height: '30px', borderBottom: '2px solid #555', borderLeft: '2px solid #555', zIndex: 3 }}></div>
                   <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '30px', height: '30px', borderBottom: '2px solid #555', borderRight: '2px solid #555', zIndex: 3 }}></div>

                   {/* Blinking Recording Status */}
                   <motion.div 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="typewriter"
                      style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'var(--dada-red)', fontSize: '0.7rem', letterSpacing: '0.4em', zIndex: 3, display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 'bold' }}
                   >
                     <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--dada-red)', boxShadow: '0 0 10px var(--dada-red)' }}></div>
                     STDBY
                   </motion.div>

                   {/* Center Reticle Text */}
                   <div className="typewriter" style={{ color: '#eaeaea', fontSize: '0.9rem', letterSpacing: '0.3em', zIndex: 2, textAlign: 'center', lineHeight: '2' }}>
                     [ ARCHIVE OFFLINE ]<br/>
                     <span style={{ color: '#555', fontSize: '0.65rem' }}>AWAITING TRANSMISSION</span>
                   </div>
                   
                   {/* Cinematic Scanlines */}
                   <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2, backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '1.5rem 1.5rem' }}></div>
                 </>
               )}
            </motion.div>
          </div>

          {/* Applied Arts / Textile Extension (SEO & Physical Objects) */}
          <div style={{ display: 'flex', gap: '4rem', marginTop: '6rem', paddingTop: '4rem', borderTop: '1px dashed #ccc', flexDirection: 'row', flexWrap: 'wrap' }}>
             <div style={{ flex: 1, minWidth: '300px', paddingRight: '2vw', maxWidth: '750px' }}>
               <h2 className="typewriter" style={{ fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 'bold', letterSpacing: '0.1em', color: '#111' }}>[ APPLIED ARTS // BESPOKE TEXTILES ]</h2>
               <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, marginBottom: '1.5rem', paddingRight: '1rem' }}>
                 The narratives born on my canvases are not meant to be confined to the wall; they naturally spill over into the spaces we inhabit. By translating my signature abstract forms and organic palettes into the physical environment, I create custom hand-tufted textiles and large-scale bespoke rugs.
               </p>
               <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, marginBottom: '1.5rem', paddingRight: '1rem' }}>
                 These functional art pieces carry the exact same spirit and tactile depth as the paintings themselves, warming high-end architectural spaces with a sophisticated, lived-in humanity.
               </p>
               <button onClick={() => setShowInquiryModal(true)} className="edgy-btn typewriter" style={{ marginTop: '1rem', padding: '1rem 2rem', border: '1px solid #111', background: 'transparent', color: '#111', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.8rem' }} onMouseEnter={(e)=>{e.currentTarget.style.background='#111'; e.currentTarget.style.color='#f4f4f0'}} onMouseLeave={(e)=>{e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#111'}}>
                  INQUIRE ABOUT COMMISSIONS ↗
               </button>
             </div>
             {/* Placeholder Architectural Element for Rugs */}
             <div 
               onClick={() => setActiveGallery('textiles')} 
               style={{ position: 'relative', width: isDesktop ? '45%' : '100%', minWidth: '300px', aspectRatio: '1/1', border: '1px solid #222', overflow: 'hidden', cursor: 'zoom-in', transition: 'transform 0.3s' }} 
               onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.02)'} 
               onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}
             >
                <Image src="/art1.png" fill style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} alt="Bespoke Textile Sample" />
                <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#050505', color: 'var(--dada-red)', padding: '0.5rem 1rem', fontSize: '0.7rem', letterSpacing: '0.2em' }} className="typewriter">
                   [ OPEN TEXTILE ARCHIVE ]
                </div>
             </div>
          </div>

        </div>

        {/* Decode Statement Mount */}
        <InfiniteMarquee />
        <SpotlightStatement isDesktop={isDesktop} mousePos={mousePos} />

        {/* Footer / Subscribe Section */}
        <div style={{ marginTop: '8rem', paddingTop: '4rem', borderTop: '2px dashed #111', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
            <h2 className="typewriter" style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)', fontWeight: 'bold', letterSpacing: '0.1em' }}>STAY CONNECTED</h2>
            <p className="typewriter" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: '#444', maxWidth: '600px', lineHeight: 1.6 }}>
              Subscribe to the studio newsletter for exhibition updates, or open a direct inquiry below.
            </p>
            <form action="https://formsubmit.co/gabriellebenot@gmail.com" method="POST" style={{ display: 'flex', gap: '1rem', maxWidth: '600px', width: '100%', flexWrap: 'wrap' }}>
                <input type="hidden" name="_subject" value="New Gabrielle Benot Newsletter Subscription" />
                <input type="email" name="email" placeholder="YOUR EMAIL ADDRESS" required style={{ flex: '1 1 300px', background: 'transparent', border: '1px solid #111', padding: '1rem', color: '#111', fontSize: '0.9rem', letterSpacing: '0.1em', fontFamily: 'var(--font-typewriter)', outline: 'none' }} />
                <button type="submit" style={{ background: 'var(--dada-red)', border: '1px solid var(--dada-red)', color: '#fff', padding: '1rem 3rem', cursor: 'pointer', fontFamily: 'var(--font-typewriter)', fontSize: '0.9rem', letterSpacing: '0.2em', transition: 'background 0.2s' }}>
                  SUBSCRIBE
                </button>
            </form>
            <p className="typewriter" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: '#444', marginTop: '1rem' }}>
              Looking for a custom piece? <button onClick={() => setShowInquiryModal(true)} style={{ background: 'none', border: 'none', color: 'var(--dada-red)', textDecoration: 'underline', cursor: 'none', fontFamily: 'var(--font-typewriter)', padding: 0, fontSize: '0.8rem', letterSpacing: '0.1em' }}>Open commission inquiry ↗</button>
            </p>

            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', alignItems: 'center' }}>
               <a href="https://www.instagram.com/gabriellebenot/" target="_blank" rel="noopener noreferrer" style={{ color: '#111', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color='var(--dada-red)'} onMouseLeave={(e) => e.currentTarget.style.color='#111'}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </a>
               <a href="https://www.facebook.com/Gabriellebenot/" target="_blank" rel="noopener noreferrer" style={{ color: '#111', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color='var(--dada-red)'} onMouseLeave={(e) => e.currentTarget.style.color='#111'}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
               </a>
               <a href="https://www.linkedin.com/in/julia-gabrielle-benot-738012107/" target="_blank" rel="noopener noreferrer" style={{ color: '#111', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color='var(--dada-red)'} onMouseLeave={(e) => e.currentTarget.style.color='#111'}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
               </a>
            </div>
        </div>

        </section>
      )}

      {/* Fullscreen Video Modal overlay (Framer Motion seamless layout) */}
      <AnimatePresence>
         {expandedVideo && (
           <div 
             style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000000f5', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
             onClick={() => setExpandedVideo(false)}
           >
             <motion.div 
                layoutId="cinematic-video-block"
                style={{ width: '90vw', height: '90vh', backgroundColor: '#050505', border: '1px solid #333', position: 'relative', display: isDesktop ? 'grid' : 'flex', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : 'none', gap: '2px', overflow: 'hidden' }}
             >
                 {isDesktop ? (
                   <>
                     {/* Left Panel: Ambient Texture & Materials */}
                     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, filter: 'brightness(0.2) blur(3px) grayscale(60%)' }} src="/process_video.MP4"></video>
                        <TypewriterText delay={800} speed={40} className="typewriter" text={"RAW IMPASTO"} style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translateY(-50%)', color: '#fff', zIndex: 2, fontSize: '0.9rem', letterSpacing: '0.3em', lineHeight: '2.5' }} />
                     </div>

                     {/* Center Panel: 100% Raw Feature */}
                     <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, filter: 'contrast(1.1) brightness(0.95)' }} src="/process_video.MP4"></video>

                     {/* Right Panel: Ambient Texture & Process */}
                     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, filter: 'brightness(0.2) blur(3px) grayscale(60%)' }} src="/process_video.MP4"></video>
                        <TypewriterText delay={1500} speed={15} className="typewriter" text={"My creative process is an intuitive, deeply physical exploration of texture and movement.\n\nI build each abstract canvas layer by layer, working with rich, sculptural impasto to carve light and shadow directly into the surface."} style={{ position: 'absolute', top: '50%', right: '15%', transform: 'translateY(-50%)', color: '#fff', zIndex: 2, fontSize: '0.8rem', letterSpacing: '0.2em', lineHeight: '2', textAlign: 'right', maxWidth: '300px' }} />
                     </div>
                   </>
                 ) : (
                   <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, filter: 'contrast(1.1) brightness(0.5)' }} src="/process_video.MP4"></video>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                         <TypewriterText delay={800} speed={40} className="typewriter" text={"RAW IMPASTO"} style={{ color: 'var(--dada-red)', fontSize: '1.2rem', letterSpacing: '0.3em', marginBottom: '2rem', textAlign: 'center', fontWeight: 'bold' }} />
                         <TypewriterText delay={1500} speed={15} className="typewriter" text={"My creative process is an intuitive, deeply physical exploration of texture and movement.\n\nI build each abstract canvas layer by layer, working with rich, sculptural impasto to carve light and shadow directly into the surface."} style={{ color: '#eaeaea', fontSize: '0.9rem', letterSpacing: '0.15em', lineHeight: '2', textAlign: 'center' }} />
                      </div>
                   </div>
                 )}
             </motion.div>
             <span className="typewriter" style={{ color: '#666', fontSize: '1rem', marginTop: '2rem', letterSpacing: '0.2em' }}>[ CLICK ANYWHERE TO MINIMIZE ]</span>
           </div>
         )}
      </AnimatePresence>

      {/* Fullscreen Image Modal overlay */}
      {expandedImage && (
         <div 
           style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000000f0', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: isDesktop ? 'none' : 'zoom-out' }}
           onClick={() => setExpandedImage(null)}
         >
           <CopyLinkButton />
           <div style={{ position: 'relative', width: '90vw', height: '90vh', cursor: isDesktop ? 'none' : 'pointer' }}>
              <Image src={expandedImage} fill style={{ objectFit: 'contain' }} alt="Expanded Artwork" />
           </div>
           <span className="typewriter" style={{ color: 'var(--dada-red)', fontSize: '1.2rem', marginTop: '1.5rem', letterSpacing: '0.2em' }}>[ CLICK ANYWHERE TO CLOSE ]</span>
         </div>
      )}

      {/* Fullscreen Inquiry Modal overlay */}
      {showInquiryModal && (
         <div 
           style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255,255,255,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: isDesktop? 'none' : 'auto' }}
         >
            <div style={{ width: '90%', maxWidth: '600px', padding: '3rem', border: '2px solid #111', backgroundColor: '#fff', position: 'relative', boxShadow: '15px 15px 0 #111' }}>
               <button onClick={() => setShowInquiryModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: '1px solid #111', padding: '0.5rem 1rem', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'var(--font-typewriter)', letterSpacing: '0.1em' }}>CLOSE [X]</button>
               <h2 className="typewriter" style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>INQUIRE</h2>
               <form action="https://formsubmit.co/gabriellebenot@gmail.com" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <input type="hidden" name="_subject" value="New Gabrielle Benot Inquiry" />
                  <input type="text" name="name" placeholder="YOUR NAME" required style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #111', padding: '1rem 0', color: '#111', fontSize: '0.9rem', letterSpacing: '0.1em', fontFamily: 'var(--font-typewriter)', outline: 'none' }} />
                  <input type="email" name="email" placeholder="EMAIL ADDRESS" required style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #111', padding: '1rem 0', color: '#111', fontSize: '0.9rem', letterSpacing: '0.1em', fontFamily: 'var(--font-typewriter)', outline: 'none' }} />
                  <textarea name="message" placeholder="MESSAGE (COMMISSION OR GENERAL INQUIRY)" required rows={4} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #111', padding: '1rem 0', color: '#111', fontSize: '0.9rem', letterSpacing: '0.1em', fontFamily: 'var(--font-typewriter)', outline: 'none', resize: 'vertical' }}></textarea>
                  <button type="submit" style={{ alignSelf: 'flex-start', background: 'var(--dada-red)', border: '1px solid var(--dada-red)', color: '#fff', padding: '1rem 3rem', cursor: 'pointer', fontFamily: 'var(--font-typewriter)', fontSize: '1rem', letterSpacing: '0.2em', marginTop: '1rem', transition: 'background 0.2s' }}>
                    SUBMIT
                  </button>
               </form>
            </div>
         </div>
      )}

      {/* Global SVG Filters for Liquid Metal Distortion */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="liquid">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="2" result="noise">
             <animate attributeName="baseFrequency" values="0.015 0.015; 0.02 0.02; 0.015 0.015" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>

      {/* Dynamic Blend Cursor */}
      {isDesktop && (
        <motion.div 
          style={{
            position: 'fixed',
            top: cursorY,
            left: cursorX,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            mixBlendMode: 'difference',
            pointerEvents: 'none',
            x: '-50%',
            y: '-50%',
            zIndex: 99999,
          }}
        />
      )}

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />

    </main>
  );
}
