
'use client';

import {useState, useEffect} from 'react';
import {
  Heart,
  CreditCard,
  User,
  Mail,
  MessageSquare,
  Info,
  Loader2,
  Server,
  BrainCircuit,
  Users,
  Twitter,
  Linkedin,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Textarea} from '@/components/ui/textarea';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {useToast} from '@/hooks/use-toast';
import {createOrder} from './actions';
import { Progress } from "@/components/ui/progress"

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ContributionPage() {
  const [amount, setAmount] = useState('199');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [progress, setProgress] = useState(12300);
  const {toast} = useToast();

  const finalAmount = customAmount ? parseFloat(customAmount) : parseInt(amount);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleScrollToPayment = () => {
    document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleContribute = async () => {
    if (!finalAmount || finalAmount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please select or enter a valid amount.',
        variant: 'destructive',
      });
      return;
    }
    if (!name || !email) {
      toast({
        title: 'Missing Information',
        description: 'Please enter your name and email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsPending(true);
    const result = await createOrder({amount: finalAmount});
    setIsPending(false);

    if (!result.success || !result.order) {
      toast({
        title: 'Error',
        description: result.error || 'Could not initiate payment.',
        variant: 'destructive',
      });
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: result.order.amount,
      currency: result.order.currency,
      name: 'VIJ Community',
      description: 'Contribution to support our mission',
      order_id: result.order.id,
      handler: function (response: any) {
        toast({
          title: 'Payment Successful!',
          description: `Thank you for your contribution. Your name will be added to our Founders Wall. Payment ID: ${response.razorpay_payment_id}`,
        });
        setProgress(p => p + finalAmount);
      },
      prefill: {
        name: name,
        email: email,
      },
      notes: {
        message: message,
      },
      theme: {
        color: '#008080', // Corresponds to your primary color
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      toast({
        title: 'Payment Failed',
        description: response.error.description,
        variant: 'destructive',
      });
    });
    rzp.open();
  };
  const goal = 1000000;
  const progressPercentage = (progress / goal) * 100;

  return (
    <div className="flex flex-col">
       {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-teal-50 to-cyan-50 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
             <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              Building India&apos;s Most Intelligent Job Network – With Your Support
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              We’re creating VIJ – a social job portal where talent meets opportunity, powered by AI. Be part of the story from day one.
            </p>
             <div className="mt-8 flex justify-center">
              <Button onClick={handleScrollToPayment} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 group">
                💛 Support the Vision
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12 text-center">
            <div className="space-y-2">
                <h3 className="text-xl font-bold font-headline">The Problem</h3>
                <p className="text-muted-foreground">Jobs today are broken — wrong matches, endless spam, and lost opportunities.</p>
            </div>
             <div className="space-y-2">
                <h3 className="text-xl font-bold font-headline">The Solution</h3>
                <p className="text-muted-foreground">VIJ will connect people to the right opportunities using AI + human networks.</p>
            </div>
             <div className="space-y-2">
                <h3 className="text-xl font-bold font-headline">Your Impact</h3>
                <p className="text-muted-foreground">Your contribution funds our servers, AI tools, and launch events.</p>
            </div>
          </div>
        </div>
      </section>

       {/* Where Your Money Goes Section */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                 <h2 className="text-3xl font-headline font-bold tracking-tighter text-center sm:text-4xl">
                    Where Your Money Goes
                </h2>
                <p className="mx-auto max-w-xl text-muted-foreground text-center mt-4">
                    We believe in transparency. Every rupee you contribute goes directly into building and launching the VIJ platform.
                </p>
                <div className="grid gap-8 md:grid-cols-3 text-center max-w-4xl mx-auto mt-12">
                     <div className="flex flex-col items-center space-y-3">
                        <div className="p-4 bg-primary/10 rounded-full">
                           <Server className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold text-lg">Hosting & Development</h4>
                        <p className="text-sm text-muted-foreground">Keeping our servers running and our code clean and efficient.</p>
                    </div>
                     <div className="flex flex-col items-center space-y-3">
                        <div className="p-4 bg-primary/10 rounded-full">
                           <BrainCircuit className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold text-lg">AI Research</h4>
                        <p className="text-sm text-muted-foreground">Developing the intelligent matching algorithms that power VIJ.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <div className="p-4 bg-primary/10 rounded-full">
                           <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold text-lg">Community Building</h4>
                        <p className="text-sm text-muted-foreground">Growing our early access community and gathering feedback.</p>
                    </div>
                </div>
            </div>
        </section>


      {/* Payment Section */}
      <section id="payment-section" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-primary">
              Be Part of Our Journey
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Every ₹99 moves us closer to launch. Be part of India’s next big career platform.
            </p>
          </div>

           <Card className="max-w-md mx-auto mb-8">
              <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm font-medium text-primary">Raised: ₹{progress.toLocaleString()}</span>
                     <span className="text-sm font-medium text-muted-foreground">Goal: ₹{goal.toLocaleString()}</span>
                  </div>
                  <Progress value={progressPercentage} className="w-full" />
                  <p className="text-xs text-center mt-2 text-muted-foreground">Your name will be featured on our Founders Wall!</p>
              </CardContent>
          </Card>


          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Make a Contribution</CardTitle>
              <CardDescription>
                Choose an amount or enter a custom one below. All payments are
                processed securely by Razorpay.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="font-semibold">Select Amount (INR)</Label>
                <RadioGroup
                  value={amount}
                  onValueChange={(value) => {
                    setAmount(value);
                    setCustomAmount('');
                  }}
                  className="grid grid-cols-2 gap-4 md:grid-cols-4"
                >
                  {['99', '199', '499'].map((val) => (
                    <div key={val}>
                      <RadioGroupItem
                        value={val}
                        id={`amount-${val}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`amount-${val}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Heart className="mb-3 h-6 w-6" />₹{val}
                      </Label>
                    </div>
                  ))}
                   <div>
                      <RadioGroupItem value="custom" id="amount-custom" className="sr-only" />
                       <Label
                         htmlFor="amount-custom"
                         className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${customAmount && 'border-primary'}`}
                       >
                         <CreditCard className="mb-3 h-6 w-6" />Custom
                       </Label>
                    </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-amount" className="font-semibold">
                  Or Enter a Custom Amount (INR)
                </Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="e.g. 999"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount('');
                  }}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <User className="inline-block mr-2 h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="inline-block mr-2 h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. jane.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">
                  <MessageSquare className="inline-block mr-2 h-4 w-4" />
                  Leave a message (optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your words of encouragement..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Secure Payments</AlertTitle>
                <AlertDescription>
                  This is a real payment form. Your payment will be processed securely via Razorpay (UPI, Card, Wallet).
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={handleContribute}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Contribute ₹{finalAmount || 0}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Social Proof Section */}
       <section className="w-full py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
                    Follow Our Journey
                </h2>
                 <p className="mx-auto max-w-xl text-muted-foreground mt-4">
                   We are building in public. Get real-time updates on our progress.
                </p>
                 <div className="mt-8 flex justify-center gap-4">
                    <Button asChild variant="outline">
                        <a href="https://www.linkedin.com/company/vij-bp/" target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2"/>LinkedIn</a>
                    </Button>
                </div>
                 <div className="mt-12">
                     <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Built with</p>
                    <div className="flex justify-center items-center gap-x-8 gap-y-4 flex-wrap mt-4">
                        <span className="font-medium">Next.js</span>
                        <span className="font-medium">Tailwind CSS</span>
                        <span className="font-medium">Google AI</span>
                         <span className="font-medium">Firebase</span>
                         <span className="font-medium">Razorpay</span>
                    </div>
                </div>
            </div>
       </section>
    </div>
  );

    

    
