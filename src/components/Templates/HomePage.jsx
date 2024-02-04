import React, { useEffect, useState } from 'react';
import TableCoin from '../modules/TableCoin';
import Pagination from '../modules/Pagination';

function HomePage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  console.log(BASE_URL, API_KEY);
  const getCoinList = () => {
    return `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=${API_KEY}`;
  };

  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(getCoinList());
        const json = await res.json();
        console.log(json);
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <Pagination />
      <TableCoin coins={coins} isLoading={isLoading} />
    </div>
  );
}

export default HomePage;
