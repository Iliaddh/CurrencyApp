import React, { useEffect, useState } from 'react'
import {RotatingLines} from "react-loader-spinner";
import styles from "./Search.module.css"

function Search({currency, setCurrency}) {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const searchCoin = (query) => `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

    const[text, setText] = useState("");
    const[coins, setCoins] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setCoins([])
        if(!text) {
          setIsLoading(false);
          return
        };
        const search = async () => {
            const res = await fetch(searchCoin(text));
            const json = await res.json();
            console.log(json)
            if(json.coins){
              setIsLoading(false)
              setCoins(json.coins)
            };
        };
        setIsLoading(true)
        search();
    }, [text])
  return (
    <div className={styles.searchBox}>
        <input 
            type="text" 
            placeholder='Search' 
            value={text} 
            onChange={(e) => setText(e.target.value)} />
        <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
        </select>
        {(!!coins.length || isLoading) && (
          <div className={styles.searchResult}>
          {isLoading && <RotatingLines width='50px' height='50px' strokeWidth='2' strokeColor='#3874ff'/>}
          <ul>
            {coins.map(coin => <li key={coin.id}>
              <img src={coin.thumb} alt={coin.name}/>
              <p>{coin.name}</p>
            </li>)}
          </ul>
        </div>
        )}
    </div>
  )
}

export default Search