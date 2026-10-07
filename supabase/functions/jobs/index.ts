import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import {
  createJobSchema,
  jobIdParamSchema,
  toCreateJobRow,
  toJobResponse,
  toUpdateJobRow,
  updateJobSchema,
} from "../_shared/jobs.ts";
import { corsHeaders, errorResponse, jsonResponse } from "../_shared/cors.ts";

const jobsSelect = "id, position, company, status, applied_date";

function createServerClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase server credentials are not configured");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function getRoute(pathname: string): { id?: string } | null {
  const segments = pathname.split("/").filter(Boolean);
  const jobsIndex = segments.lastIndexOf("jobs");

  if (jobsIndex === -1) return null;

  const tail = segments.slice(jobsIndex + 1);
  if (tail.length === 0) return {};
  if (tail.length === 1) return { id: tail[0] };

  return null;
}

async function parseJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new Error("INVALID_JSON");
  }
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const route = getRoute(new URL(request.url).pathname);
  if (!route) return errorResponse(404, "NOT_FOUND", "Route not found");

  if (!["GET", "POST", "PATCH", "DELETE"].includes(request.method)) {
    return errorResponse(405, "METHOD_NOT_ALLOWED", "Method not allowed");
  }

  if ((request.method === "POST" && route.id) ||
      (["PATCH", "DELETE"].includes(request.method) && !route.id)) {
    return errorResponse(404, "NOT_FOUND", "Route not found");
  }

  const idResult = route.id ? jobIdParamSchema.safeParse(route.id) : null;
  if (route.id && !idResult?.success) {
    return errorResponse(400, "VALIDATION_ERROR", "Job id must be a positive integer");
  }

  try {
    const supabase = createServerClient();
    const jobId = idResult?.data;

    if (request.method === "GET" && !jobId) {
      const { data, error } = await supabase
        .from("jobs")
        .select(jobsSelect)
        .order("id", { ascending: true });

      if (error) throw error;
      return jsonResponse({ data: data.map(toJobResponse) });
    }

    if (request.method === "GET" && jobId) {
      const { data, error } = await supabase
        .from("jobs")
        .select(jobsSelect)
        .eq("id", jobId)
        .maybeSingle();

      if (error) throw error;
      if (!data) return errorResponse(404, "NOT_FOUND", "Job not found");
      return jsonResponse({ data: toJobResponse(data) });
    }

    if (request.method === "POST") {
      const payload = createJobSchema.safeParse(await parseJson(request));
      if (!payload.success) {
        return errorResponse(400, "VALIDATION_ERROR", "Request body is invalid");
      }

      const { data, error } = await supabase
        .from("jobs")
        .insert(toCreateJobRow(payload.data))
        .select(jobsSelect)
        .single();

      if (error) throw error;
      return jsonResponse({ data: toJobResponse(data) }, 201);
    }

    if (request.method === "PATCH" && jobId) {
      const payload = updateJobSchema.safeParse(await parseJson(request));
      if (!payload.success) {
        return errorResponse(400, "VALIDATION_ERROR", "Request body is invalid");
      }

      const { data, error } = await supabase
        .from("jobs")
        .update(toUpdateJobRow(payload.data))
        .eq("id", jobId)
        .select(jobsSelect)
        .maybeSingle();

      if (error) throw error;
      if (!data) return errorResponse(404, "NOT_FOUND", "Job not found");
      return jsonResponse({ data: toJobResponse(data) });
    }

    if (request.method === "DELETE" && jobId) {
      const { data, error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", jobId)
        .select("id")
        .maybeSingle();

      if (error) throw error;
      if (!data) return errorResponse(404, "NOT_FOUND", "Job not found");
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    return errorResponse(404, "NOT_FOUND", "Route not found");
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_JSON") {
      return errorResponse(400, "VALIDATION_ERROR", "Request body must be valid JSON");
    }

    console.error("jobs edge function failed", error);
    return errorResponse(500, "INTERNAL_ERROR", "An internal error occurred");
  }
});
