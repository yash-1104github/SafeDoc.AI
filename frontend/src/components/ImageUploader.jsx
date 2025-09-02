import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Check } from "lucide-react";


const ImageUploader = ({ onFileSelect }) => {

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    e.preventDefault();
    setIsDragging(false);


    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      onFileSelect(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setIsDragging(false);
    setSelectedFile(null);
    setPreview(null);
    onFileSelect(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <AnimatePresence mode="wait">
        
        {!selectedFile ? (
          
          <motion.div
            key="uploader"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`relative border-2 mt-4 border-dashed rounded-2xl p-12 text-center transition-smooth shadow-medium hover:shadow-large ${
              isDragging
                ? 'border-primary bg-primary/5 scale-105'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            <motion.div
              className="space-y-6"
            >
              <motion.button className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Upload onClick={openFileDialog}  className={`h-8 w-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              </motion.button>
              
              <div className="space-y-2 mt-8">
                <h3 className="text-lg font-semibold text-foreground">
                  {isDragging ? 'Drop your image here' : 'Upload your ID or document'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Drag and drop your image here
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, GIF up to 5MB
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative bg-card border border-border rounded-2xl p-6 shadow-medium"
          >
            <div className="flex items-start space-x-4 ">
            
              <div className="flex-1 min-w-0">
                <motion.h4
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-semibold text-foreground truncate"
                >
                  {selectedFile.name}
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-sm"
                >
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-2 mt-2"
                >
                </motion.div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearFile}
                className="w-8 h-8 bg-muted hover:bg-destructive/10 hover:text-destructive rounded-full flex items-center justify-center transition-smooth"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
            
            {preview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-4 overflow-hidden rounded-xl"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover bg-muted"
                />
              </motion.div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;