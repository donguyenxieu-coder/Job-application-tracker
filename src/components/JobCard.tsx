import type { JobStatus } from "../types/job";

type JobCardProps = {
  id: number;
  position: string;
  company: string;
  status: JobStatus;
  appliedDate: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  isDeleting: boolean;
};

function JobCard({
  id,
  position,
  company,
  status,
  appliedDate,
  onDelete,
  onEdit,
  isDeleting,
}: JobCardProps) {
  let statusClass = "";
  if (status === "Applied") {
    statusClass = "bg-blue-50 text-blue-700";
  } else if (status === "Interview") {
    statusClass = "bg-amber-50 text-amber-700";
  } else if (status === "Offer") {
    statusClass = "bg-green-50 text-green-700";
  } else if (status === "Rejected") {
    statusClass = "bg-red-50 text-red-700";
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-slate-900">{position}</p>
          <p className="mt-1 text-sm text-slate-500">{company}</p>
        </div>
        <p
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
        >
          {status}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500"> Applied on {appliedDate}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(id)}
            className="text-slate-700 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            disabled={isDeleting}
            className="rounded-lg border border-red-200 text-red-600 px-3 py-1.5 text-sm font-medium hover:bg-red-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default JobCard;
