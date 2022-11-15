import React, { useEffect, useState } from 'react';
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
import api from '../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Graph() {
    const [weight, setWeight] = useState([]);
    const [hour, setHour] = useState([]);

    const options = {
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
                radius: 4
            },
            line: {
                tension: 0.4
            }
        }
    };

    const data = {
        labels: hour,
        datasets: [
            {
                label: 'Peso',
                data: weight,
                backgroundColor: 'rgba(255, 99, 132, 1)'
            }
        ]
    };

    async function getDataForTheGraph() {
        const result = await api.post('/last-seven-messages', { deviceId: 'LoRaBalance_001' });
        const dados = result.data;
        const peso = [];
        const hora = [];

        dados.map((dado) => {
            peso.push(dado.weight);

            const jikan = new Date(dado.createdAt).getHours();
            const bun = new Date(dado.createdAt).getMinutes();
            const byo = new Date(dado.createdAt).getSeconds();

            hora.push(`${jikan}:${bun}:${byo}`);
            return null;
        });

        peso.reverse();
        hora.reverse();
        setHour(hora);
        setWeight(peso);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getDataForTheGraph();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

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
