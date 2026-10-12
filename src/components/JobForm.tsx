import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

type JobFormProps = {
  onCancel: () => void;
  onSubmit: (values: JobFormValues) => void;
  initialValues?: JobFormValues;
  isEditing?: boolean;
};

const jobFormSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  appliedDate: z.string().min(1, "Applied date is required"),
});

const emtyValues: JobFormValues = {
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
    reset(initialValues ?? emtyValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="position">Position</label>
        <input id="position" type="text" {...register("position")} />
        {errors.position && <p>{errors.position.message}</p>}
        <label htmlFor="company">Company</label>
        <input type="text" id="company" {...register("company")} />
        {errors.company && <p>{errors.company.message}</p>}
        <select id="status" {...register("status")}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          id="appliedDate"
          {...register("appliedDate")}
          placeholder="vd: 2026-10-10"
        />
        {errors.appliedDate && <p>{errors.appliedDate.message}</p>}
        <div className="flex gap-2">
          <button type="submit">
            {isEditing ? "Update Job" : "Create Job"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default JobForm;
