import JobCard from "./JobCard";

type Job = {
  id: number;
  position: string;
  company: string;
  status: string;
  appliedDate: string;
};

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
