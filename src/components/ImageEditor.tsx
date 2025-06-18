import React, { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Download, Undo, Redo, RotateCcw, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageCanvas from './ImageCanvas';
import FilterControls from './FilterControls';
import CameraCapture from './CameraCapture';

export interface ImageFilters {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
  sepia: number;
  grayscale: number;
}

export interface HistoryState {
  imageData: string;
  filters: ImageFilters;
}

const ImageEditor = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [filters, setFilters] = useState<ImageFilters>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    hue: 0,
    sepia: 0,
    grayscale: 0,
  });
  
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const addToHistory = useCallback((imageData: string, newFilters: ImageFilters) => {
    const newState: HistoryState = { imageData, filters: newFilters };
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  }, [history, currentHistoryIndex]);

  const handleImageLoad = useCallback((imageData: string) => {
    setCurrentImage(imageData);
    const resetFilters = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      hue: 0,
      sepia: 0,
      grayscale: 0,
    };
    setFilters(resetFilters);
    addToHistory(imageData, resetFilters);
    setShowCamera(false);
    toast({
      title: "Image loaded successfully",
      description: "You can now apply filters and effects",
    });
  }, [addToHistory, toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          handleImageLoad(result);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFilterChange = useCallback((newFilters: ImageFilters) => {
    setFilters(newFilters);
    if (currentImage) {
      addToHistory(currentImage, newFilters);
    }
  }, [currentImage, addToHistory]);

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      const prevIndex = currentHistoryIndex - 1;
      const prevState = history[prevIndex];
      setCurrentImage(prevState.imageData);
      setFilters(prevState.filters);
      setCurrentHistoryIndex(prevIndex);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < history.length - 1) {
      const nextIndex = currentHistoryIndex + 1;
      const nextState = history[nextIndex];
      setCurrentImage(nextState.imageData);
      setFilters(nextState.filters);
      setCurrentHistoryIndex(nextIndex);
    }
  };

  const handleReset = () => {
    if (currentImage) {
      const resetFilters = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0,
        sepia: 0,
        grayscale: 0,
      };
      setFilters(resetFilters);
      addToHistory(currentImage, resetFilters);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      try {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `vizage-edited-${timestamp}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        
        // Add animation to the download button
        const downloadBtn = document.querySelector('[data-download-btn]');
        if (downloadBtn) {
          downloadBtn.classList.add('animate-pulse');
          setTimeout(() => downloadBtn.classList.remove('animate-pulse'), 1000);
        }
        
        link.click();
        toast({
          title: "✨ Image saved successfully!",
          description: "Your processed image has been downloaded",
        });
      } catch (error) {
        toast({
          title: "Download failed",
          description: "There was an error saving your image",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Action Buttons */}
      <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl animate-fade-in hover:bg-white/15 transition-all duration-300">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Upload className="w-4 h-4 mr-2 animate-bounce" />
            Upload Image
          </Button>
          
          <Button
            onClick={() => setShowCamera(true)}
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Camera className="w-4 h-4 mr-2" />
            Take Photo
          </Button>

          {currentImage && (
            <>
              <Button
                onClick={handleUndo}
                disabled={currentHistoryIndex <= 0}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Undo className="w-4 h-4 mr-2" />
                Undo
              </Button>

              <Button
                onClick={handleRedo}
                disabled={currentHistoryIndex >= history.length - 1}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Redo className="w-4 h-4 mr-2" />
                Redo
              </Button>

              <Button
                onClick={handleReset}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>

              <Button
                onClick={handleDownload}
                data-download-btn
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl animate-pulse"
              >
                <Download className="w-4 h-4 mr-2" />
                Save Image
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Main Editor Area */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Image Canvas */}
        <div className="lg:col-span-3 animate-scale-in">
          <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <ImageCanvas
              ref={canvasRef}
              imageData={currentImage}
              filters={filters}
            />
          </Card>
        </div>

        {/* Filter Controls */}
        <div className="lg:col-span-1 animate-slide-in-right delay-300">
          <FilterControls
            filters={filters}
            onFiltersChange={handleFilterChange}
            disabled={!currentImage}
          />
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="animate-fade-in">
          <CameraCapture
            onCapture={handleImageLoad}
            onClose={() => setShowCamera(false)}
          />
        </div>
      )}

      {/* Enhanced Loading State */}
      {!currentImage && (
        <div className="text-center py-12 animate-pulse">
          <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-spin" />
          <p className="text-white/70 text-lg">Ready to transform your images</p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageEditor;
