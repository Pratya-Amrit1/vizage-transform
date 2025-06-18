
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
    },
    {
      name: 'contrast' as keyof ImageFilters,
      label: 'Contrast',
      min: 0,
      max: 200,
      step: 1,
      icon: '🌓',
    },
    {
      name: 'saturation' as keyof ImageFilters,
      label: 'Saturation',
      min: 0,
      max: 200,
      step: 1,
      icon: '🎨',
    },
    {
      name: 'blur' as keyof ImageFilters,
      label: 'Blur',
      min: 0,
      max: 10,
      step: 0.1,
      icon: '🌫️',
    },
    {
      name: 'hue' as keyof ImageFilters,
      label: 'Hue',
      min: -180,
      max: 180,
      step: 1,
      icon: '🌈',
    },
    {
      name: 'sepia' as keyof ImageFilters,
      label: 'Sepia',
      min: 0,
      max: 100,
      step: 1,
      icon: '🟤',
    },
    {
      name: 'grayscale' as keyof ImageFilters,
      label: 'Grayscale',
      min: 0,
      max: 100,
      step: 1,
      icon: '⚫',
    },
  ];

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6 text-center">
        Filters & Effects
      </h3>
      
      <div className="space-y-6">
        {filterConfigs.map((config) => (
          <div key={config.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white text-sm font-medium flex items-center gap-2">
                <span>{config.icon}</span>
                {config.label}
              </Label>
              <span className="text-white/70 text-xs font-mono">
                {filters[config.name]}
                {config.name === 'brightness' || config.name === 'contrast' || config.name === 'saturation' ? '%' : ''}
                {config.name === 'blur' ? 'px' : ''}
                {config.name === 'hue' ? '°' : ''}
                {config.name === 'sepia' || config.name === 'grayscale' ? '%' : ''}
              </span>
            </div>
            
            <Slider
              value={[filters[config.name]]}
              onValueChange={(value) => handleFilterChange(config.name, value[0])}
              min={config.min}
              max={config.max}
              step={config.step}
              disabled={disabled}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {disabled && (
        <div className="mt-6 text-center">
          <p className="text-white/50 text-sm">
            Load an image to start editing
          </p>
        </div>
      )}
    </Card>
  );
};

export default FilterControls;
