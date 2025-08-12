import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin } from "lucide-react";

const mockJobs = [
    {
        title: "Nonprofit Program Manager",
        company: "Green Future Initiative",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Manage and expand our environmental conservation programs. Requires 5+ years of experience."
    },
    {
        title: "Community Outreach Coordinator",
        company: "Unity Health Clinic",
        location: "Chicago, IL",
        type: "Part-time",
        description: "Engage with local communities to promote health and wellness services."
    },
    {
        title: "Social Worker (LCSW)",
        company: "Hope for Families",
        location: "New York, NY",
        type: "Full-time",
        description: "Provide counseling and support services to children and families in need."
    },
    {
        title: "Grant Writer",
        company: "Arts & Culture Foundation",
        location: "Remote",
        type: "Contract",
        description: "Seeking an experienced grant writer to secure funding for our various arts programs."
    },
    {
        title: "Youth Mentor",
        company: "Big Brothers Big Sisters",
        location: "Boston, MA",
        type: "Volunteer",
        description: "Become a positive role model and mentor for a young person in your community."
    },
    {
        title: "Advocacy Director",
        company: "Human Rights Watch",
        location: "Washington D.C.",
        type: "Full-time",
        description: "Lead advocacy efforts to influence policy on human rights issues."
    }
];

export default function JobsPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center mb-12 md:flex-row md:text-left">
                <div>
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Job Board</h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Find your next role in the social impact sector. This is a preview of our job listings.
                    </p>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Post a Job</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockJobs.map((job, index) => (
                    <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground pt-2">
                                <Briefcase className="h-4 w-4" />
                                <span>{job.company}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p>{job.description}</p>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'} className={job.type === 'Full-time' ? 'bg-primary' : ''}>{job.type}</Badge>
                                <Button variant="outline">View Job</Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
