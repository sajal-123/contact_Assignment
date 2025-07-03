import { fetchContacts } from '@/services/contactService';
import { User } from '@/types/types';
import { useEffect, useState } from 'react';

export const useContacts = () => {
  const [contacts, setContacts] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const users = await fetchContacts();
        setContacts(users);
      } catch (err) {
        setError('Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  return { contacts, loading, error };
};
