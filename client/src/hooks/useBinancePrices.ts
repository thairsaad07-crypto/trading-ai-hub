import { useState, useEffect } from 'react';

export interface PriceData {
  symbol: string;
  price: number;
  quantity: number;
  timestamp: string;
  change24h: number;
  high24h: number;
  low24h: number;
}

export interface PricesResponse {
  source: string;
  lastServerUpdate: string;
  data: Record<string, PriceData>;
  count: number;
}

const BINANCE_API_URL = 'http://localhost:3001/api/prices';

export function useBinancePrices() {
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(BINANCE_API_URL);
        if (!response.ok) throw new Error('Failed to fetch prices');
        
        const data: PricesResponse = await response.json();
        setPrices(data.data);
        setLastUpdate(data.lastServerUpdate);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    // جلب الأسعار فوراً
    fetchPrices();

    // جلب الأسعار كل ثانية
    const interval = setInterval(fetchPrices, 1000);

    return () => clearInterval(interval);
  }, []);

  return { prices, loading, error, lastUpdate };
}

export function useSinglePrice(symbol: string) {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`${BINANCE_API_URL}/${symbol}`);
        if (!response.ok) throw new Error('Failed to fetch price');
        
        const data = await response.json();
        setPrice(data.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 1000);

    return () => clearInterval(interval);
  }, [symbol]);

  return { price, loading, error };
}
