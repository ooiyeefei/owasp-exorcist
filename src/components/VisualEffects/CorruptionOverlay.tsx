/**
 * CorruptionOverlay - Red vignette overlay for corruption effect
 * Opacity controlled by CSS variable --corruption-overlay-opacity
 */

import './CorruptionOverlay.css';

export function CorruptionOverlay() {
  return (
    <div className="corruption-overlay" aria-hidden="true">
      <div className="corruption-vignette" />
      <div className="corruption-scanlines" />
      <div className="corruption-noise" />
    </div>
  );
}

export default CorruptionOverlay;
