
'use client';

import {useState, useEffect} from 'react';
import {
  HandHeart,
  Heart,
  CreditCard,
  User,
  Mail,
  MessageSquare,
  Info,
  Loader2,
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

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ContributionPage() {
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const {toast} = useToast();

  const finalAmount = customAmount ? parseFloat(customAmount) : parseInt(amount);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
          description: `Thank you for your contribution. Payment ID: ${response.razorpay_payment_id}`,
        });
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

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <HandHeart className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary mt-6">
          Support Our Mission
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your contribution helps us build and maintain this platform for the
          social impact community.
        </p>
      </div>

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
              {['100', '250', '500', '1000'].map((val) => (
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
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-amount" className="font-semibold">
              Or Enter a Custom Amount (INR)
            </Label>
            <Input
              id="custom-amount"
              type="number"
              placeholder="e.g. 300"
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
              This is a real payment form. Your payment will be processed securely via Razorpay.
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
  );
}
