
import React, { useRef, useEffect, useState, useMemo } from 'react';

interface FaceVerificationProps {
  onComplete: () => void;
}

interface LivenessTask {
  instruction: string;
  icon: string;
  duration: number; // percentage of progress this task takes
}

const FaceVerification: React.FC<FaceVerificationProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [scanInstruction, setScanInstruction] = useState('পর্দার দিকে স্থির হয়ে তাকিয়ে থাকুন');

  // Define potential tasks for liveness detection
  const taskPool: LivenessTask[] = [
    { instruction: 'একবার চোখের পলক ফেলুন (Blink Now)', icon: '👁️', duration: 20 },
    { instruction: 'একটু হাসুন (Smile Please)', icon: '😊', duration: 20 },
    { instruction: 'মাথা সামান্য বামে ঘোরান (Turn Left)', icon: '👈', duration: 20 },
    { instruction: 'মাথা সামান্য ডানে ঘোরান (Turn Right)', icon: '👉', duration: 20 },
    { instruction: 'একটু মাথা উঁচিয়ে তাকান (Look Up)', icon: '👆', duration: 20 }
  ];

  // Randomly select 3 tasks for the current session to ensure it's "robust" and unpredictable
  const selectedTasks = useMemo(() => {
    const shuffled = [...taskPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [status === 'idle']); // Reselect when status resets to idle

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
    setCurrentTaskIndex(0);
    setScanInstruction('পর্দার দিকে স্থির হয়ে তাকিয়ে থাকুন (Initializing...)');

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      // Initial alignment phase (0-20%)
      if (currentProgress < 20) {
        setScanInstruction('ফেস এলাইনমেন্ট করা হচ্ছে...');
      } 
      // Liveness Task 1 (20-40%)
      else if (currentProgress < 40) {
        setScanInstruction(selectedTasks[0].instruction);
        setCurrentTaskIndex(1);
      }
      // Liveness Task 2 (40-60%)
      else if (currentProgress < 60) {
        setScanInstruction(selectedTasks[1].instruction);
        setCurrentTaskIndex(2);
      }
      // Liveness Task 3 (60-80%)
      else if (currentProgress < 80) {
        setScanInstruction(selectedTasks[2].instruction);
        setCurrentTaskIndex(3);
      }
      // Final processing (80-100%)
      else if (currentProgress < 100) {
        setScanInstruction('বায়োমেট্রিক ডাটা সিঙ্ক্রোনাইজ করা হচ্ছে...');
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Simulated AI matching logic with a random chance of success
        const isSuccessful = Math.random() > 0.1; 
        if (isSuccessful) {
          setStatus('success');
          setScanInstruction('লাইভনেস ভেরিফিকেশন সফল হয়েছে!');
          setTimeout(onComplete, 1500);
        } else {
          setStatus('error');
          setErrorMsg('লাইভনেস ডিটেকশন ব্যর্থ হয়েছে! অনুগ্রহ করে নির্দেশাবলী মনোযোগ দিয়ে অনুসরণ করুন।');
        }
      }
    }, 60); // Total duration around 6 seconds
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center animate-in zoom-in duration-500">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">বায়োমেট্রিক পরিচয় যাচাই</h3>
        <p className="text-slate-500 text-sm">ডাবল-লেয়ার সিকিউরিটি নিশ্চিত করতে লাইভনেস চেক সম্পন্ন করুন</p>
      </div>

      <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-[#006a4e] shadow-2xl bg-slate-900 group">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className={`object-cover w-full h-full scale-110 transition-transform duration-700 ${status === 'scanning' ? 'brightness-110 contrast-110' : ''}`}
        />
        
        {/* Face Silhouette Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <svg className="w-64 h-64 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        {/* Task Icon Overlay during scanning */}
        {status === 'scanning' && currentTaskIndex > 0 && currentTaskIndex <= 3 && (
          <div className="absolute top-10 right-10 bg-white/20 backdrop-blur-md p-2 rounded-lg border border-white/30 animate-bounce">
            <span className="text-2xl">{selectedTasks[currentTaskIndex - 1].icon}</span>
          </div>
        )}

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
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center h-12">
               <p className="text-center font-bold text-[#006a4e] text-lg transition-all duration-300">
                {scanInstruction}
               </p>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-[#006a4e] to-green-400 transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between px-1">
               <span className="text-[10px] font-bold text-slate-400 uppercase">স্ক্যানিং...</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase">{progress}% সম্পন্ন</span>
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
            className="w-full bg-[#006a4e] hover:bg-[#005a42] text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 disabled:opacity-50 group flex items-center justify-center space-x-2"
          >
            <span className="text-lg">বায়োমেট্রিক স্ক্যান শুরু করুন</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2 w-full">
         <div className={`h-1.5 rounded-full ${currentTaskIndex >= 1 ? 'bg-green-500' : 'bg-slate-100'}`}></div>
         <div className={`h-1.5 rounded-full ${currentTaskIndex >= 2 ? 'bg-green-500' : 'bg-slate-100'}`}></div>
         <div className={`h-1.5 rounded-full ${currentTaskIndex >= 3 ? 'bg-green-500' : 'bg-slate-100'}`}></div>
      </div>

      <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
        EC BIOMETRIC PROTOCOL • 2026-X7 • LIVENESS ACTIVE
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
