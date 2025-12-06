"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

//import Navigation from "../components/navigation"
import HeroSection from "../components/sections/HeroSection"
import ParentsSection from "../components/sections/ParentsSection"
import DateSection from "../components/sections/DateSection"
import CeremonySection from "../components/sections/CeremonySection"
//import ReceptionSection from "../components/sections/ReceptionSection"
import TimelineSection from "../components/sections/TimelineSection"
import DressCodeSection from "../components/sections/DressCodeSection"
import GiftsSection from "../components/sections/GiftsSection"
//import GallerySection from "../components/sections/GallerySection"
import AudioPlayer from "../components/AudioPlayer"
import BasicCTA from "../components/sections/BasicCTA"
import InvitationEnvelope from "../components/sections/InvitationEnvelope"
import WelcomeMessage from "../components/sections/InvitationWelcome"
//import DecorationElement from "../components/DecorationElement"
import { PremiumGallery } from "@/components/sections/PremiumGallery"
import CustomInvitations from "@/components/sections/CustomInvitations/components/CustomInvitations"
import AttendanceConfirmation from "@/components/sections/AttendanceConfirmation"
import { QRCode } from "@/components/sections/QRCode"
import VideoElement from "@/components/sections/VideoElement"
import ErrorBoundary from "@/components/ErrorBoundary"

// Función para detectar iOS específicamente para debugging
const detectDevice = () => {
  if (typeof window === 'undefined') return 'SSR';
  
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  
  console.log('🔍 DEVICE DEBUG:', {
    userAgent,
    platform,
    maxTouchPoints,
    isIOS: /iPad|iPhone|iPod/.test(userAgent) || (platform === 'MacIntel' && maxTouchPoints > 1),
    isAndroid: /Android/.test(userAgent),
    isChrome: /Chrome/.test(userAgent),
    isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent)
  });
  
  return {
    isIOS: /iPad|iPhone|iPod/.test(userAgent) || (platform === 'MacIntel' && maxTouchPoints > 1),
    isAndroid: /Android/.test(userAgent),
    isChrome: /Chrome/.test(userAgent),
    isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    userAgent,
    platform
  };
};

export default function WeddingInvitation() {
  const [isOpenInvitation, setIsOpenInvitation] = useState(false);
  //const [isWelcomeMessageVisible, setIsWelcomeMessageVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(null);

  // Asegurarse de que el componente se monte en el cliente
  useEffect(() => {
    if(typeof window !== 'undefined') {
      console.log('📱 INICIO DE APP - Detectando dispositivo...');
      const info = detectDevice();
      setDeviceInfo(info);
      console.log('📱 DEVICE INFO:', info);
      setIsMounted(true);
    }
  }, []);

  // Logging específico para iOS cuando hay errores
  useEffect(() => {
    if (typeof window !== 'undefined' && deviceInfo?.isIOS) {
      console.log('🍎 iOS DETECTED - Configurando error handlers específicos...');
      
      // Error handler global para iOS
      window.addEventListener('error', (event) => {
        console.error('🍎 iOS ERROR GLOBAL:', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error,
          stack: event.error?.stack
        });
      });

      // Unhandled promise rejections (común en iOS)
      window.addEventListener('unhandledrejection', (event) => {
        console.error('🍎 iOS UNHANDLED REJECTION:', {
          reason: event.reason,
          promise: event.promise
        });
      });

      // Debug de viewport en iOS
      console.log('🍎 iOS VIEWPORT INFO:', {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        screen: {
          width: window.screen?.width,
          height: window.screen?.height
        }
      });
    }
  }, [deviceInfo]);

  if(!isMounted) {
    console.log('⏳ WAITING FOR MOUNT...');
    return null; // O un indicador de carga si lo prefieres
  }

  const handleOpenInvitation = () => {
    console.log('📧 OPENING INVITATION...', { deviceInfo });
    setIsOpenInvitation(true);
    //setIsWelcomeMessageVisible(true);
  };

   /* const handleContinue = () => {
    console.log('▶️ CONTINUING TO MAIN CONTENT...', { deviceInfo });
    setIsWelcomeMessageVisible(false);
  }; */ 

  /* return (
    <div className="flex items-center justify-center min-h-screen">
      Proyecto en pausa. Volveremos pronto.
    </div>
  ) */

  if(!isOpenInvitation) {
    console.log('📧 SHOWING ENVELOPE...');
    return (
      <ErrorBoundary>
        <InvitationEnvelope onOpen={handleOpenInvitation} />
      </ErrorBoundary>
    )
  }

   /* if (isWelcomeMessageVisible) {
    console.log('👋 SHOWING WELCOME MESSAGE...');
    return (
      <ErrorBoundary>
        <WelcomeMessage onContinue={handleContinue} />
      </ErrorBoundary>
    )
  } */ 

  //console.log('🎉 SHOWING MAIN CONTENT...', { deviceInfo });

  return (
    <ErrorBoundary>
      <div 
      style={{
        background: 'linear-gradient(135deg, #f7e6e6, #e3aaaa)',
      }}
      className="min-h-screen">
        {/* <Navigation /> */}
        {/* <DecorationElement /> */}
        <HeroSection />
         <ParentsSection />
        <DateSection />
        <CeremonySection />
        {/* <ReceptionSection /> */}
        {/* <TimelineSection /> */}
        <DressCodeSection />
         <AttendanceConfirmation />
        <GiftsSection />
        {/* <GallerySection /> */}
        {/* <PremiumGallery /> */}
        {/* <VideoElement /> */}
        {/* <QRCode /> */}
        {/* <CustomInvitations /> */}
        <Link 
        style={{display: 'none'}}
        href="/custom-invite" target="_blank" className="flex justify-center my-8">
          <button className="px-6 py-3 bg-pink-800 text-white rounded-full shadow-lg hover:bg-pink-400 transition">
            Personaliza tu invitación
          </button>
        </Link>
        <BasicCTA />
        
        {/* 🎵 Reproductor de audio fijo */}
        <ErrorBoundary>
          <AudioPlayer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}
