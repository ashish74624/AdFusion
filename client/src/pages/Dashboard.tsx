import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ChartData,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement);

interface ReportData {
    labels: string[];
    impressions: number[];
    clicks: number[];
}

const Dashboard: React.FC = () => {
    const [reports, setReports] = useState<ReportData | null>(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchReports = async () => {
            try {
                const response = await fetch("http://localhost:3001/"); // Replace with your API endpoint
                const data = await response.json();
                const parsedReports: ReportData = JSON.parse(data.reports.replace(/&quot;/g, '"')); // Parse the reports data
                setReports(parsedReports);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    // Chart.js data configuration (with explicit typing)
    const chartData: ChartData<"line", number[], string> = reports
        ? {
            labels: reports.labels,
            datasets: [
                {
                    label: "Impressions",
                    data: reports.impressions,
                    backgroundColor: "rgb(225, 233, 240, 0.3)",
                    borderColor: "rgba(205, 215, 223, 0.7)",
                    pointBorderColor: "rgba(205, 215, 223)",
                    pointBackgroundColor: "rgba(205, 215, 223)",
                    pointBorderWidth: 3,
                    borderWidth: 1,
                },
                {
                    label: "Clicks",
                    data: reports.clicks,
                    backgroundColor: "rgba(232, 230, 255, 0.2)",
                    borderColor: "rgba(198, 192, 255, 0.7)",
                    pointBorderColor: "rgba(198, 192, 255)",
                    pointBackgroundColor: "rgba(198, 192, 255)",
                    pointBorderWidth: 3,
                    borderWidth: 1,
                },
            ],
        }
        : {
            labels: [],
            datasets: [],
        };

    // Chart.js options configuration
    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    fontSize: 11,
                    color: "#969da5",
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                    zeroLineColor: "rgba(0, 0, 0, 0.05)",
                },
            },
            y: {
                beginAtZero: true,
                stepSize: 500,
                grid: {
                    display: true,
                },
            },
        },
    };

    return (
        <div className="p-4">
            <h3 className="text-2xl font-semibold mb-4">Dashboard</h3>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {reports ? (
                    <div className="relative h-80">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
