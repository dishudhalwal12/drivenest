'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <nav className="bg-pitch-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-deep-graphite">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-accent-teal tracking-tighter uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car-front"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.64 5H8.4a2 2 0 0 0-1.9 1.3L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
              DriveNest
            </Link>
          </div>

          <div className="flex items-center space-x-6 text-[14px]">
            <Link
              href="/cars"
              className="text-ghost-white/80 hover:text-cloud-white transition"
            >
              Browse Cars
            </Link>
            <Link
              href="/drivers"
              className="text-ghost-white/80 hover:text-cloud-white transition"
            >
              Drivers
            </Link>
            <Link
              href="/admin/dashboard"
              className="text-ghost-white/80 hover:text-cloud-white transition"
            >
              Dashboard
            </Link>
            {status === 'authenticated' ? (
              <>
                <Link
                  href="/bookings"
                  className="text-ghost-white/80 hover:text-cloud-white transition"
                >
                  My Bookings
                </Link>

                <div className="flex items-center space-x-4 pl-4 border-l border-storm-gray">
                  <div className="flex items-center space-x-2">
                    {session.user.image && (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-cloud-white font-medium">
                      {session.user.name}
                    </span>
                  </div>

                  <button
                    onClick={() => signOut()}
                    className="text-ghost-white/80 hover:text-cloud-white transition"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSignIn}
                  className="text-[14px] font-semibold text-cloud-white hover:text-highlight-blue transition"
                >
                  Log In
                </button>
                <button
                  onClick={handleSignIn}
                  className="bg-interactive-blue text-white px-6 py-2 rounded-buttons text-[14px] font-semibold hover:bg-vivid-blue transition"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}