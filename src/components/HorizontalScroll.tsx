import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface HorizontalScrollProps {
  text: string;
  className?: string;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  text,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;

    // Split text into words for individual animations
    const splitText = new SplitText(textElement, {
      type: "words",
      wordsClass: "word-split"
    });

    // Get the width of the text to calculate scroll distance
    const textWidth = textElement.scrollWidth;
    const containerWidth = container.offsetWidth;
    const scrollDistance = textWidth - containerWidth;

    // Create horizontal scroll animation
    const scrollTween = gsap.fromTo(textElement,
      {
        x: -scrollDistance
      },
      {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            // Calculate which words should be visible/animated based on scroll progress
            const progress = self.progress;
            const visibleWords = Math.floor(progress * splitText.words.length);

            splitText.words.forEach((word, index) => {
              if (index <= visibleWords) {
                gsap.set(word, {
                  opacity: 1,
                  scale: 1
                });
              }
            });
          }
        }
      }
    );

    // Animate words as they come into view
    splitText.words.forEach((word, index) => {
      gsap.set(word, {
        opacity: 0,
        scale: 0.8,
        rotationY: 45,
        transformOrigin: "center center"
      });

      // Create entrance animation for each word
      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          const wordProgress = (progress * splitText.words.length) - index;

          if (wordProgress > 0 && wordProgress < 1) {
            const easedProgress = gsap.parseEase("back.out(1.7)")(wordProgress);

            gsap.set(word, {
              opacity: easedProgress,
              scale: 0.8 + (easedProgress * 0.2),
              rotationY: 45 - (easedProgress * 45),
              color: `hsl(${200 + (index * 10) % 360}, 70%, ${50 + (easedProgress * 30)}%)`
            });
          } else if (wordProgress >= 1) {
            gsap.set(word, {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              color: `hsl(${200 + (index * 10) % 360}, 70%, 80%)`
            });
          }
        }
      });

      // Add hover effect for each word
      word.addEventListener('mouseenter', () => {
        gsap.to(word, {
          scale: 1.2,
          rotationY: 10,
          color: "#ff6b6b",
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });

      word.addEventListener('mouseleave', () => {
        gsap.to(word, {
          scale: 1,
          rotationY: 0,
          color: `hsl(${200 + (index * 10) % 360}, 70%, 80%)`,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      splitText.revert();
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative h-screen overflow-hidden ${className}`}
    >
      <div className="sticky top-1/2 -translate-y-1/2">
        <div
          ref={textRef}
          className="whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-bold"
          style={{
            width: 'max-content'
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
