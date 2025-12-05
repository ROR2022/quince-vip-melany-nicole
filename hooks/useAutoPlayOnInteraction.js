// 🎵 useAutoPlayOnInteraction Hook - Detecta primera interacción del usuario

"use client"

import { useState, useEffect, useCallback } from 'react'

/**
 * Detectar iOS de forma segura para SSR
 */
const isIOSDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || 
               (platform === 'MacIntel' && maxTouchPoints > 1);
               
  console.log('🍎 useAutoPlayOnInteraction iOS Detection:', {
    userAgent,
    platform, 
    maxTouchPoints,
    isIOS
  });
  
  return isIOS;
}

/**
 * Hook para detectar la primera interacción del usuario y habilitar auto-play
 * Características:
 * - Detecta múltiples tipos de interacción (click, scroll, touch, keypress)
 * - Cumple con políticas de auto-play de navegadores modernos
 * - Callback único por sesión
 * - Cleanup automático después de la primera interacción
 * - Optimizado para iOS
 */
function useAutoPlayOnInteraction() {
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isWaitingForInteraction, setIsWaitingForInteraction] = useState(true)
  const [iosDevice, setIOSDevice] = useState(false)

  // Detectar iOS al inicializar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isIOS = isIOSDevice();
      setIOSDevice(isIOS);
      
      if (isIOS) {
        console.log('🍎 useAutoPlayOnInteraction: iOS device detected');
      }
    }
  }, []);

  // Función para manejar la primera interacción
  const handleFirstInteraction = useCallback((event) => {
    if (!hasInteracted) {
      const eventInfo = {
        type: event.type,
        target: event.target?.tagName,
        timestamp: Date.now(),
        isIOS: iosDevice
      };
      
      console.log('🎵 Primera interacción detectada', eventInfo);
      
      if (iosDevice) {
        console.log('🍎 iOS: Primera interacción capturada - habilitando audio', eventInfo);
      }
      
      setHasInteracted(true)
      setIsWaitingForInteraction(false)
      
      // Log para debugging
      console.log('🎵 Auto-play habilitado después de interacción', eventInfo)
    }
  }, [hasInteracted, iosDevice])

  // Configurar listeners de eventos
  useEffect(() => {
    if (hasInteracted) {
      console.log('✅ Usuario ya interactuó, no se necesitan más listeners');
      return // Ya no necesitamos listeners
    }

    console.log('👂 Configurando listeners de interacción...', { iosDevice });

    // Lista de eventos que indican interacción del usuario
    // Eventos adicionales para iOS
    const interactionEvents = iosDevice ? [
      'click',
      'touchstart',
      'touchend',
      'touchmove', // iOS específico
      'keydown',
      'scroll',    // iOS Safari necesita scroll a veces
      'gesturestart', // iOS gestures
      'gesturechange',
      'gestureend'
    ] : [
      'click',
      'touchstart',
      'touchend', 
      'keydown',
    ]

    console.log('📝 Eventos de interacción configurados:', interactionEvents);

    // Agregar listeners
    interactionEvents.forEach(event => {
      try {
        document.addEventListener(event, handleFirstInteraction, { 
          once: true, // Solo se ejecuta una vez
          passive: true, // No bloquea el scroll
          capture: true // Capturar en fase de captura para iOS
        })
        
        if (iosDevice) {
          console.log(`🍎 iOS: Listener agregado para evento: ${event}`);
        }
      } catch (error) {
        console.error(`❌ Error agregando listener para ${event}:`, error);
      }
    })

    // Cleanup - remover listeners
    return () => {
      console.log('🧹 Removiendo listeners de interacción...');
      interactionEvents.forEach(event => {
        try {
          document.removeEventListener(event, handleFirstInteraction)
          if (iosDevice) {
            console.log(`🍎 iOS: Listener removido para evento: ${event}`);
          }
        } catch (error) {
          console.error(`❌ Error removiendo listener para ${event}:`, error);
        }
      })
    }
  }, [hasInteracted, handleFirstInteraction, iosDevice])

  // Función para intentar auto-play después de interacción
  const tryAutoPlay = useCallback((audioElement) => {
    if (!audioElement) {
      console.warn('🚫 tryAutoPlay: No audioElement provided');
      return Promise.reject('No audio element provided')
    }
    
    if (!hasInteracted) {
      console.warn('🚫 tryAutoPlay: No user interaction detected yet');
      return Promise.reject('No hay interacción del usuario aún')
    }

    console.log('🎵 Intentando auto-play...', {
      hasInteracted,
      iosDevice,
      audioElement: {
        src: audioElement.src,
        readyState: audioElement.readyState,
        paused: audioElement.paused
      }
    });

    // Configuración específica para iOS antes de reproducir
    if (iosDevice) {
      console.log('🍎 iOS: Configurando audio element para reproducción...');
      
      // Configuraciones específicas para iOS
      audioElement.muted = false;
      audioElement.playsInline = true;
      
      console.log('🍎 iOS: Audio element configurado', {
        muted: audioElement.muted,
        playsInline: audioElement.playsInline,
        volume: audioElement.volume
      });
    }

    // Intentar reproducir
    return audioElement.play().then(() => {
      console.log('✅ Auto-play exitoso', { iosDevice });
      if (iosDevice) {
        console.log('🍎 iOS: Auto-play successful!');
      }
      return true
    }).catch((error) => {
      console.warn('❌ Auto-play falló:', {
        error: error.message,
        name: error.name,
        iosDevice
      });
      
      if (iosDevice) {
        console.error('🍎 iOS Auto-play failed:', {
          error: error.message,
          code: error.code || 'unknown',
          name: error.name,
          audioState: {
            readyState: audioElement.readyState,
            networkState: audioElement.networkState,
            error: audioElement.error
          }
        });
      }
      
      return false
    })
  }, [hasInteracted, iosDevice])

  return {
    hasInteracted,
    isWaitingForInteraction,
    tryAutoPlay,
    iosDevice, // Exponer información de iOS para otros componentes
    // Función para marcar manualmente como interactuado (útil para testing)
    markAsInteracted: () => {
      console.log('🔧 Marcando manualmente como interactuado');
      setHasInteracted(true);
      setIsWaitingForInteraction(false);
    }
  }
}

export { useAutoPlayOnInteraction }