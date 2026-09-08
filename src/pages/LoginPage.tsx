import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import api from "../services/api";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrarMe, setLembrarMe] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [erros, setErros] = useState<{
        email?: string;
        senha?: string;
    }>({});

    const validarFormulario = (): boolean => {
        const novosErros: {
            email?: string;
            senha?: string;
        } = {};

        if (!email.trim()) {
            novosErros.email = "O e-mail é obrigatório.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            novosErros.email = "Informe um e-mail válido.";
        }

        if (!senha.trim()) {
            novosErros.senha = "A senha é obrigatória.";
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const loginData = {
            email: email.trim(),
            senha,
            lembrarMe,
        };

        try {
            const response = await api.post("/login", loginData);

            console.log("Resposta do Laravel:", response.data);

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/painel");
        } catch (error: any) {
            console.error("Erro ao realizar login:", error);

            if (error.response?.status === 401) {
                setErros({
                    email: "E-mail ou senha incorretos.",
                });
            } else if (error.response?.status === 403) {
                setErros({
                    email: "Esta conta não possui acesso de responsável.",
                });
            } else if (error.response?.status === 422) {
                const errosLaravel = error.response.data.errors;

                setErros({
                    email: errosLaravel?.email?.[0],
                    senha: errosLaravel?.senha?.[0],
                });
            } else {
                setErros({
                    email: "Não foi possível realizar o login. Tente novamente.",
                });
            }
        }
    };

    const irParaCadastro = () => {
        navigate("/cadastro");
    };

    const irParaInicio = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6">

            <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-lg flex-col items-center justify-center">

                {/* Ícone */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.8"
                        className="h-9 w-9"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m3 8 9-4 9 4-9 4-9-4Z"
                        />

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 10v3.5c0 1.5 2.7 3 6 3s6-1.5 6-3V10"
                        />

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 9v5"
                        />

                        <circle
                            cx="21"
                            cy="15.5"
                            r="1"
                            fill="white"
                            stroke="none"
                        />
                    </svg>
                </div>

                {/* Título */}
                <h1 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
                    Bem-vindo
                </h1>

                <p className="mt-2 text-center text-base text-gray-500 sm:text-lg">
                    Acesse sua conta para continuar
                </p>

                {/* Card */}
                <div className="mt-10 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

                    <div className="mb-7">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Login de Responsável
                        </h2>

                        <p className="mt-1 text-base text-gray-500">
                            Entre com suas credenciais para acessar o painel
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >

                        {/* E-mail */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-gray-900"
                            >
                                E-mail
                            </label>

                            <div
                                className={`flex items-center rounded-lg bg-gray-100 px-3 transition ${erros.email
                                    ? "border border-red-500"
                                    : "border border-transparent focus-within:border-blue-500"
                                    }`}
                            >
                                {/* Ícone de e-mail */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="mr-3 h-5 w-5 shrink-0 text-gray-400"
                                >
                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="2"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m3 7 9 6 9-6"
                                    />
                                </svg>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);

                                        if (erros.email) {
                                            setErros((estadoAtual) => ({
                                                ...estadoAtual,
                                                email: undefined,
                                            }));
                                        }
                                    }}
                                    placeholder="seu@email.com"
                                    className="h-11 w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                                />
                            </div>

                            {erros.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {erros.email}
                                </p>
                            )}
                        </div>

                        {/* Senha */}
                        <div className="mt-5">
                            <label
                                htmlFor="senha"
                                className="mb-2 block text-sm font-semibold text-gray-900"
                            >
                                Senha
                            </label>

                            <div
                                className={`flex items-center rounded-lg bg-gray-100 px-3 transition ${erros.senha
                                    ? "border border-red-500"
                                    : "border border-transparent focus-within:border-blue-500"
                                    }`}
                            >
                                {/* Ícone de cadeado */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="mr-3 h-5 w-5 shrink-0 text-gray-400"
                                >
                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="10"
                                        rx="2"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        d="M8 10V7a4 4 0 0 1 8 0v3"
                                    />
                                </svg>

                                <input
                                    id="senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    value={senha}
                                    onChange={(event) => {
                                        setSenha(event.target.value);

                                        if (erros.senha) {
                                            setErros((estadoAtual) => ({
                                                ...estadoAtual,
                                                senha: undefined,
                                            }));
                                        }
                                    }}
                                    placeholder="Digite sua senha"
                                    className="h-11 w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                                />

                                {/* Botão mostrar/ocultar senha */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setMostrarSenha(!mostrarSenha)
                                    }
                                    className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center text-gray-500 transition hover:text-gray-800"
                                    aria-label={
                                        mostrarSenha
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                    title={
                                        mostrarSenha
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >
                                    {mostrarSenha ? (
                                        /* Olho normal - senha visível */
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                                            />

                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="2.5"
                                            />
                                        </svg>
                                    ) : (
                                        /* Olho riscado - senha oculta */
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 3l18 18"
                                            />

                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                                            />

                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.9 5.2A10.5 10.5 0 0 1 12 5c5 0 8.5 4 9.5 7-.4 1.4-1.3 2.8-2.5 4"
                                            />

                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.2 6.2C4.3 7.5 3 9.3 2.5 12c1 3 4.5 7 9.5 7 1.1 0 2.1-.2 3-.5"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {erros.senha && (
                                <p className="mt-1 text-sm text-red-500">
                                    {erros.senha}
                                </p>
                            )}
                        </div>

                        {/* Lembrar-me / Esqueci a senha */}
                        <div className="mt-5 flex items-center justify-between gap-3">

                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={lembrarMe}
                                    onChange={(event) =>
                                        setLembrarMe(event.target.checked)
                                    }
                                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />

                                <span>
                                    Lembrar-me
                                </span>
                            </label>

                            <button
                                type="button"
                                onClick={() => navigate("/recuperar-senha")}
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Esqueceu a senha?
                            </button>

                        </div>

                        {/* Botão Entrar */}
                        <button
                            type="submit"
                            className="mt-4 h-11 w-full rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Entrar
                        </button>

                    </form>

                    {/* Cadastro */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Não tem uma conta?{" "}
                        <button
                            type="button"
                            onClick={irParaCadastro}
                            className="font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
                        >
                            Cadastre-se aqui
                        </button>
                    </p>

                </div>

                {/* Voltar ao início */}
                <button
                    type="button"
                    onClick={irParaInicio}
                    className="mt-8 text-sm text-gray-600 transition hover:text-blue-600"
                >
                    ← Voltar ao início
                </button>

            </div>
        </div>
    );
};

export default LoginPage;