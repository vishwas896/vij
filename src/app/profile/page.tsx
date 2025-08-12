
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, Briefcase, Sparkles, Pencil } from "lucide-react";


export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }
    
    const getInitials = (email?: string | null) => {
        return email ? email.charAt(0).toUpperCase() : '?';
    }


    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <Card className="max-w-3xl mx-auto">
                <CardHeader className="flex flex-col md:flex-row items-start gap-6">
                    <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                        <AvatarFallback className="text-3xl">{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-3xl font-headline">{user.displayName || "Anonymous User"}</CardTitle>
                             <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4"/>
                                <span className="sr-only">Edit Profile</span>
                            </Button>
                        </div>
                        <CardDescription className="mt-1">
                            <p className="flex items-center gap-2 text-muted-foreground"><Briefcase className="h-4 w-4" /> Job Title Not Set</p>
                            <p className="flex items-center gap-2 text-muted-foreground mt-1"><Mail className="h-4 w-4" /> {user.email}</p>
                        </CardDescription>
                        <div className="mt-4">
                            <p className="text-muted-foreground">Bio not set.</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Skills</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                             <p className="text-sm text-muted-foreground">No skills added yet.</p>
                        </div>
                    </div>
                     <div className="mt-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Connections</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                             <p className="text-sm text-muted-foreground">You have no connections yet.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

