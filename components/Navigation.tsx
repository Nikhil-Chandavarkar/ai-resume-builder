'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/builder', label: 'Builder' },
    { href: '/preview', label: 'Preview' },
    { href: '/proof', label: 'Proof' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="border-b border-[#999999] bg-white">
      <div className="max-w-7xl mx-auto px-16 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-[#2C2C2C] hover:text-[#8B0000] transition-colors" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
          AI Resume Builder
        </Link>
        <div className="flex gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-[#8B0000] border-b-2 border-[#8B0000] pb-2'
                  : 'text-[#2C2C2C] hover:text-[#8B0000]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
