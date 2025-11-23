'use client';

import Link from 'next/link';
import { Menu, Search, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import { categories } from '@/lib/data';
import CartIcon from '@/components/cart/cart-icon';
import Logo from './logo';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';

const mainNav = categories.map((category) => ({
  href: `/category/${category.slug}`,
  label: category.name,
}));

export default function Header() {
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout, isUserLoading } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query) {
      // In a real app, you'd navigate to a search results page
      console.log(`Searching for: ${query}`);
      setShowSearch(false);
    }
  };

  const AuthButton = () => {
    if (isUserLoading) {
      return <Skeleton className="h-8 w-8 rounded-full" />;
    }

    if (isAuthenticated && user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                <AvatarFallback>{user.displayName?.[0].toUpperCase() || user.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Button asChild variant="ghost" size={isMobile ? 'icon' : 'default'}>
        <Link href="/login">
          {isMobile ? <LogIn /> : 'Login'}
        </Link>
      </Button>
    );
  };

  const DesktopNav = () => (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle><Logo /></SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <nav className="grid gap-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-semibold transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <MobileNav />
        <div className="hidden md:flex">
         <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center md:justify-start">
           <div className="md:hidden">
            <Logo />
           </div>
          <div className="md:ml-6">
            <DesktopNav />
          </div>
        </div>
        <div className="flex items-center space-x-2">
            <div className="relative">
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)}>
                    <Search />
                    <span className="sr-only">Search</span>
                </Button>
                {showSearch && (
                    <div className="absolute top-full right-0 mt-2 w-64">
                         <form onSubmit={handleSearch} className="relative">
                            <Input name="search" placeholder="Search products..." className="w-full" />
                         </form>
                    </div>
                )}
            </div>
          <CartIcon />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
