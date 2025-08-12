import { HandHeart } from "lucide-react";

export default function ContributionPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="text-center mb-12">
                 <HandHeart className="mx-auto h-16 w-16 text-primary" />
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary mt-6">
                    Contributions
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    This page is under construction. Check back soon to see how you can contribute!
                </p>
            </div>
        </div>
    );
}
