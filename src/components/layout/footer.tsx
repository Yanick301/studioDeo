import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import Logo from './logo';

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
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
