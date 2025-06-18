
import React from 'react';
import ImageEditor from '../components/ImageEditor';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
              Vizage
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-300 mx-auto rounded-full animate-scale-in"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300">
            Transform your images with professional filters, effects, and real-time processing tools
          </p>
          <div className="flex justify-center gap-2 mt-4 animate-fade-in delay-500">
            <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-bounce"></span>
            <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></span>
            <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></span>
          </div>
        </div>
        
        <div className="animate-slide-in-right delay-700">
          <ImageEditor />
        </div>
      </div>
    </div>
  );
};

export default Index;
