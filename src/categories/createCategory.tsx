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
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  categoryName: z.string().min(3).max(100),
});

export default function MyForm({
  onReload,
}: {
  onReload: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleCategoryCreation(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/public/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      //   const data: string = await response.json();
      return "Category created successfully";
    } catch (error) {
      if (error instanceof Error) {
        console.error("Fetch Error:", error.message);
        throw error; // Re-throw the error for further handling
      } else {
        console.error("Unexpected Error:", error);
        throw error;
      }
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleCategoryCreation(values);
      form.reset();
      toast.success("Category has been created.");
      onReload(true);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
