// app/check-auth.js (Server Action)
import { cookies } from 'next/headers';

export async function checkAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return { isAuthenticated: false, user: null };
  }

  try {
    // Fetch user data from your backend API
    const response = await fetch('http://localhost:3030/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { isAuthenticated: false, user: null };
    }

    const user = await response.json();
    return { isAuthenticated: true, user };
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
}