
import React from 'react';
import { AppStep } from '../types';

interface HeaderProps {
  step: AppStep;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ step, onGoHome }) => {
  return (
    <header className="bg-[#006a4e] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer" 
          onClick={onGoHome}
        >
          <div className="w-10 h-10 bg-[#f42a41] rounded-full flex items-center justify-center border-2 border-white shadow-md">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">ডিজিটাল ভোটিং সিস্টেম ২০২৬</h1>
            <p className="text-xs opacity-80">সিঙ্গেল বোর্ডিং ডিজিটাল প্ল্যাটফর্ম</p>
          </div>
        </div>

        {step !== AppStep.LANDING && (
          <nav className="hidden md:flex items-center space-x-6">
            <button className="text-sm font-medium hover:text-green-200 transition">সহায়তা</button>
            <button className="text-sm font-medium hover:text-green-200 transition">নির্বাচনী আইন</button>
            <div className="h-6 w-px bg-white/20"></div>
            <button 
              onClick={onGoHome}
              className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-sm transition"
            >
              প্রস্থান
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
