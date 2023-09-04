import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface QuotationCardProps {
  quotation: {
    name: string;
    customer_name: string;
    quotation_to: string;
    status: string;
    // Add more properties as needed
  };
}

const QuotationCard: React.FC<QuotationCardProps> = ({ quotation }) => {
  return (
    <Card className='quotation-card' sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{quotation.name}</Typography>
        <Typography variant="body1">{quotation.customer_name}</Typography>
        <Typography variant="body2">Quotation To: {quotation.quotation_to}</Typography>
        <Typography variant="body2">Status: {quotation.status}</Typography>
        {/* Add more fields as needed */}
      </CardContent>
    </Card>
  );
};

export default QuotationCard;
