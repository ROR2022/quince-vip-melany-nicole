// Error Boundary específico para debugging en iOS

"use client";

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el state para mostrar la UI de error en el siguiente renderizado
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Detectar si es iOS para logging específico
    const isIOS = typeof window !== 'undefined' && 
      (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

    // Log detallado del error
    console.error('🚨 ErrorBoundary caught an error:', {
      error: error.toString(),
      errorInfo,
      stack: error.stack,
      isIOS,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      viewport: typeof window !== 'undefined' ? {
        width: window.innerWidth,
        height: window.innerHeight
      } : 'unknown'
    });

    // Si es iOS, hacer logging adicional
    if (isIOS) {
      console.error('🍎 iOS Error Details:', {
        errorName: error.name,
        errorMessage: error.message,
        componentStack: errorInfo.componentStack,
        errorBoundary: errorInfo.errorBoundary,
        errorBoundaryName: errorInfo.errorBoundaryName,
        props: this.props
      });
    }

    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      const isIOS = typeof window !== 'undefined' && 
        (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

      // UI de error personalizada
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '2px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          color: '#d63031',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h2 style={{ margin: '0 0 10px 0' }}>
            {isIOS ? '🍎 Error en iOS' : '🚨 Error de Aplicación'}
          </h2>
          <p style={{ margin: '0 0 10px 0' }}>
            {isIOS 
              ? 'Se ha detectado un error específico en dispositivos iOS. Por favor, recarga la página o intenta usar otro navegador.'
              : 'Ha ocurrido un error inesperado. Por favor, recarga la página.'
            }
          </p>
          
          {/* Mostrar detalles solo en desarrollo */}
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Detalles del error (desarrollo)
              </summary>
              <pre style={{
                background: '#f0f0f0',
                padding: '10px',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
                marginTop: '10px'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          
          {/* Botón para recargar */}
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#d63031',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔄 Recargar Página
          </button>

          {/* Información adicional para iOS */}
          {isIOS && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              <strong>💡 Consejos para iOS:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                <li>Intenta usar Safari en lugar de Chrome</li>
                <li>Verifica que tengas buena conexión a internet</li>
                <li>Cierra otras aplicaciones para liberar memoria</li>
                <li>Si el problema persiste, intenta en modo incógnito</li>
              </ul>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;