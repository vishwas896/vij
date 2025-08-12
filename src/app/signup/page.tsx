import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 md:px-6">
            <div className="mx-auto w-full max-w-md space-y-8 text-center">
                 <div>
                    <UserPlus className="mx-auto h-12 w-12 text-primary" />
                    <h1 className="mt-6 text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-primary">
                        Join Our Pre-Launch Community
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                       Be the first to know when VIJ launches. Sign up below to get exclusive updates, early access, and become a founding member of our community.
                    </p>
                </div>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdnCYDDFaOUXyINzyBX8Ob8R4C6LRdX09p-G0PIyO_8Wf1cFQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                        Sign Up for Updates
                    </a>
                </Button>
                 <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
