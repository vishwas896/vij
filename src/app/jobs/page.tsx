
'use client';

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { searchJobs } from "./actions";

interface Job {
    id: string;
    title: string;
    company: { display_name: string };
    location: { display_name: string };
    description: string;
    redirect_url: string;
    contract_time?: string;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');

    const fetchJobs = (what = 'social impact', where = 'india') => {
        startTransition(async () => {
            const result = await searchJobs({ what, where });
            if (result.success) {
                setJobs(result.jobs);
            } else {
                toast({
                    title: "Error fetching jobs",
                    description: result.error,
                    variant: "destructive",
                });
            }
        });
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchJobs(searchQuery, locationQuery);
    };

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center mb-12 md:flex-row md:text-left">
                <div>
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Job Board</h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Find your next role in the social impact sector, powered by Adzuna.
                    </p>
                </div>
                 <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/jobs/post-a-job">Post a Job</Link>
                </Button>
            </div>

            <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-3 items-end">
                        <div className="md:col-span-1">
                            <label htmlFor="search-query" className="block text-sm font-medium text-muted-foreground mb-1">Keywords</label>
                            <Input
                                id="search-query"
                                placeholder="e.g. 'Program Manager' or 'Healthcare'"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                         <div className="md:col-span-1">
                             <label htmlFor="location-query" className="block text-sm font-medium text-muted-foreground mb-1">Location</label>
                            <Input
                                id="location-query"
                                placeholder="e.g. 'New Delhi' or 'Remote'"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
                            <Search className="mr-2 h-4 w-4" />
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {isPending ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            ) : jobs.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <Card key={job.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                                <div className="flex items-center gap-2 text-muted-foreground pt-2">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{job.company.display_name}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="line-clamp-4">{job.description}</p>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location.display_name}</span>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <Badge variant={job.contract_time === 'full_time' ? 'default' : 'secondary'} className={job.contract_time === 'full_time' ? 'bg-primary' : ''}>
                                        {job.contract_time === 'full_time' ? 'Full-time' : job.contract_time === 'part_time' ? 'Part-time' : 'Contract'}
                                    </Badge>
                                     <Button variant="outline" asChild>
                                        <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">View Job</a>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-semibold">No Jobs Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your search terms.</p>
                </div>
            )}
        </div>
    )
}
