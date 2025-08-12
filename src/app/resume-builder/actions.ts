"use server";

import { aiResumeBuilderDemo, type AIResumeBuilderDemoInput } from '@/ai/flows/ai-resume-builder-demo';

export async function generateResumeAction(input: AIResumeBuilderDemoInput) {
    try {
        const result = await aiResumeBuilderDemo(input);
        if (result.resume) {
            return { success: true, data: result.resume };
        } else {
             return { success: false, error: "AI failed to generate a resume. Please try again." };
        }
    } catch (error) {
        console.error("Error in generateResumeAction:", error);
        return { success: false, error: "An unexpected error occurred. Failed to generate resume." };
    }
}
