import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useStore();

  function handleLogin(e) {
    e.preventDefault();
    // Mock login — accept any credentials. Check for "admin" to route to admin.
    if (username.toLowerCase() === 'admin') {
      setUser({ username, role: 'admin' });
      navigate('/admin');
    } else {
      setUser({ username, role: 'member' });
      navigate('/member');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background font-sans">
      <div className="w-full max-w-md bg-card border-2 border-border shadow-card rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mb-2">
            Serif<span className="text-gold-dark">.</span> POS
          </h1>
          <p className="font-mono text-sm text-muted uppercase tracking-widest">Sign In to Continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-bold font-mono uppercase tracking-wide mb-2 text-foreground">Username or Email</label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors font-sans"
              placeholder="Enter your credential"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold font-mono uppercase tracking-wide mb-2 text-foreground">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors font-sans"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="w-full h-12 btn-gold rounded-lg shadow-sm font-bold text-lg tracking-wide uppercase font-mono transition-transform active:scale-[0.98]">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted font-sans text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-bold text-foreground hover:text-gold-dark underline decoration-2 underline-offset-2">Register</Link>
          </p>
          <p className="mt-6 text-muted font-sans text-sm">
            <Link to="/" className="text-foreground hover:text-gold-dark decoration-2 underline-offset-4 transition-colors">Continue as Guest</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
