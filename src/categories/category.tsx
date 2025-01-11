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
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  category: TCategory;
};

function CategoryItem({ category }: Props) {
  const [isEditingModeEnabled, setIsEditingModeEnabled] =
    useState<boolean>(false);
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");
  const [hideDeleteButton, setHideDeleteButton] = useState<boolean>(false);

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

  async function handleUpdate() {
    setIsEditingModeEnabled(true);
    setHideDeleteButton((s) => !s);
    setUpdatedCategoryName(category.categoryName);

    if (!isEditingModeEnabled && updatedCategoryName.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `/api/public/categories/${category.categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName: updatedCategoryName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      //   const data: string = await response.json();
      toast.success("Category updated successfully");
      setIsEditingModeEnabled(false);
      setHideDeleteButton(false);
      return "Category updated successfully";
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

  function handleCategoryNameChange(event: ChangeEvent<HTMLInputElement>) {
    setUpdatedCategoryName(event.target.value);
  }

  const cetegroryContent = (
    <Input
      value={
        updatedCategoryName.length > 0
          ? updatedCategoryName
          : category.categoryName
      }
      disabled={!isEditingModeEnabled}
      onChange={handleCategoryNameChange}
    />
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Category</CardTitle>
          <CardDescription>{category.categoryName}</CardDescription>
        </CardHeader>
        <CardContent>{cetegroryContent}</CardContent>
        <CardFooter>
          <div className="flex gap-2">
            {!hideDeleteButton && (
              <Button variant={"destructive"} onClick={handleDelete}>
                delete
              </Button>
            )}
            <Button
              className="bg-blue-500"
              onClick={handleUpdate}
              disabled={category.categoryName === updatedCategoryName}
            >
              update
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default CategoryItem;
