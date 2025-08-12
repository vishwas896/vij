
"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, Mail, Lock, UserPlus, Phone, MessageCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { auth, googleProvider } from "@/lib/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    // RecaptchaVerifier, // Removed
    // signInWithPhoneNumber, // Removed
    // ConfirmationResult // Removed
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters."),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type LoginSchema = z.infer<typeof loginSchema>;
type SignupSchema = z.infer<typeof signupSchema>;


export function AuthForm({ isSignup = false }: { isSignup?: boolean }) {
    const [isPending, startTransition] = useTransition();
    const [isPhoneAuth, setIsPhoneAuth] = useState(false);
    // const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null); // Removed
    // const [otp, setOtp] = useState(""); // Removed
    // const [phoneNumber, setPhoneNumber] = useState(""); // Removed
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<LoginSchema | SignupSchema>({
        resolver: zodResolver(isSignup ? signupSchema : loginSchema),
        defaultValues: {
            email: "",
            password: "",
            ...(isSignup && { confirmPassword: "" }),
        },
    });

    // Removed useEffect for RecaptchaVerifier

    const handleGoogleSignIn = async () => {
        startTransition(async () => {
            try {
                await signInWithPopup(auth, googleProvider);
                 toast({
                    title: "Signed In!",
                    description: "You have successfully signed in with Google.",
                });
                router.push("/profile");
            } catch (error: any) {
                 toast({
                    title: "Authentication Error",
                    description: error.message,
                    variant: "destructive",
                });
            }
        })
    }
    
    // Removed handlePhoneSignIn and handleOtpVerify

    function onEmailSubmit(values: LoginSchema | SignupSchema) {
        startTransition(async () => {
           try {
                if (isSignup) {
                    const { email, password } = values as SignupSchema;
                    await createUserWithEmailAndPassword(auth, email, password);
                    toast({
                        title: "Account Created!",
                        description: "You have successfully created an account.",
                    });
                     router.push("/profile");
                } else {
                    const { email, password } = values as LoginSchema;
                    await signInWithEmailAndPassword(auth, email, password);
                     toast({
                        title: "Signed In!",
                        description: "You have successfully signed in.",
                    });
                    router.push("/profile");
                }
           } catch (error: any) {
                toast({
                    title: "Authentication Error",
                    description: error.message,
                    variant: "destructive",
                });
           }
        });
    }

    const GoogleIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
        </svg>
    );

    return (
        <Card className="shadow-lg">
             <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                    <Button variant="outline" onClick={handleGoogleSignIn} disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                        Continue with Google
                    </Button>
                    <div id="recaptcha-container"></div>
                </div>

                <div className="my-4 flex items-center">
                    <Separator className="flex-1" />
                    <span className="mx-4 text-xs text-muted-foreground">OR</span>
                    <Separator className="flex-1" />
                </div>
                 
                 {isPhoneAuth ? (
                    <div className="space-y-4">
                        <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-800">Phone sign-in is temporarily disabled.</p>
                        </div>
                        <Button variant="link" size="sm" onClick={() => setIsPhoneAuth(false)}>Use Email/Password instead</Button>
                    </div>
                 ) : (
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onEmailSubmit)} className="space-y-4">
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4" />Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="e.g. you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                         <FormLabel className="flex items-center"><Lock className="mr-2 h-4 w-4" />Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             {isSignup && 'confirmPassword' in form.getValues() && (
                                 <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                             <FormLabel className="flex items-center"><Lock className="mr-2 h-4 w-4" />Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                             <Button type="submit" disabled={isPending} className="w-full">
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {isSignup ? "Creating Account..." : "Signing In..."}
                                    </>
                                ) : (
                                    <>
                                     {isSignup ? <UserPlus className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
                                     {isSignup ? "Create Account" : "Sign In"}
                                    </>
                                )}
                            </Button>
                            <Button variant="link" size="sm" onClick={() => setIsPhoneAuth(true)}>Use Phone instead</Button>
                        </form>
                    </Form>
                 )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                 <div className="text-sm text-muted-foreground">
                    {isSignup ? (
                        <>
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Sign In
                            </Link>
                        </>
                    ) : (
                        <>
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
