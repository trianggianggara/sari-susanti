import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function LoginForm() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login gagal. Periksa email dan password.');
      }

      window.location.href = '/admin';
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="login-root">
      {/* ── Left panel — decorative ── */}
      <div class="login-panel" aria-hidden="true">
        <div class="login-panel__orb login-panel__orb--1"></div>
        <div class="login-panel__orb login-panel__orb--2"></div>
        <div class="login-panel__orb login-panel__orb--3"></div>

        <div class="login-panel__content">
          <img src="/logo.png" alt="Sari Susanti Logo" class="login-panel__logo-mark" />
          <h1 class="login-panel__brand">Sari Susanti</h1>
          <p class="login-panel__tagline">Catering &amp; Bakery</p>
          <div class="login-panel__divider"></div>
          <p class="login-panel__quote">
            "Sajian terbaik dari dapur kami,<br />
            langsung ke meja Anda."
          </p>
          <ul class="login-panel__features">
            {[
              'Kelola produk & menu',
              'Pantau testimoni pelanggan',
              'Update banner & konten',
              'Manajemen FAQ',
            ].map((f) => (
              <li key={f} class="login-panel__feature-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div class="login-form-panel">
        <div class="login-form-wrap">
          {/* Mobile brand (hidden on desktop) */}
          <div class="login-mobile-brand">
            <img src="/logo.png" alt="Sari Susanti Logo" class="login-mobile-brand__mark" />
            <div>
              <p class="login-mobile-brand__name">Sari Susanti</p>
              <p class="login-mobile-brand__sub">Admin Portal</p>
            </div>
          </div>

          <div class="login-form-header">
            <h2 class="login-form-title">Selamat Datang</h2>
            <p class="login-form-sub">Masuk ke panel administrasi Anda</p>
          </div>

          {error && (
            <div class="login-error" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} class="login-form" noValidate>
            {/* Email */}
            <div class="login-field">
              <label class="login-label" for="login-email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                required
                autocomplete="email"
                placeholder="admin@sarisusanti.com"
                class="login-input"
              />
            </div>

            {/* Password */}
            <div class="login-field">
              <label class="login-label" for="login-password">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Password
              </label>
              <div class="login-input-wrap">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                  required
                  autocomplete="current-password"
                  placeholder="••••••••"
                  class="login-input login-input--password"
                />
                <button
                  type="button"
                  class="login-toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              class={`login-submit ${loading ? 'login-submit--loading' : ''}`}
            >
              {loading ? (
                <>
                  <span class="login-spinner" aria-hidden="true"></span>
                  Memverifikasi…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Masuk ke Dashboard
                </>
              )}
            </button>
          </form>

          <p class="login-footer-note">
            Hanya administrator yang memiliki akses ke halaman ini.
          </p>
        </div>
      </div>
    </div>
  );
}
