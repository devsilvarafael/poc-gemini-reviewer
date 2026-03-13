// ❌ VIOLAÇÃO: Uso extensivo de `any`

import { useState, useEffect } from 'react';

// ❌ VIOLAÇÃO: any no tipo de retorno e nos parâmetros
export function useFetchData(url: string): any {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        // ❌ VIOLAÇÃO: any no resultado do fetch
        const result: any = await response.json();
        setData(result);
      } catch (err: any) {
        // ❌ VIOLAÇÃO: any no catch
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
