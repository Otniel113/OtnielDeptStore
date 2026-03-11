import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../Controller/StoreContext';

export default function LoginPage() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useStore();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const role = await login(identity, password);
      navigate(role === 'admin' ? '/admin' : '/member');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background font-sans">
      <div className="w-full max-w-md bg-card border-2 border-border shadow-card rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mb-2">
            The Waroenkz
          </h1>
          <p className="font-mono text-sm text-muted uppercase tracking-widest">Sign In to Continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-semibold">{error}</div>
          )}
          <div>
            <label htmlFor="identity" className="block text-sm font-bold font-mono uppercase tracking-wide mb-2 text-foreground">Username or Email</label>
            <input
              type="text"
              id="identity"
              required
              value={identity}
              onChange={e => setIdentity(e.target.value)}
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

          <button type="submit" disabled={loading} className="w-full h-12 btn-gold rounded-lg shadow-sm font-bold text-lg tracking-wide uppercase font-mono transition-transform active:scale-[0.98] disabled:opacity-50">
            {loading ? 'Signing in...' : 'Login'}
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
