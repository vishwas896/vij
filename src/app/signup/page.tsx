import { AuthForm } from "@/components/auth-form";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 md:px-6">
            <div className="mx-auto w-full max-w-md space-y-8">
                 <div className="text-center">
                    <UserPlus className="mx-auto h-12 w-12 text-primary" />
                    <h1 className="mt-6 text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-primary">
                        Create an Account
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                       Join the VIJ community to get started.
                    </p>
                </div>
                <AuthForm isSignup />
            </div>
        </div>
    );
}
