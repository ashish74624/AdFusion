import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ReportData {
    labels: string[];
    impressions: number[];
    clicks: number[];
}

interface ChartDataPoint {
    label: string;
    impressions: number;
    clicks: number;
}

const Dashboard: React.FC = () => {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("http://localhost:3001/");
                const data = await response.json();
                const parsedReports: ReportData = JSON.parse(data.reports.replace(/&quot;/g, '"'));

                // Transform to Recharts format
                const formattedData: ChartDataPoint[] = parsedReports.labels.map((label, index) => ({
                    label,
                    impressions: parsedReports.impressions[index],
                    clicks: parsedReports.clicks[index],
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="p-4">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Dashboard</h3>
            <div className="bg-white p-6 rounded-2xl shadow-md">
                {chartData.length > 0 ? (
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" stroke="#969da5" fontSize={12} />
                                <YAxis stroke="#969da5" fontSize={12} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="impressions"
                                    stroke="#97b4d3"
                                    strokeWidth={2}
                                    activeDot={{ r: 6 }}
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="clicks"
                                    stroke="#a18df2"
                                    strokeWidth={2}
                                    activeDot={{ r: 6 }}
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                />

                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
