import JobCard from "./JobCard";
import type { Job } from "../types/job";

type JobListProps = {
  jobs: Job[];
};

function JobList({ jobs }: JobListProps) {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          position={job.position}
          company={job.company}
          status={job.status}
          appliedDate={job.appliedDate}
        />
      ))}
    </div>
  );
}
export default JobList;
