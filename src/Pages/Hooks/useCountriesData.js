import { useState, useEffect } from "react";
import { baseUrl } from "../API/ApiConfig";
export default function useCountriesData() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/countries`)
      .then((res) => {
        if (!res.ok) throw new Error("error When Get Data");
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error");
        setLoading(false);
      });
  }, []);

  return { countries, loading, error };
}
