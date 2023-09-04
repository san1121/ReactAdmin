import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface SalesOrderCardProps {
  salesOrder: {
    name: string;
    customer_name: string;
    base_grand_total: number;
    base_net_total: number;
    billing_status: string;
    delivery_date: string;
    delivery_status: string;
    // Add more properties as needed
  };
}

const SalesOrderCard: React.FC<SalesOrderCardProps> = ({ salesOrder }) => {
  return (
    <Card className="salesOrder-card" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{salesOrder.name}</Typography>
        <Typography variant="body1">C/Name: {salesOrder.customer_name}</Typography>
        <Typography variant="body2">Base_Grand_Total: ₹{salesOrder.base_grand_total}</Typography>
        <Typography variant="body2">Base_Net_total: ₹{salesOrder.base_net_total}</Typography>
        <Typography variant="body2">Billing Status: {salesOrder.billing_status}</Typography>
        <Typography variant="body2">Delivery Date: {salesOrder.delivery_date}</Typography>
        <Typography variant="body2">Delivery Status: {salesOrder.delivery_status}</Typography>
        {/* Add more fields as needed */}
      </CardContent>
    </Card>
  );
};

export default SalesOrderCard;
