import { User } from '@/types/types';

const API_URL = 'https://randomuser.me/api?results=10';

export const fetchContacts = async (): Promise<User[]> => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    throw error;
  }
};

export const fetchContactByEmail = async (email: string): Promise<User | null> => {
  try {
    const res = await fetch(`${API_URL}&email=${email}`);
    const data = await res.json();
    return data.results[0] || null;
  } catch (error) {
    console.error('Failed to fetch contact by email:', error);
    throw error;
  }
};