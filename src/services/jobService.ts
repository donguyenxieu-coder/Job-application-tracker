import type { Job } from "../types/job";

type JobsResponse = {
  data: Job[];
};

type JobResponse = {
  data: Job;
};

const JOBS_API_URL = import.meta.env.VITE_JOBS_API_URL;

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(JOBS_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  const result: JobsResponse = await response.json();
  return result.data;
}

export async function createJob(values: Omit<Job, "id">): Promise<Job> {
  const response = await fetch(JOBS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new Error("Failed to create job");
  }
  const result: JobResponse = await response.json();
  return result.data;
}

export async function updateJob(
  id: number,
  values: Partial<Omit<Job, "id">>,
): Promise<Job> {
  const response = await fetch(`${JOBS_API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new Error("Failed to update job");
  }
  const result: JobResponse = await response.json();
  return result.data;
}

export async function deleteJob(id: number): Promise<void> {
  const response = await fetch(`${JOBS_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete job");
  }
}
