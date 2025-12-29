import { useState, useEffect, useRef } from 'react';
import backgroundMusic from '../assets/music/music.mp3';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const hasTriedAutoplay = useRef(false);

    // Reproducir audio automáticamente después de 1 segundo
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || hasTriedAutoplay.current) return;

        // Configurar el audio
        audio.loop = true;
        audio.volume = 0.5; // Volumen al 50%

        // Esperar 1 segundo antes de intentar reproducir
        const autoplayTimer = setTimeout(async () => {
            try {
                hasTriedAutoplay.current = true;
                await audio.play();
                setIsPlaying(true);
                console.log('Audio reproduciendo automáticamente');
            } catch (error) {
                // Si el navegador bloquea la reproducción automática
                console.log('Autoplay bloqueado por el navegador:', error);
                setIsPlaying(false);

                // Intentar reproducir en la primera interacción del usuario
                const startOnInteraction = async () => {
                    try {
                        await audio.play();
                        setIsPlaying(true);
                        // Remover los event listeners después del primer intento exitoso
                        document.removeEventListener('click', startOnInteraction);
                        document.removeEventListener('touchstart', startOnInteraction);
                        document.removeEventListener('keydown', startOnInteraction);
                    } catch (err) {
                        console.error('Error al reproducir:', err);
                    }
                };

                // Escuchar cualquier interacción del usuario
                document.addEventListener('click', startOnInteraction);
                document.addEventListener('touchstart', startOnInteraction);
                document.addEventListener('keydown', startOnInteraction);

                // Cleanup de los listeners
                return () => {
                    document.removeEventListener('click', startOnInteraction);
                    document.removeEventListener('touchstart', startOnInteraction);
                    document.removeEventListener('keydown', startOnInteraction);
                };
            }
        }, 1000); // 1 segundo de espera

        // Cleanup
        return () => {
            clearTimeout(autoplayTimer);
            if (audio) {
                audio.pause();
            }
        };
    }, []);

    // Toggle play/pause
    const toggleAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(error => {
                console.error('Error al reproducir:', error);
            });
            setIsPlaying(true);
        }
    };

    // Toggle mute
    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <>
            {/* Audio element */}
            <audio
                ref={audioRef}
                src={backgroundMusic}
                preload="auto"
                aria-label="Música de fondo de la promoción"
            />

            {/* Botón flotante de control - WCAG 2.5.3 */}
            <button
                onClick={toggleAudio}
                className="audio-control-button"
                aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
                aria-pressed={isPlaying}
                type="button"
                title={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
                {isPlaying ? (
                    // Icono de pausa (dos barras verticales)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                ) : (
                    // Icono de play (triángulo)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
                <span className="visually-hidden">
                    {isPlaying ? 'Música reproduciéndose' : 'Música pausada'}
                </span>
            </button>

            {/* Indicador de estado para lectores de pantalla */}
            <div
                className="visually-hidden"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                {isPlaying ? 'Música de fondo reproduciéndose' : 'Música de fondo pausada'}
            </div>
        </>
    );
};

export default AudioPlayer;
