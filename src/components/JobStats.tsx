type Job = {
  id: number;
  position: string;
  company: string;
  status: string;
  appliedDate: string;
};

type JobStatsProps = {
  jobs: Job[];
};

function JobStats({ jobs }: JobStatsProps) {
  const total = jobs.length;
  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interviewCount = jobs.filter(
    (job) => job.status === "Interview",
  ).length;
  const offerCount = jobs.filter((job) => job.status === "Offer").length;
  return (
    <div>
      <div>
        <p>Total: {total}</p>
        <p>Applied: {applied}</p>
        <p>InterviewCount: {interviewCount}</p>
        <p>OfferCount: {offerCount}</p>
      </div>
    </div>
  );
}
export default JobStats;
