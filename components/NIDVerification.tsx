
import React, { useState } from 'react';
import { DIVISIONS } from '../data';

interface NIDVerificationProps {
  onSubmit: (nid: string, dob: string, division: string) => void;
}

const NIDVerification: React.FC<NIDVerificationProps> = ({ onSubmit }) => {
  const [nid, setNid] = useState('');
  const [dob, setDob] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('ঢাকা');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nid.length < 10) {
      setError('সঠিক এনআইডি নম্বর প্রদান করুন (কমপক্ষে ১০ ডিজিট)');
      return;
    }
    if (!dob) {
      setError('জন্ম তারিখ প্রদান করুন');
      return;
    }
    onSubmit(nid, dob, selectedDivision);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-100">
            <span className="text-3xl">🆔</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-800">NID ভেরিফিকেশন</h3>
        <p className="text-slate-500">আপনার ভোটার তথ্য এবং নির্বাচনী এলাকা নির্ধারণ করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">এনআইডি নম্বর (NID Number)</label>
          <input 
            type="text"
            value={nid}
            onChange={(e) => setNid(e.target.value.replace(/\D/g, ''))}
            placeholder="উদাহরণ: ১৯৯২০০১২২৩৩৪৫৫"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006a4e] focus:border-transparent outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">জন্ম তারিখ</label>
                <input 
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006a4e] focus:border-transparent outline-none transition"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">বিভাগ</label>
                <select 
                    value={selectedDivision}
                    onChange={(e) => setSelectedDivision(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006a4e] focus:border-transparent outline-none transition bg-white"
                >
                    {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <button 
          type="submit"
          className="w-full bg-[#006a4e] hover:bg-[#005a42] text-white font-bold py-3.5 rounded-xl shadow-lg transition transform active:scale-95"
        >
          পরবর্তী ধাপ
        </button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-4 grayscale opacity-60">
        <img src="https://picsum.photos/seed/gov/40/40" alt="EC Logo" className="rounded-full" />
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">EC Verified System</span>
      </div>
    </div>
  );
};

export default NIDVerification;
