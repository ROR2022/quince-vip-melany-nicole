// 👨‍👩‍👧‍👦 ParentsSection - Sección de información de padres

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { quinceMainData } from "@/components/sections/data/main-data";

export default function ParentsSection() {
  //const { parents } = weddingData;
  const { parents, godparents } = quinceMainData.event;
  const sectionRef = useRef(null);

  // Estados para animaciones escalonadas
  const [isInView, setIsInView] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [parentsVisible, setParentsVisible] = useState(false);
  const [godparentsVisible, setGodparentsVisible] = useState(false);

  // Hook personalizado para IntersectionObserver
  const useIntersectionObserver = useCallback(() => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Secuencia de animaciones escalonadas
            setTimeout(() => setMessageVisible(true), 100);
            setTimeout(() => setParentsVisible(true), 200);
            setTimeout(() => setGodparentsVisible(true), 300);
          } else {
            // Reset cuando sale de vista
            setIsInView(false);
            setMessageVisible(false);
            setParentsVisible(false);
            setGodparentsVisible(false);
          }
        },
        {
          threshold: 0.1,
          rootMargin: "-50px 0px",
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);
  }, []);

  useEffect(() => {
    if(messageVisible && !parentsVisible) setParentsVisible(true);
  }, [messageVisible]);

  useEffect(() => {
    if(parentsVisible && !godparentsVisible) setGodparentsVisible(true);
  }, [parentsVisible]);

  useIntersectionObserver();

  // Función helper para clases de animación
  const getAnimationClass = (isVisible, animationType, delay = "") => {
    const baseClass = "animate-on-scroll";
    const animClass = isVisible ? `animate-${animationType} ${delay}` : "";
    return `${baseClass} ${animClass}`.trim();
  };

  const basicClass = "font-main-text text-5xl text-amber-500 mb-4";
  const completeClass =
    "font-main-text text-5xl text-amber-500 mb-4 scale-up-center";

  const handleErrorVideo = (e) => {
    console.error("Error loading video:", e);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        /* backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${parents.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", */
        position: "relative",
      }}
      id="parents"
      className={`py-20 relative z-0`}
    >
      {/* Video de fondo */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={handleErrorVideo}
          poster="/images/fondoMelany05.png"
          className="w-full h-full object-cover"
        >
          <source src="/video/mel1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="relative p-6 rounded-2xl z-10 text-center space-y-8 py-12 text-black">
              {/* Mensaje principal con animación */}
              <div
                className={getAnimationClass(
                  messageVisible,
                  "fade-in-up",
                  "delay-200"
                )}
              >
                <p className="text-lg italic max-w-2xl mx-auto leading-relaxed text-glow">
                  {parents.message}
                </p>
              </div>

              <div className="space-y-8">
                {/* Card de Padres */}
                <div
                  className={`${getAnimationClass(
                    parentsVisible,
                    "slide-in-left",
                    "delay-400"
                  )} parent-card`}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-3xl animate-heart-beat mr-2">
                        👨‍👩‍👧
                      </span>
                      <h3
                        className={parentsVisible ? completeClass : basicClass}
                      >
                        Mis papás
                      </h3>
                      <span className="text-3xl animate-heart-beat ml-2">
                        👨‍👩‍👧
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">👨</span>
                        <p className="text-xl font-medium text-glow">
                          {parents.father}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">👩</span>
                        <p className="text-xl font-medium text-glow">
                          {parents.mother}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card de Padrinos */}
                <div
                  className={`${getAnimationClass(
                    godparentsVisible,
                    "slide-in-right",
                    "delay-600"
                  )} parent-card`}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-3xl animate-heart-beat mr-2">
                        🤝
                      </span>
                      <h3
                        className={
                          godparentsVisible ? completeClass : basicClass
                        }
                      >
                        Mis padrinos
                      </h3>
                      <span className="text-3xl animate-heart-beat ml-2">
                        🤝
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">🤵</span>
                        <p className="text-xl font-medium text-glow">
                          {godparents.godfather}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">👰</span>
                        <p className="text-xl font-medium text-glow">
                          {godparents.godmother}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card de Abuelos */}
                <div
                style={{
                  display:'none'
                }}
                  className={`${getAnimationClass(
                    godparentsVisible,
                    "slide-in-right",
                    "delay-600"
                  )} parent-card`}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-3xl animate-heart-beat mr-2">
                        🤝
                      </span>
                      <h3
                        className={
                          godparentsVisible ? completeClass : basicClass
                        }
                      >
                        Mis Abuelos
                      </h3>
                      <span className="text-3xl animate-heart-beat ml-2">
                        🤝
                      </span>
                    </div>
                    <div>
                      <Image
                        src="/images/abusDahian.jpg"
                        alt="Foto de los abuelos"
                        width={300}
                        height={300}
                        className="w-48 h-48 object-cover rounded-full mx-auto mb-4 border-4 border-white/30 shadow-lg hover:scale-105 transition-transform duration-300"
                        quality={100}
                        priority={true}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                      />
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-center p-6 rounded-full border-4 border-white/30 shadow-lg hover:scale-105 transition-transform duration-300">
                      <div className="flex gap-3 justify-center items-center">
                        <div>
                        <Image
                          src="/images/abueDahian1.jpg"
                          //lazo-negro.png
                          alt="Foto de los abuelos"
                          width={300}
                          height={300}
                          className="w-48 h-48 object-contain rounded-full"
                          quality={100}
                          priority={true}
                          placeholder="blur"
                          blurDataURL="/images/placeholder.png"
                        />
                      </div>

                      <Image
                        src="/images/lazo-negro.png"
                        //lazo-negro.png
                        alt="Foto de los abuelos"
                        width={100}
                        height={100}
                        className=""
                        quality={100}
                        priority={true}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                      />
                      </div>
                      <div>
                        <Image
                         src="/images/abuelitoDahian.jpg"
                          alt="Foto del abuelo"
                          width={300}
                          height={300}
                          className="w-48 h-48 object-contain rounded-full"
                          quality={100}
                          priority={true}
                          placeholder="blur"
                          blurDataURL="/images/placeholder.png"
                        />
                      </div>
                    </div>
                    <div style={{ display: "none" }} className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">🤵</span>
                        <p className="text-xl font-medium text-glow">
                          {godparents.godfather}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">👰</span>
                        <p className="text-xl font-medium text-glow">
                          {godparents.godmother}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card de Hermano */}
                <div
                style={{
                  display:'none'
                }}
                  className={`${getAnimationClass(
                    godparentsVisible,
                    "slide-in-right",
                    "delay-600"
                  )} parent-card`}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-3xl animate-heart-beat mr-2">
                        🤝
                      </span>
                      <h3
                        className={
                          godparentsVisible ? completeClass : basicClass
                        }
                      >
                        Mi Hermano
                      </h3>
                      <span className="text-3xl animate-heart-beat ml-2">
                        🤝
                      </span>
                    </div>
                    <div>
                      <Image
                        src="/images/broDahian.jpg"
                        alt="Foto de los abuelos"
                        width={300}
                        height={300}
                        className="w-48 h-48 object-cover rounded-full mx-auto mb-4 border-4 border-white/30 shadow-lg hover:scale-105 transition-transform duration-300"
                        quality={100}
                        priority={true}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                      />
                    </div>
                    <div style={{ display: "none" }} className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">🤵</span>
                        <p className="text-xl font-medium text-glow">
                          {godparents.godfather}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">👰</span>
                        <p className="text-xl font-medium text-glow">
                          {godparents.godmother}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

            {/* Card de Hermana */}
                <div
                style={{
                  display:'none'
                }}
                  className={`${getAnimationClass(
                    godparentsVisible,
                    "slide-in-right",
                    "delay-600"
                  )} parent-card`}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-3xl animate-heart-beat mr-2">
                        🤝
                      </span>
                      <h3
                        className={
                          godparentsVisible ? completeClass : basicClass
                        }
                      >
                        Mi Hermana
                      </h3>
                      <span className="text-3xl animate-heart-beat ml-2">
                        🤝
                      </span>
                    </div>
                    <div>
                      <Image
                        src="/images/sisDahian1.jpg"
                        alt="Foto de los abuelos"
                        width={300}
                        height={300}
                        className="w-48 h-48 object-contain rounded-full mx-auto mb-4 border-4 border-white/30 shadow-lg hover:scale-105 transition-transform duration-300"
                        quality={100}
                        priority={true}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                      />
                    </div>
                    <div style={{ display: "none" }} className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">🤵</span>
                        <p className="text-xl font-medium text-glow">
                          {godparents.godfather}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">👰</span>
                        <p className="text-xl font-medium text-glow">
                          {godparents.godmother}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
