import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lmdjcsabikytyynuxlfq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZGpjc2FiaWt5dHl5bnV4bGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MDMyMDUsImV4cCI6MjA1NzA3OTIwNX0.ECHMf0llbjfXHU6RY4DmZGRITUJLmmGiLX-AO6OXVBg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Member {
  id: string;
  name: string;
  department: string;
  distance: number;
  rank: number;
  avatar?: string;
}

export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from('member')
    .select('id, name, department, distance, rank, avatar')
    .order('rank', { ascending: true });
  
  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }
  
  return data || [];
} 