import CategorySkeleton from "./skeletonCard";

export default function SkeltonCategoryList() {
  return (
    <div className="flex flex-wrap gap-10">
      {[...Array(10)].map((_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </div>
  );
}
