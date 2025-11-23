import Link from 'next/link';
import { Twitter, Instagram } from 'lucide-react';
import Logo from './logo';

const SnapchatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 4.1c-2.9 0-5.3 1.9-5.3 4.2 0 1.2.6 2.3 1.5 3.1-.3 1.2-.6 2.5-.6 2.5s2.3.9 3.8 0c.3 0 .6.1.9.1 2.9 0 5.3-1.9 5.3-4.2S14.9 4.1 12 4.1z" />
        <path d="M17.1 15.3c-.3 1.3-1.3 2.5-2.8 2.9-1.3.4-2.8.2-4.1-.6-.2-.1-.5-.2-.7-.2-.2 0-.4.1-.6.2-1.4.8-2.9.9-4.1.6-1.5-.4-2.5-1.6-2.8-2.9-.3-1.5.2-3.1 1.4-4.3 1.1-1.1 2.7-1.7 4.3-1.4.2 0 .4 0 .6-.1s.3-.2.4-.4c.7-1.1 2-1.7 3.4-1.7s2.7.6 3.4 1.7c.1.2.2.3.4.4s.4.1.6.1c1.6-.3 3.2.3 4.3 1.4 1.2 1.2 1.7 2.8 1.4 4.3z" />
    </svg>
);


export default function Footer() {
  const footerLinks = [
    { title: 'Shop', links: [{ href: '/category/mens-clothing', label: "Men's" }, { href: '/category/womens-clothing', label: "Women's" }, { href: '/category/accessories', label: 'Accessories' }] },
    { title: 'About', links: [{ href: '#', label: 'Our Story' }, { href: '#', label: 'Careers' }, { href: '#', label: 'Press' }] },
    { title: 'Support', links: [{ href: '#', label: 'Contact Us' }, { href: '#', label: 'FAQ' }, { href: '#', label: 'Shipping & Returns' }] },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">Elegance in every thread.</p>
          </div>
          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="font-headline font-semibold tracking-wider uppercase">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EZCENTIALS. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><SnapchatIcon className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
