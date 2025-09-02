import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Palette, Lightbulb } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { testimonials } from '../data/testimonial';
import { Link,  useNavigate } from "react-router-dom";

export default function LandingPage() {
  
  const navigate = useNavigate();

  return (
     <>
      <div className="bg-white">
     
      <div className="mt-32 px-4">
        <div className="text-center px-4  gradient-title">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-4  max-w-3xl mx-auto gradient-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
            Secure Your Documents<br />with AI-Powered PII Masking
          </motion.h1>
          <motion.p className="text-lg text-gray-600 mb-8 mt-2 max-w-3xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
            Upload your ID images and watch sensitive information get redacted instantly and accurately.
          </motion.p>
          <motion.button className="inline-flex items-center bg-blue-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition" 
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
          onClick={() => {navigate("/upload")}}
          >
           <span className='text-xl'>Get Started </span> <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>

        <div id="features" className="py-24 px-4">
          <div className="container mx-auto text-center">
            <motion.h2 className="text-4xl font-bold text-gray-800 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              Why Choose <span className='gradient-title'>SafeDoc AI?</span> 
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {[
                { icon: Zap, title: 'Lightning Fast', desc: 'Process and mask sensitive data in seconds — optimized for speed without compromising accuracy.' },
                { icon: Palette, title: 'High Accuracy', desc: 'Uses OCR and smart regex patterns to detect information with impressive precision.' },
                { icon: Lightbulb, title: 'Easy to Use', desc: 'Just upload a document and let the app handle the rest. Built for simplicity.' },
              ].map((f, i) => (
                <motion.div key={i} className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.2 }}>
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <f.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{f.title}</h3>
                  <p className="text-gray-600">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div id="testimonials" className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div key={i} className="p-6 bg-gray-50 rounded-2xl shadow-md" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i*0.2 }}>
                  <p className="text-gray-600 italic mb-4">“{t.quote}”</p>
                  <h4 className="font-semibold text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-20 bg-blue-600 text-white px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Secure Your Documents?</h2>
            <p className="text-lg mb-8">Start masking PII with one click—no credit card required.</p>
            <button className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-100 transition">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
     </>
  );
}