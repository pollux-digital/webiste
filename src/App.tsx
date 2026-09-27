import { useEffect, useMemo, useState, type FormEvent, type PointerEvent, type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Clock3, Mail, Orbit, Sparkles } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(target: number): Countdown {
  const distance = Math.max(0, target - Date.now());
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function Home() {
  const launchTarget = useMemo(() => Date.now() + 19 * 86400000 + 7 * 3600000 + 42 * 60000, []);
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown(launchTarget));
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'success' | 'error'>('idle');
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    document.title = 'Pollux Digital — Something worth waiting for';
    const description = 'Pollux Digital is creating useful, beautiful digital experiences. Something worth waiting for is coming soon.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const theme = document.querySelector('meta[name="theme-color"]') ?? document.createElement('meta');
    theme.setAttribute('name', 'theme-color');
    theme.setAttribute('content', '#221d2b');
    if (!theme.parentNode) document.head.appendChild(theme);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown(launchTarget)), 1000);
    return () => window.clearInterval(timer);
  }, [launchTarget]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setFormState('error');
      return;
    }
    setFormState('success');
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  };

  const countdownItems = [
    { label: 'days', value: countdown.days },
    { label: 'hours', value: countdown.hours },
    { label: 'minutes', value: countdown.minutes },
    { label: 'seconds', value: countdown.seconds },
  ];

  return (
    <main className="signal-page min-h-[100dvh]">
      <section
        className="relative min-h-[720px] overflow-hidden bg-[#221d2b] text-[#f4efd9]"
        onPointerMove={handlePointerMove}
      >
        <div className="hero-grid absolute inset-0 opacity-80" aria-hidden="true" />
        <div
          className="cursor-glow absolute h-[28rem] w-[28rem] rounded-full"
          style={{ left: `${pointer.x}%`, top: `${pointer.y}%` }}
          aria-hidden="true"
        />
        <div className="hero-scanline absolute inset-x-0 top-0 h-px" aria-hidden="true" />
        <div className="absolute -right-44 -top-48 h-[38rem] w-[38rem] rounded-full border border-[#c9dd2a]/20" aria-hidden="true" />
        <div className="absolute -right-32 -top-36 h-[32rem] w-[32rem] rounded-full border border-[#c9dd2a]/20" aria-hidden="true" />
        <div className="absolute right-[10%] top-[21%] h-2 w-2 rounded-full bg-[#c9dd2a] shadow-[0_0_0_12px_rgba(201,221,42,0.12)] signal-ping" aria-hidden="true" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <a href="/" className="group flex items-center gap-3" data-testid="link-logo">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#c9dd2a]/70 text-[#c9dd2a] transition-transform duration-300 group-hover:rotate-45" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#c9dd2a]" />
            </span>
            <span className="flex flex-col font-display text-lg font-bold leading-none tracking-[0.2em]">
              <span>Pollux</span>
              <span className="mt-1 font-mono-display text-[8px] font-normal tracking-[0.42em] text-[#c9dd2a]">Digital</span>
            </span>
          </a>
          <div className="flex items-center gap-3 font-mono-display text-[10px] uppercase tracking-[0.22em] text-[#d8d0c6]/70 sm:gap-5">
            <span className="hidden sm:inline">Signal no. 001</span>
            <span className="h-1 w-1 rounded-full bg-[#c9dd2a]" />
            <span>Worldwide / 2026</span>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-20">
          <div className="max-w-3xl">
            <div className="reveal flex items-center gap-3 font-mono-display text-[10px] uppercase tracking-[0.25em] text-[#c9dd2a]">
              <span className="h-px w-9 bg-[#c9dd2a]" />
              Transmission incoming
            </div>
            <h1 className="reveal reveal-delay-1 mt-8 max-w-4xl font-display text-[clamp(4.3rem,12vw,10.5rem)] font-medium leading-[0.78] tracking-[-0.085em] text-[#f4efd9]">
              Something<br />
              <span className="text-[#c9dd2a]">worth</span> waiting for.
            </h1>
            <p className="reveal reveal-delay-2 mt-10 max-w-md text-base leading-7 text-[#d8d0c6]/75 sm:text-lg">
              Pollux Digital is a small, curious studio making useful, beautiful digital experiences, and this one is not quite ready to reveal yet.
            </p>
            <a href="#notify" className="reveal reveal-delay-3 mt-9 inline-flex items-center gap-3 border-b border-[#c9dd2a] pb-2 font-mono-display text-xs uppercase tracking-[0.2em] text-[#c9dd2a] transition-[gap] duration-300 hover:gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9dd2a]" data-testid="link-jump-notify">
              Keep me close
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

            <div className="reveal reveal-delay-3 relative mx-auto aspect-square w-full max-w-[29rem] lg:ml-auto" aria-label="Pollux in the Gemini constellation">
            <div className="gemini-field absolute inset-[3%] rounded-full" aria-hidden="true" />
            <svg className="gemini-constellation absolute inset-[5%] h-[90%] w-[90%]" viewBox="0 0 100 100" aria-hidden="true">
              <path className="gemini-line" d="M30 25 L70 27 L79 44 L72 70 L61 83 M30 25 L23 45 L28 68 L39 83 M23 45 L79 44 M28 68 L72 70 M39 83 L61 83" />
              <circle className="gemini-star gemini-star-bright" cx="30" cy="25" r="1.6" />
              <circle className="gemini-star gemini-star-bright" cx="70" cy="27" r="1.9" />
              <circle className="gemini-star" cx="23" cy="45" r="1" />
              <circle className="gemini-star" cx="79" cy="44" r="1" />
              <circle className="gemini-star" cx="28" cy="68" r="0.9" />
              <circle className="gemini-star" cx="72" cy="70" r="0.9" />
              <circle className="gemini-star" cx="39" cy="83" r="0.8" />
              <circle className="gemini-star" cx="61" cy="83" r="0.8" />
            </svg>
            <div className="absolute inset-[10%] rounded-full border border-[#d8d0c6]/20" />
            <div className="orbit-ring absolute inset-[16%] rounded-full border border-dashed border-[#c9dd2a]/50" />
            <div className="orbit-ring-slow absolute inset-[27%] rounded-full border border-[#d8d0c6]/20" />
            <div className="absolute inset-[39%] rounded-full bg-[#c9dd2a] shadow-[0_0_80px_rgba(201,221,42,0.32)] float-slow">
              <div className="absolute inset-3 rounded-full border border-[#221d2b]/30" />
            </div>
            <div className="absolute left-[13%] top-[35%] h-3 w-3 rounded-full bg-[#a84b38]" />
            <div className="absolute right-[16%] top-[20%] h-2 w-2 rounded-full bg-[#d8d0c6]" />
            <div className="absolute bottom-[20%] right-[14%] h-4 w-4 rounded-full border border-[#c9dd2a]" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 font-mono-display text-[9px] uppercase tracking-[0.3em] text-[#d8d0c6]/60">curiosity / 01</div>
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-display text-[9px] uppercase tracking-[0.3em] text-[#d8d0c6]/60">Pollux in Gemini</div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-[#d8d0c6]/20" />
        <div className="relative z-10 mx-auto flex max-w-7xl justify-between px-6 py-4 font-mono-display text-[9px] uppercase tracking-[0.22em] text-[#d8d0c6]/50 lg:px-10">
          <span>Not an announcement. A beginning.</span>
          <span className="hidden sm:inline">Listen carefully ↓</span>
        </div>
      </section>

      <div className="overflow-hidden border-b border-[#221d2b]/10 bg-[#c9dd2a] py-3 text-[#221d2b]">
        <div className="ticker-track flex w-max items-center gap-8 font-mono-display text-[10px] uppercase tracking-[0.25em]">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="flex items-center gap-8" key={index}>
              <span>Pollux Digital / arriving soon</span><span className="text-[#a84b38]" aria-hidden="true">·</span>
              <span>useful things for curious people</span><span className="text-[#a84b38]" aria-hidden="true">·</span>
              <span>made slowly in san francisco</span><span className="text-[#a84b38]" aria-hidden="true">·</span>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36" id="signal">
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.25em] text-[#a84b38]" data-testid="text-section-label">01 / The signal</p>
            <div className="mt-8 h-px w-20 bg-[#a84b38]" />
          </div>
          <div>
            <h2 className="max-w-4xl font-display text-[clamp(2.8rem,6vw,6.5rem)] leading-[0.92] tracking-[-0.065em]">
              Less noise.<br /><span className="text-[#a84b38]">More wonder.</span>
            </h2>
            <div className="mt-12 grid gap-10 border-t border-[#221d2b]/15 pt-8 sm:grid-cols-2">
              <p className="max-w-sm text-sm leading-7 text-[#221d2b]/65">
                We believe the best digital experiences leave room for thought. Pollux Digital is shaped around the small, satisfying moments that make a day feel more like your own.
              </p>
              <p className="max-w-sm text-sm leading-7 text-[#221d2b]/65">
                There will be no grand reveal before it is ready. Just a quiet door opening, a light turning on, and an invitation to come see what Pollux Digital has been making.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#a84b38] px-6 py-24 text-[#f4efd9] lg:px-10 lg:py-32" id="launch">
        <div className="absolute -right-16 -top-20 h-80 w-80 rounded-full border border-[#f4efd9]/20" aria-hidden="true" />
        <div className="absolute -right-4 -top-8 h-56 w-56 rounded-full border border-[#f4efd9]/20" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="font-mono-display text-[10px] uppercase tracking-[0.25em] text-[#c9dd2a]">02 / Mark the moment</p>
              <h2 className="mt-7 max-w-2xl font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.84] tracking-[-0.07em]">The quiet<br />countdown.</h2>
            </div>
            <div className="max-w-xs text-sm leading-6 text-[#f4efd9]/70">
              <Clock3 className="mb-4 h-5 w-5 text-[#c9dd2a]" aria-hidden="true" />
              <p>Our first door opens in San Francisco, when the signal is clear enough to share.</p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 border-t border-[#f4efd9]/25 sm:grid-cols-4">
            {countdownItems.map((item, index) => (
              <div className={`py-7 ${index < 3 ? 'border-r border-[#f4efd9]/25' : ''} ${index > 1 ? 'border-t border-[#f4efd9]/25 sm:border-t-0' : ''} ${index % 2 === 0 ? 'pr-5' : 'pl-5 sm:pl-7'} sm:px-7 first:pl-0`} key={item.label}>
                <p className="font-display text-[clamp(3.6rem,8vw,7.5rem)] leading-none tracking-[-0.08em] text-[#c9dd2a]" data-testid={`countdown-${item.label}`}>{pad(item.value)}</p>
                <p className="mt-3 font-mono-display text-[9px] uppercase tracking-[0.25em] text-[#f4efd9]/65">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36" id="notify">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.25em] text-[#a84b38]">03 / Stay nearby</p>
            <h2 className="mt-8 font-display text-[clamp(3rem,6vw,6rem)] leading-[0.87] tracking-[-0.07em]">A note when<br /><span className="text-[#a84b38]">it is time.</span></h2>
          </div>
          <div className="lg:pt-14">
            <p className="max-w-lg text-lg leading-8 text-[#221d2b]/70">Leave your email and we&apos;ll send one considered note when Pollux Digital is ready. No noise. No launch-day confetti.</p>
            <form className="mt-10 max-w-xl" onSubmit={handleSubmit} noValidate>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#221d2b]/45" aria-hidden="true" />
                  <input id="email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setFormState('idle'); }} placeholder="your@email.com" className="h-14 w-full rounded-full border border-[#221d2b]/20 bg-[#f4efd9]/60 pl-11 pr-5 text-sm outline-none transition-colors placeholder:text-[#221d2b]/40 focus:border-[#a84b38] focus:ring-2 focus:ring-[#a84b38]/20" data-testid="input-email" />
                </div>
                <button type="submit" className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#221d2b] px-7 font-mono-display text-[10px] uppercase tracking-[0.18em] text-[#f4efd9] transition-transform duration-300 hover:-translate-y-1 hover:bg-[#a84b38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#221d2b] active:translate-y-0" data-testid="button-notify">
                  Notify me
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-4 min-h-6" aria-live="polite">
                {formState === 'success' && <p className="flex items-center gap-2 text-sm text-[#48651d]" data-testid="status-success"><Check className="h-4 w-4" aria-hidden="true" /> You&apos;re on the list. We&apos;ll be in touch.</p>}
                {formState === 'error' && <p className="text-sm text-[#a84b38]" data-testid="status-error">That email needs one more look. Try again?</p>}
                {formState === 'idle' && <p className="font-mono-display text-[9px] uppercase tracking-[0.15em] text-[#221d2b]/40">One email. Zero clutter. Unsubscribe whenever.</p>}
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#221d2b] px-6 py-10 text-[#f4efd9] lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3">
              <Orbit className="h-5 w-5 text-[#c9dd2a]" aria-hidden="true" />
              <span className="font-display text-lg tracking-[0.2em]">POLLUX DIGITAL</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#d8d0c6]/55">A digital studio for useful, beautiful things that take their time.</p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex items-center gap-2 font-mono-display text-[9px] uppercase tracking-[0.18em] text-[#d8d0c6]/55">
              <Sparkles className="h-3.5 w-3.5 text-[#c9dd2a]" aria-hidden="true" />
              Made with curiosity
            </div>
            <p className="font-mono-display text-[9px] uppercase tracking-[0.18em] text-[#d8d0c6]/35">© 2026 Pollux Digital / signal no. 001</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;