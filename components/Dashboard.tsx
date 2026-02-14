
import React, { useState, useEffect } from 'react';
import { VoterProfile, Election } from '../types';
import { db } from '../services/DatabaseService';

interface DashboardProps {
  voter: VoterProfile;
  elections: Election[];
  onSelectElection: (election: Election) => void;
  onRegisterElection: (election: Election) => void;
  onViewResults: () => void;
  onEducation: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ voter, elections, onSelectElection, onRegisterElection, onViewResults, onEducation }) => {
  const [registrations, setRegistrations] = useState<string[]>([]);

  useEffect(() => {
    const fetchRegs = async () => {
      const data = await db.getVoterRegistrations(voter.nid);
      setRegistrations(data.map(r => r.electionId));
    };
    fetchRegs();
  }, [voter.nid]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-[#006a4e] text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-4xl border-2 border-white/30 shrink-0">👤</div>
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <h2 className="text-3xl font-bold">{voter.name}</h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">স্মার্ট ভোটার</span>
          </div>
          <p className="opacity-80 mt-1 font-mono">এনআইডি: {voter.nid}</p>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
            <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                <span className="block opacity-60 uppercase font-bold">বিভাগ</span>
                <span className="text-sm font-bold">{voter.division}</span>
            </div>
            <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                <span className="block opacity-60 uppercase font-bold">জেলা</span>
                <span className="text-sm font-bold">{voter.district}</span>
            </div>
            <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                <span className="block opacity-60 uppercase font-bold">উপজেলা</span>
                <span className="text-sm font-bold">{voter.upazila}</span>
            </div>
            <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                <span className="block opacity-60 uppercase font-bold">ওয়ার্ড</span>
                <span className="text-sm font-bold">{voter.ward}</span>
            </div>
          </div>
          <div className="mt-4 bg-white/10 p-3 rounded-xl border border-white/10 inline-block">
             <span className="block opacity-60 text-[10px] uppercase font-bold">নির্বাচনী এলাকা (Constituency)</span>
             <span className="text-sm font-bold">{voter.constituency}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2 shrink-0">
            <button onClick={onViewResults} className="bg-white text-[#006a4e] px-6 py-2 rounded-xl font-bold hover:bg-slate-100 transition shadow-md">লাইভ ফলাফল</button>
            <button onClick={onEducation} className="bg-[#f42a41] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#d12437] transition shadow-md text-sm">ভোটার নির্দেশিকা</button>
        </div>
      </div>

      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
          <span>🗳️</span>
          <span>আপনার এলাকার নির্বাচনসমূহ</span>
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {elections.map(election => {
            const isOngoing = election.status === 'ongoing';
            const isRegistered = registrations.includes(election.id);

            return (
              <div key={election.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-[#006a4e]/30 transition group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`w-2 h-2 rounded-full ${isOngoing ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></span>
                      <span className="text-xs font-bold uppercase text-slate-400">
                        {election.level === 'national' ? 'জাতীয়' : 'স্থানীয়'} • {isOngoing ? 'ভোট চলছে' : 'আসন্ন'}
                      </span>
                      {isRegistered && !isOngoing && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded ml-2">নিবন্ধিত</span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 group-hover:text-[#006a4e] transition">{election.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">{election.description}</p>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="text-right hidden sm:block">
                          <p className="text-xs text-slate-400 mb-1">তারিখ</p>
                          <p className="font-bold text-slate-700">{election.date}</p>
                      </div>
                      
                      {isOngoing ? (
                        <button 
                          onClick={() => onSelectElection(election)} 
                          disabled={voter.hasVoted} 
                          className={`flex-grow md:flex-none ${voter.hasVoted ? 'bg-slate-100 text-slate-400' : 'bg-[#006a4e] text-white hover:bg-[#005a42]'} px-8 py-3 rounded-xl font-bold transition shadow-sm`}
                        >
                          {voter.hasVoted ? 'ভোট দেওয়া হয়েছে' : 'ভোট দিন'}
                        </button>
                      ) : (
                        <button 
                          onClick={() => onRegisterElection(election)} 
                          disabled={isRegistered}
                          className={`flex-grow md:flex-none px-8 py-3 rounded-xl font-bold transition shadow-sm ${
                            isRegistered 
                              ? 'bg-blue-50 text-blue-400 border border-blue-100 cursor-default' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isRegistered ? 'নিবন্ধিত' : 'নিবন্ধন করুন'}
                        </button>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
