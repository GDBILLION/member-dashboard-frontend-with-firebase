import { useState, useEffect } from 'react';
import { db } from '@/api/firebase.config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { type Member } from '@/types/member';

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const membersCollection = collection(db, 'members');
    const q = query(membersCollection, orderBy('joinedAt', 'desc'));

    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const memberList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Member[];
        
        setMembers(memberList);
        setError(null); 
        setIsLoading(false);
      }, 
      (err) => {
        
        console.error("Firebase Error:", err);
        setError("Failed to sync with the database. Check your connection or permissions.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  
  return { members, isLoading, error };
};