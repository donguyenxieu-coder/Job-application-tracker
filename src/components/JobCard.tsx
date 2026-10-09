import type { JobStatus } from "../types/job";

type JobCardProps = {
  position: string;
  company: string;
  status: JobStatus;
  appliedDate: string;
};

function JobCard({ position, company, status, appliedDate }: JobCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mt-1 text-sm text-slate-900 font-semibold">
            {position}
          </p>
          <p className="mt-1 text-sm text-slate-500">{company}</p>
        </div>
        <p className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {status}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500"> Applied on {appliedDate}</p>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-blue-300 cursor-pointer">
            Edit
          </button>
          <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-red-300 cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default JobCard;
