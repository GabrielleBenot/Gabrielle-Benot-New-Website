"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const artwork = [
  { id: 1, srcs: ['/art1.png', '/art2.png', '/art3.png', '/art1.png'], title: 'FACES', desc: 'MIXED MEDIA' },
  { id: 2, srcs: ['/art2.png', '/art3.png', '/art1.png', '/art2.png'], title: 'EQUINE ART', desc: 'ORIGINALS' },
  { id: 3, srcs: ['/art3.png', '/art1.png', '/art2.png', '/art3.png'], title: 'VOGUE', desc: 'MULTIMEDIA' }
];

const navLinks = [
  { name: 'THE LATEST', href: '#latest' },
  { name: 'GUSCIO', href: '#guscio' },
  { name: 'FACES', href: '#faces' },
  { name: 'EQUINE ART', href: '#equine' },
  { name: 'VOGUE', href: '#vogue' },
  { name: 'FLORA & FAUNA', href: '#flora' },
  { name: 'WORKS ON METAL', href: '#metal' },
  { name: 'PARALLAX ART', href: '#parallax' },
  { name: 'BIOGRAPHY', href: '#bio' },
  { name: 'COMMISSIONS', href: '#commissions' },
  { name: 'SHOP PRINTS ↗', href: 'https://shop.gabriellebenot.com', isAccent: true }
];

function IndependentFlipTile({ src, idx, title, onSelect }: { src: string, idx: number, title: string, onSelect: () => void }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="flip-scene" style={{ height: '40vh', cursor: isRevealed ? 'zoom-in' : 'crosshair' }} 
         onMouseEnter={() => setIsRevealed(true)}
         onClick={() => { if (isRevealed) onSelect(); }}
    >
      <div className="flip-card" style={{ transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div className="flip-face flip-face--front">
           <h3 className="typewriter" style={{ fontSize: '2rem', letterSpacing: '0.1em', opacity: 0.8 }}>VOL. {idx + 1}</h3>
        </div>
        <div className="flip-face flip-face--back">
           <Image src={src} fill style={{ objectFit: 'cover', filter: 'contrast(1.1)' }} alt={`${title} Piece ${idx+1}`}/>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      
      {/* Sticky Left Sidebar Navigation (Analog / Raw Layout) */}
      <aside style={{ 
         width: '300px', 
         position: 'sticky', 
         top: 0, 
         height: '100vh', 
         padding: '4rem 3rem',
         display: 'flex',
         flexDirection: 'column',
         borderRight: '2px solid #111111',
         flexShrink: 0
      }}>
        <h1 className="typewriter" style={{ fontSize: '1.8rem', letterSpacing: '0.1em', marginBottom: '4rem', fontWeight: 'bold', lineHeight: 1.2 }}>
          GABRIELLE<br/>BENOT
        </h1>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              style={{ 
                fontSize: '0.8rem', 
                letterSpacing: '0.1em', 
                color: link.isAccent ? 'var(--dada-red)' : '#444',
                textDecoration: link.isAccent ? 'underline' : 'none',
                fontWeight: link.isAccent ? 'bold' : 'normal',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
              onMouseLeave={(e) => e.currentTarget.style.color = link.isAccent ? 'var(--dada-red)' : '#444'}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', fontSize: '0.7rem', color: '#111', letterSpacing: '0.05em', borderTop: '1px solid #111', paddingTop: '1rem' }}>
          © GB {new Date().getFullYear()}
        </div>
      </aside>

      {/* Main Content Area */}
      <section style={{ flex: 1, padding: '6rem 8vw', display: 'flex', flexDirection: 'column' }}>
          
        {/* Gallery Feed */}
        <div id="latest" style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          {artwork.map((art) => (
              <div key={art.id} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Collection Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #111', paddingBottom: '1rem' }}>
                  <h2 className="typewriter" style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>{art.title}</h2>
                  <span style={{ fontSize: '0.9rem', color: 'var(--dada-red)', letterSpacing: '0.2em' }}>{art.desc}</span>
                </div>
                
                {/* 2x2 Grid of INDIVIDUAL Flip Tiles */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                   {art.srcs.map((src, idx) => (
                      <IndependentFlipTile key={idx} src={src} idx={idx} title={art.title} onSelect={() => setExpandedImage(src)} />
                   ))}
                </div>

              </div>
          ))}
        </div>

        {/* Biography Section with Static Portrait */}
        <div id="bio" style={{ paddingTop: '6rem', marginTop: '6rem', borderTop: '2px dashed #111', display: 'flex', gap: '6vw', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '45%', aspectRatio: '3/4', border: '1px solid #111' }}>
               <Image src="/artist.png" alt="Gabrielle Benot" fill style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
            </div>
            
            <div style={{ flex: 1, paddingBottom: '8rem' }}>
              <h2 className="typewriter" style={{ fontSize: '3rem', marginBottom: '2.5rem', fontWeight: 'bold' }}>PHILOSOPHY</h2>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#111', marginBottom: '2.5rem', borderLeft: '4px solid var(--dada-red)', paddingLeft: '2rem' }}>
                "THE CONVENTIONAL DEFINITION OF REALITY AND THE IDEA OF NORMAL LIFE MEAN NOTHING."<br/><span style={{ fontSize: '0.9rem', color: 'var(--dada-red)'}}>- SIGMAR POLKE</span>
              </p>
              <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8 }}>
                As a multimedia artist, I love working with a variety of styles and keep up the tradition of experimental art techniques of the great masters such as Roy Lichtenstein, Sigmar Polke, and James Rosenquist. Whether it is an aesthetically pleasing high art, thought-provoking conceptual minimalism, or just a visually ambivalent mixture of things, I try to create a collision of high and low culture.
              </p>
            </div>
        </div>

        {/* Contact form */}
        <div id="commissions" style={{ marginTop: '0', paddingTop: '6rem', borderTop: '2px dashed #111' }}>
            <h2 className="typewriter" style={{ fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 'bold' }}>INQUIRE</h2>
            <form style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <input type="text" placeholder="YOUR NAME" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #111', padding: '1rem 0', color: '#111', fontSize: '0.9rem', letterSpacing: '0.1em', fontFamily: 'var(--font-typewriter)', outline: 'none' }} />
                <input type="email" placeholder="EMAIL ADDRESS" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #111', padding: '1rem 0', color: '#111', fontSize: '0.9rem', letterSpacing: '0.1em', fontFamily: 'var(--font-typewriter)', outline: 'none' }} />
                <button type="submit" style={{ alignSelf: 'flex-start', background: 'var(--dada-red)', border: 'none', color: '#fff', padding: '1rem 4rem', cursor: 'pointer', fontFamily: 'var(--font-typewriter)', fontSize: '1rem', letterSpacing: '0.2em', marginTop: '1rem' }}>
                  SUBMIT
                </button>
            </form>
        </div>

      </section>

      {/* Fullscreen Image Modal overlay */}
      {expandedImage && (
         <div 
           style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000000f0', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
           onClick={() => setExpandedImage(null)}
         >
           <div style={{ position: 'relative', width: '90vw', height: '90vh' }}>
              <Image src={expandedImage} fill style={{ objectFit: 'contain' }} alt="Expanded Artwork" />
           </div>
           <span className="typewriter" style={{ color: 'var(--dada-red)', fontSize: '1.2rem', marginTop: '1.5rem', letterSpacing: '0.2em' }}>[ CLICK ANYWHERE TO CLOSE ]</span>
         </div>
      )}

    </main>
  );
}
