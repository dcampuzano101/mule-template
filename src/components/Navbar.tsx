import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import Image from 'next/image';
import mulesoftLogo from '@/lib/images/mulesoft-logo.png';
import mulesoftLogoLight from '@/lib/images/mulesoft-light.png';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  // console.log(`Navbar session: ${session}`);
  return (
    <div className='bg-mulesoft flex w-full z-50'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <Image
            src={mulesoftLogo}
            alt='MuleSoft Logo'
            width={150}
            height={200}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </Link>
        {/* {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link className={buttonVariants()} href='/sign-in'>
            Sign In
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
