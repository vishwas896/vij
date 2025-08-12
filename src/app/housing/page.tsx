import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, BedDouble, Bath, Utensils, Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const mockListings = [
    {
        title: "Co-living Space for Changemakers",
        location: "Brooklyn, NY",
        price: "$1,200/month",
        category: "Shared Room",
        details: "2 Bed, 2 Bath",
        imageUrl: "https://placehold.co/600x400.png?1",
        aiHint: "modern apartment",
        icon: <BedDouble className="h-4 w-4"/>
    },
    {
        title: "Healthy Tiffin Service",
        location: "Oakland, CA",
        price: "$15/meal",
        category: "Tiffin Service",
        details: "Daily Lunch & Dinner",
        imageUrl: "https://placehold.co/600x400.png?7",
        aiHint: "meal prep containers",
        icon: <Utensils className="h-4 w-4"/>
    },
    {
        title: "Quiet Studio Near Downtown",
        location: "Portland, OR",
        price: "$950/month",
        category: "Studio",
        details: "1 Bed, 1 Bath",
        imageUrl: "https://placehold.co/600x400.png?2",
        aiHint: "cozy studio",
        icon: <Home className="h-4 w-4"/>
    },
     {
        title: "Weekly Lunch Box Subscription",
        location: "Remote",
        price: "$75/week",
        category: "Lunch Box",
        details: "5 meals/week",
        imageUrl: "https://placehold.co/600x400.png?8",
        aiHint: "healthy lunchbox",
        icon: <Box className="h-4 w-4"/>
    },
    {
        title: "Affordable Room in Group House",
        location: "Oakland, CA",
        price: "$800/month",
        category: "Private Room",
        details: "4 Bed, 2 Bath",
        imageUrl: "https://placehold.co/600x400.png?3",
        aiHint: "suburban house",
        icon: <BedDouble className="h-4 w-4"/>
    },
    {
        title: "Event Catering for Nonprofits",
        location: "Atlanta, GA",
        price: "Varies",
        category: "Catering",
        details: "Up to 100 guests",
        imageUrl: "https://placehold.co/600x400.png?9",
        aiHint: "catering buffet",
        icon: <Utensils className="h-4 w-4"/>
    },
];

export default function HousingPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center mb-12 md:flex-row md:text-left">
                 <div>
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Housing & Services</h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Find housing and essential services tailored for the social impact community.
                    </p>
                </div>
                 <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/housing/add">Add a Listing</Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label className="font-semibold">Category</Label>
                                <div className="space-y-2 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="room" />
                                        <Label htmlFor="room">Room</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="pg" />
                                        <Label htmlFor="pg">PG</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="catering" />
                                        <Label htmlFor="catering">Catering</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="lunch-box" />
                                        <Label htmlFor="lunch-box">Lunch Box</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="tiffin-service" />
                                        <Label htmlFor="tiffin-service">Tiffin Service</Label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="location" className="font-semibold">Location</Label>
                                <Input id="location" placeholder="e.g., Brooklyn, NY" className="mt-2" />
                            </div>
                            <Button className="w-full">Apply Filters</Button>
                        </CardContent>
                    </Card>
                </aside>
                <main className="md:col-span-3">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mockListings.map((item, index) => (
                            <Card key={index} className="flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                 <CardHeader className="p-0">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={600}
                                        height={400}
                                        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        data-ai-hint={item.aiHint}
                                    />
                                </CardHeader>
                                <CardContent className="p-6 flex-grow">
                                     <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                                    <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground mt-2 text-sm">
                                        {item.icon}
                                        <span>{item.details}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center p-6 bg-gray-50">
                                    <p className="text-lg font-semibold text-primary">{item.price}</p>
                                     <Button asChild>
                                        <a href={`https://www.google.com/search?q=${encodeURIComponent(item.title + ' in ' + item.location)}`} target="_blank" rel="noopener noreferrer">View Details</a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}
