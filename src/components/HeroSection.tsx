import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    const irParaLogin = () => {
        navigate("/login");
    };

    const irParaComoFunciona = () => {
        const secao = document.getElementById("como-funciona");

        if (secao) {
            secao.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <section
            id="inicio"
            className="bg-gradient-to-r from-blue-600 to-blue-800"
        >
            <div className="mx-auto flex min-h-[570px] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10">

                <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* ================================================== */}
                    {/* LADO ESQUERDO */}
                    {/* ================================================== */}

                    <div className="text-white">

                        {/* Título */}
                        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            Matrículas Online para
                            <br />
                            CMEIs de Uruaçu
                        </h1>

                        {/* Descrição */}
                        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-blue-50 sm:text-xl">
                            Realize a pré-matrícula do seu filho de forma
                            simples, rápida e totalmente online. Sem filas,
                            sem complicação.
                        </p>

                        {/* Botões */}
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                            {/* Começar Agora */}
                            <button
                                type="button"
                                onClick={irParaLogin}
                                className="flex items-center justify-center gap-4 rounded-xl bg-white px-6 py-4 font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
                            >
                                <span>
                                    Começar Agora
                                </span>

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
                                        d="M5 12h14"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m13 6 6 6-6 6"
                                    />
                                </svg>
                            </button>

                            {/* Como Funciona */}
                            <button
                                type="button"
                                onClick={irParaComoFunciona}
                                className="rounded-xl border-2 border-white px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-blue-600"
                            >
                                Como Funciona
                            </button>

                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* LADO DIREITO - INDICADORES */}
                    {/* ================================================== */}

                    <div className="w-full">

                        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm sm:p-10">

                            <div className="grid grid-cols-2 gap-x-8 gap-y-10">

                                {/* ====================================== */}
                                {/* CMEIs */}
                                {/* ====================================== */}

                                <div className="flex flex-col items-center text-center text-white">

                                    {/* Ícone escola */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="mb-3 h-14 w-14"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 21h18"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 21V8l7-5 7 5v13"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 21v-5h6v5"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 10h.01M15 10h.01M9 13h.01M15 13h.01"
                                        />
                                    </svg>

                                    <strong className="text-4xl font-bold">
                                        12+
                                    </strong>

                                    <span className="mt-1 text-lg text-blue-100">
                                        CMEIs
                                    </span>
                                </div>

                                {/* ====================================== */}
                                {/* MATRÍCULAS */}
                                {/* ====================================== */}

                                <div className="flex flex-col items-center text-center text-white">

                                    {/* Ícone pessoas */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="mb-3 h-14 w-14"
                                    >
                                        <circle
                                            cx="9"
                                            cy="8"
                                            r="3"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 5.5a3 3 0 0 1 0 5.9"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M18 14c1.8.8 3 2.6 3 4.5"
                                        />
                                    </svg>

                                    <strong className="text-4xl font-bold">
                                        500+
                                    </strong>

                                    <span className="mt-1 text-lg text-blue-100">
                                        Matrículas
                                    </span>
                                </div>

                                {/* ====================================== */}
                                {/* DISPONIBILIDADE */}
                                {/* ====================================== */}

                                <div className="flex flex-col items-center text-center text-white">

                                    {/* Ícone relógio */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="mb-3 h-14 w-14"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 7v5l3 2"
                                        />
                                    </svg>

                                    <strong className="text-4xl font-bold">
                                        24/7
                                    </strong>

                                    <span className="mt-1 text-lg text-blue-100">
                                        Disponível
                                    </span>
                                </div>

                                {/* ====================================== */}
                                {/* ONLINE */}
                                {/* ====================================== */}

                                <div className="flex flex-col items-center text-center text-white">

                                    {/* Ícone check */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="mb-3 h-14 w-14"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m8 12 2.5 2.5L16 9"
                                        />
                                    </svg>

                                    <strong className="text-4xl font-bold">
                                        100%
                                    </strong>

                                    <span className="mt-1 text-lg text-blue-100">
                                        Online
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;