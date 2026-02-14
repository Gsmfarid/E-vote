
import { PARTIES } from '../data';

const DB_KEY = 'BD_EVOTE_DB_2026';

interface VoteRecord {
  partyId: string;
  timestamp: number;
}

interface DBState {
  votes: Record<string, number>;
  votedNIDs: string[];
  totalVoters: number;
}

class DatabaseService {
  private state: DBState;

  constructor() {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      this.state = JSON.parse(saved);
    } else {
      // প্রাথমিক ডাটা সেটআপ
      const initialVotes: Record<string, number> = {};
      PARTIES.forEach(party => {
        initialVotes[party.id] = Math.floor(Math.random() * 500); // সিমুলেটেড আগের ভোট
      });

      this.state = {
        votes: initialVotes,
        votedNIDs: [],
        totalVoters: 154200000 // বাংলাদেশের আনুমানিক ভোটার সংখ্যা
      };
      this.save();
    }
  }

  private save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.state));
  }

  // ভোটার আগে ভোট দিয়েছে কিনা যাচাই
  async hasAlreadyVoted(nid: string): Promise<boolean> {
    return this.state.votedNIDs.includes(nid);
  }

  // ভোট প্রদান এবং ডাটাবেজে সংরক্ষণ
  async castVote(nid: string, partyId: string): Promise<boolean> {
    if (this.state.votedNIDs.includes(nid)) return false;

    this.state.votes[partyId] = (this.state.votes[partyId] || 0) + 1;
    this.state.votedNIDs.push(nid);
    this.save();
    return true;
  }

  // লাইভ রেজাল্ট ডাটা প্রাপ্তি
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
}

export const db = new DatabaseService();
