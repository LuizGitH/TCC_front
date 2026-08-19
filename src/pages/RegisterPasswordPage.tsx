import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

interface RegisterData {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
}

interface FormErrors {
    senha: string;
    confirmarSenha: string;
}

interface LocationState {
    registerData?: RegisterData;
}

const RegisterPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as LocationState | null;
    const registerData = state?.registerData;

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    const [errors, setErrors] = useState<FormErrors>({
        senha: "",
        confirmarSenha: "",
    });

    const senhaTem8Caracteres = senha.length >= 8;
    const senhaTemMaiusculaMinuscula =
        /[A-Z]/.test(senha) && /[a-z]/.test(senha);
    const senhaTemNumero = /\d/.test(senha);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            senha: "",
            confirmarSenha: "",
        };

        let valid = true;

        if (!senha) {
            newErrors.senha = "Informe sua senha.";
            valid = false;
        } else if (senha.length < 8) {
            newErrors.senha = "A senha deve ter no mínimo 8 caracteres.";
            valid = false;
        } else if (!/[A-Z]/.test(senha) || !/[a-z]/.test(senha)) {
            newErrors.senha =
                "A senha deve conter letras maiúsculas e minúsculas.";
            valid = false;
        } else if (!/\d/.test(senha)) {
            newErrors.senha = "A senha deve conter pelo menos um número.";
            valid = false;
        }

        if (!confirmarSenha) {
            newErrors.confirmarSenha = "Confirme sua senha.";
            valid = false;
        } else if (senha !== confirmarSenha) {
            newErrors.confirmarSenha = "As senhas não coincidem.";
            valid = false;
        }

        setErrors(newErrors);

        return valid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!registerData) {
            console.error(
                "Os dados pessoais não foram encontrados. Volte para a etapa anterior."
            );
            return;
        }

        const finalRegisterData = {
            ...registerData,
            password: senha,
            password_confirmation: confirmarSenha,
        };

        try {
            const response = await api.post("/register", finalRegisterData);

            console.log("Resposta do Laravel:", response.data);

            setCadastroSucesso(true);

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error: any) {
            console.error("Erro ao criar conta:", error);

            if (error.response?.status === 422) {
                console.error(
                    "Erros de validação:",
                    error.response.data.errors
                );
            } else {
                console.error(
                    "Não foi possível criar a conta. Tente novamente."
                );
            }
        }
    };

    if (cadastroSucesso) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
                        <span className="text-3xl font-bold text-white">
                            ✓
                        </span>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800">
                        Conta criada com sucesso.
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-6 sm:py-10">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Criar Nova Conta
                    </h1>

                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                        Preencha seus dados para começar a usar o sistema
                    </p>
                </div>

                <div className="mb-8 flex items-center justify-center">
                    <div className="flex items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                            ✓
                        </div>

                        <span className="ml-2 text-sm font-medium text-gray-900">
                            Dados Pessoais
                        </span>
                    </div>

                    <div className="mx-4 h-1 w-12 bg-blue-600 sm:w-20"></div>

                    <div className="flex items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                            2
                        </div>

                        <span className="ml-2 text-sm font-medium text-gray-900">
                            Criar Senha
                        </span>
                    </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Defina sua Senha
                    </h2>

                    <p className="mt-1 mb-6 text-gray-500">
                        Crie uma senha segura para sua conta
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="senha"
                                    className="mb-1 text-sm font-medium text-gray-900"
                                >
                                    Senha
                                </label>

                                <div className="relative">
                                    <input
                                        id="senha"
                                        type={mostrarSenha ? "text" : "password"}
                                        value={senha}
                                        placeholder="Mínimo 8 caracteres"
                                        autoComplete="new-password"
                                        onChange={(e) => setSenha(e.target.value)}
                                        aria-invalid={!!errors.senha}
                                        aria-describedby={
                                            errors.senha ? "senha-error" : undefined
                                        }
                                        className={`w-full rounded-lg border bg-gray-100 px-4 py-2.5 pr-12 text-sm outline-none transition ${errors.senha
                                            ? "border-red-500 focus:ring-2 focus:ring-red-300"
                                            : "border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                    >
                                        {mostrarSenha ? "◉" : "◌"}
                                    </button>
                                </div>

                                {errors.senha && (
                                    <span
                                        id="senha-error"
                                        className="mt-1 text-sm text-red-500"
                                    >
                                        {errors.senha}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="confirmarSenha"
                                    className="mb-1 text-sm font-medium text-gray-900"
                                >
                                    Confirmar Senha
                                </label>

                                <div className="relative">
                                    <input
                                        id="confirmarSenha"
                                        type={mostrarConfirmarSenha ? "text" : "password"}
                                        value={confirmarSenha}
                                        placeholder="Digite a senha novamente"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setConfirmarSenha(e.target.value)
                                        }
                                        aria-invalid={!!errors.confirmarSenha}
                                        aria-describedby={
                                            errors.confirmarSenha
                                                ? "confirmarSenha-error"
                                                : undefined
                                        }
                                        className={`w-full rounded-lg border bg-gray-100 px-4 py-2.5 pr-12 text-sm outline-none transition ${errors.confirmarSenha
                                            ? "border-red-500 focus:ring-2 focus:ring-red-300"
                                            : "border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        aria-label={
                                            mostrarConfirmarSenha
                                                ? "Ocultar senha"
                                                : "Mostrar senha"
                                        }
                                    >
                                        {mostrarConfirmarSenha ? "◉" : "◌"}
                                    </button>
                                </div>

                                {errors.confirmarSenha && (
                                    <span
                                        id="confirmarSenha-error"
                                        className="mt-1 text-sm text-red-500"
                                    >
                                        {errors.confirmarSenha}
                                    </span>
                                )}
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <p className="mb-2 text-sm font-semibold text-gray-900">
                                    Sua senha deve conter:
                                </p>

                                <ul className="space-y-1 text-sm">
                                    <li
                                        className={
                                            senhaTem8Caracteres
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        <span className="mr-2">
                                            {senhaTem8Caracteres ? "✓" : "○"}
                                        </span>
                                        Mínimo de 8 caracteres
                                    </li>

                                    <li
                                        className={
                                            senhaTemMaiusculaMinuscula
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        <span className="mr-2">
                                            {senhaTemMaiusculaMinuscula ? "✓" : "○"}
                                        </span>
                                        Letras maiúsculas e minúsculas
                                    </li>

                                    <li
                                        className={
                                            senhaTemNumero
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        <span className="mr-2">
                                            {senhaTemNumero ? "✓" : "○"}
                                        </span>
                                        Pelo menos um número
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => navigate("/cadastro")}
                                    className="w-full rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-900 transition hover:bg-gray-50"
                                >
                                    Voltar
                                </button>

                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Criar Conta
                                </button>
                            </div>

                            <p className="text-center text-sm text-gray-600">
                                Já tem uma conta?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="font-semibold text-blue-600 hover:underline"
                                >
                                    Faça login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-gray-600 transition hover:text-blue-600 hover:underline"
                    >
                        ← Voltar ao início
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPasswordPage;