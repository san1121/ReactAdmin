import React from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import "./stockChartBox.scss";

type Props = {
  color: string;
  icon: string;
  title: string;
  stockValue: number ;
  totalItems: number ;
  totalStockQuantity: number;
  dataKey: string;
  chartData: { name: string; stockValue: number }[];
};

const StockChartBox = (props: Props) => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <h1>₹{props.stockValue}</h1>
        <p>Total Items: {props.totalItems}</p>
        <p>Total Stock Quantity: {props.totalStockQuantity}</p>
        <Link to="/" style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={props.chartData}>
                \
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 60 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span className="percentage" style={{ color: props.stockValue < 0 ? "tomato" : "limegreen" }}>
            
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};

export default StockChartBox;
