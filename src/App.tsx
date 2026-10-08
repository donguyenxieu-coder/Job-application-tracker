import { useState } from "react";
import JobList from "./components/JobList";
import JobStats from "./components/JobStats";
import JobToolbar from "./components/JobToolbar";
import type { Job, JobFilterStatus } from "./types/job";

const jobs: Job[] = [
  {
    id: 1,
    position: "Frontend Developer",
    company: "ABC Technology",
    status: "Applied",
    appliedDate: "18/09/2026",
  },
  {
    id: 2,
    position: "React Developer",
    company: "XYZ Software",
    status: "Interview",
    appliedDate: "15/09/2026",
  },
  {
    id: 3,
    position: "Junior Frontend Developer",
    company: "NextGen Solutions",
    status: "Offer",
    appliedDate: "10/09/2026",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobFilterStatus>("All");
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || job.status === status;

    return matchesSearch && matchesStatus;
  });
  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold">Job Application Tracker</h1>
        <JobStats jobs={jobs} />
        <JobToolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />
        <JobList jobs={filteredJobs} />
      </main>
    </div>
  );
}

export default App;
