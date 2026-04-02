export default function SpotifyWidget() {
  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      maxWidth: '360px',
      width: '100%',
    }}>
      <iframe 
        style={{ borderRadius: '12px' }} 
        src="https://open.spotify.com/embed/track/1La8htF943fW811b14ylDr?utm_source=generator&theme=0" 
        width="100%" 
        height="152" 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      ></iframe>
    </div>
  );
}
