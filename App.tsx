
import React, { useState } from 'react';
import { AppStep, Election, VoterProfile } from './types';
import Header from './components/Header';
import Landing from './components/Landing';
import NIDVerification from './components/NIDVerification';
import FaceVerification from './components/FaceVerification';
import Dashboard from './components/Dashboard';
import BallotBox from './components/BallotBox';
import Results from './components/Results';
import SuccessScreen from './components/SuccessScreen';
import VoterEducation from './components/VoterEducation';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [previousStep, setPreviousStep] = useState<AppStep>(AppStep.LANDING);
  const [voter, setVoter] = useState<VoterProfile | null>(null);
  const [currentElection, setCurrentElection] = useState<Election | null>(null);
  
  const [elections] = useState<Election[]>([
    {
      id: 'e1',
      title: 'জাতীয় সংসদ নির্বাচন ২০২৬',
      date: '২০ ডিসেম্বর ২০২৬',
      status: 'ongoing',
      description: 'বাংলাদেশের ৩শটি সংসদীয় আসনের সাধারণ নির্বাচন।',
      level: 'national'
    },
    {
      id: 'e2',
      title: 'ইউনিয়ন পরিষদ ও স্থানীয় নির্বাচন',
      date: '১৫ জানুয়ারি ২০২৭',
      status: 'upcoming',
      description: 'মেয়র, মেম্বার এবং কাউন্সিলর পদের জন্য স্থানীয় নির্বাচন।',
      level: 'union'
    }
  ]);

  const handleNIDSubmit = (nid: string, dob: string, division: string) => {
    // Simulate assigning a random constituency based on division
    const constituencies: Record<string, string> = {
        'ঢাকা': 'ঢাকা-১০',
        'চট্টগ্রাম': 'চট্টগ্রাম-৯',
        'সিলেট': 'সিলেট-১',
        'রাজশাহী': 'রাজশাহী-২'
    };
    
    setVoter({
      nid,
      name: 'আব্দুর রহমান',
      dob,
      isVerified: false,
      hasVoted: false,
      division: division,
      district: division === 'ঢাকা' ? 'ঢাকা' : 'সংশ্লিষ্ট জেলা',
      upazila: 'সংশ্লিষ্ট উপজেলা',
      union: 'সংশ্লিষ্ট ইউনিয়ন',
      ward: 'ওয়ার্ড নং ৫',
      constituency: constituencies[division] || `${division}-১`
    });
    setStep(AppStep.FACE_VERIFY);
  };

  const handleVerificationComplete = () => {
    if (voter) {
      setVoter({ ...voter, isVerified: true });
      setStep(AppStep.DASHBOARD);
    }
  };

  const handleSelectElection = (election: Election) => {
    setCurrentElection(election);
    setStep(AppStep.BALLOT);
  };

  const handleVoteSubmit = () => {
    if (voter) {
      setVoter({ ...voter, hasVoted: true });
      setStep(AppStep.SUCCESS);
    }
  };

  const navigateToEducation = () => {
    setPreviousStep(step);
    setStep(AppStep.VOTER_EDUCATION);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Hind_Siliguri']">
      <Header step={step} onGoHome={() => setStep(AppStep.LANDING)} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {step === AppStep.LANDING && (
          <Landing 
            onStart={() => setStep(AppStep.NID_ENTRY)} 
            onEducation={navigateToEducation}
          />
        )}

        {step === AppStep.NID_ENTRY && (
          <NIDVerification onSubmit={handleNIDSubmit} />
        )}

        {step === AppStep.FACE_VERIFY && (
          <FaceVerification onComplete={handleVerificationComplete} />
        )}

        {step === AppStep.DASHBOARD && voter && (
          <Dashboard 
            voter={voter} 
            elections={elections} 
            onSelectElection={handleSelectElection}
            onViewResults={() => setStep(AppStep.RESULTS)}
            onEducation={navigateToEducation}
          />
        )}

        {step === AppStep.BALLOT && currentElection && voter && (
          <BallotBox 
            election={currentElection} 
            voter={voter}
            onVote={handleVoteSubmit} 
            onCancel={() => setStep(AppStep.DASHBOARD)}
          />
        )}

        {step === AppStep.SUCCESS && (
          <SuccessScreen onGoBack={() => setStep(AppStep.DASHBOARD)} />
        )}

        {step === AppStep.RESULTS && (
          <Results onBack={() => setStep(AppStep.DASHBOARD)} />
        )}

        {step === AppStep.VOTER_EDUCATION && (
          <VoterEducation onBack={() => setStep(previousStep)} />
        )}
      </main>

      <footer className="bg-white border-t py-6 text-center text-slate-500 text-sm">
        <p>© ২০২৬ নির্বাচন কমিশন, গণপ্রজাতন্ত্রী বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  );
};

export default App;
