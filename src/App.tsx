import { useEffect, useState } from 'react';
import './App.css';
import background from './assets/pozadina.jpg';
import muzika from './assets/muzika.mp3';

const countdownTarget = new Date('2025-06-28T15:00:00').getTime(); // datum žurke

function App() {
  const [timeLeft, setTimeLeft] = useState('');

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

  return (
    <div className='container'>
      <img src={background} alt='Pozadina' className='background' />
      <div className='overlay'>
        <h1>🎓 Ljeto na ETF-u 🎶</h1>
        <h2>Počinje za: {timeLeft}</h2>
        <div className='map-container'>
          <iframe
            title='Lokacija žurke'
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11337.449899646095!2d18.3745382!3d43.8234798!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQ5JzI0LjUiTiAxOMKwMjInMjguMyJF!5e0!3m2!1sen!2sba!4v1718059999999!5m2!1sen!2sba'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
        <audio loop autoPlay>
          <source src={muzika} type='audio/mpeg' />
        </audio>
      </div>
    </div>
  );
}

export default App;
