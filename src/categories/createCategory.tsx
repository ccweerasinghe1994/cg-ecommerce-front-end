import { createCategory } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BadgePlus, LoaderPinwheel } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  categoryName: z.string().min(3).max(100),
});

export default function MyForm() {
  const queryClient = useQueryClient();
  const { mutate: handleCreateCategory, isPending: isCreatingCategory } =
    useMutation({
      mutationFn: createCategory,
      onSuccess: (data) => {
        toast.success(
          `Category ${data.content.categoryName} created successfully`
        );
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (error) => {
        // console.error("Category creation error", error);
        toast.error(error.message);
      },
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function handleCategoryCreation(values: z.infer<typeof formSchema>) {
    handleCreateCategory(values);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      handleCategoryCreation(values);
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Electronics"
                  type="text"
                  required
                  {...field}
                />
              </FormControl>
              <FormDescription>
                this is a category for a ecommerce ap
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isCreatingCategory} size="lg" type="submit">
          Create Category{" "}
          {isCreatingCategory ? (
            <LoaderPinwheel color="white" className="animate-spin" />
          ) : (
            <BadgePlus size={48} className="animate-bounce" />
          )}
        </Button>
      </form>
    </Form>
  );
}
