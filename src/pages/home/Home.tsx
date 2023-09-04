import { useState, useEffect } from 'react';
import { combinedChartBox } from '../../data';
import { chartBoxStock } from '../../data';
import StockChartBox from '../../components/stockChartBox/StockChartBox';
import axios from 'axios';

import "./home.scss"
import ChartBox from "../../components/chartBox/ChartBox"
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from "../../data"
import TopBox from "../../components/topBox/TopBox"
import BarChartBox from "../../components/barChartBox/BarChartBox"
import PieChartBox from "../../components/pieChartBox/PieChartBox"
import BigChartBox from "../../components/bigChartBox/BigChartBox"
//import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Home = () => {

  const [stockData, setStockData] = useState({
    stockValue: 0,
    totalItems: 0,
    totalStockQuantity: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [stockResponse, itemsResponse, stockQuantityResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/stocks"),
          axios.get("http://localhost:3001/api/items"),
          axios.get("http://localhost:3001/api/stock-quantity"),
        ]);

        const stockValue = stockResponse.data.totalStockValue;
        const totalItems = itemsResponse.data.TotalItems;
        const totalStockQuantity = stockQuantityResponse.data.totalStockQuantity;

        setStockData({ stockValue, totalItems, totalStockQuantity });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="box box1"><TopBox/></div>
      <div className="box box2"><ChartBox {...chartBoxUser}/></div>
      <div className="box box3"><ChartBox {...chartBoxProduct} number={stockData.stockValue}/></div>
      <div className="box box4"><PieChartBox/></div>
      <div className="box box5"><ChartBox {...chartBoxConversion}/></div>
      <div className="box box6"><ChartBox {...chartBoxRevenue}/></div>
      <div className="box box7"><BigChartBox/></div>
      <div className="box box8"><BarChartBox{...barChartBoxVisit}/></div>
      <div className="box box9"><BarChartBox{...barChartBoxRevenue}/></div>
      <div className="box box10">
        < StockChartBox color="purple"
          icon="/stockIcon.svg"
          title="Stock Overview"
          {...stockData}
          dataKey="stockValue"
          chartData={[]} />
      </div>
      <div className="box box10">
        <ChartBox
          color="purple"
          icon="/stockIcon.svg"
          title="Stock Overview"
          number={stockData.stockValue}
          percentage={0} // Update with the actual percentage if needed
          dataKey="totalStockValue"
          chartData={[]}
        />
      </div>
      <div className="box box11">
        <ChartBox
          color="orange"
          icon="/itemIcon.svg"
          title="Total Items"
          number={stockData.totalItems}
          percentage={0} // Update with the actual percentage if needed
          dataKey="totalItems"
          chartData={[]}
        />
      </div>
      <div className="box box12">
        <ChartBox
          color="green"
          icon="/quantityIcon.svg"
          title="Total Stock Quantity"
          number={stockData.totalStockQuantity}
          percentage={0} // Update with the actual percentage if needed
          dataKey="totalStockQuantity"
          chartData={[]}
        />
      </div>
      
    </div>
    
  )
}

export default Home