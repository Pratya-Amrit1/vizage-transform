
import React from 'react';
import ImageEditor from '../components/ImageEditor';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
            Image Canvas Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional image editing with real-time filters, effects, and powerful processing tools
          </p>
        </div>
        <ImageEditor />
      </div>
    </div>
  );
};

export default Index;
