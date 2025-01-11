import "./App.css";

import { fetchCategories } from "./api/api";
import CategoryList from "./categories/categoryList";
import MyForm from "./categories/createCategory";

import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "./skelitons/skeletonCard";
import { toast } from "sonner";

function App() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (error) {
    return toast.error("Failed to fetch categories");
  }

  return (
    <div className="">
      <MyForm />
      {categories && <CategoryList categories={categories} />}
    </div>
  );
}

export default App;
