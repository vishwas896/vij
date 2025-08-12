"use client";

import { useState, useTransition } from "react";
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
import { Loader2, LogIn, Mail, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import Link from "next/link";


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
    const { toast } = useToast();

    const form = useForm<LoginSchema | SignupSchema>({
        resolver: zodResolver(isSignup ? signupSchema : loginSchema),
        defaultValues: {
            email: "",
            password: "",
            ...(isSignup && { confirmPassword: "" }),
        },
    });

    function onSubmit(values: LoginSchema | SignupSchema) {
        startTransition(async () => {
            // Placeholder for authentication logic
            toast({
                title: "Authentication action needed",
                description: "Connect to a backend service like Firebase Auth.",
            });
            console.log(values);
        });
    }

    return (
        <Card className="shadow-lg">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                     <CardContent className="space-y-6 pt-6">
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
                         {isSignup && (
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
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {isSignup ? "Creating Account..." : "Signing In..."}
                                </>
                            ) : (
                                <>
                                 <LogIn className="mr-2 h-4 w-4" />
                                 {isSignup ? "Create Account" : "Sign In"}
                                </>
                            )}
                        </Button>

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
                </form>
            </Form>
        </Card>
    );
}
