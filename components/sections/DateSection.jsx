// 📅 DateSection - Sección de fecha y countdown

import React, {useState, useEffect, useRef, useCallback} from 'react'
import CountdownTimer from '../countdown-timer'
//import { getOverlayStyle } from '@/utils/overlay'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'
//import Image from 'next/image'
import { quinceMainData } from '@/components/sections/data/main-data'
import BackgroundCarrousel from './BackgroundCarrousel'

export default function DateSection() {
  //const { wedding, messages } = weddingData
  //const { dateSection } = styling
  const { event } = quinceMainData;
  //const { message } = event;
  const { parents, ceremony, date } = event;
  const sectionRef = useRef(null);
  
  // Estados para animaciones escalonadas cósmicas
  const [isInView, setIsInView] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true); // Cambiado a true para visibilidad inmediata
  const [cardVisible, setCardVisible] = useState(true);   // Cambiado a true para visibilidad inmediata
  const [countdownVisible, setCountdownVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  

  // Hook personalizado para IntersectionObserver
  const useIntersectionObserver = useCallback(() => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Secuencia cósmica escalonada
            setTimeout(() => setTitleVisible(true), 200);
            setTimeout(() => setCardVisible(true), 600);
            setTimeout(() => setCountdownVisible(true), 1000);
          }
          // NO reseteamos cuando sale de vista para evitar problemas con el video
        },
        {
          threshold: 0.2,
          rootMargin: '-30px 0px'
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);
  }, []);

  useIntersectionObserver();

  // Función helper para clases de animación cósmica
  const getCosmicAnimationClass = (isVisible, animationType, delay = '') => {
    // Simplificado temporalmente para debugging
    return isVisible ? `animate-${animationType} ${delay}` : '';
  };
      
  const basicClass="text-8xl font-bold text-indigo-500 mb-2";
  const completeClass="text-8xl font-bold text-indigo-500 mb-2 animate-number-pulse";
    

  // Configurar animación de scroll con fallback de carga inmediata
  const animationConfig = getAnimationConfig('date')
  // Ya no necesitamos el hook useScrollAnimation, usamos nuestro IntersectionObserver
const handleErrorVideo = (e) => {
    console.error("Error loading video:", e);
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };

  // Intentar reproducir el video cuando se carga
  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      videoRef.current.play().catch(err => {
        console.log("Autoplay prevented, user interaction required:", err);
      });
    }
  }, [videoLoaded]);
  return (
    <section 
      ref={sectionRef}
      style={{
        /* backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('${parents.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', */
        position: 'relative',
      }}
      id="date" 
      className={`py-20 `}
    >
      {/* <BackgroundCarrousel images={date.backgroundCarrouselImages || []} /> */}

      {/* Video de fondo */}
      <div className="absolute inset-0 z-0" style={{ isolation: 'isolate' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onError={handleErrorVideo}
          onLoadedData={handleVideoLoaded}
          poster="/images/fondoMelany05.png"
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/video/mel2.mp4" type="video/mp4" />
        </video>
        
      </div>

      

      <div className="container text-black rounded-b-2xl mx-auto px-4 p-6 rounded-2xl relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Mensaje inicial con animación cósmica */}
          <div className={getCosmicAnimationClass(titleVisible, 'cosmic-fade-in', 'delay-100')}>
            <p className="text-lg font-semibold italic text-glow">
              {date.mensaje1}
            </p>
          </div>

          {/* Título holográfico */}
          <div className={getCosmicAnimationClass(titleVisible, 'cosmic-fade-in', 'delay-200')}>
            <h2 
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
              className="font-main-text text-4xl font-bold text-amber-600"
            >
              FECHA ESPECIAL
            </h2>
          </div>

          {/* Card principal cósmica/holográfica */}
          <div className={getCosmicAnimationClass(cardVisible, 'calendar-flip', 'delay-300')}>
            <div 
              className="date-card rounded-3xl p-12 max-w-md mx-auto relative overflow-hidden"
              style={{
                minHeight: '300px',
                backgroundColor: 'rgba(218, 165, 32, 0.15)', // Dorado translúcido
                border: '2px solid rgba(218, 165, 32, 0.6)', // Borde dorado
                boxShadow: '0 8px 32px rgba(218, 165, 32, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)',
                display: 'block'
              }}
            >
              
              {/* Contenido de la card */}
              <div className="relative z-20">
                <div className="text-2xl font-medium text-yellow-100 mb-2" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                  {date.day ? date.day.toUpperCase() : 'SÁBADO'}
                </div>
                
                <div className='flex justify-center gap-3'>
                  <div className={cardVisible ? completeClass : basicClass} style={{ 
                    color: '#FFD700',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(218, 165, 32, 0.6)'
                  }}>
                    {date.dayNumber || '27'}
                  </div>
                </div>
                
                <div className="text-2xl font-medium text-yellow-100 mb-2" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                  {date.month ? date.month.toUpperCase() : 'DICIEMBRE'}
                </div>
                <div className="text-3xl font-medium" style={{ 
                  color: '#FFD700',
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.7)'
                }}>
                  {date.year || '2025'}
                </div>
              </div>

              {/* Borde rotativo - Movido después del contenido para que no lo tape */}
              <div className="absolute inset-0 rounded-3xl p-1 animate-rotating-border -z-10" style={{
                background: 'linear-gradient(45deg, #FFD700, #DAA520, #FFD700, #B8860B)',
                backgroundSize: '300% 300%'
              }}>
                <div className="w-full h-full rounded-3xl" style={{ 
                  background: 'rgba(0, 0, 0, 0.3)'
                }}></div>
              </div>

              {/* Elementos decorativos internos de la card */}
              <div className="absolute top-4 left-4 text-lg opacity-70 animate-clock-tick z-10">⏰</div>
              <div className="absolute top-4 right-4 text-lg opacity-70 animate-star-shimmer z-10">✨</div>
              <div className="absolute bottom-4 left-4 text-lg opacity-70 animate-star-shimmer delay-500 z-10">💫</div>
              <div className="absolute bottom-4 right-4 text-lg opacity-70 animate-clock-tick delay-300 z-10">🕐</div>
            </div>
          </div>

          {/* Mensaje final */}
          <div className={getCosmicAnimationClass(cardVisible, 'cosmic-fade-in', 'delay-500')}>
            <h3 className="font-script text-3xl text-secondary text-glow">
              {date.mensaje2}
            </h3>
          </div>

          {/* Countdown con animación */}
          <div className={getCosmicAnimationClass(countdownVisible, 'cosmic-fade-in', 'delay-700')}>
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  )
}
