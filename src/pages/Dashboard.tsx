/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-alert */
import React, { FormEvent, useEffect, useState } from 'react';
import { FaPlus, FaRegTrashAlt, FaUserAlt } from 'react-icons/fa';
import { BsBoxArrowRight, BsArrowLeft } from 'react-icons/bs';
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
import { useAuth } from '../contexts/auth';
import '../styles/Dashboard.scss';
import api from '../services/api';
import Map from '../components/MapModelOne';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type Sensor = {
    cnpjDaInstituicao: string,
    deviceId: string
}

type Data = {
    createdAt: number;
    deviceId: string;
    id: string;
    weight: number;
}

export default function Dashboard() {
    const { Logout } = useAuth();
    const [storagedUser, setStoragedUser] = useState('');
    const [storagedToken, setStoragedToken] = useState('');
    const [createDeviceId, setCreateDeviceId] = useState('');
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [getSensor, setGetSensor] = useState('');
    const [isShown, setIsShown] = useState('hide');
    const [sensorData, setSensorData] = useState<Data>();
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [weight, setWeight] = useState('');
    const [weightGraph, setWeightGraph] = useState([]);
    const [hourGraph, setHourGraph] = useState([]);

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
        labels: hourGraph,
        datasets: [
            {
                label: 'Peso',
                data: weightGraph,
                backgroundColor: 'rgba(255, 99, 132, 1)'
            }
        ]
    };

    async function findUserSensors(id: object) {
        const result = await api.get('/get-user-sensors', id);
        setSensors(result.data);
    }

    async function getSensorLatestData() {
        if (getSensor !== '') {
            api.defaults.headers.common.Authorization = storagedToken;
            const result = await api.post('/last-message', { deviceId: getSensor });
            setSensorData(result.data);

            if (sensorData?.createdAt !== undefined && sensorData?.createdAt !== null
                && sensorData?.deviceId !== undefined && sensorData?.deviceId !== null
                && sensorData?.weight !== undefined && sensorData?.weight !== null) {
                const min = new Date(sensorData.createdAt).getMinutes();
                const hora = new Date(sensorData.createdAt).getHours();
                const month = new Date(sensorData.createdAt).getMonth();
                const dia = new Date(sensorData.createdAt).getDate();
                const year = new Date(sensorData.createdAt).getFullYear();

                setHour(`${hora}:${min} horas`);
                setDate(`${dia} / ${month + 1} / ${year}`);
                setDeviceName(sensorData.deviceId);
                setWeight(`${(sensorData.weight).toFixed(2)} Kg`);
            }
        }
    }

    async function createSensor(event: FormEvent) {
        event.preventDefault();
        api.defaults.headers.common.Authorization = storagedToken;
        const result = await api.post('/create-device', { id: storagedUser, deviceId: createDeviceId });

        setCreateDeviceId('');
        setIsShown('hide');

        if (result.data.Error) {
            window.alert('Falha ao criar sensor');
        }
    }

    async function deleteSensor(deviceId: object) {
        api.defaults.headers.common.Authorization = storagedToken;
        const result = await api.post('/delete-device', deviceId);
        if (result.data.error) {
            window.alert('Erro ao deletar device');
        }
    }

    async function getDataForTheGraph() {
        if (getSensor !== '') {
            const result = await api.post('/last-seven-messages', { deviceId: getSensor });
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
            setHourGraph(hora);
            setWeightGraph(peso);
        }
    }

    // LOGOUT
    useEffect(() => {
        const auxUser = sessionStorage.getItem('@App:cod');
        const auxToken = sessionStorage.getItem('@App:token');

        if (auxToken !== null && auxUser !== null) {
            setStoragedToken(auxToken);
            setStoragedUser(auxUser);
        } else if (auxToken === null || auxUser === null) {
            Logout();
        }
    });

    // RETRIEVE DATA
    useEffect(() => {
        const interval = setInterval(() => {
            const deviceButton = window.document.getElementById(deviceName);

            if (deviceButton !== null) {
                deviceButton.style.backgroundColor = 'rgb(227, 199, 197)';
            }

            findUserSensors({ id: storagedUser });
            getSensorLatestData();
            getDataForTheGraph();
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <div className="wrapper">
            <header>
                <a href="/">
                    Projeto Integrador VI
                </a>
                <ul>
                    <li>
                        <a href="#">
                            <FaUserAlt
                                size="24px"
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            onClick={Logout}
                        >
                            <BsBoxArrowRight
                                size="24px"
                            />
                        </a>
                    </li>
                </ul>
            </header>
            <main className="main">
                <div className="wrapper-aside">
                    <div className="header-aside">
                        <span>
                            Sensores
                        </span>
                        <span>
                            <a
                                role="button"
                                onClick={
                                    () => {
                                        setIsShown('show');
                                    }
                                }
                            >
                                <FaPlus
                                    size="20px"
                                />
                            </a>
                            <div id="modal" className={isShown}>
                                <div className="modal-main">
                                    <div className="modal-top-container">
                                        <a
                                            role="button"
                                            onClick={
                                                () => {
                                                    setIsShown('hide');
                                                }
                                            }
                                        >
                                            <BsArrowLeft
                                                size="26px"
                                                color="black"
                                            />
                                        </a>
                                    </div>
                                    <div className="modal-form-container">
                                        <form onSubmit={createSensor}>
                                            <input
                                                type="text"
                                                placeholder="Nome do Dispositivo"
                                                value={createDeviceId}
                                                onChange={
                                                    (event) => {
                                                        setCreateDeviceId(event.target.value);
                                                    }
                                                }
                                                required
                                            />
                                            <button>
                                                Criar sensor
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className="main-aside">
                        <ul>
                            {
                                sensors.map(
                                    (sensor) => (
                                        <li className="items" id={sensor.deviceId} key={sensor.deviceId}>
                                            <a
                                                role="button"
                                                onClick={
                                                    () => {
                                                        setGetSensor(sensor.deviceId);
                                                    }
                                                }
                                            >
                                                {sensor.deviceId}
                                            </a>
                                            <a
                                                role="button"
                                                onClick={
                                                    () => {
                                                        deleteSensor({ deviceId: sensor.deviceId });
                                                    }
                                                }
                                            >
                                                <FaRegTrashAlt />
                                            </a>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="wrapper-main">
                    <div className="collectedInfo">
                        {
                            deviceName !== ''
                                ? (
                                    <div>
                                        <div className="cacamba-mais-carregada">
                                            <div className="align">
                                                <table>
                                                    <thead className="table-head">
                                                        <tr>
                                                            <th>Data da última medição:</th>
                                                            <th>Hora da última medição:</th>
                                                            <th>Última medição:</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{date}</td>
                                                            <td>{hour}</td>
                                                            <td>{weight}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="total-de-lixo">
                                            <div className="container-grafico">
                                                <Line
                                                    data={
                                                        data
                                                    }
                                                    options={
                                                        options
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div className="cacamba-mais-carregada" />)
                        }
                    </div>
                    <div className="mapInformation">
                        {
                            deviceName !== '' ? <Map /> : <div />
                        }
                    </div>
                </div>
            </main>
            <footer />
        </div>
    );
}
