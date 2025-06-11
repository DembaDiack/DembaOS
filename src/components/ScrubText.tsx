import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import Scrubber from './Scrubber/Scrubber';
import Scrubbed from './Scrubber/Scrubbed';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrubTextProps {
  text: string;
  className?: string;
  height?: string | number;
}

const ScrubText: React.FC<ScrubTextProps> = ({
  text,
  className = "",
  height = "200vh"
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);

  useGSAP(() => {
    if (!textRef.current) return;

    const textElement = textRef.current;

    // Split text into words
    const splitText = new SplitText(textElement, {
      type: "words",
      wordsClass: "word-split inline-block"
    });

    // Initial state for all words
    gsap.set(splitText.words, {
      opacity: 0,
      y: 100,
      rotationX: 90,
      scale: 0.5,
      transformOrigin: "center bottom",
      filter: "blur(20px)"
    });

    // Store original colors for reset
    const originalColors = splitText.words.map((_, index) =>
      `hsl(${220 + (index * 15) % 140}, 70%, 60%)`
    );    splitText.words.forEach((word, index) => {
      (word as HTMLElement).style.color = originalColors[index];
    });

    return () => {
      splitText.revert();
    };
  }, [text]);
  const handleScroll = (progress: number) => {
    progressRef.current = progress;

    if (!textRef.current) return;

    const textElement = textRef.current;

    // Use existing split text if available
    const words = textElement.querySelectorAll('.word-split');
    if (words.length === 0) return;

    // Calculate text movement
    const textWidth = textElement.scrollWidth;
    const containerWidth = window.innerWidth;
    const maxMovement = Math.max(0, textWidth - containerWidth);
    const xMovement = -maxMovement * progress;

    // Move the entire text container
    gsap.set(textElement, {
      x: xMovement
    });

    // Animate individual words based on progress
    const totalWords = words.length;

    words.forEach((word, index) => {
      const wordStart = index / totalWords;
      const wordEnd = (index + 1) / totalWords;
      const wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart) * 2));

      if (wordProgress > 0) {
        const easeProgress = gsap.parseEase("back.out(2.5)")(wordProgress);

        gsap.set(word, {
          opacity: easeProgress,
          y: 100 - (easeProgress * 100),
          rotationX: 90 - (easeProgress * 90),
          scale: 0.5 + (easeProgress * 0.5),
          filter: `blur(${20 - (easeProgress * 20)}px)`,
          textShadow: `0 ${10 - (easeProgress * 10)}px ${30 - (easeProgress * 20)}px rgba(0,0,0,0.3)`
        });

        // Color animation based on progress
        const hue = 220 + (index * 15) % 140 + (easeProgress * 60);
        const saturation = 70 + (easeProgress * 30);
        const lightness = 60 + (easeProgress * 20);
        (word as HTMLElement).style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // Add sparkle effect at peak animation
        if (easeProgress > 0.7) {
          const sparkleIntensity = (easeProgress - 0.7) / 0.3;
          const time = Date.now() * 0.001;
          (word as HTMLElement).style.textShadow = `
            0 0 ${sparkleIntensity * 20}px currentColor,
            ${Math.sin(time + index) * 5}px ${Math.cos(time + index) * 5}px ${sparkleIntensity * 15}px rgba(255,255,255,0.8),
            0 ${10 - (easeProgress * 10)}px ${30 - (easeProgress * 20)}px rgba(0,0,0,0.3)
          `;
        }
      }
    });
  };

  return (
    <Scrubber height={height} onScroll={handleScroll}>
      <Scrubbed>
        <div className={`flex items-center justify-start h-screen overflow-hidden ${className}`}>
          <div
            ref={textRef}
            className="whitespace-nowrap text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold select-none"
            style={{
              width: 'max-content',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.02em'
            }}
          >
            {text}
          </div>
        </div>
      </Scrubbed>
    </Scrubber>
  );
};

export default ScrubText;
