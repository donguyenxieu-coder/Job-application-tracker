import { useState, useEffect } from "react";
import JobList from "./components/JobList";
import JobStats from "./components/JobStats";
import JobToolbar from "./components/JobToolbar";
import JobForm from "./components/JobForm";
import type { Job, JobFilterStatus } from "./types/job";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "./services/jobService";

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobFilterStatus>("All");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || job.status === status;

    return matchesSearch && matchesStatus;
  });
  const handleCreateJob = async (values: Omit<Job, "id">) => {
    setIsSubmitting(true);
    setMutationError(null);
    try {
      const createdJob = await createJob(values);
      setJobs((prev) => {
        return [...prev, createdJob];
      });
      setIsFormOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setMutationError(error.message);
      } else {
        setMutationError("Failed to create job");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (id: number) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    if (!jobToEdit) return;
    setMutationError(null);
    setEditingJob(jobToEdit);
    setIsFormOpen(true);
  };

  const handleUpdateJob = async (values: Omit<Job, "id">) => {
    if (!editingJob) return;
    setIsSubmitting(true);
    setMutationError(null);
    try {
      const updatedJob = await updateJob(editingJob.id, values);
      setJobs((prevJobs) => {
        return prevJobs.map((job) => {
          if (job.id === editingJob.id) {
            return updatedJob;
          }
          return job;
        });
      });
      setEditingJob(null);
      setIsFormOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setMutationError(error.message);
      } else {
        setMutationError("Failed to update job");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    setDeletingId(id);
    setMutationError(null);
    try {
      await deleteJob(id);
      setJobs((prevJobs) => {
        return prevJobs.filter((job) => job.id !== id);
      });
    } catch (error) {
      if (error instanceof Error) {
        setMutationError(error.message);
      } else {
        setMutationError("Failed to delete job");
      }
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch jobs");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadJobs();
  }, []);

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
              setMutationError(null);
              setEditingJob(null);
              setIsFormOpen(true);
            }}
            className="rounded-lg text-sm font-medium hover:bg-blue-700 bg-blue-600 px-4 py-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-white"
          >
            + Add Job
          </button>
        </header>
        {isFormOpen && (
          <JobForm
            onCancel={() => {
              setMutationError(null);
              setEditingJob(null);
              setIsFormOpen(false);
            }}
            onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
            initialValues={editingJob ?? undefined}
            isEditing={Boolean(editingJob)}
            isSubmitting={isSubmitting}
          />
        )}
        {mutationError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{mutationError}</p>
          </div>
        )}
        {isLoading ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-600">
              Loading jobs...
            </p>
          </div>
        ) : error ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-6 py-5">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        ) : (
          <div>
            <JobStats jobs={jobs} />
            <JobToolbar
              search={search}
              onSearchChange={setSearch}
              status={status}
              onStatusChange={setStatus}
            />
            {jobs.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
                <p className="font-medium text-slate-700">
                  No job applications yet.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Add your first job application to start tracking it.
                </p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center">
                <p className="font-medium text-slate-700">No matching jobs.</p>
                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or status filter.
                </p>
              </div>
            ) : (
              <JobList
                jobs={filteredJobs}
                onDelete={handleDeleteJob}
                onEdit={handleStartEdit}
                deletingId={deletingId}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
