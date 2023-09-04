// server.js
import 'dotenv/config';
import express from 'express';
import initializeFrappeApp from './frappeUtils.js';
//const express = require('express');
//import  {FrappeApp}  from 'frappe-js-sdk';
//const { FrappeApp } = require('frappe-js-sdk');
//const cors = require('cors');
import cors from 'cors'; 

const app = express();
const port = 3001;

// Initialize FrappeApp with authentication
const frappe = initializeFrappeApp();

app.use(cors());
app.use(express.json());

//const SITE_URL = 'https://ithinker.frappe.cloud'; // Replace with your site's URL
//const API_SECRET = 'f8e0b8b00cd7039';
//const API_KEY = '79fe6a89f25c00c';

app.get('/api/customers', async (req, res) => {
 // const frappe = new FrappeApp(SITE_URL, {
   // useToken: true,
    //token: () => `${API_KEY}:${API_SECRET}`,
    //type: 'token',
 // });

  const db = frappe.db();

  try {
    const customers = await db.getDocList('Customer', {
      fields: ['*'],
    });
   // console.log(customers);
    
    //res.header('Content-Type', 'application/json'); 
   // res.set('Content-Type', 'application/json');
    res.json(customers);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// API endpoint for fetching Lead data
app.get('/api/leads', async (req, res) => {
  try {
    const db = frappe.db();
    const leads = await db.getDocList('Lead', {
      fields: ['*'],
    });

    //if (lead_owner) {
      //leads = leads.filter((lead) => lead.lead_owner === lead_owner); // Filter leads by createdBy
   // }
    res.json(leads);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for fetching Opportunity data
app.get('/api/opportunities', async (req, res) => {
  try {
    const db = frappe.db();
    const opportunities = await db.getDocList('Opportunity', {
      fields: ['*'],
    });
    res.json(opportunities);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for fetching Quotations data
app.get('/api/quotations', async (req, res) => {
  try {
    const db = frappe.db();
    const quotations = await db.getDocList('Quotation', {
      fields: ['*'],
    });
    res.json(quotations);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for fetching Billing data
app.get('/api/bills', async (req, res) => {
  try {
    const db = frappe.db();
    const bill = await db.getDocList('bill', {
      fields: ['*'],
    });
    res.json(bill);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

   // API endpoint for fetching User data
app.get('/api/users', async (req, res) => {
  try {
    const db = frappe.db();
    const users = await db.getDocList('User', {
      fields: ['*'],
    });
    res.json(users);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//API end point for fetching salesOrder
app.get('/api/salesorders', async (req, res) => {
  try {
    const db = frappe.db();
    const users = await db.getDocList('Sales Order', {
      fields: ['*'],
    });
    res.json(users);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//API end point for fetching Item
app.get('/api/items', async (req, res) => {
  try {
    const db = frappe.db();
    const items = await db.getDocList('Item', {
      fields: ['name'],
      limit:9999
    });

    const totalCount = items.length;

    res.json({TotalItems:totalCount});
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//API end point for fetching stock_value
app.get('/api/stocks', async (req, res) => {
  try {
    const db = frappe.db();
    const items = await db.getDocList('Bin', {
      fields: ['stock_value'],
      limit: 9999
    });

    let sum = 0;
    for (let item of items) {
      sum += item.stock_value;
    }

    res.json({ totalStockValue: sum }); // Send the sum as a JSON object
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/stock-quantity', async (req, res) => {
  try {
    const db = frappe.db();
    const items = await db.getDocList('Bin', {
      fields: ['actual_qty'],
      limit: 9999
    });

    let sum = 0;
    for (let item of items) {
      sum += item.actual_qty;
    }

    res.json({ totalStockQuantity: sum }); // Send the sum as a JSON object
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint to search for a document's journey
// server.js

// ... (other imports and app initialization)

// API endpoint for fetching the document journey
// API endpoint for fetching the document journey
// Define an endpoint to search for a document's journey
app.get('/api/document-journey', async (req, res) => {
  try {
    const searchText = req.query.searchText; // Get the search text from the query parameter

    // Initialize the document journey
    const documentJourney = {
      Lead: null,
      Opportunity: null,
      Quotation: null,
      SalesOrder: null,
    };

    // Search for the document in the Lead stage
    const lead = await searchDocumentInStage('Lead', searchText);
    if (lead) {
      documentJourney.Lead = {
        title: lead.title,
        name: lead.name,
        status: lead.status,
        creation: lead.creation,
      };
    }

    // Search for the document in the Opportunity stage
    const opportunity = await searchDocumentInStage('Opportunity', searchText);
    if (opportunity) {
      documentJourney.Opportunity = {
        title: opportunity.title,
        name: opportunity.name,
        status: opportunity.status,
        creation: opportunity.creation,
        transaction_date: opportunity.transaction_date,
      };
    }

    // Search for the document in the Quotation stage
    const quotation = await searchDocumentInStage('Quotation', searchText);
    if (quotation) {
      documentJourney.Quotation = {
        title: quotation.title,
        name: quotation.name,
        status: quotation.status,
        creation: quotation.creation,
        transaction_date: quotation.transaction_date,
      };
    }

    // Search for the document in the Sales Order stage
    const salesOrder = await searchDocumentInStage('Sales Order', searchText);
    if (salesOrder) {
      documentJourney.SalesOrder = {
        title: salesOrder.title,
        name: salesOrder.name,
        status: salesOrder.status,
        creation: salesOrder.creation,
      };
    }

    res.json(documentJourney);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function searchDocumentInStage(stage, searchText) {
  const db = frappe.db();
  const filters = [
    ['title', '=', searchText],
    // Add more filters as needed based on your requirements
  ];
  const document = await db.getDocList(stage, {
    fields: ['title', 'name', 'status', 'creation'], // Add more fields as needed
    filters: filters,
  });
  return document[0]; // Assuming you want to return the first matching document
}


// ... (other endpoints and app listening)



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
