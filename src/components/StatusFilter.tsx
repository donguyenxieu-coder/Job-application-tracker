type StatusFilterProps = {
  status: string;
  onStatusChange: (value: string) => void;
};
function StatusFilter({ status, onStatusChange }: StatusFilterProps) {
  return (
    <div>
      <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}
export default StatusFilter;
