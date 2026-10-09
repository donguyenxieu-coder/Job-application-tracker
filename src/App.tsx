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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Job Application Tracker
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track and manage your job applications
            </p>
          </div>
          <button className="border px-4 py-2 text-sm font-medium cursor-pointer bg-green-300 hover:bg-green-400 rounded w-full sm:w-auto">
            + Add Job
          </button>
        </header>

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
