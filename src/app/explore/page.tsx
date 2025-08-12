import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import Image from "next/image";

export default function ExplorePage() {
    const placeholderItems = Array(9).fill(0);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Explore Opportunities</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Search for companies, jobs, and services worldwide using real-time data and advanced filters.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <aside className="md:col-span-1">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 font-headline">Filters</h3>
                            <div className="space-y-6">
                                <div>
                                    <Label className="font-semibold">Category</Label>
                                    <div className="space-y-2 mt-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="companies" />
                                            <Label htmlFor="companies">Companies</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="jobs" />
                                            <Label htmlFor="jobs">Jobs</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="services" />
                                            <Label htmlFor="services">Services</Label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="location" className="font-semibold">Location</Label>
                                    <Input id="location" placeholder="e.g., Worldwide, New York" className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="sort" className="font-semibold">Sort By</Label>
                                    <Select>
                                        <SelectTrigger id="sort" className="w-full mt-2">
                                            <SelectValue placeholder="Relevance" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="relevance">Relevance</SelectItem>
                                            <SelectItem value="newest">Newest</SelectItem>
                                            <SelectItem value="popular">Most Popular</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
                <main className="md:col-span-3">
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search companies, jobs, services..." className="pl-10 text-base" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {placeholderItems.map((_, index) => (
                            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src={`https://placehold.co/600x400.png`}
                                    alt="Placeholder"
                                    width={600}
                                    height={400}
                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint="organization building"
                                />
                                <CardContent className="p-4">
                                    <h4 className="font-semibold text-lg font-headline">Opportunity {index + 1}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Brief description of the company, job, or service goes here.</p>
                                    <Button variant="link" className="p-0 mt-2 h-auto text-primary">Learn More &rarr;</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}
