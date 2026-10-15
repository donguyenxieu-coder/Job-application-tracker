import type { Job } from "../types/job";

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
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border p-5 shadow-sm border-slate-200 bg-white">
          <p className="text-sm font-medium text-slate-500">Total</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{total}</p>
        </div>
        <div className="rounded-xl border p-5 shadow-sm border-slate-200 bg-white">
          <p className="text-sm font-medium text-slate-500">Applied</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {applied}
          </p>
        </div>
        <div className="rounded-xl border p-5 shadow-sm border-slate-200 bg-white">
          <p className="text-sm font-medium text-slate-500">Interview</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {interviewCount}
          </p>
        </div>
        <div className="rounded-xl border p-5 shadow-sm border-slate-200 bg-white">
          <p className="text-sm font-medium text-slate-500">Offer</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {offerCount}
          </p>
        </div>
      </div>
    </div>
  );
}
export default JobStats;
