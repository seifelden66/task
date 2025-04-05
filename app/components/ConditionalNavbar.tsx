'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return null;
  }
  return <Navbar />;
}
