"use client";
import { createAndEditJobSchema, CreateAndEditJobType, JobMode, JobStatus } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { Button } from "./ui/button";

function CreateJobForm() {
   const form = useForm<CreateAndEditJobType>({
      resolver: zodResolver(createAndEditJobSchema),
      defaultValues: {
         position: "",
         company: "",
         location: "",
         status: JobStatus.Pending,
         mode: JobMode.FullTime,
      },
   });
   // console.log(form.control);
   function onSubmit(values: CreateAndEditJobType) {
      console.log(values);
   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
            <h2 className="capitalize font-semibold mb-6 text-4xl">add job</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
               {/* position */}
               <CustomFormField name="position" control={form.control} />
               {/* company */}
               <CustomFormField name="company" control={form.control}></CustomFormField>
               {/* location */}
               <CustomFormField name="location" control={form.control}></CustomFormField>
               {/* job status */}
               <CustomFormSelect
                  name="status"
                  control={form.control}
                  labelText="job status"
                  items={Object.values(JobStatus)}
               />
               {/* job mode */}
               <CustomFormSelect name="mode" control={form.control} labelText="job mode" items={Object.values(JobMode)} />
               <Button type="submit" className="self-end capitalize">
                  create job
               </Button>
            </div>
         </form>
      </Form>
   );
}
export default CreateJobForm;
