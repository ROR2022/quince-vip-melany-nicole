import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Open_Sans } from "next/font/google"
import "./globals.css"
import { quinceMainData } from "@/components/sections/data/main-data"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const { event } = quinceMainData;

export const metadata: Metadata = {
  title: `Invitación a mis XV años - ${event.celebrant}`,
  description: `Acompáñame a celebrar mis XV años el ${event.date.full}.`,
  generator: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${openSans.variable}`}>
      <head>
        {/* iOS específico para mejorar compatibilidad */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={`XV años - ${event.celebrant}`} />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Para debugging en iOS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 🍎 iOS Debugging Script
              (function() {
                if (typeof window === 'undefined') return;
                
                // Detectar iOS
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                
                if (isIOS) {
                  console.log('🍎 iOS DETECTED - Setting up debugging...');
                  
                  // Información del dispositivo iOS
                  console.log('🍎 iOS Device Info:', {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    maxTouchPoints: navigator.maxTouchPoints,
                    devicePixelRatio: window.devicePixelRatio,
                    screen: {
                      width: window.screen.width,
                      height: window.screen.height,
                      availWidth: window.screen.availWidth,
                      availHeight: window.screen.availHeight
                    },
                    viewport: {
                      width: window.innerWidth,
                      height: window.innerHeight
                    },
                    capabilities: {
                      audioContext: typeof AudioContext !== 'undefined',
                      webkitAudioContext: typeof webkitAudioContext !== 'undefined',
                      audio: typeof Audio !== 'undefined',
                      mediaDevices: typeof navigator.mediaDevices !== 'undefined'
                    }
                  });
                  
                  // Interceptar errores específicos de iOS
                  window.addEventListener('error', function(event) {
                    console.error('🍎 iOS GLOBAL ERROR:', {
                      message: event.message,
                      filename: event.filename,
                      lineno: event.lineno,
                      colno: event.colno,
                      error: event.error ? {
                        name: event.error.name,
                        message: event.error.message,
                        stack: event.error.stack
                      } : null,
                      timestamp: new Date().toISOString()
                    });
                  });
                  
                  // Interceptar promesas rechazadas (común en iOS con audio)
                  window.addEventListener('unhandledrejection', function(event) {
                    console.error('🍎 iOS UNHANDLED REJECTION:', {
                      reason: event.reason,
                      promise: event.promise,
                      timestamp: new Date().toISOString()
                    });
                  });
                  
                  // Monitor de memoria en iOS (si está disponible)
                  if (performance && performance.memory) {
                    console.log('🍎 iOS Memory Info:', {
                      usedJSHeapSize: performance.memory.usedJSHeapSize,
                      totalJSHeapSize: performance.memory.totalJSHeapSize,
                      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
                    });
                  }
                  
                  // Log de orientación en iOS
                  if (typeof window.orientation !== 'undefined') {
                    console.log('🍎 iOS Orientation:', window.orientation);
                    window.addEventListener('orientationchange', function() {
                      setTimeout(function() {
                        console.log('🍎 iOS Orientation Changed:', {
                          orientation: window.orientation,
                          viewport: {
                            width: window.innerWidth,
                            height: window.innerHeight
                          }
                        });
                      }, 500);
                    });
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
