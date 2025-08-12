import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, BotMessageSquare, Briefcase, HandHeart, HomeIcon, Lightbulb, TrendingUp, Users } from "lucide-react";
import Image from 'next/image';
import { UpiQrCode } from "@/components/upi-qr-code";
import Link from "next/link";

export default function Home() {
    const features = [
        {
            icon: <Briefcase className="h-10 w-10 text-primary" />,
            title: "AI-Powered Job Matching",
            description: "Our intelligent algorithms connect you to the most relevant jobs, filtering out the noise and saving you time.",
        },
        {
            icon: <Users className="h-10 w-10 text-primary" />,
            title: "Community & Networking",
            description: "Connect with like-minded professionals, share insights, and collaborate on projects that make a difference.",
        },
        {
            icon: <HomeIcon className="h-10 w-10 text-primary" />,
            title: "Curated Housing & Services",
            description: "Find safe and affordable housing and essential services, so you can focus on your mission.",
        },
        {
            icon: <BotMessageSquare className="h-10 w-10 text-primary" />,
            title: "Smart Resume Builder",
            description: "Craft the perfect resume with our AI-powered builder, tailored to highlight your strengths for social impact roles.",
        },
    ];

    const fundAllocation = [
        {
            icon: <BotMessageSquare className="h-8 w-8 text-accent" />,
            title: "AI Features",
            description: "Building and training our core matching algorithms."
        },
        {
            icon: <Lightbulb className="h-8 w-8 text-accent" />,
            title: "Platform Development",
            description: "Engineering the robust and scalable VIJ platform."
        },
        {
            icon: <TrendingUp className="h-8 w-8 text-accent" />,
            title: "Growth & Marketing",
            description: "Spreading the word to build our founding community."
        },

    ];

    const upiLink = "upi://pay?pa=vijl@ptyes&pn=VIJ%20Platform&cu=INR";

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 dark:from-teal-900/50 dark:via-cyan-900/50 dark:to-teal-900/70">
                <div className="container mx-auto px-4 py-20 text-center md:py-32 lg:py-40">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                            The Future of Social Impact Careers is Here.
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                            VIJ is your intelligent launchpad for jobs, services, and housing in the social impact sector. Join us in building a community that drives change.
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform hover:scale-105">
                                <Link href="/contribution">
                                    <HandHeart className="mr-2" /> Contribute Now
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm transition-transform hover:scale-105">
                                <a href="#features">
                                    Learn More <ArrowDown className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                         <p className="mt-8 text-sm font-semibold text-primary">
                            Expected Launch: Fall 2025
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
            </section>

            {/* What's Coming Section */}
            <section id="features" className="w-full py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
                        What&apos;s Coming to VIJ
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center mt-4">
                        We&apos;re building a centralized hub for everything you need to thrive in the world of social good.
                    </p>
                    <div className="mx-auto grid items-stretch gap-8 sm:max-w-4xl sm:grid-cols-2 lg:max-w-6xl lg:grid-cols-4 mt-12">
                        {features.map((feature) => (
                            <Card key={feature.title} className="flex flex-col text-center items-center justify-start p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-primary">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                                <p className="text-muted-foreground mt-2 flex-grow">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Support Us & Where Funds Go */}
            <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 grid gap-16 md:grid-cols-2 md:gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
                            Why Your Support Matters
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            VIJ is more than a platform; it&apos;s a community-driven movement. Your contribution directly fuels the development of tools that will empower thousands of changemakers across India. By supporting us now, you become a founding member of this ecosystem.
                        </p>
                        <h3 className="font-semibold text-lg font-headline">Where the Funds Go:</h3>
                        <div className="grid gap-6">
                            {fundAllocation.map((item) => (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-full">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Card className="w-full max-w-sm text-center shadow-2xl">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Contribute with UPI</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center gap-4">
                               <p className="text-muted-foreground">Scan the QR code with any UPI app to support VIJ.</p>
                                <div className="p-4 bg-white rounded-lg">
                                  <UpiQrCode upiLink={upiLink} />
                                </div>
                                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Link href="/contribution">
                                        <HandHeart className="mr-2" /> Pay via UPI
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
             {/* Social Proof */}
            <section className="w-full py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
                        Join Our Founding Community
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center mt-4">
                        Be among the first to shape the future of social impact work in India.
                    </p>
                    <div className="mt-12 text-center">
                         <div className="flex justify-center -space-x-4">
                            <Image className="rounded-full border-2 border-background" src="https://placehold.co/64x64.png?1" alt="Supporter 1" width={64} height={64} data-ai-hint="person photo" />
                            <Image className="rounded-full border-2 border-background" src="https://placehold.co/64x64.png?2" alt="Supporter 2" width={64} height={64} data-ai-hint="person photo" />
                            <Image className="rounded-full border-2 border-background" src="https://placehold.co/64x64.png?3" alt="Supporter 3" width={64} height={64} data-ai-hint="person photo" />
                            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold border-2 border-background">
                                500+
                            </div>
                        </div>
                        <p className="mt-6 font-semibold">Join 500+ early supporters who believe in our mission.</p>
                         <div className="mt-8 flex justify-center">
                             <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform hover:scale-105">
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdnCYDDFaOUXyINzyBX8Ob8R4C6LRdX09p-G0PIyO_8Wf1cFQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                                    Get Pre-Launch Updates
                                </a>
                            </Button>
                         </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
