const apiUrl = import.meta.env.VITE_API_URL;

interface User {
  username: string;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${apiUrl}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }
  return response.json();
}
