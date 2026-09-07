import React from "react";

const ComoFuncionaSection: React.FC = () => {
    return (
        <section
            id="como-funciona"
            className="bg-white py-16 sm:py-20"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

                {/* Título da seção */}
                <div className="mb-10 text-center sm:mb-12">

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Como Funciona
                    </h2>

                    <p className="mt-3 text-base text-gray-500 sm:text-lg">
                        Processo simples e intuitivo em 4 passos
                    </p>

                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {/* ============================================= */}
                    {/* PASSO 1 */}
                    {/* ============================================= */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">

                        {/* Ícone */}
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-6 w-6 text-blue-600"
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

                        </div>

                        <h3 className="text-base font-semibold text-gray-900">
                            1. Cadastre-se
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-gray-500">
                            Crie sua conta como responsável informando seus
                            dados pessoais
                        </p>

                    </div>

                    {/* ============================================= */}
                    {/* PASSO 2 */}
                    {/* ============================================= */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">

                        {/* Ícone */}
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-6 w-6 text-blue-600"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="8"
                                />

                                <circle
                                    cx="9"
                                    cy="10"
                                    r="1"
                                />

                                <circle
                                    cx="15"
                                    cy="10"
                                    r="1"
                                />

                                <path
                                    strokeLinecap="round"
                                    d="M9 15c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5"
                                />

                                <path
                                    strokeLinecap="round"
                                    d="M7 5.5c1.2-1 2.8-1.5 5-1.5s3.8.5 5 1.5"
                                />
                            </svg>

                        </div>

                        <h3 className="text-base font-semibold text-gray-900">
                            2. Cadastre a Criança
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-gray-500">
                            Informe os dados da criança e escolha a escola
                            desejada
                        </p>

                    </div>

                    {/* ============================================= */}
                    {/* PASSO 3 */}
                    {/* ============================================= */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">

                        {/* Ícone */}
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-6 w-6 text-blue-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 3h8l4 4v14H7V3Z"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 3v5h4"
                                />

                                <path
                                    strokeLinecap="round"
                                    d="M10 12h6"
                                />

                                <path
                                    strokeLinecap="round"
                                    d="M10 15h6"
                                />

                                <path
                                    strokeLinecap="round"
                                    d="M10 18h4"
                                />
                            </svg>

                        </div>

                        <h3 className="text-base font-semibold text-gray-900">
                            3. Envie Documentos
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-gray-500">
                            Faça upload dos documentos necessários para a
                            matrícula
                        </p>

                    </div>

                    {/* ============================================= */}
                    {/* PASSO 4 */}
                    {/* ============================================= */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">

                        {/* Ícone */}
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-6 w-6 text-blue-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 3h10v18H7V3Z"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m9 13 2 2 4-4"
                                />

                                <path
                                    strokeLinecap="round"
                                    d="M10 6h4"
                                />
                            </svg>

                        </div>

                        <h3 className="text-base font-semibold text-gray-900">
                            4. Aguarde Análise
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-gray-500">
                            Nossa equipe analisará sua solicitação em até
                            5 dias úteis
                        </p>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ComoFuncionaSection;