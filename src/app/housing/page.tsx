import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, BedDouble, Bath } from "lucide-react";
import Image from "next/image";

const mockHousing = [
    {
        title: "Co-living Space for Changemakers",
        location: "Brooklyn, NY",
        price: "$1,200/month",
        type: "Shared Room",
        details: "2 Bed, 2 Bath",
        imageUrl: "https://placehold.co/600x400.png?1",
        aiHint: "modern apartment"
    },
    {
        title: "Quiet Studio Near Downtown",
        location: "Portland, OR",
        price: "$950/month",
        type: "Studio",
        details: "1 Bed, 1 Bath",
        imageUrl: "https://placehold.co/600x400.png?2",
        aiHint: "cozy studio"
    },
    {
        title: "Affordable Room in Group House",
        location: "Oakland, CA",
        price: "$800/month",
        type: "Private Room",
        details: "4 Bed, 2 Bath",
        imageUrl: "https://placehold.co/600x400.png?3",
        aiHint: "suburban house"
    },
    {
        title: "Subsidized Artist Lofts",
        location: "Detroit, MI",
        price: "Income-based",
        type: "Loft",
        details: "1 Bed, 1 Bath",
        imageUrl: "https://placehold.co/600x400.png?4",
        aiHint: "industrial loft"
    },
     {
        title: "Family-friendly Community Housing",
        location: "Atlanta, GA",
        price: "$1,500/month",
        type: "Apartment",
        details: "3 Bed, 2 Bath",
        imageUrl: "https://placehold.co/600x400.png?5",
        aiHint: "apartment complex"
    },
    {
        title: "Eco-Village Tiny Home",
        location: "Asheville, NC",
        price: "$700/month",
        type: "Tiny Home",
        details: "1 Bed, 1 Bath",
        imageUrl: "https://placehold.co/600x400.png?6",
        aiHint: "tiny house"
    },
];

export default function HousingPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Housing Opportunities</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A preview of housing options tailored for those in the social impact sector.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockHousing.map((item, index) => (
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
                             <Badge variant="secondary" className="mb-2">{item.type}</Badge>
                            <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground mt-2">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                            </div>
                            <div className="flex items-center gap-4 text-muted-foreground mt-2 text-sm">
                                <span className="flex items-center gap-1"><BedDouble className="h-4 w-4"/> {item.details.split(',')[0]}</span>
                                <span className="flex items-center gap-1"><Bath className="h-4 w-4"/> {item.details.split(',')[1]}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center p-6 bg-gray-50">
                            <p className="text-lg font-semibold text-primary">{item.price}</p>
                            <Button>View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
