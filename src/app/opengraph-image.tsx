import { ImageResponse } from 'next/og';
 
export const dynamic = 'force-static';
export const alt = 'Gabrielle Benot - Art Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '8px dashed #D30000',
            width: '90%',
            height: '84%',
            padding: 40,
          }}
        >
          <div style={{ fontSize: 100, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em' }}>
            GABRIELLE BENOT
          </div>
          <div style={{ fontSize: 35, color: '#D30000', marginTop: 30, letterSpacing: '0.4em' }}>
            [ STUDIO ARCHIVE & FINE ART ]
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
