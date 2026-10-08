import JobSearch from "./JobSearch";
import StatusFilter from "./StatusFilter";
import type { JobFilterStatus } from "../types/job";

type JobToolbarProps = {
  status: JobFilterStatus;
  onStatusChange: (value: JobFilterStatus) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

function JobToolbar({
  status,
  search,
  onStatusChange,
  onSearchChange,
}: JobToolbarProps) {
  return (
    <div>
      <JobSearch search={search} onSearchChange={onSearchChange} />
      <StatusFilter status={status} onStatusChange={onStatusChange} />
    </div>
  );
}
export default JobToolbar;
