import React, { useEffect, useState } from 'react'

function Search({currency, setCurrency}) {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const searchCoin = (query) => `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

    const[text, setText] = useState("");
    const[coins, setCoins] = useState([]);
    useEffect(() => {
        if(!text) return;
        const search = async () => {
            const res = await fetch(searchCoin(text));
            const json = await res.json();
            console.log(json)
            if(json.coins) setCoins(json.coins);
        };
        search();
    }, [text])
  return (
    <div>
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
    </div>
  )
}

export default Search