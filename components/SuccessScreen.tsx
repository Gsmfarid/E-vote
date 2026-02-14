
import React from 'react';

interface SuccessScreenProps {
  onGoBack: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onGoBack }) => {
  return (
    <div className="max-w-md mx-auto py-12 text-center space-y-8 animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto shadow-inner">
        ✓
      </div>
      
      <div className="space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-800">অভিনন্দন!</h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          আপনার ভোটটি সফলভাবে নিবন্ধিত হয়েছে। আপনার নির্বাচনী দায়িত্ব পালনের জন্য আপনাকে ধন্যবাদ।
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">ডিজিটাল রিসিট</p>
        <div className="space-y-2 text-left text-sm font-mono text-slate-600">
          <div className="flex justify-between"><span>ট্রানজেকশন আইডি:</span> <span>TXN-9923-0012</span></div>
          <div className="flex justify-between"><span>তারিখ:</span> <span>২০ ডিসেম্বর ২০২৬</span></div>
          <div className="flex justify-between"><span>সময়:</span> <span>১১:৪৫ এএম</span></div>
          <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex justify-center">
            <img src="https://picsum.photos/seed/qr/120/120" alt="QR Code" className="opacity-70" />
          </div>
        </div>
      </div>

      <button 
        onClick={onGoBack}
        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg transition"
      >
        ড্যাশবোর্ডে ফিরে যান
      </button>

      <p className="text-sm text-slate-400">এই পৃষ্ঠাটি আপনার ব্যক্তিগত রেকর্ড হিসেবে প্রিন্ট বা সেভ করে রাখতে পারেন।</p>
    </div>
  );
};

export default SuccessScreen;
