document.addEventListener("DOMContentLoaded", function () {

    // 1. RODAPÉ E ANO DINÂMICO 
    const anoSpans = document.querySelectorAll(".ano-atual");
    anoSpans.forEach(function (span) {
        span.textContent = new Date().getFullYear();
    });

    // 2. MENU MOBILE
    const botaoMenu = document.getElementById("botaoMenu");
    const menuNav = document.querySelector("nav ul");

    if (botaoMenu && menuNav) {
        botaoMenu.addEventListener("click", function () {
            menuNav.classList.toggle("menu-aberto");
        });
    }

    // 3. DESTACAR LINK DA PÁGINA ATUAL 
    const linksMenu = document.querySelectorAll("nav ul li a");
    const paginaAtual = window.location.pathname.split("/").pop();

    linksMenu.forEach(function (link) {
        const linkPagina = link.getAttribute("href");
        if (linkPagina === paginaAtual) {
            link.classList.add("link-ativo");
        }
    });

    // 4. BOTÃO "VOLTAR AO TOPO" 
    const botaoTopo = document.getElementById("botaoTopo");

    if (botaoTopo) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                botaoTopo.classList.add("visivel");
            } else {
                botaoTopo.classList.remove("visivel");
            }
        });

        botaoTopo.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 5. FORMULÁRIO DE CONTATO - VALIDAÇÃO 
    const formContato = document.getElementById("formContato");

    if (formContato) {
        const listaErros = document.getElementById("listaErros");
        const msgSucesso = document.getElementById("msgSucesso");

        const campoNome = document.getElementById("nome");
        const campoEmail = document.getElementById("email");
        const campoTelefone = document.getElementById("telefone");
        const campoMensagem = document.getElementById("mensagem");

        // Validação genérica de campo obrigatório
        function validarObrigatorio(valor) {
            return valor.trim().length > 0;
        }

        // Validação de e-mail
        function validarEmail(valor) {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regexEmail.test(valor.trim());
        }

        // Validação de telefone
        function validarTelefone(valor) {
            const numeros = valor.replace(/\D/g, "");
            return numeros.length >= 10 && numeros.length <= 11;
        }

        // ---- Captura dos dados  ----
        function capturarDados() {
            return {
                nome: campoNome.value,
                email: campoEmail.value,
                telefone: campoTelefone.value,
                mensagem: campoMensagem.value
            };
        }

        // Retorna um array com TODOS os erros encontrados
        function validarContato(dados) {
            const erros = [];
            const camposInvalidos = [];

            if (!validarObrigatorio(dados.nome)) {
                erros.push("O campo Nome é obrigatório.");
                camposInvalidos.push(campoNome);
            }

            if (!validarObrigatorio(dados.email)) {
                erros.push("O campo E-mail é obrigatório.");
                camposInvalidos.push(campoEmail);
            } else if (!validarEmail(dados.email)) {
                erros.push("Informe um e-mail válido (ex: nome@email.com).");
                camposInvalidos.push(campoEmail);
            }

            if (!validarObrigatorio(dados.telefone)) {
                erros.push("O campo Telefone é obrigatório.");
                camposInvalidos.push(campoTelefone);
            } else if (!validarTelefone(dados.telefone)) {
                erros.push("Informe um telefone válido (com DDD).");
                camposInvalidos.push(campoTelefone);
            }

            return { erros: erros, camposInvalidos: camposInvalidos };
        }

        // ---- Exibição e limpeza de mensagens ----
        function limparErros() {
            listaErros.innerHTML = "";
            [campoNome, campoEmail, campoTelefone, campoMensagem].forEach(function (campo) {
                campo.classList.remove("campo-invalido");
            });
        }

        function exibirErros(erros, camposInvalidos) {
            limparErros();

            erros.forEach(function (erro) {
                const item = document.createElement("li");
                item.textContent = erro;
                listaErros.appendChild(item);
            });

            camposInvalidos.forEach(function (campo) {
                campo.classList.add("campo-invalido");
            });
        }

        // ---- Simulação de envio ----
        function enviarContato(dados) {

            console.log("Enviando para o banco de dados (simulado):", dados);

            msgSucesso.textContent = "Mensagem enviada com sucesso! Em breve entraremos em contato.";

            formContato.reset();
            limparErros();

            setTimeout(function () {
                msgSucesso.textContent = "";
            }, 5000);
        }

        // ---- Bloqueia cadastro inválido ----
        formContato.addEventListener("submit", function (evento) {
            evento.preventDefault();

            msgSucesso.textContent = "";

            const dados = capturarDados();
            const resultado = validarContato(dados);

            if (resultado.erros.length > 0) {
                exibirErros(resultado.erros, resultado.camposInvalidos);
                return; //
            }

            limparErros();
            enviarContato(dados);
        });
    }

});
