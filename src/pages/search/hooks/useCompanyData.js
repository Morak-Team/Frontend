import { useEffect, useState } from "react";
import { getAllCompanies } from "@apis/company/getAllCompanies";

export const useCompanyData = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const raw = await getAllCompanies();
        const enriched = raw
          .filter((c) => c.latitude && c.longitude)
          .map((c) => ({
            id: c.companyId,
            name: c.companyName,
            category: c.companyCategory,
            coords: { lat: c.latitude, lng: c.longitude },
          }));
        setCompanies(enriched);
      } catch (err) {
        console.error("기업 데이터 로드 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return { companies, loading, error };
};
