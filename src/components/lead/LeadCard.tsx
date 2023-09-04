import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface LeadCardProps {
  lead: {
    name: string;
    lead_name: string;
    status: string;
    lead_owner: string;
    // Add more properties as needed
  };
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  return (
    <Card className="lead-card" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{lead.name}</Typography>
        <Typography variant="body1">{lead.lead_name}</Typography>
        <Typography variant="body2">Status: {lead.status}</Typography>
        <Typography variant="body2">Lead Owner: {lead.lead_owner}</Typography>
        {/* Add more fields as needed */}
      </CardContent>
    </Card>
  );
};

export default LeadCard;
