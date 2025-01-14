import CategoryItem from "./category";
import { TCategory } from "./types";

type Props = {
  categories: TCategory[];
};

function CategoryList({ categories }: Props) {
  const emptyMessage = (
    <div className="text-center mt-20 border-2 border-dashed border-gray-300/10 p-20 rounded-lg">
      <h1 className="text-4xl font-sans font-bold mb-5">No categories found</h1>
      <p>Start by creating a category</p>
    </div>
  );

  if (categories.length === 0) {
    return emptyMessage;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories?.map((category) => (
        <CategoryItem key={category.categoryId} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;
