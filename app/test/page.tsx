
"use client";

import { useEffect, useState } from 'react';

interface User {
  email: string;
  fitness_level: string;
}

export default function TestPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_HOST + '/users';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.warn(data);
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.email} - {user.fitness_level}</li>
        ))}
      </ul>
    </div>
  );
}