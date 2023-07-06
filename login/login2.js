function main() {
    const input_usuario = document.getElementById("usuario");
    const input_senha = document.getElementById("senha");
    const form_login = document.getElementById("form-login");

    form_login.onsubmit = async (event) => {
        event.preventDefault();
        const username = input_usuario.value;
        const password = input_senha.value;

        const login_url = "https://django-tarefas.onrender.com/api/token/";
        const opcoes = {
            method: "POST",
            body: JSON.stringify({ username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await fetch(login_url, opcoes);
            const result = await response.json();

            if (response.status === 200) {
                const token = result["access"];
                alert("Login realizado com sucesso!");
                localStorage.setItem("access", token);
                window.location.replace("../tarefas.html");
            } else {
                alert("Usuário e/ou senha incorretos!");
            }
        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro ao fazer o login");
        }

        input_senha.value = "";
        input_usuario.value = "";
        input_usuario.focus();
    };
}

main();


/*function salvarEstadoLembrarMe() {
    const lembrarMeCheckbox = document.getElementById('lembrar-me');
    
    // Verifica se o checkbox está marcado
    const lembrarMe = lembrarMeCheckbox.checked;
    
    // Define o valor do cookie com base no estado do "Lembrar-me"
    document.cookie = `lembrarMe=${lembrarMe}; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/`;
  }*/


/*function carregarEstadoLembrarMe() {
  const lembrarMeCheckbox = document.getElementById('lembrar-me');
  
  // Obtém o valor do cookie
  const cookies = document.cookie.split(';');
  const cookieLembrarMe = cookies.find(cookie => cookie.trim().startsWith('lembrarMe='));
  
  if (cookieLembrarMe) {
    // Obtém o valor do cookie
    const valorLembrarMe = cookieLembrarMe.split('=')[1].trim();
    
    // Define o estado do "Lembrar-me" com base no valor do cookie
    lembrarMeCheckbox.checked = (valorLembrarMe === 'true');
  }
}*/
