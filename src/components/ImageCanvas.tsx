
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { ImageFilters } from './ImageEditor';

interface ImageCanvasProps {
  imageData: string | null;
  filters: ImageFilters;
}

const ImageCanvas = forwardRef<HTMLCanvasElement, ImageCanvasProps>(
  ({ imageData, filters }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      if (imageData && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
          // Set canvas size to image size
          canvas.width = img.width;
          canvas.height = img.height;

          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Apply filters
          ctx.filter = `
            brightness(${filters.brightness}%)
            contrast(${filters.contrast}%)
            saturate(${filters.saturation}%)
            blur(${filters.blur}px)
            hue-rotate(${filters.hue}deg)
            sepia(${filters.sepia}%)
            grayscale(${filters.grayscale}%)
          `;

          // Draw image with filters
          ctx.drawImage(img, 0, 0);
        };
        img.src = imageData;
      }
    }, [imageData, filters]);

    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-900/50 rounded-lg">
        {imageData ? (
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[600px] object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <div className="text-center text-gray-400">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-xl">Upload an image or take a photo to get started</p>
            <p className="text-sm mt-2 opacity-75">Supported formats: JPG, PNG, GIF, WebP</p>
          </div>
        )}
      </div>
    );
  }
);

ImageCanvas.displayName = 'ImageCanvas';

export default ImageCanvas;
