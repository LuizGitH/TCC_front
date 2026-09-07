import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const [menuAberto, setMenuAberto] = useState(false);

    const fecharMenu = () => {
        setMenuAberto(false);
    };

    const irParaLogin = () => {
        fecharMenu();
        navigate("/login");
    };

    const irParaCadastro = () => {
        fecharMenu();
        navigate("/cadastro");
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <button
                    type="button"
                    onClick={() => {
                        fecharMenu();
                        navigate("/");
                    }}
                    className="flex items-center gap-3"
                >
                    {/* Ícone */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            className="h-7 w-7"
                        >
                            {/* Parte superior do capelo */}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m3 8 9-4 9 4-9 4-9-4Z"
                            />

                            {/* Parte inferior */}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 10v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4"
                            />

                            {/* Cordão */}
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

                    {/* Nome */}
                    <div className="text-left">
                        <h1 className="text-lg font-semibold leading-tight text-gray-900">
                            CMEI Uruaçu
                        </h1>

                        <p className="text-sm text-gray-500">
                            Sistema de Matrículas
                        </p>
                    </div>
                </button>

                {/* Menu Desktop */}
                {/* Menu Desktop */}
                <nav className="hidden items-center gap-8 md:flex">
                    <a
                        href="#inicio"
                        className="text-gray-700 transition hover:text-blue-600"
                    >
                        Início
                    </a>

                    <a
                        href="#como-funciona"
                        className="text-gray-700 transition hover:text-blue-600"
                    >
                        Como Funciona
                    </a>

                    <a
                        href="#escolas"
                        className="text-gray-700 transition hover:text-blue-600"
                    >
                        Escolas
                    </a>

                    <a
                        href="#lista-espera"
                        className="text-gray-700 transition hover:text-blue-600"
                    >
                        Lista de Espera
                    </a>

                    <a
                        href="#documentos"
                        className="text-gray-700 transition hover:text-blue-600"
                    >
                        Documentos
                    </a>

                    <a
                        href="#contato"
                        className="text-gray-700 transition hover:text-blue-600"
                    >
                        Contato
                    </a>
                </nav>

                {/* Botões Desktop */}
                <div className="hidden items-center gap-4 md:flex">
                    <button
                        type="button"
                        onClick={irParaLogin}
                        className="font-semibold text-gray-900 transition hover:text-blue-600"
                    >
                        Entrar
                    </button>

                    <button
                        type="button"
                        onClick={irParaCadastro}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Cadastrar
                    </button>
                </div>

                {/* Botão Mobile */}
                <button
                    type="button"
                    onClick={() => setMenuAberto(!menuAberto)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 md:hidden"
                    aria-label={
                        menuAberto
                            ? "Fechar menu"
                            : "Abrir menu"
                    }
                    aria-expanded={menuAberto}
                >
                    {menuAberto ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                d="M6 6l12 12"
                            />
                            <path
                                strokeLinecap="round"
                                d="M18 6 6 18"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                d="M4 6h16"
                            />
                            <path
                                strokeLinecap="round"
                                d="M4 12h16"
                            />
                            <path
                                strokeLinecap="round"
                                d="M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Menu Mobile */}
            {menuAberto && (
                <div className="border-t border-gray-100 bg-white md:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4">

                        <a
                            href="#inicio"
                            onClick={fecharMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                            Início
                        </a>

                        <a
                            href="#como-funciona"
                            onClick={fecharMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                            Como Funciona
                        </a>

                        <a
                            href="#escolas"
                            onClick={fecharMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                            Escolas
                        </a>

                        <a
                            href="#lista-espera"
                            onClick={fecharMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                            Lista de Espera
                        </a>

                        <a
                            href="#documentos"
                            onClick={fecharMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                            Documentos
                        </a>

                        <a
                            href="#contato"
                            onClick={fecharMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                            Contato
                        </a>

                        <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">

                            <button
                                type="button"
                                onClick={irParaLogin}
                                className="rounded-lg px-4 py-3 text-left font-semibold text-gray-900 transition hover:bg-gray-100"
                            >
                                Entrar
                            </button>

                            <button
                                type="button"
                                onClick={irParaCadastro}
                                className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Cadastrar
                            </button>

                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;