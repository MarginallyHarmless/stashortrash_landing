import { lazy, Suspense, useCallback } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className = '' }: SplineSceneProps) {
  const isFullHeight = className.includes('h-full');

  const handleLoad = useCallback((_splineApp: Application) => {
    // no-op for now
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      <Suspense
        fallback={
          <div className={`w-full ${isFullHeight ? 'h-full' : 'aspect-video'} bg-carbon-light rounded-2xl animate-pulse flex items-center justify-center`}>
            <span className="text-white/40 text-sm">Loading 3D scene...</span>
          </div>
        }
      >
        <Spline
          scene={scene}
          style={isFullHeight ? { width: '100%', height: '100%' } : undefined}
          onLoad={handleLoad}
        />
      </Suspense>
    </div>
  );
}
