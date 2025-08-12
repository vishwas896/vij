'use server';

/**
 * @fileOverview A demo of the AI Resume Builder.
 *
 * - aiResumeBuilderDemo - A function that generates a resume demo based on example prompts.
 * - AIResumeBuilderDemoInput - The input type for the aiResumeBuilderDemo function.
 * - AIResumeBuilderDemoOutput - The return type for the aiResumeBuilderDemo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIResumeBuilderDemoInputSchema = z.object({
  examplePrompt: z.string().describe('An example prompt for the AI Resume Builder.'),
});
export type AIResumeBuilderDemoInput = z.infer<typeof AIResumeBuilderDemoInputSchema>;

const AIResumeBuilderDemoOutputSchema = z.object({
  resume: z.string().describe('The generated resume content.'),
});
export type AIResumeBuilderDemoOutput = z.infer<typeof AIResumeBuilderDemoOutputSchema>;

export async function aiResumeBuilderDemo(input: AIResumeBuilderDemoInput): Promise<AIResumeBuilderDemoOutput> {
  return aiResumeBuilderDemoFlow(input);
}

const getFormattingExamples = ai.defineTool(
  {
    name: 'getFormattingExamples',
    description: 'Retrieves successful resume formatting examples for social-impact job positions.',
    inputSchema: z.object({
      position: z.string().describe('The job position to retrieve formatting examples for.'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    // In a real implementation, this would fetch formatting examples from a database or external source.
    // For this demo, we'll provide some hardcoded examples.
    if (input.position.toLowerCase().includes('social worker')) {
      return `
        **Social Worker Resume Formatting Examples:**\n
        *   **Summary/Objective:**  A brief overview highlighting years of experience, key skills (e.g., empathy, crisis intervention), and career goals focused on serving vulnerable populations.\n        *   **Skills:**  Emphasize skills like case management, advocacy, conflict resolution, and knowledge of social services resources.\n        *   **Experience:**  Showcase experience with specific populations (e.g., children, elderly, homeless), highlighting measurable outcomes (e.g., reduced caseloads, successful placements).  Use action verbs like \"coordinated,\" \"implemented,\" and \"advocated.\"\n      `;
    } else if (input.position.toLowerCase().includes('nonprofit program manager')) {
      return `
        **Nonprofit Program Manager Resume Formatting Examples:**\n
        *   **Summary/Objective:**  Showcase experience managing nonprofit programs, highlighting skills in program development, fundraising, and community outreach.\n        *   **Skills:**  Emphasize skills like grant writing, budget management, volunteer coordination, and program evaluation.\n        *   **Experience:**  Quantify program impact with metrics (e.g., increased program participation, funds raised, positive outcomes achieved).  Use action verbs like \"managed,\" \"developed,\" and \"implemented.\"\n      `;
    } else {
      return 'No specific formatting examples found for this position.  Please refer to general resume writing guidelines.';
    }
  }
);

const aiResumeBuilderDemoPrompt = ai.definePrompt({
  name: 'aiResumeBuilderDemoPrompt',
  tools: [getFormattingExamples],
  input: {schema: AIResumeBuilderDemoInputSchema},
  output: {schema: AIResumeBuilderDemoOutputSchema},
  prompt: `You are an AI Resume Builder expert.  Using the example prompt and formatting examples, generate a resume.

    Example Prompt: {{{examplePrompt}}}

    Use the getFormattingExamples tool to get formatting examples based on the job positions mentioned in the example prompt.

    Formatting Examples:
    {{#tool_results}}
      {{#getFormattingExamples}}
        {{{result}}}
      {{/getFormattingExamples}}
    {{/tool_results}}
  `,
});

const aiResumeBuilderDemoFlow = ai.defineFlow(
  {
    name: 'aiResumeBuilderDemoFlow',
    inputSchema: AIResumeBuilderDemoInputSchema,
    outputSchema: AIResumeBuilderDemoOutputSchema,
  },
  async input => {
    const {output} = await aiResumeBuilderDemoPrompt({
      ...input,
    });
    return output!;
  }
);
