
import React, { useRef, useEffect, useState } from 'react';

interface FaceVerificationProps {
  onComplete: () => void;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const [scanInstruction, setScanInstruction] = useState('পর্দার দিকে স্থির হয়ে তাকিয়ে থাকুন');

  const setupCamera = async () => {
    setStatus('idle');
    setErrorMsg('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 640, height: 640 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera Error:", err);
      setStatus('error');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMsg('ক্যামেরা ব্যবহারের অনুমতি বাতিল করা হয়েছে। ব্রাউজার সেটিং থেকে ক্যামেরা পারমিশন এলাউ (Allow) করুন।');
      } else if (err.name === 'NotFoundError') {
        setErrorMsg('আপনার ডিভাইসে কোনো ক্যামেরা খুঁজে পাওয়া যায়নি। অনুগ্রহ করে ক্যামেরা সংযুক্ত ডিভাইস ব্যবহার করুন।');
      } else {
        setErrorMsg('ক্যামেরা চালু করতে সমস্যা হচ্ছে। অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন।');
      }
    }
  };

  useEffect(() => {
    setupCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScan = () => {
    if (!videoRef.current?.srcObject) {
      setStatus('error');
      setErrorMsg('ক্যামেরা স্ট্রীম পাওয়া যাচ্ছে না। ভেরিফিকেশন শুরু করা সম্ভব নয়।');
      return;
    }

    setStatus('scanning');
    setProgress(0);
    setScanInstruction('পর্দার দিকে স্থির হয়ে তাকিয়ে থাকুন');

    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);

      // Dynamic instructions for liveness check simulation
      if (p === 30) setScanInstruction('একবার চোখের পলক ফেলুন...');
      if (p === 60) setScanInstruction('একটু হাসুন (Smile Please)...');
      if (p === 85) setScanInstruction('নিশ্চিত করা হচ্ছে...');

      if (p >= 100) {
        clearInterval(interval);
        // Simulated verification logic with slight chance of failure
        const isSuccessful = Math.random() > 0.15; 
        if (isSuccessful) {
          setStatus('success');
          setScanInstruction('বায়োমেট্রিক ভেরিফিকেশন সফল হয়েছে!');
          setTimeout(onComplete, 1800);
        } else {
          setStatus('error');
          setErrorMsg('ফেস রিকগনিশন ব্যর্থ হয়েছে! মুখ পরিষ্কার রাখুন, পর্যাপ্ত আলো নিশ্চিত করুন এবং ফ্রেমের মাঝখানে থাকুন।');
        }
      }
    }, 50);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center animate-in zoom-in duration-500">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">বায়োমেট্রিক পরিচয় যাচাই</h3>
        <p className="text-slate-500 text-sm">ডাবল-লেয়ার সিকিউরিটি নিশ্চিত করতে আপনার মুখমণ্ডল স্ক্যান করুন</p>
      </div>

      <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-[#006a4e] shadow-2xl bg-slate-900 group">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="object-cover w-full h-full scale-110 transition-transform duration-700"
        />
        
        {/* Face Silhouette Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <svg className="w-64 h-64 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        {status === 'scanning' && (
          <div className="absolute inset-0 border-[6px] border-[#006a4e]/20 rounded-full animate-pulse">
            <div className="absolute inset-0 border-t-4 border-[#006a4e] animate-scan"></div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="absolute inset-0 bg-[#006a4e]/90 flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in">
            <div className="bg-white/20 p-4 rounded-full mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-bold text-lg">ভেরিফিকেশন সফল!</p>
          </div>
        )}

        {status === 'error' && (
           <div className="absolute inset-0 bg-red-600/90 flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="font-bold text-sm leading-tight">{errorMsg}</p>
           </div>
        )}
      </div>

      <div className="w-full mt-8">
        {status === 'scanning' ? (
          <div className="space-y-3">
            <p className="text-center font-bold text-[#006a4e] animate-pulse h-6">{scanInstruction}</p>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-[#006a4e] transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : status === 'error' ? (
           <button 
            onClick={setupCamera} 
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
             </svg>
             <span>আবার চেষ্টা করুন</span>
           </button>
        ) : (
          <button 
            onClick={startScan} 
            disabled={status === 'success'}
            className="w-full bg-[#006a4e] hover:bg-[#005a42] text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 disabled:opacity-50"
          >
            স্ক্যান শুরু করুন
          </button>
        )}
      </div>

      <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
        EC BIOMETRIC PROTOCOL • 2026-X7
      </p>

      <style>{`
        @keyframes scan { 
          0% { top: 0; } 
          100% { top: 100%; } 
        }
        .animate-scan { 
          position: absolute; 
          width: 100%; 
          animation: scan 2s ease-in-out infinite alternate; 
          box-shadow: 0 0 15px 2px rgba(74, 222, 128, 0.4); 
        }
      `}</style>
    </div>
  );
};

export default FaceVerification;
