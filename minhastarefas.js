const baseUrl = "https://django-tarefas.onrender.com/api/tarefas";
const token = `Bearer ${localStorage.getItem("access")}`;

function fetchTasks() {
  const opcoes = {
    method: "GET",
    headers: {
      Authorization: token,
    },
  };

  fetch(baseUrl, opcoes)
    .then(response => response.json())
    .then(data => {
      const taskList = document.getElementById("taskList");

      // Limpar a lista de tarefas antes de exibir as atualizadas
      taskList.innerHTML = "";

      data.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = task.descricao;

        const responsavel = document.createElement("p");
        responsavel.textContent = "Responsável: " + task.responsavel;

        const nivel = document.createElement("p");
        nivel.textContent = "Nível: " + task.nivel;

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + task.prioridade;

        const situacao = document.createElement("p");
        situacao.textContent = "Situação: " + task.situacao;

        //Botão remover
        const remover = document.createElement("button");
        remover.classList.add("btnCard");
        const removerIcon = document.createElement("i");
        removerIcon.classList.add("fa-solid", "fa-trash")
        remover.appendChild(removerIcon)

        remover.addEventListener("click", () => {
          const taskId = task.id;
          const url = `${baseUrl}/${taskId}`;

          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          };
          fetch(url, options)
            .then(response => {
              if (response.ok) {
                Swal.fire({
                  title: "Tarefa removida com sucesso!",
                  text: "Acesse a aba 'Cadastrar Tarefa, para adicionar uma nova tarefa.'",
                  icon: "success",
                  confirmButtonText: "OK",
                }).then(() => {
                  fetchTasks();
                });
              } else {
                throw new Error("Falha ao remover a tarefa");
              }
            })
            .catch(error => {
              console.error("Ocorreu um erro ao remover a tarefa:", error);
              Swal.fire({
                title: "Erro!",
                text: "Ocorreu um erro ao remover a tarefa. Por favor, tente novamente.",
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        });

        //Botão editar
        const editar = document.createElement("button");
        editar.classList.add("btnCard");
        const editarIcon = document.createElement("i");
        editarIcon.classList.add("fa-solid", "fa-pen");
        editar.appendChild(editarIcon);

        editar.addEventListener("click", () => {
          abrirPopUpEdicao(task)
        });

        //Botao concluir
        const concluir = document.createElement("button");
        concluir.classList.add("btnCard");
        const concluirIcon = document.createElement("i");
        concluirIcon.classList.add("fa-solid", "fa-check")
        concluir.appendChild(concluirIcon)

        taskCard.appendChild(title);
        taskCard.appendChild(responsavel);
        taskCard.appendChild(nivel);
        taskCard.appendChild(prioridade);
        taskCard.appendChild(situacao);
        taskCard.appendChild(remover);
        taskCard.appendChild(editar);
        taskCard.appendChild(concluir);

        taskList.appendChild(taskCard);
      });
    })
    .catch(error => {
      console.error("Ocorreu um erro ao buscar as tarefas:", error);
      Swal.fire({
        title: "Erro",
        text: "Ocorreu um erro ao buscar as tarefas. Por favor, tente novamente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
}

function filterCards() {
  const filterText = this.value.toLowerCase();
  const allCards = document.querySelectorAll(".card")

  if (filterText != "") {
    for (let card of allCards) {
      let title = card.querySelector("h2").textContent.toLowerCase();

      if (!title.includes(filterText)) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
      }
    }
  } else {
    for (let card of allCards) {
      card.style.display = "block";
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {

  // Chame a função fetchTasks para buscar e exibir as tarefas ao carregar a página
  fetchTasks();

  const filterElement = document.querySelector("#busca");
  filterElement.addEventListener("input", filterCards)
});
