import "./App.css";

import { fetchCategories } from "./api/api";
import CategoryList from "./categories/categoryList";
import MyForm from "./categories/createCategory";

import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "./skelitons/skeletonCard";
import { toast } from "sonner";
import { queryConfigs } from "./tanstackQueryConfigs/queryConfigs";

function App() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    ...queryConfigs,
    queryKey: ["categories"],
    queryFn: fetchCategories,
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
