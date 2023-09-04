import React, { useState, useEffect } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  CircularProgress,
  Alert,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import axios from 'axios';
import LeadCard from '../../components/lead/LeadCard';
import OpportunityCard from '../../components/opportunity/OpportunityCard';
import QuotationCard from '../../components/quotation/QuotationCard';
import SalesOrderCard from '../../components/salesOrder/SalesOrder';
import "./salesDashboard.scss";

interface User {
  name: string; // Adjust this to match the actual structure of a user object
  // Other properties...
}

const SalesDashboard: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [salesOrders, setSalesOrders] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<any[]>([]);
  const [filteredQuotations, setFilteredQuotations] = useState<any[]>([]);
  const [filteredSalesOrders, setFilteredSalesOrders] = useState<any[]>([]);
  const [ownerList, setOwnerList] = useState<string[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('lead');

  useEffect(() => {
    fetchSalesData();
    fetchOwnerList();
  }, []);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [leadsResponse, opportunitiesResponse, quotationsResponse, salesOrdersResponse] = await Promise.all([
        axios.get('http://localhost:3001/api/leads'),
        axios.get('http://localhost:3001/api/opportunities'),
        axios.get('http://localhost:3001/api/quotations'),
        axios.get('http://localhost:3001/api/salesorders'), // Update the endpoint
      ]);

      setLeads(leadsResponse.data);
      setOpportunities(opportunitiesResponse.data);
      setQuotations(quotationsResponse.data);
      setSalesOrders(salesOrdersResponse.data);
      setFilteredLeads(leadsResponse.data);
      setFilteredOpportunities(opportunitiesResponse.data);
      setFilteredQuotations(quotationsResponse.data);
      setFilteredSalesOrders(salesOrdersResponse.data);

      setLoading(false);
    } catch (error) {
      setError('Error fetching sales data');
      setLoading(false);
    }
  };

  const fetchOwnerList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      const users: User[] = response.data; // Explicitly type users as an array of User
      const uniqueOwners = [...new Set(users.map(user => user.name))];
      setOwnerList(['', ...uniqueOwners]);
    } catch (error) {
      console.error('Error fetching owner list:', error);
    }
  };

  const handleOwnerChange = (event: SelectChangeEvent<string>) => {
    const owner = event.target.value ;
    setSelectedOwner(owner);
    filterSalesData(owner);
  };
  

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    setSelectedTab(newTab);
  };
  

  const filterSalesData = (owner: string) => {
    const filteredLeads = leads.filter((lead) => owner === '' || lead.owner === owner);
    const filteredOpportunities = opportunities.filter((opportunity) => owner === '' || opportunity.owner === owner);
    const filteredQuotations = quotations.filter((quotation) => owner === '' || quotation.owner === owner);
    const filteredSalesOrders = salesOrders.filter((salesOrder) => owner === '' || salesOrder.owner === owner);

    setFilteredLeads(filteredLeads);
    setFilteredOpportunities(filteredOpportunities);
    setFilteredQuotations(filteredQuotations);
    setFilteredSalesOrders(filteredSalesOrders);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}md={12} sx={{ display: 'flex',justifyContent:'flex-end',alignItems: 'center'}}>
        <FormControl variant="outlined" sx={{ minWidth: '150px',backgroundColor:'skyblue' }}>
          <InputLabel id="owner-select-label" sx={{color:'white'}}>Owner</InputLabel>
          <Select
            labelId="owner-select-label"
            id="owner-select"
            value={selectedOwner}
            onChange={handleOwnerChange}
            
          

          >
            <MenuItem value="">All</MenuItem>
            {ownerList.map((owner) => (
              <MenuItem key={owner} value={owner}>
                {owner || 'Unknown Owner'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange} centered >
            <Tab label="Lead" value="lead" sx={{color:'white'}}/>
            <Tab label="Opportunity" value="opportunity" sx={{color:'white'}} />
            <Tab label="Quotation" value="quotation" sx={{color:'white'}}/>
            <Tab label="Sales Order" value="salesOrder"sx={{color:'white'}} />
          </Tabs>
        </Box>
        <Box p={3}>
          {selectedTab === 'lead' && (
            <Grid container spacing={2}>
              {filteredLeads.map((lead) => (
                <Grid item xs={12} md={4} key={lead.name}>
                  <div className='zoom-card'>
                    <LeadCard lead={lead} />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
          {selectedTab === 'opportunity' && (
            <Grid container spacing={2}>
              {filteredOpportunities.map((opportunity) => (
                <Grid item xs={12} md={4} key={opportunity.name}>
                  <div className='zoom-card'>
                    <OpportunityCard opportunity={opportunity} />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
          {selectedTab === 'quotation' && (
            <Grid container spacing={2}>
              {filteredQuotations.map((quotation) => (
                <Grid item xs={12} md={4} key={quotation.name}>
                  <div className='zoom-card'>
                    <QuotationCard quotation={quotation} />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
          {selectedTab === 'salesOrder' && (
            <Grid container spacing={2}>
              {filteredSalesOrders.map((salesOrder) => (
                <Grid item xs={12} md={4} key={salesOrder.id}>
                  <div className='zoom-card'>
                    <SalesOrderCard salesOrder={salesOrder} />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SalesDashboard;