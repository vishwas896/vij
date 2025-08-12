
import { HandHeart, Heart, CreditCard, User, Mail, MessageSquare, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContributionPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
            <div className="text-center mb-12">
                 <HandHeart className="mx-auto h-16 w-16 text-primary" />
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary mt-6">
                    Support Our Mission
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Your contribution helps us build and maintain this platform for the social impact community.
                </p>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Make a Contribution</CardTitle>
                    <CardDescription>
                        Choose an amount or enter a custom one below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <Label className="font-semibold">Select Amount</Label>
                        <RadioGroup defaultValue="25" className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {['10', '25', '50', '100'].map(amount => (
                                <div key={amount}>
                                    <RadioGroupItem value={amount} id={`amount-${amount}`} className="sr-only" />
                                    <Label
                                        htmlFor={`amount-${amount}`}
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                    >
                                        <Heart className="mb-3 h-6 w-6" />
                                        ${amount}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="custom-amount" className="font-semibold">Or Enter a Custom Amount</Label>
                        <Input id="custom-amount" type="number" placeholder="$ e.g. 30" />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name"><User className="inline-block mr-2 h-4 w-4" />Full Name</Label>
                            <Input id="name" placeholder="e.g. Jane Doe" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email"><Mail className="inline-block mr-2 h-4 w-4" />Email Address</Label>
                            <Input id="email" type="email" placeholder="e.g. jane.doe@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                         <Label htmlFor="message"><MessageSquare className="inline-block mr-2 h-4 w-4" />Leave a message (optional)</Label>
                         <Textarea id="message" placeholder="Your words of encouragement..." />
                    </div>

                    <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Demonstration Only</AlertTitle>
                        <AlertDescription>
                            This is a demo payment form. Please do not enter real credit card information. No payment will be processed.
                        </AlertDescription>
                    </Alert>

                     <div className="space-y-4">
                        <Label className="font-semibold"><CreditCard className="inline-block mr-2 h-4 w-4" />Payment Information</Label>
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiry-date">Expiry Date</Label>
                                <Input id="expiry-date" placeholder="MM / YY" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="XXX" />
                            </div>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg">
                        <Heart className="mr-2 h-5 w-5" />
                        Contribute Now
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
