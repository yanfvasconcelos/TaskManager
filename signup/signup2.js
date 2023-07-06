function main() {
    const input_usuario = document.getElementById("usuario");
    const input_email = document.getElementById("email");
    const input_senha = document.getElementById("senha");
    const form_signup = document.getElementById("form-signup");

    form_signup.onsubmit = async (event) => {
        event.preventDefault();
        const username = input_usuario.value;
        const email = input_email.value;
        const password = input_senha.value;

        const login_url = "https://django-tarefas.onrender.com/api/signup";
        const opcoes = {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await fetch(login_url, opcoes);

            if (!response.ok) {
                throw new Error('Erro ao criar usuário');
            }

            const result = await response.json();
            const token = result.access_token;
            localStorage.setItem('access_token', token);

            Swal.fire({
                title: 'Conta criada com sucesso',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            setTimeout(() => {
                Swal.close();
                window.location.replace('login.html');
            }, 2000);
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: 'Erro',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };
}

main();