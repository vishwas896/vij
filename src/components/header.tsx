
"use client";

import Link from "next/link";
import { Menu, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const navLinks = [
    { href: "/explore", label: "Explore", isButton: true },
    { href: "/jobs", label: "Job Board", isButton: true },
    { href: "/services", label: "Services", isButton: true },
    { href: "/housing", label: "Housing" },
    { href: "/resume-builder", label: "AI Resume Builder" },
    { href: "/contribution", label: "Contribution", isButton: true },
];

export function Header() {
    const pathname = usePathname();
    const { user } = useAuth();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast({
                title: "Signed Out",
                description: "You have been successfully signed out.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to sign out. Please try again.",
                variant: "destructive",
            });
        }
    };
    
    const getInitials = (email?: string | null) => {
        return email ? email.charAt(0).toUpperCase() : '?';
    }


    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
            <Link href="/" className="flex items-center gap-2">
                <Logo />
                <span className="text-xl font-bold text-primary font-headline">VIJ</span>
            </Link>
            <nav className="hidden items-center gap-4 text-sm font-medium lg:flex">
                {navLinks.map(link => (
                    link.isButton ? (
                        <Button key={link.href} asChild variant={pathname === link.href ? "default" : "outline"} size="sm">
                             <Link
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        </Button>
                    ) : (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "transition-colors hover:text-primary",
                            pathname === link.href ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        {link.label}
                    </Link>
                    )
                ))}
            </nav>
            <div className="flex items-center gap-2">
                 <Button asChild className="hidden lg:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdnCYDDFaOUXyINzyBX8Ob8R4C6LRdX09p-G0PIyO_8Wf1cFQ/viewform" target="_blank" rel="noopener noreferrer">
                        Pre-launch Sign-up
                    </a>
                </Button>
                {user ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                                </p>
                            </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                               <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                 <Button asChild variant="ghost">
                    <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                    </Link>
                 </Button>
                )}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="grid gap-4 py-6">
                             <Link href="/" className="flex items-center gap-2 mb-4">
                                <Logo />
                                <span className="text-xl font-bold text-primary font-headline">VIJ</span>
                            </Link>
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex w-full items-center py-2 text-lg font-medium hover:text-primary",
                                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdnCYDDFaOUXyINzyBX8Ob8R4C6LRdX09p-G0PIyO_8Wf1cFQ/viewform" target="_blank" rel="noopener noreferrer">
                                    Pre-launch Sign-up
                                </a>
                            </Button>
                             {user ? (
                                <>
                                 <Button asChild className="mt-2" variant="outline">
                                    <Link href="/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </Button>
                                <Button className="mt-2" variant="outline" onClick={handleSignOut}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                                </>
                             ) : (
                                <Button asChild className="mt-2" variant="outline">
                                    <Link href="/login">
                                    <LogIn className="mr-2 h-4 w-4" />
                                        Login / Sign Up
                                    </Link>
                                </Button>
                             )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
