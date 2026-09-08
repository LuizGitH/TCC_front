import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    const validarEmail = (): boolean => {
        if (!email.trim()) {
            setErro("O e-mail é obrigatório.");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErro("Informe um e-mail válido.");
            return false;
        }

        setErro("");
        return true;
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setErro("");
        setMensagem("");

        if (!validarEmail()) {
            return;
        }

        setCarregando(true);

        const recoveryData = {
            email: email.trim(),
        };

        try {
            const response = await axios.post(
                "/api/forgot-password",
                recoveryData
            );

            console.log(
                "Resposta da recuperação:",
                response.data
            );

            /*
             * Se o Laravel confirmar que o e-mail existe,
             * mostramos a mensagem e voltamos para o login.
             */
            setMensagem(
                "O e-mail de recuperação foi enviado com sucesso."
            );

            setTimeout(() => {
                navigate("/login");
            }, 2500);
        } catch (error) {
            console.error(
                "Erro ao solicitar recuperação de senha:",
                error
            );

            /*
             * Se o Laravel informar que o e-mail não existe,
             * mostramos a mensagem de erro e permanecemos
             * nesta página.
             */
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 404
            ) {
                setErro(
                    "Não encontramos uma conta com esse e-mail. Verifique o endereço informado e tente novamente."
                );
            } else {
                setErro(
                    "Não foi possível realizar a recuperação de senha. Tente novamente."
                );
            }
        } finally {
            setCarregando(false);
        }
    };

    const voltarParaLogin = () => {
        navigate("/login");
    };

    const voltarParaInicio = () => {
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
                    Recuperar senha
                </h1>

                <p className="mt-2 max-w-md text-center text-base text-gray-500 sm:text-lg">
                    Informe seu e-mail para receber as instruções
                    de recuperação
                </p>

                {/* Card */}
                <div className="mt-10 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

                    <div className="mb-7">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Esqueceu sua senha?
                        </h2>

                        <p className="mt-1 text-base leading-relaxed text-gray-500">
                            Digite o e-mail utilizado no seu cadastro
                            e enviaremos as instruções para recuperar
                            sua senha.
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
                                className={`flex items-center rounded-lg bg-gray-100 px-3 transition ${
                                    erro
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

                                        if (erro) {
                                            setErro("");
                                        }

                                        if (mensagem) {
                                            setMensagem("");
                                        }
                                    }}
                                    placeholder="seu@email.com"
                                    className="h-11 w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                                />
                            </div>

                            {/* Erro */}
                            {erro && (
                                <p className="mt-2 text-sm text-red-500">
                                    {erro}
                                </p>
                            )}
                        </div>

                        {/* Mensagem de sucesso */}
                        {mensagem && (
                            <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-green-700">
                                    {mensagem}
                                </p>
                            </div>
                        )}

                        {/* Botão */}
                        <button
                            type="submit"
                            disabled={carregando}
                            className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {carregando
                                ? "Verificando..."
                                : "Enviar instruções"}
                        </button>
                    </form>

                    {/* Voltar para login */}
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={voltarParaLogin}
                            className="text-sm font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
                        >
                            ← Voltar para o login
                        </button>
                    </div>
                </div>

                {/* Voltar ao início */}
                <button
                    type="button"
                    onClick={voltarParaInicio}
                    className="mt-8 text-sm text-gray-600 transition hover:text-blue-600"
                >
                    ← Voltar ao início
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;