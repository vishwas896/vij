"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { postJobAction } from "@/app/jobs/actions";


const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  type: z.enum(["Full-time", "Part-time", "Contract", "Volunteer"]),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  companyEmail: z.string().email({
    message: "Please enter a valid company email address.",
  }),
});


export function PostJobForm() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            company: "",
            location: "",
            description: "",
            companyEmail: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const result = await postJobAction(values);
            if (result.success) {
                toast({
                    title: "Job Posted!",
                    description: "Your job has been submitted for verification.",
                });
                form.reset();
            } else {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Job Details</CardTitle>
                <CardDescription>
                    Please provide the details for the job you want to post. All jobs will be verified.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Nonprofit Program Manager" {...field} />
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
                                        <Input placeholder="e.g. Green Future Initiative" {...field} />
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
                                        <Input placeholder="e.g. San Francisco, CA or Remote" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a job type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Full-time">Full-time</SelectItem>
                                            <SelectItem value="Part-time">Part-time</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                            <SelectItem value="Volunteer">Volunteer</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                        <Textarea placeholder="Describe the job responsibilities, qualifications, etc." className="resize-none" {...field} />
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
                                    <FormLabel>Company Email for Verification</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. hr@greenfuture.org" {...field} />
                                    </FormControl>
                                     <FormDescription>
                                        We'll send a verification link to this email. The email will not be displayed publicly.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                         <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit for Verification"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}