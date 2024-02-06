import React from 'react'
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import {RotatingLines} from "react-loader-spinner";
import styles from "./TableCoin.module.css"
function TableCoin({coins, isLoading, currency, setChart}) {
    
  return (
    <div className={styles.container}>
        
       {isLoading ? <RotatingLines strokeColor='#3874ff' strokeWidth='2'></RotatingLines> :
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>Total Volume</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {coins.map((coin) => (
                    <TableRow coin = {coin} key={coin.id} currency={currency} setChart={setChart}/>
                ))}
            </tbody>
        </table>
       
       }
    </div>
  )
}

export default TableCoin;


const TableRow = ({
    
    coin: {
        id,
        name,
        image, 
        symbol,
        total_volume, 
        current_price,
        price_change_percentage_24h
    },currency, setChart,
    
    
    }) =>{
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const API_KEY = import.meta.env.VITE_API_KEY;
        const marketChart = (coin) => `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`;


        const showHandler =async () =>{
            try{
                const res = await fetch(marketChart(id));
                const json = await res.json();
                setChart(json)
            }catch(error){
                setChart(null)
            }
        }
    return (
        <tr >
            <td>
                <div className={styles.symbol} onClick={showHandler}>
                    <img src={image} alt="" />
                    <span>{symbol.toUpperCase()}</span>
                </div>
                </td>
                <td>{name}</td>
                <td>{
                    currency === "usd" && "$"
                    
                }
                {
                    currency === "eur" && "€"
                }

{
                    currency === "jpy" && "¥"
                }
                {current_price.toLocaleString()}</td>
                <td className={price_change_percentage_24h> 0 ? styles.success : styles.error}>{ price_change_percentage_24h.toFixed(2)}%</td>
                <td>{total_volume.toLocaleString()}</td>
                <td><img src={price_change_percentage_24h >0 ? chartUp: chartDown} alt={name} /></td>
         </tr>
    )
}