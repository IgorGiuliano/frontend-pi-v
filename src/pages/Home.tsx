import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import YouTube from 'react-youtube';
import Graph from '../components/Graph';
import '../styles/HomeStyle.scss';

export default function Home() {
    return (
        <div className="wrapper">
            <header>
                <a href="/">
                    Projeto Integrador VI
                </a>
                <ul>
                    <li>
                        <a href="/login">
                            <FaUserAlt
                                size="24px"
                            />
                        </a>
                    </li>
                </ul>
            </header>
            <main>
                <div className="container-resumo">
                    <div>

                        <h1>Dispositivo para mensurar o peso de resíduos sólidos em lixeiras e caçambas</h1>
                        <p>
                            O projeto foi desenvolvido na disciplina “Projeto Integrador VI”, do curso de engenharia da computação do Centro Universitário Senac, com o
                            objetivo de criar um dispositivo capaz de identificar a alocação de resíduos sólidos em uma lixeira ou caçamba, e através do WiFi se
                            comunicar com uma aplicação que facilite o acompanhamento do descarte de resíduos sólidos.
                        </p>
                    </div>
                </div>
                <div className="container-video">
                    <YouTube
                        videoId="bPSlLHnN1Ac"
                    />
                </div>
                <div className="container-informacoes">
                    <div className="container-grafico">
                        <Graph />
                    </div>
                </div>
            </main>
            <footer />
        </div>
    );
}
