"use client";

import { useState, useTransition } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { generateResumeAction } from "@/app/resume-builder/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const examplePrompts = [
    {
        id: "social-worker",
        label: "Recent Social Work Graduate",
        prompt: "I'm a recent graduate with a degree in social work, looking for an entry-level position. I have internship experience at a local community center where I assisted with case management and client intake.",
    },
    {
        id: "nonprofit-manager",
        label: "Experienced Nonprofit Manager",
        prompt: "Experienced nonprofit program manager with 10+ years of experience in fundraising and grant writing, seeking a leadership role in an environmental organization. I have a proven track record of securing six-figure grants.",
    },
    {
        id: "career-changer",
        label: "Career Changer (Corporate to NGO)",
        prompt: "I am transitioning from a corporate marketing role to the social impact sector. I want to highlight my transferable skills in project management, digital campaigns, and stakeholder communication for a role at a human rights NGO.",
    },
];

export function ResumeBuilderForm() {
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [generatedResume, setGeneratedResume] = useState("");
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSubmit = () => {
        if (!selectedPrompt) {
            toast({
                title: "No Prompt Selected",
                description: "Please choose an example prompt before generating.",
                variant: "destructive",
            });
            return;
        }

        startTransition(async () => {
            setGeneratedResume("");
            const result = await generateResumeAction({ examplePrompt: selectedPrompt });
            if (result.success) {
                setGeneratedResume(result.data!);
            } else {
                toast({
                    title: "Error Generating Resume",
                    description: result.error,
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <div className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Select a Prompt</CardTitle>
                    <CardDescription>
                        Choose a scenario to see a demonstration of the AI resume builder.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={setSelectedPrompt} value={selectedPrompt}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an example prompt..." />
                        </SelectTrigger>
                        <SelectContent>
                            {examplePrompts.map((p) => (
                                <SelectItem key={p.id} value={p.prompt}>
                                    {p.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit} disabled={isPending || !selectedPrompt}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            "Generate Resume"
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {(isPending || generatedResume) && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Generated Resume</CardTitle>
                        <CardDescription>
                            Here is the AI-generated resume based on your selected prompt.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isPending ? (
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-6 w-1/3 mt-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        ) : (
                            <pre className="whitespace-pre-wrap font-body text-sm bg-gray-50 p-4 rounded-md">
                                {generatedResume}
                            </pre>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
