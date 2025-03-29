import React, { useState } from 'react';
import axios from 'axios';

const ScrapeForm = ({ onDataScraped }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/scrapeddata/scrape/', { url });
            onDataScraped(response.data);
        } catch (error) {
            console.error('Error scraping data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to scrape"
                required
            />
            <button type="submit">Scrape</button>
        </form>
    );
};

export default ScrapeForm;