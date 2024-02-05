import React, { useEffect, useState } from 'react';
import TableCoin from '../modules/TableCoin';
import Pagination from '../modules/Pagination';
import Search from '../modules/Search';

function HomePage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const getCoinList = (page, currency) =>  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`;

  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd")


  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [page, currency]); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency}></Search>
      <TableCoin coins={coins} isLoading={isLoading} currency={currency} />
      <Pagination page= {page} setPage ={setPage} />
    </div>
  );
}

export default HomePage;