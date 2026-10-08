type JobSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};
function JobSearch({ search, onSearchChange }: JobSearchProps) {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
export default JobSearch;
