import CategoryItem from "./category";
import { TCategory } from "./types";

type Props = {
  categories: TCategory[];
};

function CategoryList({ categories }: Props) {
  return (
    <div className="flex flex-wrap gap-10">
      {categories?.map((category) => (
        <CategoryItem key={category.categoryId} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;
