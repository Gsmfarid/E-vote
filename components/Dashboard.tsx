
import React from 'react';
import { VoterProfile, Election } from '../types';

interface DashboardProps {
  voter: VoterProfile;
  elections: Election[];
  onSelectElection: (election: Election) => void;
  onViewResults: () => void;
  onEducation: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ voter, elections, onSelectElection, onViewResults, onEducation }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Profile Header */}
      <div className="bg-[#006a4e] text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-4xl border-2 border-white/30 shrink-0">
          👤
        </div>
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-2 justify-center md:justify-start">
            <h2 className="text-3xl font-bold">{voter.name}</h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">২০২৬ স্মার্ট ভোটার</span>
          </div>
          <p className="opacity-80 font-mono">এনআইডি: {voter.nid}</p>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
            <div className="bg-white/10 p-2 rounded-lg">
                <span className="block opacity-60 text-[10px] uppercase font-bold">বিভাগ</span>
                <span className="font-bold">{voter.division}</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
                <span className="block opacity-60 text-[10px] uppercase font-bold">জেলা</span>
                <span className="font-bold">{voter.district}</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
                <span className="block opacity-60 text-[10px] uppercase font-bold">ইউনিয়ন/ওয়ার্ড</span>
                <span className="font-bold">{voter.union} ({voter.ward})</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg col-span-2 md:col-span-3 border border-white/20">
                <span className="block opacity-60 text-[10px] uppercase font-bold">নির্বাচনী আসন (Constituency)</span>
                <span className="text-xl font-extrabold">{voter.constituency}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 shrink-0">
            <button 
                onClick={onViewResults}
                className="bg-white text-[#006a4e] px-6 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition shadow-md w-full"
            >
                লাইভ ফলাফল
            </button>
            <button 
                onClick={onEducation}
                className="bg-[#f42a41] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#d12437] transition shadow-md text-sm w-full"
            >
                ভোটার নির্দেশিকা
            </button>
        </div>
      </div>

      {/* Elections Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                <span>🗳️</span>
                <span>আপনার এলাকার নির্বাচনসমূহ</span>
            </h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {elections.map(election => (
            <div 
              key={election.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-[#006a4e]/30 transition group"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${election.status === 'ongoing' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {election.level === 'national' ? 'জাতীয়' : 'স্থানীয়'} পর্যায় • {election.status === 'ongoing' ? 'ভোট গ্রহণ চলছে' : 'আসন্ন'}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 group-hover:text-[#006a4e] transition">{election.title}</h4>
                  <p className="text-slate-500 text-sm mt-1">{election.description}</p>
                </div>
                
                <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-slate-400 mb-1">ভোটের দিন</p>
                        <p className="font-bold text-slate-700">{election.date}</p>
                    </div>
                    {election.status === 'ongoing' ? (
                    <button 
                        onClick={() => onSelectElection(election)}
                        disabled={voter.hasVoted}
                        className={`flex-grow md:flex-none ${voter.hasVoted ? 'bg-slate-100 text-slate-400' : 'bg-[#006a4e] text-white hover:bg-[#005a42]'} px-8 py-3 rounded-xl font-bold transition shadow-sm`}
                    >
                        {voter.hasVoted ? 'ভোট দেওয়া হয়েছে' : 'ভোট দিন'}
                    </button>
                    ) : (
                    <button disabled className="flex-grow md:flex-none bg-slate-50 text-slate-300 px-8 py-3 rounded-xl font-bold cursor-not-allowed">
                        অপেক্ষা করুন
                    </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-2xl md:col-span-1 shadow-lg overflow-hidden relative">
            <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">স্মার্ট ভোটার কার্ড</h4>
                <p className="text-xs opacity-60 leading-relaxed mb-4">আপনার প্রোফাইলে সরাসরি ডিজিটাল ভোটার তথ্য ও কেন্দ্র নম্বর যুক্ত করা হয়েছে।</p>
                <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition">ডাউনলোড কার্ড</button>
            </div>
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-10">🇧🇩</div>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
          <h4 className="font-bold text-blue-800 mb-2">সিঙ্গেল বোর্ডিং সিস্টেম</h4>
          <p className="text-sm text-blue-600 leading-relaxed">একবার লগইন করে জাতীয় ও স্থানীয় পর্যায়ের সকল নির্বাচনে অংশ নেওয়ার ডিজিটাল সুবিধা।</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col justify-center">
          <h4 className="font-bold text-emerald-800 mb-2">নিরাপত্তা</h4>
          <p className="text-sm text-emerald-600 leading-relaxed">আপনার ডেটা নির্বাচন কমিশনের ক্লাউড সার্ভারে এন্ড-টু-এন্ড এনক্রিপ্টেড।</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
