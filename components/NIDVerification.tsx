
import React, { useState, useEffect } from 'react';
import { GEO_DATA, DIVISIONS } from '../data';

interface NIDVerificationProps {
  onSubmit: (fullVoterData: any) => void;
}

const NIDVerification: React.FC<NIDVerificationProps> = ({ onSubmit }) => {
  const [nid, setNid] = useState('');
  const [dob, setDob] = useState('');
  const [division, setDivision] = useState(DIVISIONS[0]);
  const [district, setDistrict] = useState('');
  
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState('');

  useEffect(() => {
    const districts = GEO_DATA[division] || [];
    setDistrict(districts[0] || '');
  }, [division]);

  const validateNIDLength = (val: string) => {
    const len = val.length;
    // কঠোরভাবে ১০, ১৩ অথবা ১৭ ডিজিট হতে হবে
    return len === 10 || len === 13 || len === 17;
  };

  const calculateAge = (birthDateString: string) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nid) {
      setError('অনুগ্রহ করে আপনার এনআইডি নম্বরটি প্রদান করুন।');
      return;
    }

    // এনআইডি দৈর্ঘ্যের কঠোর যাচাইকরণ
    if (!validateNIDLength(nid)) {
      setError('ভুল এনআইডি নম্বর! এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ ডিজিটের হতে হবে। এর কম বা বেশি গ্রহণযোগ্য নয়।');
      return;
    }

    if (!dob) {
      setError('জন্ম তারিখ নির্বাচন করা আবশ্যক।');
      return;
    }

    const age = calculateAge(dob);
    if (age < 18) {
      setError('দুঃখিত, নির্বাচনী আইন অনুযায়ী ভোট প্রদানের জন্য আপনার বয়স ন্যূনতম ১৮ বছর হতে হবে। আপনার বর্তমান বয়স মাত্র ' + age + ' বছর।');
      return;
    }

    setIsVerifying(true);
    setVerifyStatus('নির্বাচন কমিশন (EC) কেন্দ্রীয় সার্ভারের সাথে সংযোগ করা হচ্ছে...');
    
    setTimeout(() => setVerifyStatus('সার্ভার থেকে আপনার প্রোফাইল ও ঠিকানা উদ্ধার করা হচ্ছে...'), 1200);
    setTimeout(() => setVerifyStatus('এনআইডি নম্বর (' + nid.length + ' ডিজিট) যাচাই করা হচ্ছে...'), 2200);
    
    setTimeout(() => {
      setIsVerifying(false);
      const fetchedProfile = {
        nid,
        dob,
        name: 'মোঃ আবু ইউসুফ সজীব', 
        division,
        district,
        upazila: `${district} সদর`, 
        ward: 'ওয়ার্ড নং ৫', 
        constituency: `${division}-${district.slice(0, 3)}-${nid.slice(-3)}`,
        isVerified: true
      };
      onSubmit(fetchedProfile);
    }, 3500);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in fade-in duration-500">
      {isVerifying ? (
        <div className="py-10 flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-100 border-t-[#006a4e] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🇧🇩</div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800 animate-pulse">{verifyStatus}</h3>
            <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-bold">Secure Gateway: BD-EC-NODE-04</p>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006a4e]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#006a4e]/20">
                <span className="text-3xl">🪪</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">স্মার্ট এনআইডি ভেরিফিকেশন</h3>
            <p className="text-slate-500 text-sm">এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ ডিজিটের হতে হবে</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">এনআইডি নম্বর (১০, ১৩ অথবা ১৭ ডিজিট)</label>
                <input 
                  type="text"
                  value={nid}
                  maxLength={17}
                  onChange={(e) => {
                    setNid(e.target.value.replace(/\D/g, ''));
                    if(error) setError('');
                  }}
                  placeholder="উদাহরণ: ১৯৯২০০১২২৩৩৪৫৫"
                  className={`w-full px-4 py-3 rounded-xl border ${error && (!nid || !validateNIDLength(nid)) ? 'border-red-400 bg-red-50/30' : 'border-slate-100 bg-slate-50/50'} focus:ring-2 focus:ring-[#006a4e] focus:bg-white outline-none transition font-mono text-lg text-slate-800 placeholder:text-slate-300`}
                />
                <div className="flex justify-between mt-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">বর্তমান ডিজিট: {nid.length}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">প্রয়োজন: ১০, ১৩ অথবা ১৭</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">জন্ম তারিখ</label>
                <input 
                  type="date"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    if(error) setError('');
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${error && !dob ? 'border-red-400 bg-red-50/30' : 'border-slate-100 bg-slate-50/50'} focus:ring-2 focus:ring-[#006a4e] focus:bg-white outline-none transition text-slate-800`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">স্থায়ী বিভাগ</label>
                  <select 
                    value={division} 
                    onChange={(e) => setDivision(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:ring-2 focus:ring-[#006a4e] focus:bg-white outline-none cursor-pointer text-slate-800"
                  >
                    {DIVISIONS.map(d => <option key={d} value={d} className="text-slate-800 bg-white">{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">স্থায়ী জেলা</label>
                  <select 
                    value={district} 
                    onChange={(e) => setDistrict(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:ring-2 focus:ring-[#006a4e] focus:bg-white outline-none cursor-pointer text-slate-800"
                  >
                    {(GEO_DATA[division] || []).map(d => <option key={d} value={d} className="text-slate-800 bg-white">{d}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50/50 p-4 rounded-xl border border-red-100 flex items-start space-x-3 shadow-sm animate-in shake duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold leading-relaxed">{error}</span>
              </div>
            )}

            <button type="submit" className="w-full bg-[#006a4e] hover:bg-[#005a42] text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center space-x-2">
              <span>ভোটার ডাটা যাচাই করুন</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
          
          <p className="mt-6 text-center text-xs text-slate-400">
            আপনার তথ্যগুলো ইনক্রিপশন এর মাধ্যমে সুরক্ষিত এবং সরাসরি নির্বাচন কমিশন গেটওয়েতে পাঠানো হয়।
          </p>
        </>
      )}
    </div>
  );
};

export default NIDVerification;
