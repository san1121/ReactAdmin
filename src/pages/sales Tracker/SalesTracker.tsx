import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';

interface DocumentStage {
  name: string;
  status: string;
  creation: string;
}

function SaleTracker() {
  const [searchText, setSearchText] = useState('');
  const [documentStages, setDocumentStages] = useState<DocumentStage[]>([]);
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const stages = ['Lead', 'Opportunity', 'Quotation', 'SalesOrder'];

  const searchDocument = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/document-journey?searchText=${searchText}`);
      setDocumentStages(getDocumentStages(response.data));
      setActiveSteps(getActiveSteps(response.data));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const getDocumentStages = (journeyData: any): DocumentStage[] => {
    const stagesData: DocumentStage[] = [];

    for (const stage of stages) {
      const stageData = journeyData[stage];
      if (stageData) {
        stagesData.push({
          name: stageData.name,
          status: stageData.status,
          creation: stageData.creation,
        });
      }
    }

    return stagesData;
  };

  const getActiveSteps = (journeyData: any): number[] => {
    const activeSteps: number[] = [];

    for (let i = 0; i < stages.length; i++) {
      if (journeyData[stages[i]]) {
        activeSteps.push(i);
      }
    }

    return activeSteps;
  };

  useEffect(() => {
    setActiveSteps(getActiveSteps(documentStages));
  }, [documentStages]);

  return (
    <div>
      <TextField
        type="text"
        label="Search Document"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button variant="contained" onClick={searchDocument}>
        Search
      </Button>

      <Stepper alternativeLabel>
        {stages.map((stage, index) => (
          <Step key={stage} completed={activeSteps.includes(index)}>
            <StepLabel>{`${stage} Stage`}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {documentStages.map((stage, index) => (
        <div key={index}>
          <Typography variant="h6">{`${stage.name} Stage`}</Typography>
          <Typography variant="subtitle1">Name: {stage.name}</Typography>
          <Typography variant="subtitle1">Status: {stage.status}</Typography>
          <Typography variant="subtitle1">Creation Date: {stage.creation}</Typography>
        </div>
      ))}
    </div>
  );
}

export default SaleTracker;
