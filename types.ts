
export interface PoliticalParty {
  id: string;
  name: string;
  symbol: string;
  color: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyId: string;
  symbol: string;
  manifesto: string;
  region: string; // The specific seat or ward
}

export interface Election {
  id: string;
  title: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  level: 'national' | 'local' | 'union';
}

export interface VoterProfile {
  nid: string;
  name: string;
  dob: string;
  isVerified: boolean;
  hasVoted: boolean;
  division: string;
  district: string;
  upazila: string;
  union: string;
  ward: string;
  constituency: string; // e.g., "ঢাকা-১০"
}

export enum AppStep {
  LANDING = 'LANDING',
  NID_ENTRY = 'NID_ENTRY',
  FACE_VERIFY = 'FACE_VERIFY',
  DASHBOARD = 'DASHBOARD',
  BALLOT = 'BALLOT',
  SUCCESS = 'SUCCESS',
  RESULTS = 'RESULTS',
  VOTER_EDUCATION = 'VOTER_EDUCATION'
}
