import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const TABLE_VOTING = 'votings';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabasekey,
    );
  }

  startVoting() {
    return this.supabase
              .from(TABLE_VOTING)
              .insert({
                voting_question: 'My question',
                description: 'My description',
              });
  }

  async getVotings() {
    const votings = await this.supabase
               .from(TABLE_VOTING)
               .select('*');
    return votings.data || [];
  }
}
