
import React, { useState } from 'react';
import { AppStep } from '../types';

interface HeaderProps {
  step: AppStep;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ step, onGoHome }) => {
  const [isLawModalOpen, setIsLawModalOpen] = useState(false);

  const electionRules = [
    { title: 'ভোটাধিকারের যোগ্যতা', detail: 'ভোটার হওয়ার জন্য বয়স ন্যূনতম ১৮ বছর হতে হবে এবং তালিকায় নাম অন্তর্ভুক্ত থাকতে হবে।' },
    { title: 'পরিচয় যাচাই', detail: 'ডিজিটাল পদ্ধতিতে ভোটদানের জন্য স্মার্ট এনআইডি এবং সফল বায়োমেট্রিক ভেরিফিকেশন বাধ্যতামূলক।' },
    { title: 'গোপনীয়তা রক্ষা', detail: 'ভোটের গোপনীয়তা বজায় রাখা প্রতিটি নাগরিকের দায়িত্ব। ভোট কক্ষের ছবি তোলা বা কাউকে নিজের ভোট প্রদর্শন করা আইনত দণ্ডনীয় অপরাধ।' },
    { title: 'অবাধ ও সুষ্ঠু নির্বাচন', detail: 'একটি জাতীয় পরিচয়পত্র দিয়ে শুধুমাত্র একটি ভোট প্রদান করা যাবে। ডাবল ভোটিং সিস্টেম দ্বারা স্বয়ংক্রিয়ভাবে শনাক্ত ও বাতিল করা হবে।' },
    { title: 'আইনি ব্যবস্থা', detail: 'নির্বাচনী কারচুপি বা তথ্য জালিয়াতির জন্য ডিজিটাল নিরাপত্তা আইন এবং নির্বাচনী আচরণবিধি অনুযায়ী শাস্তিমূলক ব্যবস্থা গ্রহণ করা হবে।' }
  ];

  return (
    <>
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

          <nav className="flex items-center space-x-4 md:space-x-6">
            <button 
              onClick={() => setIsLawModalOpen(true)}
              className="text-sm font-medium hover:text-green-200 transition hidden sm:block"
            >
              নির্বাচনী আইন
            </button>
            <button className="text-sm font-medium hover:text-green-200 transition hidden md:block">সহায়তা</button>
            
            {step !== AppStep.LANDING && (
              <>
                <div className="h-6 w-px bg-white/20 hidden md:block"></div>
                <button 
                  onClick={onGoHome}
                  className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-sm transition"
                >
                  প্রস্থান
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Election Law Modal */}
      {isLawModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-[#006a4e] p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚖️</span>
                <h3 className="text-xl font-bold">নির্বাচনী আইন ও বিধিমালা ২০২৬</h3>
              </div>
              <button 
                onClick={() => setIsLawModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <p className="text-slate-600 mb-6 leading-relaxed">
                গণপ্রজাতন্ত্রী বাংলাদেশের নির্বাচনী আইন ও ২০২৬ সালের ডিজিটাল ভোটিং নীতিমালা অনুযায়ী সকল ভোটারকে নিম্নোক্ত নিয়মাবলী মেনে চলতে হবে:
              </p>
              
              <div className="space-y-6">
                {electionRules.map((rule, idx) => (
                  <div key={idx} className="flex space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 text-[#006a4e] flex items-center justify-center font-bold text-sm border border-green-100">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">{rule.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{rule.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-3">
                <span className="text-xl">⚠️</span>
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  সতর্কবার্তা: নির্বাচনে যেকোনো ধরনের অসদুপায় অবলম্বন করলে নির্বাচনী আইন ২০২৬-এর ধারা ১২ অনুযায়ী জেল ও জরিমানার বিধান রয়েছে। আপনার ভোট আপনার গোপন আমানত।
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t flex justify-end">
              <button 
                onClick={() => setIsLawModalOpen(false)}
                className="bg-[#006a4e] text-white px-8 py-2 rounded-xl font-bold shadow-md hover:bg-[#005a42] transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
