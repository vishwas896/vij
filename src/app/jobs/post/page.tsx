"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostJobSchema, PostJobSchemaType, postJobAction } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PostJobPage() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<PostJobSchemaType>({
        resolver: zodResolver(PostJobSchema),
        defaultValues: {
            title: "",
            company: "",
            location: "",
            description: "",
            applicationUrl: "",
            companyEmail: "",
        },
    });

    function onSubmit(data: PostJobSchemaType) {
        startTransition(async () => {
            const result = await postJobAction(data);
            if (result.success) {
                toast({
                    title: "Job Submitted!",
                    description: "Your job post has been submitted and will be reviewed shortly.",
                });
                router.push("/jobs");
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Could not submit your job post.",
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Post a New Job</CardTitle>
                    <CardDescription>
                        Fill out the form below to share an opportunity with the VIJ community.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 'Senior Program Manager'" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 'Social Impact Foundation'" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 'Mumbai, India' or 'Remote'" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Describe the role, responsibilities, and qualifications." className="min-h-[150px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="applicationUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Application URL</FormLabel>
                                        <FormControl>
                                            <Input type="url" placeholder="https://example.com/apply" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="companyEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Company Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="you@company.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Verification</AlertTitle>
                                <AlertDescription>
                                    To maintain the quality of our job board, we require a company-affiliated email address for verification purposes. This will not be displayed on the job post.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Job...
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Submit Job Post
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
