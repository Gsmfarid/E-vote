
import React, { useState } from 'react';
import { PARTIES } from '../data';

interface VoterEducationProps {
  onBack: () => void;
}

const VoterEducation: React.FC<VoterEducationProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'importance' | 'hierarchy' | 'parties'>('importance');

  const tabs = [
    { id: 'importance', label: 'ভোটের গুরুত্ব', icon: '🌟' },
    { id: 'hierarchy', label: 'ইউনিট ও এলাকা', icon: '🗺️' },
    { id: 'parties', label: 'রাজনৈতিক দলসমূহ', icon: '🏛️' },
  ] as const;

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">ভোটার শিক্ষা ও নির্দেশিকা</h3>
          <p className="text-slate-500">ডিজিটাল বাংলাদেশ ২০২৬ নির্বাচন সম্পর্কে জানুন</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-[#006a4e] font-bold hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>ফিরে যান</span>
        </button>
      </div>

      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-[#006a4e] text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 min-h-[450px]">
        {activeTab === 'importance' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h4 className="text-2xl font-bold text-[#006a4e]">গণতন্ত্রে আপনার ভোটের গুরুত্ব</h4>
            <p className="text-slate-600 leading-relaxed text-lg">
              ভোট প্রতিটি নাগরিকের একটি পবিত্র আমানত। ২০২৬ সালের ডিজিটাল ভোটিং সিস্টেমে আপনার অংশগ্রহণ নিশ্চিত করবে স্বচ্ছতা ও জবাবদিহিতা।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-2xl bg-green-50 border border-green-100 flex items-start space-x-4">
                <div className="text-3xl">🗳️</div>
                <div>
                    <h5 className="font-bold text-green-800 mb-1">সরাসরি অংশগ্রহণ</h5>
                    <p className="text-sm text-green-700">ডিজিটাল পদ্ধতিতে জাল ভোটের সুযোগ নেই, তাই আপনার একটি ভোটই ফলাফল নির্ধারণে সক্ষম।</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-start space-x-4">
                <div className="text-3xl">📱</div>
                <div>
                    <h5 className="font-bold text-blue-800 mb-1">প্রযুক্তি ও স্বচ্ছতা</h5>
                    <p className="text-sm text-blue-700">ব্লকচেইন ও বায়োমেট্রিক প্রযুক্তি আপনার ভোটকে করছে নিরাপদ ও অপরিবর্তনীয়।</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hierarchy' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <h4 className="text-2xl font-bold text-[#006a4e]">ভোটদান কাঠামোর বিন্যাস</h4>
            <p className="text-slate-500 leading-relaxed">২০২৬ সালের নির্বাচনে বাংলাদেশ সরকারের প্রশাসনিক কাঠামোর প্রতিটি ইউনিট ডিজিটাল ম্যাপের আওতাভুক্ত করা হয়েছে।</p>
            
            <div className="relative space-y-6">
              {[
                { title: 'বিভাগ (Division)', desc: 'আটটি প্রশাসনিক বিভাগ থেকে ভোটারদের তথ্য বিন্যস্ত করা হয়।', color: 'bg-emerald-100 text-emerald-700' },
                { title: 'জেলা (District)', desc: '৬৪টি জেলার প্রতিটি আসন আলাদা ডিজিটাল ব্যালটের আওতাভুক্ত।', color: 'bg-blue-100 text-blue-700' },
                { title: 'উপজেলা/থানা', desc: 'নির্বাচনী আসনের ভৌগোলিক সীমানা নির্ধারণ।', color: 'bg-indigo-100 text-indigo-700' },
                { title: 'ইউনিয়ন/পৌরসভা', desc: 'স্থানীয় সরকার নির্বাচনে ভোটারদের মূল ইউনিট।', color: 'bg-violet-100 text-violet-700' },
                { title: 'গ্রাম/ওয়ার্ড পর্যায়', desc: 'তৃণমূল পর্যায় পর্যন্ত প্রতিটি আসনের প্রার্থী তালিকা ডিজিটাল ডাটাবেসে যুক্ত।', color: 'bg-purple-100 text-purple-700' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold ${item.color}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">{item.title}</h5>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'parties' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h4 className="text-2xl font-bold text-[#006a4e]">নিবন্ধিত রাজনৈতিক দলসমূহ</h4>
            <p className="text-slate-500">বাংলাদেশে বর্তমান নিবন্ধিত সকল দলের তথ্য ও প্রতীকের তালিকা নিচে দেওয়া হলো:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {PARTIES.map((p) => (
                <div key={p.id} className="flex items-center space-x-4 p-4 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-3xl shadow-inner">
                    {p.symbol}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 leading-tight">{p.name}</h5>
                    <div className="flex items-center space-x-1 mt-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">নির্বাচন কমিশন নিবন্ধিত</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-6">
                <p className="text-xs text-slate-500 text-center italic">তালিকাটি নির্বাচন কমিশনের সর্বশেষ গেজেট অনুযায়ী আপডেট করা হয়েছে।</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#006a4e] rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
            <h5 className="font-bold text-xl mb-2 flex items-center space-x-2">
                <span>📣</span>
                <span>আপনার অধিকার, আপনার ভোট!</span>
            </h5>
            <p className="text-green-100 text-sm opacity-90 leading-relaxed">
                ভোটের দিন কোনো কারিগরি সমস্যায় পড়লে নিকটস্থ ডিজিটাল সার্ভিস সেন্টারে যোগাযোগ করুন অথবা ১৬১০৩ হেল্পলাইনে কল দিন।
            </p>
        </div>
        <div className="absolute -right-10 -top-10 text-9xl opacity-10 font-black">2026</div>
      </div>
    </div>
  );
};

export default VoterEducation;
