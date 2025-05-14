// hooks/useFetchBrands.js
import { useEffect, useState } from "react";

export default function useFetchBrands(customUrl = null) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = customUrl || "http://192.168.100.13:3250/api/brands";

  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data?.data) {
          const formatted = data.data.map((brand) => ({
            id: brand.id,
            name: brand.name,
            slug: brand.slug,
            image: brand.image,
            description: brand.description,
            isActive: brand.isActive,
            count: brand.products?.length || 0,
          }));

          setBrands(formatted);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError("Error fetching brands data");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandsData();
  }, [BASE_URL]);

  return { brands, loading, error };
}
