import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Mock register — redirect to login
    navigate('/login');
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background font-sans">
      <div className="w-full max-w-md bg-card border-2 border-border shadow-card rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground mb-2">
            Serif<span className="text-gold-dark">.</span> POS
          </h1>
          <p className="font-mono text-sm text-muted uppercase tracking-widest">Create Account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-bold font-mono uppercase tracking-wide mb-2 text-foreground">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors font-sans"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="reg-username" className="block text-sm font-bold font-mono uppercase tracking-wide mb-2 text-foreground">Username</label>
            <input
              type="text"
              id="reg-username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors font-sans"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-sm font-bold font-mono uppercase tracking-wide mb-2 text-foreground">Password</label>
            <input
              type="password"
              id="reg-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors font-sans"
              placeholder="Set a password"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-bold font-mono uppercase tracking-wide mb-2 text-foreground">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors font-sans"
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="w-full h-12 btn-gold rounded-lg shadow-sm font-bold text-lg tracking-wide uppercase font-mono transition-transform active:scale-[0.98]">
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted font-sans text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-foreground hover:text-gold-dark underline decoration-2 underline-offset-2">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
