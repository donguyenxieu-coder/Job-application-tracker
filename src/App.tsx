import { useState } from "react";
import JobList from "./components/JobList";
import JobStats from "./components/JobStats";
import JobToolbar from "./components/JobToolbar";
import JobForm from "./components/JobForm";
import type { Job, JobFilterStatus } from "./types/job";

const initialJobs: Job[] = [
  {
    id: 1,
    position: "Frontend Developer",
    company: "ABC Technology",
    status: "Applied",
    appliedDate: "2026-09-18",
  },
  {
    id: 2,
    position: "React Developer",
    company: "XYZ Software",
    status: "Interview",
    appliedDate: "2026-11-18",
  },
  {
    id: 3,
    position: "Junior Frontend Developer",
    company: "NextGen Solutions",
    status: "Offer",
    appliedDate: "2026-09-12",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobFilterStatus>("All");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || job.status === status;

    return matchesSearch && matchesStatus;
  });
  const handleCreateJob = (values: Omit<Job, "id">) => {
    const newJob: Job = {
      id: Date.now(),
      ...values,
    };
    setJobs((prevJobs) => {
      return [...prevJobs, newJob];
    });
    setIsFormOpen(false);
  };
  const handleDeleteJob = (id: number) => {
    setJobs((prevJobs) => {
      return prevJobs.filter((job) => job.id !== id);
    });
  };

  const handleStartEdit = (id: number) => {
    const jobtoEdit = jobs.find((job) => job.id === id);
    if (!jobtoEdit) return;
    setEditingJob(jobtoEdit);
    setIsFormOpen(true);
  };

  const handleUpdateJob = (values: Omit<Job, "id">) => {
    if (!editingJob) return;
    setJobs((prevJobs) => {
      return prevJobs.map((job) => {
        if (job.id === editingJob.id) {
          return {
            id: editingJob.id,
            ...values,
          };
        }
        return job;
      });
    });
    setEditingJob(null);
    setIsFormOpen(false);
  };

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
          <button
            onClick={() => {
              setEditingJob(null);
              setIsFormOpen(true);
            }}
            className="border px-4 py-2 text-sm font-medium cursor-pointer bg-green-300 hover:bg-green-400 rounded w-full sm:w-auto"
          >
            + Add Job
          </button>
        </header>
        {isFormOpen && (
          <JobForm
            onCancel={() => {
              setEditingJob(null);
              setIsFormOpen(false);
            }}
            onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
            initialValues={editingJob ?? undefined}
            isEditing={Boolean(editingJob)}
          />
        )}
        <JobStats jobs={jobs} />
        <JobToolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />
        <JobList
          jobs={filteredJobs}
          onDelete={handleDeleteJob}
          onEdit={handleStartEdit}
        />
      </main>
    </div>
  );
}

export default App;
