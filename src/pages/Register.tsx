/* eslint-disable no-alert */
import React, { FormEvent, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/RegisterStyle.scss';

export default function Register() {
    const [email, setEmail] = useState('');
    const [emailConfirmation, setEmailConfirmation] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [cargo, setCargo] = useState('');
    const [cnpjDaInstituicao] = useState('03.603.739/0001-86');
    const [nomeDaInstituicao] = useState('Servico Nacional de Aprendizagem Comercial - Senac');
    const [tipoDeInstituicao] = useState('Instituição de Ensino');
    const navigate = useNavigate();

    async function signIn(event: FormEvent) {
        event.preventDefault();
        email.toLocaleLowerCase();
        console.log({
            name,
            lastName,
            email,
            cpf,
            password,
            passwordConfirmation,
            cargo,
            cnpjDaInstituicao,
            nomeDaInstituicao
        });

        email.toLocaleLowerCase();

        const passwordREGEX: RegExp = /^(?=.*[A-Z])(?=.*[!#@$%&-_])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;

        if (!password.match(passwordREGEX)) {
            // eslint-disable-next-line max-len
            window.alert('Senha inválida, favor inserir uma senha com o seguinte padrão: 6 a 20 caracteres, pelo menos 1 número, pelo menos 1 maiúscula, pelo menos 1 minúcula, e pelo menos 1 caractere especial ( !#@$%&-_ )');
        }

        const response = await api.post(
            '/register-user',
            {
                name,
                lastName,
                email,
                cpf,
                password,
                passwordConfirmation,
                cargo,
                cnpjDaInstituicao,
                nomeDaInstituicao
            }
        );

        if (response.data.registered) {
            navigate('/login');
        } else {
            window.alert(`Ocorreu um erro: ${response.data.Error}`);
        }
    }

    return (
        <div className="wrapper">
            <header>
                <a href="/">
                    Projeto Integrador V
                </a>
                <ul>
                    <li>
                        <a href="/">
                            <FaUserAlt
                                size="24px"
                            />
                        </a>
                    </li>
                </ul>
            </header>
            <main>
                <div className="container-reg">
                    <div className="container-registro">
                        <form onSubmit={signIn} id="form">
                            <h1>
                                Registrar
                            </h1>
                            <div>
                                <div className="align">
                                    <input
                                        type="text"
                                        placeholder="Nome"
                                        className="mediumInput"
                                        value={name}
                                        onChange={
                                            (event) => setName(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="align">
                                    <input
                                        type="text"
                                        placeholder="Sobrenome"
                                        className="mediumInput"
                                        value={lastName}
                                        onChange={
                                            (event) => setLastName(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="align">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="mediumInput"
                                        value={email}
                                        onChange={
                                            (event) => setEmail(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="align">
                                    <input
                                        type="email"
                                        placeholder="Confirme seu email"
                                        className="mediumInput"
                                        value={emailConfirmation}
                                        onChange={
                                            (event) => setEmailConfirmation(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="align">
                                    <input
                                        type="password"
                                        placeholder="Senha"
                                        className="mediumInput"
                                        value={password}
                                        onChange={
                                            (event) => setPassword(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="align">
                                    <input
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        className="mediumInput"
                                        value={passwordConfirmation}
                                        onChange={
                                            (event) => setPasswordConfirmation(event.target.value)
                                        }
                                        required
                                    />
                                    {/* {
                                        password !== passwordConfirmation
                                            ? <span>As senhas devem ser iguais</span>
                                            : (passwordConfirmation.length < 6 || passwordConfirmation.length > 6) && <span>A senha deve ter de 6 a 20 caracterers</span>
                                    } */}
                                </div>
                            </div>
                            <div>
                                <div className="align">
                                    <input
                                        type="text"
                                        placeholder="Cargo"
                                        className="mediumInput"
                                        value={cargo}
                                        onChange={
                                            (event) => setCargo(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="Instituição"
                                        className="smallInput"
                                        value={nomeDaInstituicao}
                                        disabled
                                    />
                                    <input
                                        type=""
                                        placeholder="Tipo de Instituição"
                                        className="smallInput"
                                        value={tipoDeInstituicao}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="align">
                                    <input
                                        type=""
                                        placeholder="CPF"
                                        className="mediumInput"
                                        value={cpf}
                                        onChange={
                                            (event) => setCpf(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type=""
                                        placeholder="CNPJ"
                                        className="mediumInput"
                                        value={cnpjDaInstituicao}
                                        disabled
                                    />
                                </div>
                            </div>
                            <button type="submit">
                                Cadastrar
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
