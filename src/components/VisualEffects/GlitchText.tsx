/**
 * GlitchText - Typography component with corruption-based effects
 * Switches fonts and applies glitch animation based on corruption level
 */

import { useCorruption } from '../../contexts/CorruptionContext';
import './GlitchText.css';

interface GlitchTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

export function GlitchText({ children, as: Component = 'span', className = '' }: GlitchTextProps) {
  const { corruptionLevel } = useCorruption();
  const isHaunted = corruptionLevel > 50;
  const isDamned = corruptionLevel > 70;

  const glitchClass = isDamned ? 'glitch-damned' : isHaunted ? 'glitch-possessed' : 'glitch-sanctified';

  return (
    <Component
      className={`glitch-text ${glitchClass} ${className}`}
      data-text={children}
      style={{
        fontFamily: isHaunted ? "'Creepster', cursive" : "'Inter', sans-serif",
      }}
    >
      {children}
    </Component>
  );
}

export default GlitchText;
