"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import NET from "vanta/dist/vanta.net.min";

export default function VantaBackground({ children }: { children: React.ReactNode }) {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE, // Pass the installed Three.js instance
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3b82f6, // Raymond Gray Blue Accent
          backgroundColor: 0xffffff, // White Background
          points: 12.00,
          maxDistance: 22.00,
          spacing: 18.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="relative py-24 overflow-hidden">
      {/* Content z-index must be higher than canvas */}
      <div className="relative z-10 pointer-events-none"> 
        {children}
      </div>
    </div>
  );
}
