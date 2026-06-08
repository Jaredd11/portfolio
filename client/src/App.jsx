import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import Profile from './Profile';
import { fetchProfile, login, register } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('portfolioUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchProfile(user.token)
      .then((data) => setProfile(data.user))
      .catch(() => setError('Unable to load profile data.'));
  }, [user]);

  const handleLogin = async (credentials) => {
    setError('');
    try {
      const data = await (isRegistering ? register(credentials) : login(credentials));
      setUser(data);
      localStorage.setItem('portfolioUser', JSON.stringify(data));
      setIsRegistering(false);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('portfolioUser');
  };

  const toggleMode = () => {
    setError('');
    setIsRegistering((prev) => !prev);
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Portfolio Login</h1>
        {user && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
      <main>
        {user ? (
          <Profile profile={profile} />
        ) : (
          <LoginForm
            onLogin={handleLogin}
            error={error}
            isRegistering={isRegistering}
            onToggleMode={toggleMode}
          />
        )}
      </main>
    </div>
  );
}

export default App;
