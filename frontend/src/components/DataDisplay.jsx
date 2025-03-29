import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chart.js/auto';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const DataDisplay = ({ data }) => {
    const [chartType, setChartType] = useState('bar'); // Default chart type

    if (!data || !data.data) {
        return <p>No data to display yet.</p>;
    }

    // Process data for word counts, normalizing and filtering words
    const wordCounts = {};
    data.data.split(' ').forEach(word => {
        const cleanedWord = word.trim().toLowerCase();
        if (cleanedWord) {
            wordCounts[cleanedWord] = (wordCounts[cleanedWord] || 0) + 1;
        }
    });

    // Get top 10 words by count for bar, pie, and line charts
    const labels = Object.keys(wordCounts)
        .sort((a, b) => wordCounts[b] - wordCounts[a])
        .slice(0, 10);

    const chartDataCommon = {
        labels: labels,
        datasets: [{
            label: 'Word Count',
            data: labels.map(label => wordCounts[label]),
        }],
    };

    // Chart options for bar, pie, and line charts
    const optionsCommon = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Top 10 Words - ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
            },
        },
    };

    // Render the selected chart type
    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return (
                    <Bar
                        data={{
                            ...chartDataCommon,
                            datasets: [{
                                ...chartDataCommon.datasets[0],
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            }],
                        }}
                        options={optionsCommon}
                    />
                );
            case 'pie':
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '700px', height: '700px' }}>
                            <Pie
                                data={{
                                    ...chartDataCommon,
                                    datasets: [{
                                        ...chartDataCommon.datasets[0],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.5)',
                                            'rgba(54, 162, 235, 0.5)',
                                            'rgba(255, 206, 86, 0.5)',
                                            'rgba(75, 192, 192, 0.5)',
                                            'rgba(153, 102, 255, 0.5)',
                                            'rgba(255, 159, 64, 0.5)',
                                            'rgba(255, 0, 0, 0.5)',
                                            'rgba(0, 255, 0, 0.5)',
                                            'rgba(0, 0, 255, 0.5)',
                                            'rgba(128, 128, 0, 0.5)',
                                        ],
                                        borderWidth: 1,
                                    }],
                                }}
                                options={optionsCommon}
                            />
                        </div>

                    </div>
                );
            case 'line':
                return (
                    <Line
                        data={{
                            ...chartDataCommon,
                            datasets: [{
                                ...chartDataCommon.datasets[0],
                                borderColor: 'rgba(75,192,192,1)',
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                fill: true,
                            }],
                        }}
                        options={optionsCommon}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Scraped Data</h2>
            <p>{data.data}</p>

            <div>
                <button onClick={() => setChartType('bar')}>Bar Chart</button>
                <button onClick={() => setChartType('pie')}>Pie Chart</button>
                <button onClick={() => setChartType('line')}>Line Chart</button>
            </div>

            {renderChart()}
        </div>
    );
};

export default DataDisplay;
