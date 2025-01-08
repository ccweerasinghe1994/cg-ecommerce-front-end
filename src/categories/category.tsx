import { Button } from "@/components/ui/button";
import { TCategory } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

type Props = {
  category: TCategory;
};

function CategoryItem({ category }: Props) {
  async function handleDelete() {
    try {
      const response = await fetch(
        `/api/public/categories/${category.categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      //   const data: string = await response.json();
      toast.success("Category deleted successfully");
      return "Category deleted successfully";
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Fetch Error:", error.message);
        throw error; // Re-throw the error for further handling
      } else {
        toast.error("Unexpected Error");
        console.error("Unexpected Error:", error);
        throw error;
      }
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Category</CardTitle>
          <CardDescription>{category.categoryName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>ID: {category?.categoryId || "not Provided"}</p>
        </CardContent>
        <CardFooter>
          <Button variant={"destructive"} onClick={handleDelete}>
            delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default CategoryItem;
