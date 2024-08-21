// import React, { useCallback, useEffect, useRef } from 'react';
// import createGlobe from 'cobe';
// import { useSpring } from 'react-spring';

// const GLOBE_CONFIG = {
//   width: 800,
//   height: 800,
//   onRender: () => {},
//   devicePixelRatio: 2,
//   phi: 0,
//   theta: 0.3,
//   dark: 0,
//   diffuse: 0.4,
//   mapSamples: 16000,
//   mapBrightness: 1.2,
//   baseColor: [1, 1, 1],
//   markerColor: [251 / 255, 100 / 255, 21 / 255],
//   glowColor: [1, 1, 1],
//   markers: [
//     { location: [14.5995, 120.9842], size: 0.03 },
//     { location: [19.076, 72.8777], size: 0.1 },
//     { location: [23.8103, 90.4125], size: 0.05 },
//     { location: [30.0444, 31.2357], size: 0.07 },
//     { location: [39.9042, 116.4074], size: 0.08 },
//     { location: [-23.5505, -46.6333], size: 0.1 },
//     { location: [19.4326, -99.1332], size: 0.1 },
//     { location: [40.7128, -74.006], size: 0.1 },
//     { location: [34.6937, 135.5022], size: 0.05 },
//     { location: [41.0082, 28.9784], size: 0.06 },
//   ],
// };

// export default function Globe({ className, config = GLOBE_CONFIG }) {
//   let phi = 0;
//   let width = 0;
//   const canvasRef = useRef(null);
//   const pointerInteracting = useRef(null);
//   const pointerInteractionMovement = useRef(0);
//   const [{ r }, api] = useSpring(() => ({
//     r: 0,
//     config: {
//       mass: 1,
//       tension: 280,
//       friction: 40,
//       precision: 0.001,
//     },
//   }));

//   const updatePointerInteraction = (value) => {
//     pointerInteracting.current = value;
//     if (canvasRef.current) {
//       canvasRef.current.style.cursor = value ? 'grabbing' : 'grab';
//     }
//   };

//   const updateMovement = (clientX) => {
//     if (pointerInteracting.current !== null) {
//       const delta = clientX - pointerInteracting.current;
//       pointerInteractionMovement.current = delta;
//       api.start({ r: delta / 200 });
//     }
//   };

//   const onRender = useCallback(
//     (state) => {
//       if (!pointerInteracting.current) phi += 0.005;
//       state.phi = phi + r.get();
//       state.width = width * 2;
//       state.height = width * 2;
//     },
//     [pointerInteracting, phi, r]
//   );

//   const onResize = () => {
//     if (canvasRef.current) {
//       width = canvasRef.current.offsetWidth;
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('resize', onResize);
//     onResize();

//     const globe = createGlobe(canvasRef.current, {
//       ...config,
//       width: width * 2,
//       height: width * 2,
//       onRender,
//     });

//     setTimeout(() => {
//       if (canvasRef.current) {
//         canvasRef.current.style.opacity = '1';
//       }
//     }, 0);
//     return () => globe.destroy();
//   }, [config, onRender]);

//   return (
//     <div
//       className={`absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] ${className}`}
//     >
//       <canvas
//         className="h-full w-full opacity-1 transition-opacity duration-500"
//         ref={canvasRef}
//         onPointerDown={(e) =>
//           updatePointerInteraction(
//             e.clientX - pointerInteractionMovement.current
//           )
//         }
//         onPointerUp={() => updatePointerInteraction(null)}
//         onPointerOut={() => updatePointerInteraction(null)}
//         onMouseMove={(e) => updateMovement(e.clientX)}
//         onTouchMove={(e) =>
//           e.touches[0] && updateMovement(e.touches[0].clientX)
//         }
//       />
//     </div>
//   );
// }






import React, { useCallback, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useSpring } from 'react-spring';

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export default function Globe({ className, config = GLOBE_CONFIG }) {
  let phi = 0; // Horizontal rotation
  let theta = 0.3; // Vertical rotation
  let width = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerStart = useRef({ x: 0, y: 0 });
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX, clientY) => {
    if (pointerInteracting.current) {
      const deltaX = clientX - pointerStart.current.x;
      const deltaY = clientY - pointerStart.current.y;

      phi -= deltaX * 0.005; // Adjust sensitivity as needed
      theta += deltaY * 0.005; // Adjust sensitivity as needed

      if (theta > Math.PI / 2) theta = Math.PI / 2; // Limit vertical rotation
      if (theta < -Math.PI / 2) theta = -Math.PI / 2; // Limit vertical rotation

      pointerStart.current = { x: clientX, y: clientY };
      api.start({ r: 0 });
    }
  };

  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r.get();
      state.theta = theta;
      state.width = width * 2;
      state.height = width * 2;
    },
    [pointerInteracting, phi, theta, r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    }, 0);
    return () => globe.destroy();
  }, [config, onRender]);

  return (
    <div
      className={`relative aspect-[1/1] max-w-[600px] mx-auto ${className}`}
    >
      <canvas
        className="h-full w-full opacity-1 transition-opacity duration-500"
        ref={canvasRef}
        onPointerDown={(e) => {
          updatePointerInteraction(true);
          pointerStart.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX, e.clientY)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX, e.touches[0].clientY)}
      />
    </div>
  );
}
