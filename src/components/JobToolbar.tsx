import JobSearch from "./JobSearch";
import StatusFilter from "./StatusFilter";
type JobToolbarProps = {
  status: string;
  onStatusChange: (value: string) => void;
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
