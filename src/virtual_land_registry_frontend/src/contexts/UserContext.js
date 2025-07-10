import { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    (async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal().toText();
        setUser(principal);
      }
    })();
  }, []);

  const login = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`, // 👈 local Internet Identity
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        setUser(principal);
      },
    });
  };

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
