import JobCard from "./JobCard";
import type { Job } from "../types/job";

type JobListProps = {
  jobs: Job[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  deletingId: number | null;
};

function JobList({ jobs, onDelete, onEdit, deletingId }: JobListProps) {
  return (
    <div className="mt-6 space-y-4">
      {jobs.map((job) => (
        <JobCard
          id={job.id}
          key={job.id}
          position={job.position}
          company={job.company}
          status={job.status}
          appliedDate={job.appliedDate}
          onDelete={onDelete}
          onEdit={onEdit}
          isDeleting={deletingId === job.id}
        />
      ))}
    </div>
  );
}
export default JobList;
