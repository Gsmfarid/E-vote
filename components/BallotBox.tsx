
import React, { useState, useMemo } from 'react';
import { Election, VoterProfile } from '../types';
import { MOCK_CANDIDATES } from '../data';

interface BallotBoxProps {
  election: Election;
  voter: VoterProfile;
  onVote: () => void;
  onCancel: () => void;
}

const BallotBox: React.FC<BallotBoxProps> = ({ election, voter, onVote, onCancel }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Filter candidates based on the voter's specific constituency or local region
  const localCandidates = useMemo(() => {
    if (election.level === 'national') {
        return MOCK_CANDIDATES.filter(c => c.region === voter.constituency);
    } else {
        // For union level, show union-specific candidates
        return MOCK_CANDIDATES.filter(c => c.region.includes('ইউনিয়ন'));
    }
  }, [election, voter]);

  const selectedCandidate = localCandidates.find(c => c.id === selectedId);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-slate-800">{election.title}</h3>
            <span className="bg-[#006a4e] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{voter.constituency}</span>
        </div>
        <p className="text-slate-500 text-sm">আপনার নির্বাচনী এলাকার জন্য তালিকাভুক্ত সকল প্রার্থী নিচে দেওয়া হলো। পছন্দের প্রার্থীকে নির্বাচন করুন।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localCandidates.length > 0 ? (
          localCandidates.map(candidate => (
            <div 
              key={candidate.id}
              onClick={() => setSelectedId(candidate.id)}
              className={`cursor-pointer bg-white p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] flex items-center space-x-4 ${
                selectedId === candidate.id ? 'border-[#006a4e] bg-green-50 shadow-md' : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-sm shrink-0 ${
                selectedId === candidate.id ? 'bg-[#006a4e] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {candidate.symbol}
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-slate-800 leading-tight">{candidate.name}</h4>
                <p className="text-xs text-[#006a4e] font-bold mt-1">{candidate.party}</p>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 italic">"{candidate.manifesto}"</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                selectedId === candidate.id ? 'border-[#006a4e] bg-[#006a4e]' : 'border-slate-300'
              }`}>
                {selectedId === candidate.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-slate-100 rounded-3xl text-slate-400 italic">
            এই আসনে কোনো প্রার্থী পাওয়া যায়নি।
          </div>
        )}
      </div>

      <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-lg sticky bottom-4 border border-slate-200 z-40">
        <button 
          onClick={onCancel}
          className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition"
        >
          বাতিল করুন
        </button>
        <button 
          disabled={!selectedId}
          onClick={() => setIsConfirming(true)}
          className={`px-10 py-3 rounded-xl font-bold shadow-lg transition transform active:scale-95 ${
            selectedId ? 'bg-[#006a4e] text-white hover:bg-[#005a42]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          ভোট নিশ্চিত করুন
        </button>
      </div>

      {isConfirming && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-white shadow-md">
                🗳️
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2">ভোটদান নিশ্চিত করুন?</h4>
              <p className="text-slate-500 mb-6 text-sm">
                আপনি <strong>{selectedCandidate?.name}</strong> কে <strong>{selectedCandidate?.symbol} ({selectedCandidate?.party})</strong> মার্কায় আপনার পবিত্র ভোটটি প্রদান করতে চাচ্ছেন?
              </p>
              
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={onVote}
                  className="w-full bg-[#006a4e] hover:bg-[#005a42] text-white font-bold py-4 rounded-xl shadow-lg transition"
                >
                  হ্যাঁ, ভোট প্রদান করুন
                </button>
                <button 
                  onClick={() => setIsConfirming(false)}
                  className="w-full text-slate-400 font-bold py-3 hover:text-slate-600 transition"
                >
                  ফিরে যান ও সংশোধন করুন
                </button>
              </div>
            </div>
            <div className="bg-slate-50 p-4 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Election Commission Security Check</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BallotBox;
