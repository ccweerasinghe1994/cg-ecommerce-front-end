import { useEffect, useState } from "react";
import "./App.css";

import { TCategory } from "./categories/types";
import MyForm from "./categories/createCategory";
import CategoryList from "./categories/categoryList";

function App() {
  const [categories, setCategories] = useState<TCategory[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch("/api/public/categories");
        setReload(false);

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} ${response.statusText}`
          );
        }
        // Handle cases with no content (e.g., DELETE requests)
        if (response.status === 204) {
          return {} as TCategory[]; // Type assertion for void responses
        }

        const data: TCategory[] = await response.json();
        setCategories(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Fetch Error:", error.message);
          throw error; // Re-throw the error for further handling
        } else {
          console.error("Unexpected Error:", error);
          throw error;
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [reload]);
  if (loading && categories?.length === 0) {
    return <div className="div">Loading...</div>;
  }
  return (
    <div className="">
      <MyForm onReload={setReload} />
      {categories && <CategoryList categories={categories} />}
    </div>
  );
}

export default App;
