import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { deleteJobAction } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function DeleteJobButton({ id }: { id: string }) {
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const { mutate, isPending } = useMutation({
      mutationFn: (id: string) => deleteJobAction(id),
      onSuccess: (data) => {
         if (!data) {
            toast({
               description: "there was an error",
               variant: "destructive",
            });
            return;
         }
         queryClient.invalidateQueries({ queryKey: ["jobs"] });
         queryClient.invalidateQueries({ queryKey: ["stats"] });
         queryClient.invalidateQueries({ queryKey: ["charts"] });

         toast({ description: "job removed" });
      },
   });
   return (
      <Button
         size="sm"
         disabled={isPending}
         onClick={() => {
            mutate(id);
         }}
      >
         {isPending ? "deleting..." : "delete"}
      </Button>
   );
}
export default DeleteJobButton;
