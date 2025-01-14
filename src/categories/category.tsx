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
import { LoaderPinwheel } from "lucide-react";
type Props = {
  category: TCategory;
};

function CategoryItem({ category }: Props) {
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate: deleteCategoryMutation, isPending: isDeleting } = useMutation(
    {
      mutationFn: deleteCategory,
      onSuccess(data) {
        toast.success(data.content);
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const { mutate: updateCategoryMutation, isPending: isUpdating } = useMutation(
    {
      mutationFn: updateCategory,
      onSuccess(data) {
        toast.success(data.content.categoryName + " updated successfully");
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError(error) {
        toast.error(error.message);
      },
    }
  );

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
            disabled={isDeleting || isUpdating}
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
              onClick={() => deleteCategoryMutation(category.categoryId)}
              disabled={isDeleting || isUpdating}
            >
              {isDeleting ? (
                <>
                  <LoaderPinwheel color="white" className="animate-spin" />
                  <span>deleting...</span>
                </>
              ) : (
                "delete"
              )}
            </Button>

            <Button
              variant={"secondary"}
              disabled={isDeleting || isUpdating}
              className="transition-all"
              onClick={() =>
                updateCategoryMutation({
                  categoryId: category.categoryId,
                  categoryName: updatedCategoryName,
                })
              }
            >
              {isUpdating ? (
                <>
                  <LoaderPinwheel color="white" className="animate-spin" />
                  <span>updating</span>
                </>
              ) : (
                "update"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default CategoryItem;
