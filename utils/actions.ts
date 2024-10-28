"use server";
import prisma from "./db";
import { auth } from "@clerk/nextjs";
import { JobType, CreateAndEditJobType, createAndEditJobSchema, JobStatus } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
// import { redirectToSignIn } from "@clerk/nextjs/server";
// import { use } from "react";
function authenticateAndRedirect(): string {
   const { userId } = auth();
   if (!userId) {
      redirect("/");
   }
   return userId;
}

export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null> {
   const userId = authenticateAndRedirect();
   try {
      createAndEditJobSchema.parse(values); // double check just in case
      const job: JobType = await prisma.job.create({
         data: {
            ...values,
            clerkId: userId,
         },
      });
      return job;
   } catch (error) {
      console.log(error);
      return null;
   }
}

type GetAllJobsActionTypes = {
   search?: string;
   jobStatus?: string;
   page?: number;
   limit?: number;
};

export async function getAllJobsAction({ search, jobStatus, page = 1, limit = 10 }: GetAllJobsActionTypes): Promise<{
   jobs: JobType[];
   count: number;
   page: number;
   totalPages: number;
}> {
   const userId = authenticateAndRedirect();
   try {
      let whereClause: Prisma.JobWhereInput = {
         clerkId: userId,
      };
      if (search) {
         whereClause = {
            ...whereClause,
            OR: [
               { position: { contains: search, mode: "insensitive" } },
               { company: { contains: search, mode: "insensitive" } },
               { location: { contains: search, mode: "insensitive" } },
               { mode: { contains: search, mode: "insensitive" } },
            ],
         };
      }
      if (jobStatus && jobStatus !== "all") {
         whereClause = {
            ...whereClause,
            status: jobStatus,
         };
      }
      const skip = (page - 1) * limit;
      const jobs: JobType[] = await prisma.job.findMany({
         where: whereClause,
         skip,
         take: limit,
         orderBy: {
            createdAt: "desc",
         },
      });
      const count: number = await prisma.job.count({
         where: whereClause,
      });
      const totalPages = Math.ceil(count / limit);
      return { jobs, count, page, totalPages };
   } catch (error) {
      console.log(error);
      return { jobs: [], count: 0, page: 1, totalPages: 0 };
   }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
   const userId = authenticateAndRedirect();
   try {
      const job: JobType = await prisma.job.delete({
         where: {
            id,
            clerkId: userId,
         },
      });
      return job;
   } catch (error) {
      return null;
   }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
   let job: JobType | null = null;
   const userId = authenticateAndRedirect();

   try {
      job = await prisma.job.findUnique({
         where: {
            id,
            clerkId: userId,
         },
      });
   } catch (error) {
      // job = null;
      console.error("Error fetching job:", error);
      throw new Error("Error fetching job");
   }
   if (!job) {
      // redirect("/jobs");
      throw new Error("Job not found"); // Use error handling instead of redirecting here
   }
   return job;
}

export async function updateJobAction(id: string, values: CreateAndEditJobType): Promise<JobType | null> {
   const userId = authenticateAndRedirect();

   try {
      const job: JobType = await prisma.job.update({
         where: {
            id,
            clerkId: userId,
         },
         data: {
            ...values,
         },
      });
      return job;
   } catch (error) {
      return null;
   }
}

export async function getStatsAction(): Promise<{
   pending: number;
   interview: number;
   declined: number;
}> {
   const userId = authenticateAndRedirect();
   // just to show Skeleton
   // await new Promise((resolve) => setTimeout(resolve, 5000));
   try {
      const stats = await prisma.job.groupBy({
         by: ["status"],
         _count: {
            status: true,
         },
         where: {
            clerkId: userId,
         },
      });
      const statsObject = stats.reduce((acc, curr) => {
         acc[curr.status] = curr._count.status;
         return acc;
      }, {} as Record<string, number>);

      const defaultStats = {
         pending: 0,
         declined: 0,
         interview: 0,
         ...statsObject,
      };
      return defaultStats;
   } catch (error) {
      redirect("/jobs");
   }
}

export async function getChartsDataAction(): Promise<Array<{ date: string; count: number }>> {
   const userId = authenticateAndRedirect();
   const sixMonthsAgo = dayjs().subtract(6, "month").toDate();
   try {
      const jobs = await prisma.job.findMany({
         where: {
            clerkId: userId,
            createdAt: {
               gte: sixMonthsAgo,
            },
         },
         orderBy: {
            createdAt: "asc",
         },
      });

      let applicationsPerMonth = jobs.reduce((acc, job) => {
         const date = dayjs(job.createdAt).format("MMM YY");

         const existingEntry = acc.find((entry) => entry.date === date);

         if (existingEntry) {
            existingEntry.count += 1;
         } else {
            acc.push({ date, count: 1 });
         }

         return acc;
      }, [] as Array<{ date: string; count: number }>);

      return applicationsPerMonth;
   } catch (error) {
      redirect("/jobs");
   }
}
