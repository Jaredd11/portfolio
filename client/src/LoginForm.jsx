import { useState } from 'react';

function LoginForm({ onLogin, error, isRegistering, onToggleMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onLogin({ name, email, password });
  };

  return (
    <div className="card">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isRegistering ? 'Create account' : 'Login'}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="toggle-line">
        {isRegistering ? 'Already a user?' : 'Need an account?'}{' '}
        <button type="button" className="toggle-button" onClick={onToggleMode}>
          {isRegistering ? 'Switch to login' : 'Register'}
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
