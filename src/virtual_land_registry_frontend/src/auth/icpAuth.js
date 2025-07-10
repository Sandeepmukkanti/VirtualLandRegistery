import { AuthClient } from '@dfinity/auth-client';

const IDENTITY_CANISTER_URL = 'https://identity.ic0.app'; // Or local if needed

export async function initAuth() {
  const authClient = await AuthClient.create();

  // Already authenticated
  if (await authClient.isAuthenticated()) {
    return authClient;
  }

  // If not, initiate login
  await authClient.login({
    identityProvider: IDENTITY_CANISTER_URL,
    onSuccess: () => {
      window.location.reload();
    }
  });

  return authClient;
}
