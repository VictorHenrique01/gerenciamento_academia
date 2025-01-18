// Seleciona os formulários
const formAluno = document.getElementById("formAluno");
const formEditarAluno = document.getElementById("formEditarAluno");
const formConsultarAluno = document.getElementById("formConsultarAluno");
// Função para exibir o formulário correto
function exibirFormulario(formularioId) {
   const formularios = document.querySelectorAll(".formulario");
   formularios.forEach((formulario) => {
       formulario.classList.remove("ativo");
   });
   document.getElementById(formularioId).classList.add("ativo");
}
// Cadastro de Aluno
formAluno.addEventListener("submit", async (event) => {
   event.preventDefault(); // Evita o reload da página
   const nome = document.getElementById("nome").value;
   const idade = document.getElementById("idade").value;
   const planoId = document.getElementById("plano").value;
   const aluno = {
       nome: nome,
       idade: parseInt(idade),
       plano_id: parseInt(planoId)
   };
   try {
       const response = await fetch("http://127.0.0.1:8000/alunos", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(aluno)
       });
       if (response.ok) {
           alert("Aluno cadastrado com sucesso!");
           formAluno.reset(); // Limpa o form
       } else {
           const error = await response.json();
           alert(`Erro: ${error.detail}`);
       }
   } catch (error) {
       console.error("Erro ao cadastrar aluno:", error);
       alert("Erro ao cadastrar aluno. Verifique o console para mais detalhes.");
   }
});



// Consulta de Aluno
formConsultarAluno.addEventListener("submit", async (event) => {
   event.preventDefault(); // Evita o reload da página
   const consultaIdAluno = document.getElementById("consultaIdAluno").value;
   try {
       const response = await fetch(`http://127.0.0.1:8000/alunos/${consultaIdAluno}`, {
           method: "GET",
           headers: {
               "Content-Type": "application/json"
           }
       });
       if (response.ok) {
           const aluno = await response.json();
           const resultadoDiv = document.getElementById("resultadoConsulta");
           resultadoDiv.innerHTML = `
            <p><strong>ID:</strong> ${aluno.id}</p>
            <p><strong>Nome:</strong> ${aluno.nome}</p>
            <p><strong>Idade:</strong> ${aluno.idade}</p>
            <p><strong>Plano ID:</strong> ${aluno.plano_id}</p>
           `;
       } else {
           const error = await response.json();
           alert(`Erro: ${error.detail}`);
       }
   } catch (error) {
       console.error("Erro ao consultar aluno:", error);
       alert("Erro ao consultar aluno. Verifique o console para mais detalhes.");
   }
});


// Edição de Aluno
//formEditarAluno.addEventListener("submit", async (event) => {
//   event.preventDefault(); // Evita o reload da página
//   const idAluno = document.getElementById("idAluno").value;
//   const novoNome = document.getElementById("novoNome").value;
//   const novaIdade = document.getElementById("novaIdade").value;
//   const novoPlano = document.getElementById("novoPlano").value;
//   const dadosAtualizados = {};
//   if (novoNome) dadosAtualizados.nome = novoNome;
//   if (novaIdade) dadosAtualizados.idade = parseInt(novaIdade);
//   if (novoPlano) dadosAtualizados.plano_id = parseInt(novoPlano);
//   try {
//       const response = await fetch(`http://127.0.0.1:8000/alunos/${idAluno}`, {
//           method: "PUT",
//         headers: {
//              "Content-Type": "application/json"
//           },
//           body: JSON.stringify(dadosAtualizados)
//       });
//       if (response.ok) {
//           alert("Dados do aluno atualizados com sucesso!");
//           formEditarAluno.reset(); // Limpa o formulário
//       } else {
//         const error = await response.json();
//         alert(`Erro: ${error.detail}`);
//     }
// } catch (error) {
//     console.error("Erro ao atualizar aluno:", error);
//     alert("Erro ao atualizar aluno. Verifique o console para mais detalhes.");
// }
//});