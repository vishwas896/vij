import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartHandshake, MapPin, Calendar } from "lucide-react";

const mockServices = [
    {
        title: "Community Garden Volunteer",
        organization: "Urban Growers Collective",
        location: "Austin, TX",
        commitment: "Weekends",
        description: "Help plant, maintain, and harvest fresh produce for local food banks and community members."
    },
    {
        title: "Animal Shelter Assistant",
        organization: "Paws & Claws Rescue",
        location: "Denver, CO",
        commitment: "Flexible",
        description: "Assist with daily care of animals, including feeding, cleaning, and socialization."
    },
    {
        title: "Tutor for Underserved Youth",
        organization: "Literacy for All",
        location: "Remote",
        commitment: "2-4 hours/week",
        description: "Provide one-on-one virtual tutoring in math or reading for elementary school students."
    },
    {
        title: "Soup Kitchen Server",
        organization: "The Community Table",
        location: "Seattle, WA",
        commitment: "Evenings",
        description: "Help prepare and serve warm meals to individuals and families experiencing homelessness."
    },
    {
        title: "National Park Cleanup Crew",
        organization: "Park Protectors",
        location: "Various National Parks",
        commitment: "Event-based",
        description: "Join us for weekend events to help remove litter and restore natural habitats in our parks."
    },
    {
        title: "Elderly Companion",
        organization: "Senior Support Services",
        location: "Miami, FL",
        commitment: "Flexible",
        description: "Provide companionship and assistance with daily tasks for isolated senior citizens."
    }
];

export default function ServicesPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Service Opportunities</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Give back to your community. This is a preview of available volunteer opportunities.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockServices.map((service, index) => (
                    <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground pt-2">
                                <HeartHandshake className="h-4 w-4" />
                                <span>{service.organization}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p>{service.description}</p>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-4">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{service.location}</span>
                                </div>
                                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{service.commitment}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <Badge variant="outline">Volunteer</Badge>
                                <Button>Learn More</Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
