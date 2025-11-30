/**
 * ParticleBackground - Floating particles effect
 * Used for atmospheric background animation
 */

import './ParticleBackground.css';

interface ParticleBackgroundProps {
  particleCount?: number;
  color?: string;
}

export function ParticleBackground({ 
  particleCount = 20, 
  color = '#8b0000' 
}: ParticleBackgroundProps) {
  return (
    <div className="particle-background">
      {[...Array(particleCount)].map((_, i) => (
        <div 
          key={i} 
          className="bg-particle" 
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${-10 - Math.random() * 100}vh`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${40 + Math.random() * 30}s`,
            background: color,
            boxShadow: `0 0 8px ${color}`
          }} 
        />
      ))}
    </div>
  );
}

export default ParticleBackground;
