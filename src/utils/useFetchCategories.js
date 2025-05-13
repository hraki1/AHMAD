// hooks/useFetchCategories.js
import { useEffect, useState } from "react";

export default function useFetchCategories(parentId = null) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://192.168.100.13:3250/api/categories";

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const url =
          parentId === null
            ? `${BASE_URL}?parentId=null`
            : `${BASE_URL}?parentId=${parentId}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched Categories in Header:", data?.data); // Log the raw data

        if (data?.data) {
          const formatted = data.data.map((category) => ({
            id: category.id,
            img: category.description?.image || "",
            title: category.description?.name || "No Title",
            count: category.products?.length || 0,
            name: category.description.name || "no name",
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
  }, [parentId]);

  return { categories, loading, error };
}
