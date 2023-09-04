import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface OpportunityCardProps {
  opportunity: {
    name: string;
    customer_name: string;
    opportunity_amount: number;
    status: string;
    // Add more properties as needed
  };
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <Card className="opportunity-card" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{opportunity.name}</Typography>
        <Typography variant="body1">{opportunity.customer_name}</Typography>
        <Typography variant="body2">Opportunity Amount: {opportunity.opportunity_amount}</Typography>
        <Typography variant="body2">Status: {opportunity.status}</Typography>
        {/* Add more fields as needed */}
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
