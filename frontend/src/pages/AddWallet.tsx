import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddWallet = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract query parameters
  const loggedIn = searchParams.get('loggedIn') === 'true';
  const token = searchParams.get('token');
  const userId = '1234'; // Move this to a constant if hardcoded

  // States
  const [formState, setFormState] = useState({
    walletAddress: '',
    message: '',
    following: false,
    isLoading: false,
  });

  // Utility functions
  const isValidWalletAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, walletAddress: e.target.value }));
  };

  const handleFollow = () => {
    setFormState((prev) => ({ ...prev, following: true }));
    window.open('https://x.com/invariant_labs', '_blank');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { walletAddress } = formState;

    if (!isValidWalletAddress(walletAddress)) {
      setFormState((prev) => ({
        ...prev,
        message: 'Invalid wallet address format.',
      }));
      return;
    }

    try {
      setFormState((prev) => ({ ...prev, isLoading: true, message: '' }));
      const response: any = await axios.post(
        '/api/add',
        { walletAddress, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      setFormState((prev) => ({
        ...prev,
        message: 'Wallet address added successfully!',
        walletAddress: '',
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error submitting wallet:', error);
      setFormState((prev) => ({
        ...prev,
        message: error.response?.data?.error || 'An error occurred.',
        isLoading: false,
      }));
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!loggedIn) {
      setFormState((prev) => ({
        ...prev,
        message: 'You need to log in first.',
      }));
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [loggedIn, navigate]);

  const { walletAddress, message, following, isLoading } = formState;

  // Render
  if (!loggedIn) {
    return <div>{message || 'Redirecting to login...'}</div>;
  }

  if (!following) {
    return (
      <div>
        <p>
          You need to follow the Invariant Labs account to submit your wallet
          address.
        </p>
        <button onClick={handleFollow}>Follow Invariant Labs</button>
      </div>
    );
  }

  return (
    <div>
      <h1>You are logged in and follow Invariant Labs</h1>
      <p>You can now submit your Ethereum wallet address.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={walletAddress}
          onChange={handleWalletChange}
          placeholder="Enter your wallet address"
          aria-label="Wallet Address"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Wallet'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddWallet;
