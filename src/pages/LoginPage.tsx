function LoginPage() {
    return (
        <div>
            <h1>Login</h1>

            <form>
                <input
                    type="email"
                    placeholder="E-mail"
                />

                <input
                    type="password"
                    placeholder="Senha"
                />

                <button>Entrar</button>
            </form>
        </div>
    );
}

export default LoginPage;