const baseUrl = "https://django-tarefas.onrender.com/api/tarefas";
const form_tarefa = document.getElementById("form-task");
const input_descricao = document.getElementById("descricao");
const input_responsavael = document.getElementById("responsavel");
const input_nivel = document.getElementById("nivel");
const input_prioridade = document.getElementById("prioridade");
const input_situacao = document.getElementById("situacao");
const token = `Bearer ${localStorage.getItem("access")}`;

function validateAuth() {
    const token = localStorage.getItem("access");
    if (!token) {
        window.alert("Você precisa estar logado para visualizar esta página!");
        window.location.replace("login2.html");
    }
};

function limparFormulario() {
    form_tarefa.reset();
}

async function createTask(event) {
    event.preventDefault();

    const descricao = input_descricao.value;
    const responsavel = input_responsavael.value;
    const nivel = input_nivel.value;
    const prioridade = input_prioridade.value;
    const situacao = input_situacao.value;

    const opcoes = {
        method: "POST",
        body: JSON.stringify({ descricao, responsavel, nivel, prioridade, situacao }),
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    try {
        const response = await fetch(baseUrl, opcoes);
        if (response.status === 201) {
            await Swal.fire({
                icon: "success",
                title: "Tarefa cadastrada com sucesso!",
                text: "Acesse a aba 'Tarefas' para ver suas tarefas cadastradas.",
                confirmButtonText: "OK",
            });
            limparFormulario();
        } else {
            Swal.fire({
                title: "Erro ao criar tarefa",
                text:
                    "Não foi possível criar a tarefa no momento. Por favor, tente novamente mais tarde.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    } catch (error) {
        console.error("Ocorreu um erro ao criar a tarefa:", error);
        Swal.fire({
            title: "Erro",
            text: "Ocorreu um erro ao criar a tarefa. Por favor, tente novamente.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    validateAuth();
    form_tarefa.addEventListener("submit", createTask);
});