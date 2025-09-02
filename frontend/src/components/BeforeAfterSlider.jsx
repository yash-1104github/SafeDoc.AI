import React from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Eye, EyeOff, Download } from "lucide-react";


const BeforeAfterSlider = ({ beforeSrc, afterSrc }) => {
  
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(afterSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'masked-image.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 "
    >
      <div className="text-center space-y-2 ">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground"
        >
          Processing Complete!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground"
        >
          Your personal information has been securely masked. Drag the slider to compare.
        </motion.p>
      </div>

      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-large max-w-4xl mx-auto"
      >
        <div
          ref={containerRef}
          className="relative aspect-video cursor-col-resize"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={beforeSrc}
              alt="Original"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border flex items-center space-x-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Original</span>
              </div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={afterSrc}
              alt="Masked"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border flex items-center space-x-2">
                <EyeOff className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Masked</span>
              </div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-0 bottom-0 w-1 bg-gray-900 shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-gray-500 rounded-full shadow-lg cursor-col-resize flex items-center justify-center"
              onMouseDown={handleMouseDown}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-3 h-3 border-2 border-primary-foreground rounded-full" />
            </motion.div>
          </motion.div>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 border-t border-border bg-muted/20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              ✨ All personal information has been securely masked
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadImage}
                className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-smooth"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
      </motion.div>

    </motion.div>
  );
};

export default BeforeAfterSlider;