import React, { useLayoutEffect } from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { useAuth } from '../contexts/auth';
import '../styles/Profile.scss';

export default function Profile() {
    const { Logout } = useAuth();

    useLayoutEffect(() => {
        const storagedUser = sessionStorage.getItem('@App:cod');
        const storagedToken = sessionStorage.getItem('@App:token');

        if (!storagedToken && !storagedUser) {
            window.location.replace('/');
        }
    }, []);

    return (
        <div className="wrapper">
            <header>
                <a href="/">
                    Projeto Integrador V
                </a>
                <ul>
                    <li>
                        <a href="/dashboard">
                            <FaHome />
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            onClick={Logout}
                        >
                            <BsBoxArrowRight />
                        </a>
                    </li>
                </ul>
            </header>
            <main>
                <div className="container-reg">
                    <div className="container-registro">
                        <form action="">
                            <h1>
                                Editar perfil
                            </h1>
                            <div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Nome"
                                        className="mediumInput"
                                    />
                                </div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Sobrenome"
                                        className="mediumInput"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Email"
                                        className="mediumInput"
                                    />
                                </div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Confirme seu email"
                                        className="mediumInput"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Senha"
                                        className="mediumInput"
                                    />
                                </div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Confirme sua senha"
                                        className="mediumInput"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Cargo"
                                        className="mediumInput"
                                    />
                                </div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Instituição"
                                        className="smallInput"
                                    />
                                    <input
                                        type=""
                                        placeholder="Tipo de Instituição"
                                        className="smallInput"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="CPF"
                                        className="mediumInput"
                                    />
                                </div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="CNPJ"
                                        className="mediumInput"
                                    />
                                </div>
                            </div>
                            <button type="submit">
                                Editar
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <footer>
                @IgorGiuliano - 2022
            </footer>
        </div>
    );
}
