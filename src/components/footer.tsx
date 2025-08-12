import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
                <div className="flex flex-col items-center md:items-start">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-xl font-bold text-primary font-headline">VIJ</span>
                    </Link>
                    <p className="mt-2 text-center text-sm text-muted-foreground md:text-left">
                        Building a community for social impact.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm font-medium sm:grid-cols-3 md:col-span-2">
                    <div className="grid gap-1">
                        <h3 className="font-semibold">Platform</h3>
                        <Link href="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
                        <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                        <Link href="/housing" className="hover:text-primary transition-colors">Housing</Link>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="font-semibold">Resources</h3>
                        <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
                        <Link href="/resume-builder" className="hover:text-primary transition-colors">AI Resume Builder</Link>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="font-semibold">Legal</h3>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
            <div className="border-t">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} VIJ. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                        <Link href="https://www.linkedin.com/company/vij-bp/" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                        <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
