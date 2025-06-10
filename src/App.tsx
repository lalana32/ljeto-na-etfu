import { useEffect, useState } from 'react';
import './App.css';
import muzika from './assets/muzika.mp3';

const countdownTarget = new Date('2025-06-28T15:00:00').getTime();

function App() {
  const [timeLeft, setTimeLeft] = useState('');
  const [audioStarted, setAudioStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTarget - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('Žurka je počela! 🎉');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startAudio = () => {
    const audio = new Audio(muzika);
    audio.loop = true;
    audio
      .play()
      .then(() => setAudioStarted(true))
      .catch((e) => console.error('Greška pri reprodukciji:', e));
  };

  if (!audioStarted) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <button
          onClick={startAudio}
          style={{
            padding: '15px 35px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ff0',
            backgroundColor: '#000',
            border: '3px solid #ff0',
            borderRadius: '30px',
            boxShadow: '0 0 15px #ff0, 0 0 30px #ff0 inset',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontFamily: '"Courier New", monospace',
          }}
          onMouseEnter={(e) => {
            e.target.style.textShadow = '0 0 10px #ff0';
            e.target.style.boxShadow = '0 0 25px #ff0, 0 0 40px #ff0 inset';
          }}
          onMouseLeave={(e) => {
            e.target.style.textShadow = 'none';
            e.target.style.boxShadow = '0 0 15px #ff0, 0 0 30px #ff0 inset';
          }}
        >
          KLIKNI ZA INFORMACIJE
        </button>
      </div>
    );
  }

  return (
    <div className='container no-image'>
      {loading && (
        <div className='loader-overlay'>
          <div className='spinner'></div>
          <p>Učitavanje mape...</p>
        </div>
      )}

      <div className='overlay'>
        <h1>🎓 Ljeto na ETF-u 🎶</h1>
        <h2>Počinje za: {timeLeft}</h2>

        <div className='map-container'>
          <iframe
            title='Lokacija žurke'
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1069.2879537534502!2d18.374322059347683!3d43.82356537087404!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c9b6cf9dbc53%3A0x528ccd6928b807b8!2sFaculty%20of%20Electrical%20Engineering%2C!5e0!3m2!1sen!2sba!4v1749553537532!5m2!1sen!2sba'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
