document
  .getElementById("seletorArquivos")
  .addEventListener("change", function (e) {
    const arquivoSelecionado = e.target.files;

    const galerias = document.getElementById('galeria');

    Array.from(arquivoSelecionado).forEach(arquivo => {
      if (arquivo.type.startsWith("image/")) {
        const leitor = new FileReader();
        leitor.onload = function (e) {
          const descricao = prompt(
            `Digite uma descrição para a imagem:'+ ${arquivo.name} +'`
          );

          const div = document.createElement("div");
          div.className = "imagem";

          div.classList.add("imagem");

          const img = new Image();

          img.src = e.target.result;
          img.alt = arquivo.name;

          img.onclick = function () {
            abrirModal(e.target.result, descricao);
          };

          div.appendChild(img);

          galerias.appendChild(div);
        };
        leitor.readAsDataURL(arquivo);
      }
    });
  });

function abrirModal(src, descricao) {
  const modal = document.getElementById('modal');

  modal.style.display = 'flex';

  modal.querySelector('img').src = src;

  modal.querySelector('.descricao').textContent = descricao || "Sem descrição";

  window.imagemAtual = src;
}

function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function removerImagem(event) {

    event.stopPropagation(); // Impede que o evento de clique no botão de remover seja propagado para a imagem
    const imagens = document.querySelectorAll('#galeria .imagem img');
    imagens.forEach(img => {
        if (img.src === window.imagemAtual) {
            img.parentElement.remove(); // Remove o elemento pai (div com a imagem)
        }
    });

    fecharModal();

}
