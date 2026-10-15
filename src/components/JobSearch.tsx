type JobSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};
function JobSearch({ search, onSearchChange }: JobSearchProps) {
  return (
    <div className="flex-1">
      <input
        placeholder="Search by position or company..."
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}
export default JobSearch;
