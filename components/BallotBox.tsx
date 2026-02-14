
import React, { useState, useMemo } from 'react';
import { Election, VoterProfile } from '../types';
import { MOCK_CANDIDATES } from '../data';

interface BallotBoxProps {
  election: Election;
  voter: VoterProfile;
  onVote: (candidateId: string, partyId: string) => void;
  onCancel: () => void;
}

const BallotBox: React.FC<BallotBoxProps> = ({ election, voter, onVote, onCancel }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const localCandidates = useMemo(() => {
    // Show ward specific candidates if available
    const filtered = MOCK_CANDIDATES.filter(c => c.region === voter.ward);
    return filtered.length > 0 ? filtered : MOCK_CANDIDATES;
  }, [voter.ward]);

  const selectedCandidate = localCandidates.find(c => c.id === selectedId);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-slate-800">{election.title}</h3>
            <span className="bg-[#006a4e] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">{voter.ward}</span>
        </div>
        <p className="text-slate-500 text-sm">আপনার নির্বাচনী এলাকার প্রার্থী তালিকা নিচে দেওয়া হলো। প্রতীক নির্বাচন করুন।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localCandidates.map(candidate => (
          <div 
            key={candidate.id}
            onClick={() => setSelectedId(candidate.id)}
            className={`cursor-pointer bg-white p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] flex items-center space-x-4 ${
              selectedId === candidate.id ? 'border-[#006a4e] bg-green-50 shadow-md ring-1 ring-[#006a4e]' : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl shadow-sm transition-colors ${
              selectedId === candidate.id ? 'bg-[#006a4e] text-white' : 'bg-slate-50 text-slate-400'
            }`}>
              {candidate.symbol}
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-slate-800 leading-tight">{candidate.name}</h4>
              <p className="text-xs text-[#006a4e] font-bold mt-1 uppercase">{candidate.party}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedId === candidate.id ? 'border-[#006a4e] bg-[#006a4e]' : 'border-slate-200'
            }`}>
              {selectedId === candidate.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-lg sticky bottom-4 border border-slate-200 z-40">
        <button onClick={onCancel} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition">বাতিল</button>
        <button disabled={!selectedId} onClick={() => setIsConfirming(true)} className={`px-10 py-3 rounded-xl font-bold shadow-lg transition transform active:scale-95 ${selectedId ? 'bg-[#006a4e] text-white hover:bg-[#005a42]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>ভোট নিশ্চিত করুন</button>
      </div>

      {isConfirming && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-white shadow-md">🗳️</div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2">ভোট নিশ্চিত করুন?</h4>
              <p className="text-slate-500 mb-6 text-sm">
                আপনি <strong>{selectedCandidate?.name}</strong> কে <strong>{selectedCandidate?.symbol} ({selectedCandidate?.party})</strong> মার্কায় ভোট প্রদান করছেন। এটি পরিবর্তনযোগ্য নয়।
              </p>
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => selectedCandidate && onVote(selectedCandidate.id, selectedCandidate.partyId)} 
                  className="w-full bg-[#006a4e] hover:bg-[#005a42] text-white font-bold py-4 rounded-xl shadow-lg transition"
                >
                  হ্যাঁ, ভোট দিন
                </button>
                <button onClick={() => setIsConfirming(false)} className="w-full text-slate-400 font-bold py-3 hover:text-slate-600 transition">বাতিল</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BallotBox;
