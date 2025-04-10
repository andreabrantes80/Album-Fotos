// Carregar imagens do localStorage ao iniciar a página
let imagens = JSON.parse(localStorage.getItem("imagens")) || [];

// Função para exibir as imagens na galeria
function carregarImagens() {
  const galeria = document.getElementById("galeria");
  galeria.innerHTML = ""; // Limpa a galeria

  imagens.forEach((imagem, index) => {
    const div = document.createElement("div");
    div.className = "imagem";
    div.dataset.index = index; // Armazena o índice da imagem para facilitar a remoção

    const img = new Image();
    img.src = imagem.src;
    img.alt = imagem.nome || `Imagem ${index + 1}`;

    // Adiciona evento de clique para abrir o modal
    img.onclick = function () {
      abrirModal(imagem.src, imagem.descricao, index);
    };

    div.appendChild(img);
    galeria.appendChild(div);
  });
}


// Evento para carregar novas imagens
document.getElementById("seletorArquivos").addEventListener("change", function (e) {
  const arquivoSelecionado = e.target.files;
  const galeria = document.getElementById("galeria");

  Array.from(arquivoSelecionado).forEach((arquivo) => {
    if (arquivo.type.startsWith("image/")) {
      const leitor = new FileReader();
      leitor.onload = function (e) {
        const descricao = prompt(`Digite uma descrição para a imagem: ${arquivo.name}`);

        // Adiciona a nova imagem ao array
        const novaImagem = {
          src: e.target.result,
          descricao: descricao || "Sem descrição",
          nome: arquivo.name,
        };
        imagens.push(novaImagem);

        // Salva no localStorage
        localStorage.setItem("imagens", JSON.stringify(imagens));

        // Atualiza a galeria
        carregarImagens();
      };
      leitor.readAsDataURL(arquivo);
    }
  });
});



// document
//   .getElementById("seletorArquivos")
//   .addEventListener("change", function (e) {
//     const arquivoSelecionado = e.target.files;

//     const galerias = document.getElementById('galeria');

//     Array.from(arquivoSelecionado).forEach(arquivo => {
//       if (arquivo.type.startsWith("image/")) {
//         const leitor = new FileReader();
//         leitor.onload = function (e) {
//           const descricao = prompt(
//             `Digite uma descrição para a imagem:'+ ${arquivo.name} +'`
//           );

//           const div = document.createElement("div");
//           div.className = "imagem";

//           div.classList.add("imagem");

//           const img = new Image();

//           img.src = e.target.result;
//           img.alt = arquivo.name;

//           img.onclick = function () {
//             abrirModal(e.target.result, descricao);
//           };

//           div.appendChild(img);

//           galerias.appendChild(div);
//         };
//         leitor.readAsDataURL(arquivo);
//       }
//     });
//   });

function abrirModal(src, descricao) {
  const modal = document.getElementById('modal');

  modal.style.display = 'flex';

  modal.querySelector('img').src = src;

  modal.querySelector('.descricao').textContent = descricao || "Sem descrição";

  window.imagemAtual = src;
}

// Função para fechar o modal
function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  modal.querySelector("img").src = "";
  modal.querySelector(".descricao").textContent = "";
}

// Função para remover a imagem
function removerImagem(event) {
  event.stopPropagation(); // Impede que o evento de clique no botão de remover seja propagado

  const index = parseInt(document.getElementById("modal").dataset.index);
  imagens.splice(index, 1); // Remove a imagem do array

  // Atualiza o localStorage
  localStorage.setItem("imagens", JSON.stringify(imagens));

  // Recarrega a galeria
  carregarImagens();

  // Fecha o modal
  fecharModal();
}

// Carrega as imagens ao iniciar a página
carregarImagens();

// Adiciona evento para fechar o modal ao clicar fora da imagem
document.getElementById("modal").addEventListener("click", (event) => {
  if (event.target === document.getElementById("modal") || event.target.classList.contains("descricao")) {
    fecharModal();
  }
});
