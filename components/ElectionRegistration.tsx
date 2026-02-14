
import React, { useState } from 'react';
import { Election, VoterProfile } from '../types';
import { db } from '../services/DatabaseService';

interface ElectionRegistrationProps {
  election: Election;
  voter: VoterProfile;
  onSuccess: () => void;
  onCancel: () => void;
}

const ElectionRegistration: React.FC<ElectionRegistrationProps> = ({ election, voter, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chosenConstituency, setChosenConstituency] = useState(voter.constituency);

  const handleRegister = async () => {
    setIsSubmitting(true);
    const regData = {
      nid: voter.nid,
      electionId: election.id,
      electionTitle: election.title,
      electionDate: election.date,
      constituency: chosenConstituency,
      timestamp: Date.now()
    };

    const success = await db.registerForElection(regData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      if (success) {
        onSuccess();
      } else {
        alert('আপনি এই নির্বাচনের জন্য ইতিমধ্যে নিবন্ধিত আছেন।');
        onCancel();
      }
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in zoom-in duration-500">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-2 border-blue-100">
          📝
        </div>
        <h3 className="text-2xl font-bold text-slate-800">নির্বাচন নিবন্ধন</h3>
        <p className="text-slate-500 mt-2">নিচের তথ্যগুলো যাচাই করে আসন্ন নির্বাচনের জন্য নিবন্ধন সম্পন্ন করুন।</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="text-slate-500 text-sm">নির্বাচনের নাম:</span>
            <span className="font-bold text-slate-800">{election.title}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="text-slate-500 text-sm">নির্বাচনের তারিখ:</span>
            <span className="font-bold text-slate-800">{election.date}</span>
          </div>
          <div>
            <label className="block text-slate-500 text-sm mb-2">আপনার নির্বাচনী এলাকা:</label>
            <input 
              type="text" 
              value={chosenConstituency}
              onChange={(e) => setChosenConstituency(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#006a4e] outline-none transition font-bold"
            />
            <p className="text-[10px] text-slate-400 mt-1">* আপনি আপনার স্থায়ী ঠিকানা অনুযায়ী এলাকাটি পরিবর্তন করতে পারেন যদি প্রয়োজন হয়।</p>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start space-x-3">
          <span className="text-amber-600">⚠️</span>
          <p className="text-xs text-amber-800 leading-relaxed">
            একবার নিবন্ধন সম্পন্ন হলে আপনি নির্বাচনের দিন আপনার ভোটার আইডি এবং বায়োমেট্রিক দিয়ে সরাসরি ব্যালট এক্সেস করতে পারবেন।
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button 
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl transition"
          >
            বাতিল
          </button>
          <button 
            onClick={handleRegister}
            disabled={isSubmitting}
            className={`flex-1 ${isSubmitting ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center space-x-2`}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span>নিবন্ধন সম্পন্ন করুন</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionRegistration;
