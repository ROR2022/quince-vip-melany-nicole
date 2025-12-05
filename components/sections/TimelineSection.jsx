// 🪄 TimelineSection - Cronograma mágico del evento

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { quinceMainData } from "./data/main-data";
import BackgroundCarrousel from "./BackgroundCarrousel";

export default function TimelineSection() {
  const { timeline, event } = quinceMainData;
  const { parents } = event;
  const { events } = timeline;

  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [sparklePositions, setSparklePositions] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const sectionRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
      const videoRef = useRef(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generar partículas sparkle
  const generateSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 12; i++) {
      sparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        size: Math.random() * 6 + 4,
      });
    }
    return sparkles;
  };

  // Simple IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Generar sparkles cuando la sección se hace visible
            setTimeout(() => {
              setSparklePositions(generateSparkles());
            }, 1500);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Log para debugging
  //console.log('TimelineSection render:', { isVisible, timeline, events });

  const handleErrorVideo = (e) => {
    console.error("Error loading video:", e);
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        /* backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('${parents.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", */
        position: "relative",
      }}
      id="timeline"
      className="py-20 min-h-screen relative overflow-hidden"
    >
      
      
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
          <source src="/video/mel4.mp4" type="video/mp4" />
        </video>
        
      </div>

      
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Título principal con animación básica */}
          <div className="text-center mb-16">
            <h2 className={`flex flex-col gap-3 text-5xl md:text-6xl font-bold mb-6 text-black font-main-text transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              
              <span>Cronograma</span>
              <span>Mágico</span>
            </h2>
            
          </div>

          <div className="flex flex-col gap-16 items-center justify-center">
            
         

            {/* Timeline con animaciones secuenciales y línea SVG */}
            <div className="relative">
              
              {/* Línea temporal SVG */}
              <svg 
              style={{display:'none'}}
                className="absolute left-8 top-0 w-1 h-full z-10"
                viewBox="0 0 4 100" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="magicalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                <path
                  className={`transition-all duration-2000 ${isVisible ? 'animate-timeline-flow' : ''}`}
                  d="M2,0 L2,100"
                  stroke="url(#magicalGradient)"
                  strokeWidth="4"
                  strokeDasharray="10,5"
                  fill="none"
                  style={{ 
                    animationDelay: '1.2s',
                    strokeDashoffset: isVisible ? '0' : '100'
                  }}
                />
              </svg>

              <div className="space-y-8">
                {events.map((item, index) => (
                  <div
                    key={item.id}
                    className={`timeline-card p-6 rounded-2xl border border-purple-400/30 text-black transition-all duration-700 relative ${
                      isVisible 
                        ? 'opacity-100 translate-x-0 translate-y-0' 
                        : 'opacity-0 translate-x-8 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: `${1000 + (index * 200)}ms`
                    }}
                  >
                    {/* Conector mágico al timeline */}
                    <div 
                    className={` w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-400 rounded-full border-4 border-white/30 transition-all duration-500 ${
                      isVisible ? 'animate-crystal-pulse scale-100' : 'scale-0'
                    }`}
                    style={{ 
                      transitionDelay: `${1200 + (index * 200)}ms`,
                      display: windowWidth < 400 ? 'none' : 'block' 
                      }} />
                    
                    <div className="flex items-center gap-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                        isVisible 
                          ? "animate-magical-float" 
                          : ""
                      } flex items-center justify-center shadow-2xl relative overflow-hidden`}
                      style={{ animationDelay: `${index * 0.3 + 2}s` }}>
                        
                        {/* Efecto de brillo interno */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent rounded-2xl" />
                        
                        <span className="text-3xl relative z-10 filter drop-shadow-lg" role="img" aria-label={item.id}>
                          {item.icon}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2">
                          {item.title}
                        </h3>
                        <div className={`text-3xl font-bold ${
                          item.color === "primary"
                            ? "text-amber-500"
                            : "text-amber-600"
                        }`}>
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mensaje final con animación */}
          <div className={`text-center mt-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${1000 + (events.length * 200) + 500}ms` }}>
            <div className="bg-slate-300 bg-opacity-50 max-w-2xl mx-auto p-8 rounded-2xl border border-purple-400/30">
              <div className="mb-4">
                <span className="text-4xl inline-block animate-bounce">🌟</span>
              </div>
              <p className="text-2xl italic text-black font-bold">
                &ldquo;{timeline.mensaje}&rdquo;
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <span className="text-2xl inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>✨</span>
                <span className="text-2xl inline-block animate-pulse" style={{ animationDelay: '1s' }}>🪄</span>
                <span className="text-2xl inline-block animate-pulse" style={{ animationDelay: '1.5s' }}>💫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
