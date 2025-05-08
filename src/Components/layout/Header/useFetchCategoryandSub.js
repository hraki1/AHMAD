// hooks/useFetchCategories.js
import { useEffect, useState } from "react";

export default function useFetchCategories(parentId = null) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://192.168.100.13:3250/api/categories"; // Assuming this now returns ALL categories

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data?.data) {
          const formatted = data.data.map((category) => ({
            id: category.id,
            img: category.description?.image || "",
            title: category.description?.name || "No Title",
            parentId: category.parent_id, // Use the correct parent ID field
          }));
          setCategories(formatted);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, [parentId]); // parentId is no longer really needed here if fetching all

  return { categories, loading, error };
}
