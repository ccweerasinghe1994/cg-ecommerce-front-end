import "./App.css";

import { fetchCategories } from "./api/api";
import CategoryList from "./categories/categoryList";
import MyForm from "./categories/createCategory";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import { queryConfigs } from "./tanstackQueryConfigs/queryConfigs";
import SkeltonCategoryList from "./skelitons/categorySkelitonList";
import { useState } from "react";
import CategoryPagination from "./categories/categoryPagination";

function App() {
  const [page, setPage] = useState<number>(0);
  const [pageSize] = useState<number>(8);
  const {
    data: categories,
    isLoading,
    isFetching,
    isError,
    isPending,
    error,
  } = useQuery({
    ...queryConfigs,
    queryKey: ["categories", page, pageSize],
    queryFn: () => fetchCategories(page, pageSize),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    return toast.error(error.message);
  }

  return (
    <div className="">
      <MyForm />
      {isFetching || isPending ? (
        <SkeltonCategoryList />
      ) : (
        <CategoryList categories={categories?.content ?? []} />
      )}
      {/* {isFetching && <SkeltonCategoryList />} */}
      <CategoryPagination onPageChange={setPage} />
    </div>
  );
}

export default App;
