"use server";

import { z } from "zod";

const PostJobSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  type: z.enum(["Full-time", "Part-time", "Contract", "Volunteer"]),
  description: z.string(),
  companyEmail: z.string().email(),
});

export async function postJobAction(input: z.infer<typeof PostJobSchema>) {
    try {
        const validation = PostJobSchema.safeParse(input);
        if (!validation.success) {
            return { success: false, error: "Invalid input." };
        }

        // In a real application, you would:
        // 1. Save the job to a "pending" state in your database.
        // 2. Generate a unique verification token.
        // 3. Send an email to `companyEmail` with a link containing the verification token.
        // 4. When the user clicks the link, verify the token and mark the job as "active".

        console.log("Simulating job verification for:", validation.data);

        return { success: true };

    } catch (error) {
        console.error("Error in postJobAction:", error);
        return { success: false, error: "An unexpected error occurred. Failed to post job." };
    }
}