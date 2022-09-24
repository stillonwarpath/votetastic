import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { VotingOptions } from '../interfaces';

export const TABLE_VOTING = 'votings';
export const TABLE_VOTING_OPTIONS = 'voting_options';

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
               .select('*')
               .eq('creator_id', this.supabase.auth.user()?.id);
    return votings.data || [];
  }

  async getVotingDetails(id: number) {
    return this.supabase
               .from(TABLE_VOTING)
               .select('*')
               .eq('id', id).single();
  }

  async updateVotingDetails(voting: any, id: number) {
    return this.supabase
               .from(TABLE_VOTING)
               .update(voting)
               .eq('id', id)
               .single();
  }

  async deleteVoting(id: number) {
    console.log('id', id);
    return this.supabase
              .from(TABLE_VOTING)
              .delete()
              .match({id});
  }

  async getVotingOptions(votingId: number) {
    return this.supabase
               .from(TABLE_VOTING_OPTIONS)
               .select('*')
               .eq('voting_id', votingId);

  }

  async addVotingOption(option: VotingOptions) {
    option.creator_id = this.supabase.auth.user()?.id;
    option.votes = 0;
    delete option.id;
    return this.supabase
               .from(TABLE_VOTING_OPTIONS)
               .insert(option)

  }

  async updateVotingOption(option: VotingOptions) {
    return this.supabase
               .from(TABLE_VOTING_OPTIONS)
               .update({title: option.title})
               .eq('id', option.id);

  }

  async deleteVotingOption(id: number) {
    return this.supabase
              .from(TABLE_VOTING_OPTIONS)
              .delete()
              .eq('id', id)
              .single();
  }

 }
