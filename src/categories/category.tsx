import { deleteCategory, updateCategory } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { TCategory } from "./types";

type Props = {
  category: TCategory;
};

function CategoryItem({ category }: Props) {
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");

  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess(data) {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess(data) {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function handleCategoryNameChange(event: ChangeEvent<HTMLInputElement>) {
    setUpdatedCategoryName(event.target.value);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Category</CardTitle>
          <CardDescription>{category.categoryName}</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={
              updatedCategoryName.length > 0
                ? updatedCategoryName
                : category.categoryName
            }
            onChange={handleCategoryNameChange}
          />
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button
              variant={"destructive"}
              onClick={() => deleteCategoryMutation.mutate(category.categoryId)}
            >
              delete
            </Button>

            <Button
              className="bg-blue-500"
              onClick={() =>
                updateCategoryMutation.mutate({
                  categoryId: category.categoryId,
                  categoryName: updatedCategoryName,
                })
              }
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
