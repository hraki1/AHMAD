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
        // Fetch shipping zones for each country
        const countriesWithShipping = data.map((country) => {
          return fetch(`${baseUrl}/api/countries/${country.id}`)
            .then((res) => res.json())
            .then((countryDetails) => ({
              ...country,
              ShippingZone: countryDetails.ShippingZone || [],
            }));
        });

        Promise.all(countriesWithShipping).then((completeCountries) => {
          setCountries(completeCountries);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Error");
        setLoading(false);
      });
  }, []);

  return { countries, loading, error };
}
