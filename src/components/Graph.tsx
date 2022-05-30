import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top' as const
        },
        title: {
            display: true,
            text: 'Peso ao longo do tempo'
        }
    },
    elements: {
        point: {
            radius: 4 // default to disabled in all datasets
        },
        line: {
            tension: 0.4
        }
    }
};

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Peso',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 99, 132, 1)'
        }
    ]
};

export default function Graph() {
    return (
        <Line
            data={
                data
            }
            options={
                options
            }
        />
    );
}
