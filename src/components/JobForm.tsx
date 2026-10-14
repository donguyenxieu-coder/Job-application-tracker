import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

type JobFormProps = {
  onCancel: () => void;
  onSubmit: (values: JobFormValues) => void;
  initialValues?: JobFormValues;
  isEditing?: boolean;
  isSubmitting: boolean;
};

const jobFormSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  appliedDate: z.string().min(1, "Applied date is required"),
});

const emptyValues: JobFormValues = {
  position: "",
  company: "",
  status: "Applied",
  appliedDate: "",
};

type JobFormValues = z.infer<typeof jobFormSchema>;

function JobForm({
  onCancel,
  onSubmit,
  initialValues,
  isEditing,
  isSubmitting,
}: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      position: "",
      company: "",
      status: "Applied",
      appliedDate: "",
    },
  });

  useEffect(() => {
    reset(initialValues ?? emptyValues);
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          {isEditing ? "Edit job" : "Add new job"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? "Update your job application details."
            : "Enter the details of your job application."}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="position"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            {...register("position")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          {errors.position && (
            <p className="mt-1 text-sm text-red-600">
              {errors.position.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            {...register("company")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">
              {errors.company.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="appliedDate"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Applied Date
          </label>
          <input
            type="date"
            id="appliedDate"
            {...register("appliedDate")}
            placeholder="vd: 2026-10-10"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          {errors.appliedDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.appliedDate.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-3 mt-6 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="border border-slate-300 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg text-sm font-medium hover:bg-blue-700 bg-blue-600 px-4 py-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-white"
        >
          {isSubmitting
            ? isEditing
              ? "Update..."
              : "Create..."
            : isEditing
              ? "Update Job"
              : "Create Job"}
        </button>
      </div>
    </form>
  );
}

export default JobForm;
