"use server";

import { z } from "zod";

// Schema for validating the job post form
export const PostJobSchema = z.object({
  title: z.string().min(2, "Job title must be at least 2 characters."),
  company: z.string().min(2, "Company name must be at least 2 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  applicationUrl: z.string().url("Please provide a valid URL for applications."),
  companyEmail: z.string().email("A valid company email is required for verification."),
});

export type PostJobSchemaType = z.infer<typeof PostJobSchema>;

export async function postJobAction(input: PostJobSchemaType) {
    try {
        const validation = PostJobSchema.safeParse(input);
        if (!validation.success) {
            return { success: false, error: "Invalid input provided." };
        }

        // In a real application, you would:
        // 1. Verify the user's session and authorization to post.
        // 2. Potentially trigger an email verification flow for `companyEmail`.
        // 3. Save the job posting to your database (e.g., Firestore).
        // For now, we'll just log it to simulate a successful post.

        console.log("Simulating adding a new job post:", validation.data);
        // e.g., await db.collection('userJobs').add(validation.data);


        return { success: true };

    } catch (error) {
        console.error("Error in postJobAction:", error);
        return { success: false, error: "An unexpected error occurred. Failed to post job." };
    }
}
