import { Link } from "react-router-dom";
import { ShieldCheck, Wallet, Clock3, ArrowRight, LogIn, UserPlus, BadgeDollarSign, LockKeyhole, BarChart3 } from "lucide-react";
import Footer from "../components/Footer";

function FeatureCard({ icon, title, description }) {

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center shadow-lg backdrop-blur-md">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-300">{label}</div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B1120]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl  shadow-lg shadow-green-500/20">
              <BadgeDollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none text-white">Transaction Mate</p>
              <p className="text-xs text-slate-400">Transaction System</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-linear(circle_at_top_right,rgba(99,102,241,0.22),transparent_34%),radial-linear(circle_at_bottom_left,rgba(236,72,153,0.16),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                Secure • Fast • Reliable
              </span>
              <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Welcome to Transaction Mate by Ravin Ghimire .
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Transaction System Buit with react , Node.js ,Express , MongodB
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-xl shadow-indigo-500/25 transition hover:scale-[1.02]"
                >
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Login to Dashboard
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                <StatCard value="24/7" label="Access" />
                <StatCard value="Secure" label="JWT Auth" />
                <StatCard value="Live" label="Tracking" />
              </div>
            </div>

            {/* Hero visual */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-300">Account Overview</p>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="mt-6 rounded-3xl bg-linear-to-br from-indigo-500 via-purple-500 to-fuchsia-500 p-6 shadow-xl">
                  <p className="text-sm text-white/80">Available Balance</p>
                  <h2 className="mt-2 text-4xl font-black text-white">₹ 12,500</h2>
                  <div className="mt-6 flex items-center justify-between text-sm text-white/80">
                    <span>Account •••• 2489</span>
                    <span>Rajesh Hamal</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4 text-center">
                    <Wallet className="mx-auto h-5 w-5 text-indigo-300" />
                    <p className="mt-2 text-xs text-slate-300">Deposit</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 text-center">
                    <ShieldCheck className="mx-auto h-5 w-5 text-emerald-300" />
                    <p className="mt-2 text-xs text-slate-300">Protected</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 text-center">
                    <Clock3 className="mx-auto h-5 w-5 text-fuchsia-300" />
                    <p className="mt-2 text-xs text-slate-300">Instant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md lg:grid-cols-2 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">About Us</p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Built for secure and simple money movement.</h2>
              <p className="mt-5 max-w-2xl text-slate-300 leading-7">
                Our transaction system is designed elegantly . 
                It uses JSON Web Token (JWT) for secure authentication.
                Idempotency key is maintained for backend validation help reduce duplicate operations.
              </p>

              <p className="mt-4 max-w-2xl text-slate-300 leading-7">
                Deposit, withdraw, and transfer is managed by MongodB Session Transaction 
                making seamless end to end transaction.
              </p>
              <p className="mt-4 max-w-2xl text-slate-300 leading-7">
                We focus on reliability, clear visibility, and a premium user experience so your
                financial workflow feels smooth from the very first click.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                icon={<LockKeyhole className="h-5 w-5" />}
                title="Secure Authentication"
                description="Protected login flow with token-based access and safe route control."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Transaction Safety"
                description="Idempotency and backend validation help reduce duplicate operations."
              />
              <FeatureCard
                icon={<BarChart3 className="h-5 w-5" />}
                title="Live Dashboard"
                description="See your balance, history, and activity in one polished view."
              />
              <FeatureCard
                icon={<Wallet className="h-5 w-5" />}
                title="Fast Money Actions"
                description="Deposit, withdraw, and transfer with a simple action-first interface."
              />
            </div>
          </div>
        </section>

        {/* Features + CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<UserPlus className="h-5 w-5" />}
              title="Register"
              description="Create a new account and begin using the transaction dashboard in minutes."
            />
            <FeatureCard
              icon={<LogIn className="h-5 w-5" />}
              title="Login"
              description="Access your account securely and jump directly into your financial overview."
            />
            <FeatureCard
              icon={<BadgeDollarSign className="h-5 w-5" />}
              title="Manage Funds"
              description="Handle deposits, withdrawals, and transfers through a clean quick-actions section."
            />
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-4xl border border-white/10 bg-linear-to-r from-indigo-500/15 via-purple-500/15 to-fuchsia-500/15 p-6 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-2xl font-bold text-white">Ready to get started?</h3>
              <p className="mt-2 text-slate-300">
                Register or log in to manage your money in a focused, modern interface.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/login"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Register
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
    <Footer/>
    </div>
  );
}
