
import React from 'react';

interface LandingProps {
  onStart: () => void;
  onEducation: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onEducation }) => {
  return (
    <div className="flex flex-col items-center text-center py-10 space-y-12">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          নিরাপদ, স্বচ্ছ এবং আধুনিক <br/> <span className="text-[#006a4e]">ডিজিটাল ভোটদান</span>
        </h2>
        <p className="text-lg text-slate-600">
          ২০২৬ সালের আধুনিক নির্বাচন ব্যবস্থায় আপনাকে স্বাগতম। আপনার জাতীয় পরিচয়পত্র (NID) এবং বায়োমেট্রিক ভেরিফিকেশনের মাধ্যমে সহজেই ভোট দিন আপনার বাড়ি থেকেই।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <FeatureCard 
          icon="🆔" 
          title="NID ভেরিফিকেশন" 
          desc="সরাসরি নির্বাচন কমিশনের ডাটাবেসের সাথে সংযুক্ত অটোমেটেড সিস্টেম। ১৮ বছরের নিচের ব্যক্তিদের জন্য এটি প্রযোজ্য নয়।" 
        />
        <FeatureCard 
          icon="👤" 
          title="বায়োমেট্রিক ফেস আইডি" 
          desc="ডাবল ফ্যাক্টর অথেন্টিকেশন এবং ফেসিয়াল রিকগনিশন নিরাপত্তা নিশ্চিত করে।" 
        />
        <FeatureCard 
          icon="🗳️" 
          title="সিঙ্গেল বোর্ডিং" 
          desc="একবার ভেরিফিকেশন করে যেকোনো নির্বাচনে অংশগ্রহণ করার সুবিধা।" 
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={onStart}
          className="bg-[#006a4e] hover:bg-[#005a42] text-white text-xl font-bold py-4 px-12 rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:scale-95 flex items-center space-x-3"
        >
          <span>ভোটদান শুরু করুন</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <button 
          onClick={onEducation}
          className="bg-white text-[#006a4e] border-2 border-[#006a4e] hover:bg-green-50 text-xl font-bold py-4 px-12 rounded-2xl shadow-sm transform transition hover:-translate-y-1 active:scale-95 flex items-center space-x-3"
        >
          <span>ভোটার শিক্ষা</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 max-w-lg rounded">
        <p className="text-sm text-amber-800">
          <strong>জরুরী নোটিশ:</strong> ভোট প্রদানের জন্য আপনার বয়স ন্যূনতম ১৮ বছর হতে হবে। ১৮ বছরের কম বয়সীদের জন্য এই প্ল্যাটফর্মটি ব্যবহারযোগ্য নয়।
        </p>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{icon: string, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
