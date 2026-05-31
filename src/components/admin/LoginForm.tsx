import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      window.location.href = '/admin';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="max-w-[420px] mx-auto mt-16 p-8 bg-white rounded-lg shadow-brand-lg border border-sand">
      <div class="text-center mb-8">
        <h2 class="m-0 text-emerald-dark font-display text-3xl">
          Sari Susanti
        </h2>
        <p class="text-stone mt-2 font-accent italic text-lg">
          Admin Portal
        </p>
      </div>

      {error && (
        <div class="bg-red-600 text-white p-3 rounded-sm mb-6 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block mb-2 font-semibold text-sm text-charcoal">Email</label>
          <input
            type="email"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
            class="w-full p-3 border border-sand rounded-sm box-border text-base font-body transition-all duration-150 ease-out focus:border-gold focus:ring-4 focus:ring-gold-glass focus:outline-none"
          />
        </div>
        <div class="mb-8">
          <label class="block mb-2 font-semibold text-sm text-charcoal">Password</label>
          <input
            type="password"
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            required
            class="w-full p-3 border border-sand rounded-sm box-border text-base font-body transition-all duration-150 ease-out focus:border-gold focus:ring-4 focus:ring-gold-glass focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          class={`w-full p-4 bg-emerald-dark text-white border-none rounded-md text-base font-semibold shadow-brand-md transition-all duration-150 ease-out 
            ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-emerald-light hover:-translate-y-0.5'}`}
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
