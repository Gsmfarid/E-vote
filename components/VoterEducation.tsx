
import React, { useState } from 'react';

interface VoterEducationProps {
  onBack: () => void;
}

const VoterEducation: React.FC<VoterEducationProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'importance' | 'process' | 'candidates'>('importance');

  const tabs = [
    { id: 'importance', label: 'ভোটের গুরুত্ব', icon: '🌟' },
    { id: 'process', label: 'নির্বাচনী প্রক্রিয়া', icon: '📝' },
    { id: 'candidates', label: 'প্রার্থী পরিচিতি', icon: '👤' },
  ] as const;

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-extrabold text-slate-800">ভোটার শিক্ষা ও নির্দেশিকা</h3>
          <p className="text-slate-500">নির্বাচন ২০২৬ সম্পর্কে সবকিছু জানুন</p>
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

      {/* Custom Tabs */}
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

      {/* Content Area */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 min-h-[400px]">
        {activeTab === 'importance' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h4 className="text-2xl font-bold text-[#006a4e]">গণতন্ত্রে আপনার ভোটের গুরুত্ব</h4>
            <p className="text-slate-600 leading-relaxed text-lg">
              ভোট প্রতিটি নাগরিকের একটি পবিত্র আমানত এবং সাংবিধানিক অধিকার। আপনার একটি সুচিন্তিত ভোট দেশের আগামী দিনের গতিপথ নির্ধারণ করতে পারে।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-5 rounded-2xl bg-green-50 border border-green-100">
                <h5 className="font-bold text-green-800 mb-2">দেশের উন্নয়নে অংশগ্রহণ</h5>
                <p className="text-sm text-green-700">সঠিক প্রতিনিধি নির্বাচনের মাধ্যমে আপনি দেশের উন্নয়ন ও নীতি নির্ধারণে পরোক্ষভাবে ভূমিকা পালন করেন।</p>
              </div>
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                <h5 className="font-bold text-blue-800 mb-2">জবাবদিহিতা নিশ্চিতকরণ</h5>
                <p className="text-sm text-blue-700">ভোট প্রদানের মাধ্যমে আপনি প্রতিনিধিদের কাজের মূল্যায়ন করেন এবং তাদের জবাবদিহিতার আওতায় আনেন।</p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-slate-900 text-white rounded-3xl">
              <p className="italic text-center">"ভোট না দিলে আপনার অভিযোগ করার নৈতিক অধিকার থাকে না। নাগরিক দায়িত্ব পালন করুন।"</p>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <h4 className="text-2xl font-bold text-[#006a4e]">কিভাবে ভোট দিবেন? (ধাপে ধাপে)</h4>
            
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {/* Step 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 group-[.is-active]:bg-[#006a4e] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  ১
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <h5 className="font-bold text-slate-800">NID ভেরিফিকেশন</h5>
                  <p className="text-sm text-slate-500">আপনার ১০ বা ১৭ ডিজিটের এনআইডি নম্বর এবং জন্ম তারিখ প্রদান করুন।</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 group-[.is-active]:bg-[#006a4e] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  ২
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <h5 className="font-bold text-slate-800">বায়োমেট্রিক ফেস আইডি</h5>
                  <p className="text-sm text-slate-500">ক্যামেরার সামনে দাঁড়িয়ে আপনার ফেস স্ক্যান করুন। এটি আপনার পরিচয় নিশ্চিত করবে।</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 group-[.is-active]:bg-[#006a4e] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  ৩
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <h5 className="font-bold text-slate-800">ব্যালট নির্বাচন</h5>
                  <p className="text-sm text-slate-500">আপনার পছন্দের প্রার্থীর প্রতীকে ক্লিক করে ভোট প্রদান নিশ্চিত করুন।</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h4 className="text-2xl font-bold text-[#006a4e]">প্রার্থী ডিরেক্টরি</h4>
            <p className="text-slate-500">আপনার এলাকার প্রার্থীদের সম্পর্কে জানুন এবং তাদের নির্বাচনী ইশতেহার পড়ুন।</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'মোঃ রহিম উদ্দিন', party: 'বাংলাদেশ গণতান্ত্রিক দল', symbol: '🚢', info: 'দীর্ঘ ২৫ বছরের রাজনৈতিক অভিজ্ঞতা সম্পন্ন।' },
                { name: 'ডা. সানজিদা ইসলাম', party: 'প্রগতিশীল ঐক্য ফ্রন্ট', symbol: '⚖️', info: 'পেশায় চিকিৎসক এবং সমাজসেবক।' },
                { name: 'আব্দুল কুদ্দুস', party: 'জনকল্যাণ পার্টি', symbol: '🚜', info: 'তৃণমূল থেকে আসা কৃষক নেতা।' },
                { name: 'ইঞ্জি. হাসান আলী', party: 'স্বতন্ত্র প্রার্থী', symbol: '⚓', info: 'তরুণ প্রজন্মের প্রতিনিধি ও প্রযুক্তি বিশেষজ্ঞ।' },
              ].map((c, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl border border-slate-100 hover:border-green-200 hover:bg-green-50/30 transition">
                  <div className="w-12 h-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-2xl border border-slate-200">
                    {c.symbol}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">{c.name}</h5>
                    <p className="text-xs text-[#006a4e] font-bold uppercase">{c.party}</p>
                    <p className="text-sm text-slate-500 mt-1">{c.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
        <h5 className="font-bold text-amber-800 flex items-center space-x-2 mb-2">
            <span>❓</span>
            <span>আরো প্রশ্ন আছে?</span>
        </h5>
        <p className="text-sm text-amber-700">নির্বাচনী কর্মকর্তাদের সাথে সরাসরি কথা বলতে হেল্পলাইন <span className="font-bold">১৬১০৩</span> নম্বরে কল করুন (সকাল ৮টা - রাত ৮টা)।</p>
      </div>
    </div>
  );
};

export default VoterEducation;
