import { ResumeBuilderForm } from "@/components/resume-builder-form";
import { BotMessageSquare } from "lucide-react";

export default function ResumeBuilderPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
            <div className="text-center mb-12">
                <BotMessageSquare className="mx-auto h-16 w-16 text-primary" />
                <h1 className="mt-6 text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
                    AI Resume Builder Demo
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Craft a compelling resume for the social impact sector. Select an example prompt below to see how our AI can tailor your experience, incorporating best practices for roles that make a difference.
                </p>
            </div>
            <ResumeBuilderForm />
        </div>
    );
}
