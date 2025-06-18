
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ImageFilters } from './ImageEditor';

interface FilterControlsProps {
  filters: ImageFilters;
  onFiltersChange: (filters: ImageFilters) => void;
  disabled?: boolean;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFiltersChange,
  disabled = false,
}) => {
  const handleFilterChange = (filterName: keyof ImageFilters, value: number) => {
    const newFilters = {
      ...filters,
      [filterName]: value,
    };
    onFiltersChange(newFilters);
  };

  const filterConfigs = [
    {
      name: 'brightness' as keyof ImageFilters,
      label: 'Brightness',
      min: 0,
      max: 200,
      step: 1,
      icon: '☀️',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      name: 'contrast' as keyof ImageFilters,
      label: 'Contrast',
      min: 0,
      max: 200,
      step: 1,
      icon: '🌓',
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: 'saturation' as keyof ImageFilters,
      label: 'Saturation',
      min: 0,
      max: 200,
      step: 1,
      icon: '🎨',
      color: 'from-pink-400 to-purple-500',
    },
    {
      name: 'blur' as keyof ImageFilters,
      label: 'Blur',
      min: 0,
      max: 10,
      step: 0.1,
      icon: '🌫️',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      name: 'hue' as keyof ImageFilters,
      label: 'Hue',
      min: -180,
      max: 180,
      step: 1,
      icon: '🌈',
      color: 'from-red-400 via-yellow-400 to-blue-400',
    },
    {
      name: 'sepia' as keyof ImageFilters,
      label: 'Sepia',
      min: 0,
      max: 100,
      step: 1,
      icon: '🟤',
      color: 'from-amber-600 to-brown-500',
    },
    {
      name: 'grayscale' as keyof ImageFilters,
      label: 'Grayscale',
      min: 0,
      max: 100,
      step: 1,
      icon: '⚫',
      color: 'from-gray-500 to-gray-700',
    },
  ];

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
          Filters & Effects
        </h3>
        <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-purple-300 mx-auto rounded-full"></div>
      </div>
      
      <div className="space-y-6">
        {filterConfigs.map((config, index) => (
          <div 
            key={config.name} 
            className="space-y-3 animate-fade-in hover:transform hover:scale-102 transition-all duration-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <Label className="text-white text-sm font-medium flex items-center gap-2 group">
                <span className="text-lg group-hover:animate-bounce transition-all duration-200">
                  {config.icon}
                </span>
                <span className="group-hover:text-white/90">{config.label}</span>
              </Label>
              <div className={`px-2 py-1 rounded-md bg-gradient-to-r ${config.color} text-white text-xs font-mono shadow-md`}>
                {filters[config.name]}
                {config.name === 'brightness' || config.name === 'contrast' || config.name === 'saturation' ? '%' : ''}
                {config.name === 'blur' ? 'px' : ''}
                {config.name === 'hue' ? '°' : ''}
                {config.name === 'sepia' || config.name === 'grayscale' ? '%' : ''}
              </div>
            </div>
            
            <div className="relative group">
              <Slider
                value={[filters[config.name]]}
                onValueChange={(value) => handleFilterChange(config.name, value[0])}
                min={config.min}
                max={config.max}
                step={config.step}
                disabled={disabled}
                className="w-full group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {disabled && (
        <div className="mt-8 text-center animate-pulse">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>
            <p className="text-white/70 text-sm">
              Load an image to start editing
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FilterControls;
