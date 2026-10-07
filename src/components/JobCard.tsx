type JobCardProps = {
  position: string;
  company: string;
  status: string;
  appliedDate: string;
};

function JobCard({ position, company, status, appliedDate }: JobCardProps) {
  return (
    <div>
      <p>{position}</p>
      <p>{company}</p>
      <p>{status}</p>
      <p>{appliedDate}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
export default JobCard;
