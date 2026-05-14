const inputTexto = document.getElementById("input-texto");
const outputTexto = document.getElementById("output-texto");
const btnResumir = document.getElementById("btn-resumir");
const btnCopiar = document.getElementById("btn-copiar");
const btnLimparResumo = document.getElementById("btn-limpar-resumo");
const btnLimparTudo = document.getElementById("btn-limpar-tudo");

inputTexto.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

btnResumir.addEventListener("click", async () => {
  const textoParaResumir = inputTexto.value.trim();

  if (!textoParaResumir) {
    alert("Por favor, insira um texto para resumir.");
    return;
  }

  btnResumir.innerText = "Processando...";
  btnResumir.disabled = true;
  outputTexto.disabled = true;
  btnCopiar.disabled = true;
  btnLimparResumo.disabled = true;
  btnLimparTudo.disabled = true;
  outputTexto.value = "";

  try {
    const response = await fetch(
      "https://resumia-backend-cyqo.onrender.com/resumir",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textoParaResumir,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro no servidor: ${response.status}`);
    }

    const data = await response.json();

    const resumoFinal = data.summary;

    outputTexto.value = resumoFinal;
    outputTexto.disabled = false;
    btnCopiar.disabled = false;
    btnLimparResumo.disabled = false;
    btnLimparTudo.disabled = false;

    outputTexto.style.height = "auto";
    outputTexto.style.height = outputTexto.scrollHeight + "px";
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert(
      "Erro ao conectar com o servidor. Verifique se o backend está rodando na porta 3405.",
    );
  } finally {
    btnResumir.innerText = "Gerar Resumo";
    btnResumir.disabled = false;
  }
});

btnCopiar.addEventListener("click", () => {
  outputTexto.select();
  document.execCommand("copy");

  const textoOriginal = btnCopiar.innerText;
  btnCopiar.innerText = "Copiado!";

  setTimeout(() => {
    btnCopiar.innerText = textoOriginal;
  }, 2000);
});

btnLimparResumo.addEventListener("click", () => {
  outputTexto.value = "";
  outputTexto.disabled = true;
  btnCopiar.disabled = true;
  btnLimparResumo.disabled = true;
  btnLimparTudo.disabled = true;

  outputTexto.style.height = "auto";
});

btnLimparTudo.addEventListener("click", () => {
  inputTexto.value = "";
  outputTexto.value = "";

  outputTexto.disabled = true;
  btnCopiar.disabled = true;
  btnLimparResumo.disabled = true;
  btnLimparTudo.disabled = true;

  inputTexto.style.height = "auto";
  outputTexto.style.height = "auto";
});
