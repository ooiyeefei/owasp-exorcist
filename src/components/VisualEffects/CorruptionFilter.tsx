/**
 * CorruptionFilter - SVG filter for visual corruption effects
 * Uses feTurbulence and feDisplacementMap for glitch effects
 */

interface CorruptionFilterProps {
  corruptionLevel: number;
}

export function CorruptionFilter({ corruptionLevel }: CorruptionFilterProps) {
  const intensity = corruptionLevel / 100;
  
  // Calculate filter parameters based on corruption
  const baseFrequency = 0.01 + intensity * 0.05;
  const scale = intensity * 30;
  const hueRotate = intensity * 180;

  return (
    <svg 
      style={{ 
        position: 'absolute', 
        width: 0, 
        height: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Main corruption filter */}
        <filter id="corruption-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={3}
            seed={Date.now() % 1000}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="hueRotate"
            values={hueRotate.toString()}
            result="hued"
          />
          <feColorMatrix
            in="hued"
            type="saturate"
            values={(1 + intensity * 2).toString()}
          />
        </filter>

        {/* Chromatic aberration filter */}
        <filter id="chromatic-aberration" x="-10%" y="-10%" width="120%" height="120%">
          <feOffset in="SourceGraphic" dx={intensity * 3} dy={0} result="red">
            <animate
              attributeName="dx"
              values={`${intensity * 3};${intensity * -3};${intensity * 3}`}
              dur="0.1s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feOffset in="SourceGraphic" dx={intensity * -3} dy={0} result="blue">
            <animate
              attributeName="dx"
              values={`${intensity * -3};${intensity * 3};${intensity * -3}`}
              dur="0.1s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feColorMatrix
            in="red"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="redChannel"
          />
          <feColorMatrix
            in="blue"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="blueChannel"
          />
          <feBlend in="redChannel" in2="blueChannel" mode="screen" result="chromatic" />
          <feBlend in="chromatic" in2="SourceGraphic" mode="normal" />
        </filter>

        {/* Screen tear filter */}
        <filter id="screen-tear">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves={1}
            result="tear"
          >
            <animate
              attributeName="baseFrequency"
              values="0.05;0.1;0.05"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="tear"
            scale={intensity * 50}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default CorruptionFilter;
