export type JobStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export type JobFilterStatus = "All" | JobStatus;

export type Job = {
  id: number;
  position: string;
  company: string;
  status: JobStatus;
  appliedDate: string;
};
