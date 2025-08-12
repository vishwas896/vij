"use server";

import { z } from "zod";

export const AddListingSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  category: z.enum(["Room", "PG", "Catering", "Lunch Box", "Tiffin Service"], {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  location: z.string().min(2, "Location must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  contactEmail: z.string().email("Please enter a valid email address."),
});

export type AddListingSchemaType = z.infer<typeof AddListingSchema>;


export async function addListingAction(input: AddListingSchemaType) {
    try {
        const validation = AddListingSchema.safeParse(input);
        if (!validation.success) {
            // This should not happen if client-side validation is working, but it's good practice.
            return { success: false, error: "Invalid input." };
        }

        // In a real application, you would save this listing to your database.
        // For now, we'll just log it to the console to simulate success.
        console.log("Simulating adding a new listing:", validation.data);

        // Here you would typically interact with a database, e.g.:
        // await db.collection('listings').add(validation.data);

        return { success: true };

    } catch (error) {
        console.error("Error in addListingAction:", error);
        // In a real app, you might want to log this error to a service like Sentry.
        return { success: false, error: "An unexpected error occurred. Failed to add listing." };
    }
}
