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
    <div>
      <select
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
