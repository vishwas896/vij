"use server";

import { z } from "zod";

const AddListingSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  category: z.enum(["Room", "PG", "Catering", "Lunch Box", "Tiffin Service"]),
  location: z.string().min(2, "Location must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  contactEmail: z.string().email("Please enter a valid email address."),
});

export async function addListingAction(input: z.infer<typeof AddListingSchema>) {
    try {
        const validation = AddListingSchema.safeParse(input);
        if (!validation.success) {
            return { success: false, error: "Invalid input." };
        }

        // In a real application, you would save this listing to your database.
        // For now, we'll just log it to the console.
        console.log("Simulating adding a new listing:", validation.data);

        return { success: true };

    } catch (error) {
        console.error("Error in addListingAction:", error);
        return { success: false, error: "An unexpected error occurred. Failed to add listing." };
    }
}
