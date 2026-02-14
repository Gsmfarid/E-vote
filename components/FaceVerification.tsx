
import React, { useRef, useEffect, useState } from 'react';

interface FaceVerificationProps {
  onComplete: () => void;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScan = () => {
    setStatus('scanning');
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('success');
        setTimeout(onComplete, 1500);
      }
    }, 50);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">ফেস ভেরিফিকেশন</h3>
      <p className="text-slate-500 text-center mb-6">আপনার মুখমণ্ডল ক্যামেরার সামনে রাখুন এবং সরাসরি তাকান</p>

      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#006a4e] shadow-inner bg-slate-100">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="object-cover w-full h-full scale-110"
        />
        
        {status === 'scanning' && (
          <div className="absolute inset-0 border-t-4 border-green-400 animate-scan"></div>
        )}
        
        {status === 'success' && (
          <div className="absolute inset-0 bg-[#006a4e]/60 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      <div className="w-full mt-8">
        {status === 'idle' ? (
          <button 
            onClick={startScan}
            className="w-full bg-[#006a4e] hover:bg-[#005a42] text-white font-bold py-4 rounded-xl shadow-lg transition"
          >
            স্ক্যান শুরু করুন
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-slate-600">
              <span>{status === 'success' ? 'ভেরিফিকেশন সম্পন্ন' : 'স্ক্যান করা হচ্ছে...'}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#006a4e] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          position: absolute;
          width: 100%;
          animation: scan 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default FaceVerification;
