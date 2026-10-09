import type { JobFilterStatus } from "../types/job";

type StatusFilterProps = {
  status: JobFilterStatus;
  onStatusChange: (value: JobFilterStatus) => void;
};

const statusOptions: JobFilterStatus[] = [
  "All",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

function StatusFilter({ status, onStatusChange }: StatusFilterProps) {
  return (
    <div className="w-full sm:w-auto">
      <select
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 cursor-pointer"
        value={status}
        onChange={(e) => {
          const nextStatus = statusOptions.find(
            (option) => option === e.target.value,
          );

          if (nextStatus) onStatusChange(nextStatus);
        }}
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
export default StatusFilter;
