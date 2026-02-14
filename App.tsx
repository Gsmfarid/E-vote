
import React, { useState, useEffect } from 'react';
import { AppStep, Election, VoterProfile } from './types';
import Header from './components/Header';
import Landing from './components/Landing';
import NIDVerification from './components/NIDVerification';
import FaceVerification from './components/FaceVerification';
import Dashboard from './components/Dashboard';
import BallotBox from './components/BallotBox';
import ElectionRegistration from './components/ElectionRegistration';
import Results from './components/Results';
import SuccessScreen from './components/SuccessScreen';
import VoterEducation from './components/VoterEducation';
import { db } from './services/DatabaseService';

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
      description: 'বাংলাদেশের ৩০০টি সংসদীয় আসনের সাধারণ নির্বাচন।',
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

  const handleNIDSubmit = async (fullProfile: any) => {
    const alreadyVoted = await db.hasAlreadyVoted(fullProfile.nid);
    setVoter({
      ...fullProfile,
      isVerified: false,
      hasVoted: alreadyVoted
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

  const handleRegisterElection = (election: Election) => {
    setCurrentElection(election);
    setStep(AppStep.ELECTION_REGISTRATION);
  };

  const handleVoteSubmit = async (candidateId: string, partyId: string) => {
    if (voter) {
      const success = await db.castVote(voter.nid, partyId);
      if (success) {
        setVoter({ ...voter, hasVoted: true });
        setStep(AppStep.SUCCESS);
      } else {
        alert('দুঃখিত, এই এনআইডি দিয়ে ইতিমধ্যে ভোট প্রদান করা হয়েছে।');
      }
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
        {step === AppStep.LANDING && <Landing onStart={() => setStep(AppStep.NID_ENTRY)} onEducation={navigateToEducation} />}
        {step === AppStep.NID_ENTRY && <NIDVerification onSubmit={handleNIDSubmit} />}
        {step === AppStep.FACE_VERIFY && <FaceVerification onComplete={handleVerificationComplete} />}
        
        {step === AppStep.DASHBOARD && voter && (
          <Dashboard 
            voter={voter} 
            elections={elections} 
            onSelectElection={handleSelectElection} 
            onRegisterElection={handleRegisterElection}
            onViewResults={() => setStep(AppStep.RESULTS)} 
            onEducation={navigateToEducation} 
          />
        )}
        
        {step === AppStep.BALLOT && currentElection && voter && <BallotBox election={currentElection} voter={voter} onVote={handleVoteSubmit} onCancel={() => setStep(AppStep.DASHBOARD)} />}
        
        {step === AppStep.ELECTION_REGISTRATION && currentElection && voter && (
          <ElectionRegistration 
            election={currentElection} 
            voter={voter} 
            onSuccess={() => setStep(AppStep.DASHBOARD)} 
            onCancel={() => setStep(AppStep.DASHBOARD)} 
          />
        )}

        {step === AppStep.SUCCESS && <SuccessScreen onGoBack={() => setStep(AppStep.DASHBOARD)} />}
        {step === AppStep.RESULTS && <Results onBack={() => setStep(AppStep.DASHBOARD)} />}
        {step === AppStep.VOTER_EDUCATION && <VoterEducation onBack={() => setStep(previousStep)} />}
      </main>

      <footer className="bg-white border-t py-6 text-center text-slate-500 text-sm">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-100 mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-700 uppercase">সিঙ্গেল বোর্ডিং ডাটাবেজ কানেক্টেড</span>
          </div>
          <p>© ২০২৬ নির্বাচন কমিশন, গণপ্রজাতন্ত্রী বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
