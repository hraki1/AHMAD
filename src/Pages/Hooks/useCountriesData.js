import { useState, useEffect } from "react";

export default function useCountriesData() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://192.168.100.13:3250/api/countries")
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
