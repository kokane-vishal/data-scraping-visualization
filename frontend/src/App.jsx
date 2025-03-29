import React, { useState } from 'react';
import ScrapeForm from './components/ScrapeForm';
import DataDisplay from './components/DataDisplay';
import './App.css'

const App = () => {
  const [scrapedData, setScrapedData] = useState(null);

  const handleDataScraped = (data) => {
    setScrapedData(data);
  };

  return (
    <div>
      <h1>Web Scraper</h1>
      <ScrapeForm onDataScraped={handleDataScraped} />
      <DataDisplay data={scrapedData} />
    </div>
  );
};

export default App;

