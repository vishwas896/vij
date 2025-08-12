import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, HeartHandshake, Home as HomeIcon, BotMessageSquare, HandHeart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Jobs",
      description: "Discover meaningful career opportunities in the social impact sector. Connect with organizations that are making a difference.",
      link: "/jobs"
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-primary" />,
      title: "Services",
      description: "Find volunteer opportunities and offer your skills to support causes you care about. Make a tangible impact in your community.",
      link: "/services"
    },
    {
      icon: <HomeIcon className="h-10 w-10 text-primary" />,
      title: "Housing",
      description: "Access a curated list of housing options, connecting you with safe and affordable places to live while you focus on your mission.",
      link: "/housing"
    },
    {
      icon: <BotMessageSquare className="h-10 w-10 text-primary" />,
      title: "AI Resume Builder",
      description: "Craft the perfect resume with our AI-powered builder, tailored to highlight your strengths for social impact roles.",
      link: "/resume-builder"
    },
  ];

  const secondaryFeatures = [
      {
          icon: <HandHeart className="h-10 w-10 text-primary" />,
          title: "Contribute",
          description: "Support our mission and help us grow. Your contribution makes a direct impact on our ability to serve the community.",
          link: "/contribution"
      }
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gray-50 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              Building a Community for Social Impact
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              VIJ is in development. Our platform will connect you with jobs, services, and housing to support your journey in making a difference.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Expected Launch: Fall 2025
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 group">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdnCYDDFaOUXyINzyBX8Ob8R4C6LRdX09p-G0PIyO_8Wf1cFQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                  Join Pre-launch Signup
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            What is VIJ?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center mt-4">
            A centralized hub for everything you need to thrive in the world of social good.
          </p>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4 mt-12">
            {features.map((feature, index) => (
              <Link href={feature.link} key={index} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4 text-2xl font-bold font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
           <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4 mt-12 justify-center">
            {secondaryFeatures.map((feature, index) => (
              <Link href={feature.link} key={index} className="group lg:col-start-2 lg:col-span-2">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4 text-2xl font-bold font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
