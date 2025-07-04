import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SignedOut,SignedIn,SignInButton,SignUpButton,UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { checkUser } from '@/lib/checkUser';
import { Calendar, SignalMediumIcon, Stethoscope } from 'lucide-react';
import { ShieldCheck , User } from 'lucide-react';
import { checkAndAllocateCredits } from '@/actions/credits';
import { Badge } from 'lucide-react';
import { CreditCard } from 'lucide-react';

const Header =async () => {
  const user= await checkUser();
  if (user?.role==="PATIENT")
  {
  await checkAndAllocateCredits(user);
  }

  return <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60'>
  <nav className='container px-4 h-16 flex items-center justify-between'>
    <Link href='/'>   
    <Image src='/logo-single.png'
    alt="Medimeet Logo"
    width={200}
    height={60}
    className="h-10 w-auto object-contain"
    />
    </Link>

    <div className='absolute top-4 right-4 flex items-center space-x-2'>
          <SignedIn>
             {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                   Admin Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
            )}


         {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Stethoscope className="h-4 w-4" />
                    Doctor Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}
         {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  My Appointments
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {/* Admin Links */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>
          








    
        <SignedOut>
              <SignInButton>
                <Button variant="secondary">Sign In</Button>
               </SignInButton >
            </SignedOut>


            <SignedIn>
              <UserButton 
              appearance={{
                elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-x1",
                    userPreviewMainIdentifier: "font-semibold"
                },
              }}
              />
            </SignedIn>
    </div>
  </nav>
  </header>;
};

export default Header;
