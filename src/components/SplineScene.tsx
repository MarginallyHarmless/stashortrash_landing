import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className = '' }: SplineSceneProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <Suspense
        fallback={
          <div className="w-full aspect-video bg-carbon-light rounded-2xl animate-pulse flex items-center justify-center">
            <span className="text-white/40 text-sm">Loading 3D scene...</span>
          </div>
        }
      >
        <Spline scene={scene} />
      </Suspense>
    </div>
  );
}
