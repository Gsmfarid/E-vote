
// Fix: Import PARTIES from data and ElectionRegistration from types
import { PARTIES } from '../data';
import { ElectionRegistration } from '../types';

const DB_KEY = 'BD_EVOTE_DB_2026';

interface DBState {
  votes: Record<string, number>;
  votedNIDs: string[];
  totalVoters: number;
  registrations: Record<string, ElectionRegistration[]>; // Improved type safety
}

class DatabaseService {
  private state: DBState;

  constructor() {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      this.state = JSON.parse(saved);
      // Ensure registrations exists for backward compatibility
      if (!this.state.registrations) this.state.registrations = {};
    } else {
      const initialVotes: Record<string, number> = {};
      PARTIES.forEach(party => {
        initialVotes[party.id] = Math.floor(Math.random() * 500);
      });

      this.state = {
        votes: initialVotes,
        votedNIDs: [],
        totalVoters: 154200000,
        registrations: {}
      };
      this.save();
    }
  }

  private save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.state));
  }

  async hasAlreadyVoted(nid: string): Promise<boolean> {
    return this.state.votedNIDs.includes(nid);
  }

  async castVote(nid: string, partyId: string): Promise<boolean> {
    if (this.state.votedNIDs.includes(nid)) return false;
    this.state.votes[partyId] = (this.state.votes[partyId] || 0) + 1;
    this.state.votedNIDs.push(nid);
    this.save();
    return true;
  }

  async getResults() {
    return PARTIES.map(party => ({
      name: party.symbol + ' ' + party.name.split(' (')[0],
      partyName: party.name,
      votes: this.state.votes[party.id] || 0,
      color: party.color
    })).sort((a, b) => b.votes - a.votes);
  }

  async getTotalVoteCount(): Promise<number> {
    return Object.values(this.state.votes).reduce((a, b) => a + b, 0);
  }

  // Registration Features
  // Updated registration parameter to use correct ElectionRegistration type
  async registerForElection(registration: ElectionRegistration): Promise<boolean> {
    const { nid, electionId } = registration;
    if (!this.state.registrations[nid]) {
      this.state.registrations[nid] = [];
    }
    
    // Check if already registered for this election
    const exists = this.state.registrations[nid].some(r => r.electionId === electionId);
    if (exists) return false;

    this.state.registrations[nid].push(registration);
    this.save();
    return true;
  }

  // Updated return type to use ElectionRegistration[]
  async getVoterRegistrations(nid: string): Promise<ElectionRegistration[]> {
    return this.state.registrations[nid] || [];
  }
}

export const db = new DatabaseService();
