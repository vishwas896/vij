import { Button } from "@/components/ui/button";
import { BotMessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ResumeBuilderPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
            <div className="text-center mb-12">
                <BotMessageSquare className="mx-auto h-16 w-16 text-primary" />
                <h1 className="mt-6 text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
                    AI Resume Builder
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    We recommend using Open Resume, a powerful, free, and open-source resume builder and parser.
                </p>
                <div className="mt-8">
                     <Button asChild size="lg">
                        <a href="https://open-resume.com/" target="_blank" rel="noopener noreferrer">
                           Go to Open Resume <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
