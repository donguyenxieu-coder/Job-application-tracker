import { z } from "npm:zod@4.1.12";

export const jobStatusSchema = z.enum([
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
]);

export const jobIdParamSchema = z.coerce.number().int().positive();

export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "appliedDate must use YYYY-MM-DD")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    if (year < 1) return false;
    const date = new Date(Date.UTC(year, month - 1, day));

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "appliedDate must be a real calendar date");

export const createJobSchema = z
  .object({
    position: z.string().trim().min(1, "position is required"),
    company: z.string().trim().min(1, "company is required"),
    status: jobStatusSchema,
    appliedDate: isoDateSchema,
  })
  .strict();

export const updateJobSchema = createJobSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, "At least one field is required");

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;

type JobRow = {
  id: number;
  position: string;
  company: string;
  status: z.infer<typeof jobStatusSchema>;
  applied_date: string;
};

export type JobResponse = {
  id: number;
  position: string;
  company: string;
  status: z.infer<typeof jobStatusSchema>;
  appliedDate: string;
};

export function toJobResponse(row: JobRow): JobResponse {
  return {
    id: row.id,
    position: row.position,
    company: row.company,
    status: row.status,
    appliedDate: row.applied_date,
  };
}

export function toCreateJobRow(input: CreateJobInput) {
  return {
    position: input.position,
    company: input.company,
    status: input.status,
    applied_date: input.appliedDate,
  };
}

export function toUpdateJobRow(input: UpdateJobInput) {
  const update: {
    position?: string;
    company?: string;
    status?: z.infer<typeof jobStatusSchema>;
    applied_date?: string;
  } = {};

  if (input.position !== undefined) update.position = input.position;
  if (input.company !== undefined) update.company = input.company;
  if (input.status !== undefined) update.status = input.status;
  if (input.appliedDate !== undefined) update.applied_date = input.appliedDate;

  return update;
}
