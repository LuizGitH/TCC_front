import React, { useState } from "react";
import { /*Link,*/ useNavigate } from "react-router-dom";
import api from "../services/api";

interface FormErrors {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
}

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    placeholder: string;
    error?: string;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type = "text",
    value,
    placeholder,
    error,
    autoComplete,
    onChange,
}) => {
    return (
        <div className="flex flex-col">
            <label
                htmlFor={id}
                className="mb-1 text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={onChange}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`w-full rounded-lg border px-4 py-2 outline-none transition
          ${error
                        ? "border-red-500 focus:ring-2 focus:ring-red-300"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
            />

            {error && (
                <span
                    id={`${id}-error`}
                    className="mt-1 text-sm text-red-500"
                >
                    {error}
                </span>
            )}
        </div>
    );
};

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const [errors, setErrors] = useState<FormErrors>({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
    });

    const maskCPF = (value: string): string => {
        return value
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const maskPhone = (value: string): string => {
        return value
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            nome: "",
            cpf: "",
            email: "",
            telefone: "",
        };

        let valid = true;

        if (!nome.trim()) {
            newErrors.nome = "Informe seu nome.";
            valid = false;
        }

        const cpfNumbers = cpf.replace(/\D/g, "");

        if (!cpfNumbers) {
            newErrors.cpf = "Informe o CPF.";
            valid = false;
        } else if (cpfNumbers.length !== 11) {
            newErrors.cpf = "CPF inválido.";
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Informe o e-mail.";
            valid = false;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ) {
            newErrors.email = "E-mail inválido.";
            valid = false;
        }

        const phoneNumbers = telefone.replace(/\D/g, "");

        if (!phoneNumbers) {
            newErrors.telefone = "Informe o telefone.";
            valid = false;
        } else if (phoneNumbers.length !== 11) {
            newErrors.telefone = "Telefone inválido.";
            valid = false;
        }

        setErrors(newErrors);

        return valid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        const registerData = {
            nome: nome.trim(),
            cpf: cpf.replace(/\D/g, ""),
            email: email.trim(),
            telefone: telefone.replace(/\D/g, ""),
        };

        try {
            const response = await api.post("/register/check", registerData);

            console.log("Resposta do Laravel:", response.data);

            navigate("/registro", {
                state: {
                    registerData,
                },
            });
        } catch (error: unknown) {
            console.error("Erro ao verificar cadastro:", error);

            console.log("Erro de comunicação com o servidor.");
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-10">
            <div className="mx-auto max-w-xl">

                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Criar Nova Conta
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Preencha seus dados para começar a usar o sistema
                    </p>
                </div>

                <div className="mb-8 flex items-center justify-center gap-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                            1
                        </div>

                        <span className="font-medium">
                            Dados Pessoais
                        </span>

                    </div>

                    <div className="h-px w-16 bg-gray-300"></div>

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold">
                            2
                        </div>

                        <span className="text-gray-500">
                            Criar Senha
                        </span>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-8 shadow-lg">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Informações Pessoais
                    </h2>

                    <p className="mt-1 mb-6 text-gray-500">
                        Informe seus dados cadastrais
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="space-y-5">

                            <InputField
                                id="nome"
                                label="Nome Completo"
                                placeholder="João da Silva"
                                value={nome}
                                autoComplete="name"
                                error={errors.nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                            <InputField
                                id="cpf"
                                label="CPF"
                                placeholder="000.000.000-00"
                                value={cpf}
                                autoComplete="off"
                                error={errors.cpf}
                                onChange={(e) =>
                                    setCpf(maskCPF(e.target.value))
                                }
                            />
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <InputField
                                    id="email"
                                    label="E-mail"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    autoComplete="email"
                                    error={errors.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <InputField
                                    id="telefone"
                                    label="Telefone"
                                    placeholder="(62) 99999-9999"
                                    value={telefone}
                                    autoComplete="tel"
                                    error={errors.telefone}
                                    onChange={(e) =>
                                        setTelefone(maskPhone(e.target.value))
                                    }
                                />
                            </div>

                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Importante:</strong> Certifique-se de que seus dados estão corretos. Eles serão utilizados para validar sua identidade.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                                Continuar
                            </button>

                            <p className="text-center text-sm text-gray-600">
                                Já tem uma conta?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="font-semibold text-blue-600 hover:underline">
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
                        className="text-gray-600 transition hover:text-blue-600 hover:underline">
                        ← Voltar ao início
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;