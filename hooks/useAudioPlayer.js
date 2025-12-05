// 🎵 useAudioPlayer Hook - Control de audio con rango de tiempo específico

import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Detectar iOS de forma segura para SSR
 */
const isIOSDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

/**
 * Hook personalizado para manejar reproducción de audio con tiempo específico
 * @param {Object} audioConfig - Configuración del audio desde weddingData
 * @returns {Object} Estado y funciones de control del audio
 */
export const useAudioPlayer = (audioConfig) => {
  // Estados del reproductor
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  
  // Referencias
  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  // Destructuración de configuración
  const {
    src,
    startTime = 0,
    endTime = null,
    volume = 0.6,
    loop = true,
    preload = "metadata"
  } = audioConfig || {}

  // Inicializar audio element
  useEffect(() => {
    if (!src || typeof window === 'undefined') {
      console.warn('🚫 useAudioPlayer: No src provided or window undefined', { src, hasWindow: typeof window !== 'undefined' });
      return;
    }

    console.log('🎵 useAudioPlayer: Initializing audio element', { src, startTime, endTime, volume });

    // Detectar dispositivo iOS
    const isIOS = isIOSDevice()
    console.log(`📱 Device detection: ${isIOS ? 'iOS' : 'Other'}`, {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints
    });

    const audio = new Audio()
    
        // Configuración específica para iOS
    if (isIOS) {
      console.log('🍎 Applying iOS-specific audio configuration...');
      audio.preload = "metadata"  // Cambiar de "none" a "metadata" para iOS
      audio.crossOrigin = "anonymous"  // Evitar problemas CORS en iOS
      
      // Configuraciones adicionales para iOS
      audio.playsInline = true;  // Evitar que se abra en pantalla completa
      audio.muted = false;  // Asegurar que no esté muteado
      
      console.log('🍎 iOS audio configuration applied:', {
        preload: audio.preload,
        crossOrigin: audio.crossOrigin,
        playsInline: audio.playsInline,
        muted: audio.muted
      });
    } else {
      audio.preload = preload
      console.log('📱 Non-iOS audio configuration applied:', {
        preload: audio.preload
      });
    }
    
    audio.src = src
    audio.volume = volume
    audio.loop = false  // Manejamos el loop manualmente para mejor control

    console.log('🎵 Audio element created with config:', {
      src: audio.src,
      volume: audio.volume,
      preload: audio.preload,
      isIOS
    });

    // Event listeners mejorados para iOS
    audio.addEventListener('loadstart', () => {
      console.log('📱 Audio loadstart - iniciando carga...', { isIOS, src: audio.src });
      setIsLoading(true)
      setError(null)
    })

    audio.addEventListener('loadeddata', () => {
      console.log('✅ Audio loadeddata - datos cargados', { isIOS, duration: audio.duration });
      setIsLoading(false)
    })

    audio.addEventListener('loadedmetadata', () => {
      console.log('📊 Audio loadedmetadata - metadatos cargados', { 
        isIOS, 
        duration: audio.duration,
        readyState: audio.readyState,
        networkState: audio.networkState
      });
      setIsLoading(false)
    })

    audio.addEventListener('canplay', () => {
      console.log('🎵 Audio canplay - listo para reproducir', { 
        isIOS, 
        readyState: audio.readyState,
        buffered: audio.buffered.length > 0 ? audio.buffered.end(0) : 0
      });
      setIsLoading(false)
    })

    audio.addEventListener('canplaythrough', () => {
      console.log('✅ Audio canplaythrough - puede reproducir completamente', { isIOS });
      setIsLoading(false)
    })

    // Timeout para evitar carga infinita en iOS
    const loadingTimeout = setTimeout(() => {
      if (isIOS) {
        console.warn('⏰ iOS loading timeout reached - forcing completion', {
          readyState: audio.readyState,
          networkState: audio.networkState,
          error: audio.error
        });
        setIsLoading(false)
        setError('Toca el botón para activar audio en iOS')
      } else {
        console.warn('⏰ General loading timeout reached');
        setIsLoading(false)
      }
    }, 8000) // 8 segundos timeout

    audio.addEventListener('error', (e) => {
      console.error('❌ Audio error:', e)
      clearTimeout(loadingTimeout)
      const error = audio.error
      
      let errorMessage = 'Error al cargar el audio'
      
      if (error) {
        console.error('Error details:', error)
        console.error('Error code:', error.code, 'Message:', error.message)
        
        // Códigos de error específicos
        switch (error.code) {
          case 1: // MEDIA_ERR_ABORTED
            errorMessage = isIOS ? 'Audio cancelado - Toca para reintentar' : 'Carga de audio cancelada'
            break
          case 2: // MEDIA_ERR_NETWORK
            errorMessage = isIOS ? 'Error de red en iOS - Verifica conexión' : 'Error de red al cargar audio'
            break
          case 3: // MEDIA_ERR_DECODE
            errorMessage = isIOS ? 'Error de formato en iOS - Archivo corrupto' : 'Error al decodificar audio'
            break
          case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
            errorMessage = isIOS ? 'Formato no soportado en iOS - Prueba otro navegador' : 'Formato de audio no soportado'
            break
          default:
            errorMessage = isIOS ? 'Error en iOS - Intenta tocar para activar' : 'Error desconocido de audio'
        }
      }
      
      setError(errorMessage)
      setIsLoading(false)
      setIsPlaying(false)
    })

    audio.addEventListener('stalled', () => {
      console.warn('Audio stalled - network issue')
      if (isIOS) {
        setError('Carga lenta en iOS - Toca para reintentar')
      }
    })

    audio.addEventListener('waiting', () => {
      console.log('Audio waiting for data')
      setIsLoading(true)
    })

    audio.addEventListener('playing', () => {
      setIsLoading(false)
      setError(null)
    })

    // Manejar tiempo de reproducción
    audio.addEventListener('timeupdate', () => {
      const currentTime = audio.currentTime
      setCurrentTime(currentTime)

      // Si hay endTime definido y se alcanza, volver al startTime
      if (endTime && currentTime >= endTime) {
        if (loop) {
          audio.currentTime = startTime
        } else {
          audio.pause()
          setIsPlaying(false)
        }
      }
    })

    // Evento cuando termina el audio (fallback)
    audio.addEventListener('ended', () => {
      if (loop && startTime !== undefined) {
        audio.currentTime = startTime
        audio.play()
      } else {
        setIsPlaying(false)
      }
    })

    audioRef.current = audio

    return () => {
      // Cleanup
      clearTimeout(loadingTimeout)
      audio.pause()
      audio.removeEventListener('loadstart', () => {})
      audio.removeEventListener('canplay', () => {})
      audio.removeEventListener('error', () => {})
      audio.removeEventListener('timeupdate', () => {})
      audio.removeEventListener('ended', () => {})
      audioRef.current = null
    }
  }, [src, startTime, endTime, volume, loop, preload])

  // Función para reproducir - Optimizada para iOS
  const play = useCallback(async () => {
    if (!audioRef.current) {
      console.warn('🚫 Play function called but no audio reference available');
      return;
    }

    try {
      const audio = audioRef.current
      
      // Detectar iOS para manejo especial
      const isIOS = isIOSDevice()
      
      console.log('▶️ Play function called', {
        isIOS,
        readyState: audio.readyState,
        networkState: audio.networkState,
        currentTime: audio.currentTime,
        paused: audio.paused,
        error: audio.error
      });

      // En iOS, intentar cargar el audio si no está listo
      if (isIOS && audio.readyState < 2) {
        setIsLoading(true)
        console.log('🍎 iOS: Audio not ready, forcing load...', {
          readyState: audio.readyState,
          src: audio.src
        });
        
        // Forzar carga en iOS
        audio.load()
        
        // Esperar a que esté listo
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            console.error('🍎 iOS: Timeout waiting for audio to load');
            reject(new Error('Timeout loading audio on iOS'))
          }, 10000) // 10 segundos timeout

          const onCanPlay = () => {
            console.log('🍎 iOS: Audio ready after forced load');
            clearTimeout(timeout)
            audio.removeEventListener('canplay', onCanPlay)
            audio.removeEventListener('error', onError)
            resolve()
          }

          const onError = (e) => {
            console.error('🍎 iOS: Error during forced load', e);
            clearTimeout(timeout)
            audio.removeEventListener('canplay', onCanPlay)
            audio.removeEventListener('error', onError)
            reject(e)
          }

          audio.addEventListener('canplay', onCanPlay, { once: true })
          audio.addEventListener('error', onError, { once: true })
        })
      }
      
      // Si no está en el rango correcto, posicionar en startTime
      if (startTime !== undefined && 
          (audio.currentTime < startTime || (endTime && audio.currentTime >= endTime))) {
        console.log(`⏭️ Setting audio position to startTime: ${startTime}s`);
        audio.currentTime = startTime
      }

      setIsLoading(false)
      
      console.log('🎵 Attempting to play audio...', {
        currentTime: audio.currentTime,
        volume: audio.volume,
        muted: audio.muted
      });
      
      await audio.play()
      setIsPlaying(true)
      setError(null)
      
      console.log('✅ Audio playing successfully', {
        isIOS,
        currentTime: audio.currentTime,
        volume: audio.volume
      });
      
    } catch (err) {
      console.error('❌ Error al reproducir:', err)
      
      // Información detallada del error para iOS
      const isIOS = isIOSDevice()
      if (isIOS) {
        console.error('🍎 iOS Play Error Details:', {
          name: err.name,
          message: err.message,
          code: err.code,
          stack: err.stack,
          audioState: audioRef.current ? {
            readyState: audioRef.current.readyState,
            networkState: audioRef.current.networkState,
            error: audioRef.current.error
          } : 'No audio ref'
        });
      }
      
      // Mensajes específicos para iOS
      const errorMessage = isIOS ? 
        'iOS requiere interacción - Toca de nuevo' : 
        'No se pudo reproducir el audio'
      
      setError(errorMessage)
      setIsPlaying(false)
      setIsLoading(false)
    }
  }, [startTime, endTime])

  // Función para pausar
  const pause = useCallback(() => {
    if (!audioRef.current) return

    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  // Función para reiniciar audio (útil para iOS)
  const restart = useCallback(async () => {
    if (!audioRef.current) return
    
    try {
      const audio = audioRef.current
      audio.pause()
      audio.currentTime = 0
      audio.load()  // Recargar completamente
      setIsLoading(true)
      setError(null)
      setIsPlaying(false)
      
      // Esperar a que esté listo y luego reproducir
      await new Promise((resolve) => {
        const onCanPlay = () => {
          audio.removeEventListener('canplay', onCanPlay)
          resolve()
        }
        audio.addEventListener('canplay', onCanPlay, { once: true })
      })
      
      await play()
    } catch (err) {
      console.error('Error al reiniciar:', err)
      setError('Error al reiniciar audio')
    }
  }, [play])

  // Función para alternar play/pause - Mejorada para iOS
  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) {
      console.warn('🚫 Toggle function called but no audio reference available');
      return;
    }

    // Si está en iOS y está cargando, forzar la carga
    const isIOS = isIOSDevice()
    
    console.log('🔄 Toggle function called', {
      isIOS,
      isPlaying,
      isLoading,
      error,
      audioState: {
        readyState: audio.readyState,
        networkState: audio.networkState,
        paused: audio.paused,
        currentTime: audio.currentTime
      }
    });
    
    if (isIOS && isLoading) {
      console.log('🔄 iOS: Forzando carga por interacción del usuario...')
      setIsLoading(false)
      setError(null)
      
      try {
        // Forzar carga manual en iOS
        console.log('🍎 iOS: Force loading audio...');
        audio.load()
        await new Promise((resolve) => {
          const onCanPlay = () => {
            console.log('🍎 iOS: Audio ready after force load in toggle');
            audio.removeEventListener('canplay', onCanPlay)
            resolve()
          }
          audio.addEventListener('canplay', onCanPlay, { once: true })
          
          // Timeout de seguridad
          setTimeout(() => {
            console.warn('🍎 iOS: Timeout in toggle force load, continuing anyway');
            audio.removeEventListener('canplay', onCanPlay)
            resolve()
          }, 3000)
        })
        
        // Intentar reproducir inmediatamente
        console.log('🍎 iOS: Attempting immediate play after force load');
        await play()
        return
      } catch (err) {
        console.error('🍎 Error forzando carga en iOS:', err)
        setError('Toca de nuevo para activar audio')
        return
      }
    }

    // Comportamiento normal
    if (isPlaying) {
      console.log('⏸️ Pausing audio...');
      pause()
    } else {
      // Si hay error, intentar reiniciar en lugar de solo play
      if (error) {
        console.log('🔄 Error detected, attempting restart...');
        await restart()
      } else {
        console.log('▶️ Starting audio play...');
        await play()
      }
    }
  }, [isPlaying, isLoading, error, play, pause, restart])

  // Función para detener y resetear
  const stop = useCallback(() => {
    if (!audioRef.current) return

    audioRef.current.pause()
    audioRef.current.currentTime = startTime || 0
    setIsPlaying(false)
    setCurrentTime(startTime || 0)
  }, [startTime])

  // Función para cambiar volumen
  const setVolume = useCallback((newVolume) => {
    if (!audioRef.current) return
    
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    audioRef.current.volume = clampedVolume
  }, [])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Retornar estado y funciones
  return {
    // Estados
    isPlaying,
    isLoading,
    error,
    currentTime,
    
    // Funciones de control
    play,
    pause,
    toggle,
    restart,
    stop,
    setVolume,
    
    // Referencias para uso avanzado
    audioRef,
    
    // Información útil
    duration: endTime && startTime ? endTime - startTime : null,
    progress: endTime && startTime ? 
      Math.max(0, Math.min(1, (currentTime - startTime) / (endTime - startTime))) : 0
  }
}
