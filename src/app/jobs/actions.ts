"use server";

import { z } from "zod";

const SearchJobsSchema = z.object({
  what: z.string().optional(),
  where: z.string().optional(),
});

// Adzuna Job Interface
interface AdzunaJob {
    id: string;
    title: string;
    company: { display_name: string };
    location: { display_name: string };
    description: string;
    redirect_url: string;
    contract_time?: string;
}

// Jooble Job Interface
interface JoobleJob {
    title: string;
    location: string;
    salary: string;
    source: string;
    type: string;
    link: string;
    company: string;
    snippet: string;
    id: string;
}


// Unified Job Interface
export interface Job {
    id: string;
    title: string;
    company: { display_name: string };
    location: { display_name: string };
    description: string;
    redirect_url: string;
    contract_time?: string;
    source: 'Adzuna' | 'Jooble';
}


async function searchAdzuna(what: string | undefined, where: string | undefined): Promise<Job[]> {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
        console.error("Adzuna API credentials are not set in .env file.");
        return [];
    }

    const searchParams = new URLSearchParams({
        app_id: appId,
        app_key: appKey,
        results_per_page: '6',
        what: what || 'social impact',
        where: where || 'india',
        content_type: 'application/json'
    });

    try {
        const response = await fetch(`https://api.adzuna.com/v1/api/jobs/in/search/1?${searchParams.toString()}`);
        if (!response.ok) {
            console.error('Adzuna API error:', response.status, await response.text());
            return [];
        }
        const data = await response.json();
        return (data.results || []).map((job: AdzunaJob) => ({ ...job, source: 'Adzuna' as const }));
    } catch (error) {
        console.error("Error fetching jobs from Adzuna:", error);
        return [];
    }
}

async function searchJooble(what: string | undefined, where: string | undefined): Promise<Job[]> {
    const apiKey = process.env.JOOBLE_API_KEY;
    if (!apiKey) {
        console.error("Jooble API key is not set in .env file.");
        return [];
    }

    try {
        const response = await fetch(`https://jooble.org/api/${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keywords: what || 'social impact',
                location: where || 'india',
            })
        });

        if (!response.ok) {
            console.error('Jooble API error:', response.status, await response.text());
            return [];
        }

        const data = await response.json();

        return (data.jobs || []).map((job: JoobleJob): Job => ({
            id: job.id,
            title: job.title,
            company: { display_name: job.company || 'N/A' },
            location: { display_name: job.location },
            description: job.snippet,
            redirect_url: job.link,
            source: 'Jooble' as const,
            contract_time: job.type.toLowerCase().replace('_', ' ')
        }));

    } catch (error) {
        console.error("Error fetching jobs from Jooble:", error);
        return [];
    }
}


export async function searchJobs(input: z.infer<typeof SearchJobsSchema>) {
    const validation = SearchJobsSchema.safeParse(input);

    if (!validation.success) {
        return { success: false, error: "Invalid search query.", jobs: [] };
    }

    const { what, where } = validation.data;

    try {
        // Run searches in parallel
        const [adzunaJobs, joobleJobs] = await Promise.all([
            searchAdzuna(what, where),
            searchJooble(what, where)
        ]);

        // Combine and return results
        const combinedJobs = [...adzunaJobs, ...joobleJobs];

        return { success: true, jobs: combinedJobs };

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return { success: false, error: "An unexpected error occurred while fetching jobs.", jobs: [] };
    }
}
