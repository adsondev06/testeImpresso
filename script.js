// let dadosPlanilha = []; // Array para armazenar os dados da planilha
// let historicoBuscas = []; // Array para armazenar o histórico de buscas
// let nomeContagemTotal = {}; // Objeto para armazenar a contagem total de cada nome
// let nomesBuscados = {}; // Objeto para armazenar nomes que já foram buscados

// // Função para ler a planilha
// document.getElementById("input-excel").addEventListener("change", (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });

//         // Supondo que a planilha está na primeira aba
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//         // Ignorar a primeira linha e armazenar os dados da planilha no formato de objetos
//         dadosPlanilha = jsonData.slice(1).map(row => ({
//             codigo: row[0], // Coluna A
//             driver: row[1]  // Coluna B
//         }));

//         // Contar as ocorrências de cada nome (driver) para o total
//         nomeContagemTotal = contarOcorrencias(dadosPlanilha);

//         // Exibir os resultados na tela
//         exibirContagem(nomeContagemTotal);

//         console.log("Dados importados da planilha:", dadosPlanilha); // Para depuração
//     };

//     reader.readAsArrayBuffer(file);
// });

// // Função para contar quantas vezes cada nome aparece na planilha
// function contarOcorrencias(planilha) {
//     const contagem = {};
//     planilha.forEach(item => {
//         // Usa o nome completo, ignorando números, para contagem total
//         const nomeDriver = item.driver.replace(/\d+/g, '').trim(); 

//         if (nomeDriver) {
//             if (contagem[nomeDriver]) {
//                 contagem[nomeDriver]++;
//             } else {
//                 contagem[nomeDriver] = 1;
//             }
//         }
//     });
//     return contagem;
// }

// // Função para exibir todos os nomes com suas contagens na tela
// function exibirContagem(contagem) {
//     const contagemDiv = document.getElementById("contagem-nomes");
//     contagemDiv.innerHTML = ""; // Limpa resultados anteriores

//     // Cria um contêiner flexível para os itens
//     const contenedorFlex = document.createElement("div");
//     contenedorFlex.classList.add("contagem-container");

//     // Exibe todos os nomes e suas contagens
//     for (const [nome, quantidade] of Object.entries(contagem)) {
//         // Cria um div para encapsular o nome e a contagem
//         const contagemItem = document.createElement("div");
//         contagemItem.classList.add("contagem-item"); // Adiciona uma classe para o estilo

//         // Define o conteúdo com borda e padding
//         contagemItem.innerHTML = `
//             <strong>${nome}</strong>
//             <span class="bordered-count">${quantidade}</span>
//         `;

//         contenedorFlex.appendChild(contagemItem);
//     }

//     contagemDiv.appendChild(contenedorFlex); // Adiciona o contêiner flexível ao DOM
// }

// // Função para buscar pelo código
// function buscarPorCodigo() {
//     const codigoInput = document.getElementById("codigo").value.trim();
//     const resultadosDiv = document.getElementById("resultado");
//     resultadosDiv.innerHTML = ""; // Limpa resultados anteriores

//     if (codigoInput === "") {
//         resultadosDiv.innerHTML = "Por favor, insira um código para buscar.";
//         return;
//     }

//     // Busca pelo código
//     const resultado = dadosPlanilha.find(item => item.codigo.toString() === codigoInput);

//     if (resultado) {
//         // Usa o nome completo para verificar a contagem
//         const nomeDriver = resultado.driver.trim();
//         const nomeSemNumeros = nomeDriver.replace(/\d+/g, '').trim(); // Nome sem números

//         // Verifica se o nome já foi buscado antes
//         if (!nomesBuscados[nomeDriver]) {
//             // Subtrai 1 da contagem total apenas se ainda não foi buscado
//             if (nomeContagemTotal[nomeSemNumeros] > 0) {
//                 nomeContagemTotal[nomeSemNumeros]--; // Subtrai 1 da contagem total
//             }
//             nomesBuscados[nomeDriver] = true; // Marca que o nome foi buscado
//         }

//         resultadosDiv.innerHTML = `Código: <strong>${resultado.codigo}</strong> - Driver: <span class="highlight">${resultado.driver}</span>`;

//         // Adiciona ao histórico de buscas no início
//         historicoBuscas.unshift({
//             codigo: resultado.codigo,
//             driver: resultado.driver
//         });
//         atualizarHistorico();

//         // Chama a função de fala para anunciar o resultado
//         speakText(`${resultado.driver}`);

//         // Atualiza a exibição da contagem após a subtração
//         exibirContagem(nomeContagemTotal);

//     } else {
//         resultadosDiv.innerHTML = "Nenhum resultado encontrado.";
//     }

//     // Limpa o campo de busca e mantém o foco
//     document.getElementById("codigo").value = "";
//     document.getElementById("codigo").focus();
// }

// // Função para converter texto em fala com velocidade e suavidade ajustadas
// function speakText(text) {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'pt-BR'; 
//     utterance.rate = 2.0;
//     utterance.pitch = 1.3; 

//     // Fala o texto
//     synth.speak(utterance);
// }

// // Função para atualizar o histórico de buscas na tela
// function atualizarHistorico() {
//     const listaHistorico = document.getElementById("lista-historico");
//     listaHistorico.innerHTML = "";

//     historicoBuscas.forEach(item => {
//         const li = document.createElement("li");
//         li.innerHTML = `Código: <strong>${item.codigo}</strong> - Driver: <span class="highlight">${item.driver}</span>`;
//         listaHistorico.appendChild(li);
//     });
// }

// // Função para filtrar o histórico de buscas e ordenar numericamente
// function filtrarHistorico() {
//     const filtro = document.getElementById("filtro").value.toLowerCase();
//     const listaHistorico = document.getElementById("lista-historico");
//     listaHistorico.innerHTML = "";

//     // Filtra os registros que correspondem ao filtro
//     const historicoFiltrado = historicoBuscas.filter(item => {
//         return item.codigo.toString().toLowerCase().includes(filtro) ||
//                item.driver.toLowerCase().includes(filtro);
//     });

//     // Ordena numericamente com base no número após "Rizzy"
//     historicoFiltrado.sort((a, b) => {
//         const numeroA = parseInt(a.driver.match(/\d+/)[0], 10);
//         const numeroB = parseInt(b.driver.match(/\d+/)[0], 10);
//         return numeroA - numeroB;
//     });

//     // Exibe os registros filtrados e ordenados
//     historicoFiltrado.forEach(item => {
//         const li = document.createElement("li");
//         li.innerHTML = `Código: <strong>${item.codigo}</strong> - Driver: <span class="highlight">${item.driver}</span>`;
//         listaHistorico.appendChild(li);
//     });
// }

// // Função para gerar arquivo XLSX do histórico
// function gerarXLSX() {
//     const workbook = XLSX.utils.book_new();
//     const filtro = document.getElementById("filtro").value.toLowerCase();

//     // Se houver filtro, exporta apenas os itens filtrados
//     const historicoParaExportar = filtro 
//         ? historicoBuscas.filter(item => {
//             return item.codigo.toString().toLowerCase().includes(filtro) ||
//                    item.driver.toLowerCase().includes(filtro);
//         }).sort((a, b) => {
//             const numeroA = parseInt(a.driver.match(/\d+/)[0], 10);
//             const numeroB = parseInt(b.driver.match(/\d+/)[0], 10);
//             return numeroA - numeroB;
//         })
//         : historicoBuscas;

//     // Adiciona os dados do histórico na planilha
//     const worksheetData = [
//         ["Código", "Driver"], // Cabeçalhos das colunas
//         ...historicoParaExportar.map(item => [item.codigo, item.driver]) // Dados do histórico
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Histórico de Buscas");
    
//     // Gera o arquivo e dispara o download
//     XLSX.writeFile(workbook, "historico_buscas.xlsx");
// }

// // Adiciona evento de busca ao pressionar a tecla Enter
// document.getElementById("codigo").addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//         buscarPorCodigo(); // Chama a função de busca ao pressionar Enter
//     }
// });

// // Mantém o foco no input a cada 2 segundos
// setInterval(() => {
//     document.getElementById("codigo").focus();
// }, 2000);

// // Alerta de confirmação ao recarregar a página
// window.addEventListener('beforeunload', function (event) {
//     const message = "Deseja recarregar a página? Seu histórico será perdido.";
//     event.returnValue = message; // Para a maioria dos navegadores
//     return message; // Para Firefox
// });



let dadosPlanilha = []; // Array para armazenar os dados da planilha
let historicoBuscas = []; // Array para armazenar o histórico de buscas
let nomeContagemTotal = {}; // Objeto para armazenar a contagem total de cada nome
let nomesBuscados = {}; // Objeto para armazenar nomes que já foram buscados

// Função para ler a planilha
document.getElementById("input-excel").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Supondo que a planilha está na primeira aba
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Ignorar a primeira linha e armazenar os dados da planilha no formato de objetos
        dadosPlanilha = jsonData.slice(1).map(row => ({
            codigo: row[0], // Coluna A
            driver: row[1]  // Coluna B
        }));

        // Contar as ocorrências de cada nome (driver) para o total
        nomeContagemTotal = contarOcorrencias(dadosPlanilha);

        // Exibir os resultados na tela
        exibirContagem(nomeContagemTotal);

        console.log("Dados importados da planilha:", dadosPlanilha); // Para depuração
    };

    reader.readAsArrayBuffer(file);
});

// Função para contar quantas vezes cada nome aparece na planilha
function contarOcorrencias(planilha) {
    const contagem = {};
    planilha.forEach(item => {
        // Usa o nome completo, ignorando números, para contagem total
        const nomeDriver = item.driver.replace(/\d+/g, '').trim(); 

        if (nomeDriver) {
            if (contagem[nomeDriver]) {
                contagem[nomeDriver]++;
            } else {
                contagem[nomeDriver] = 1;
            }
        }
    });
    return contagem;
}

// Função para exibir todos os nomes com suas contagens na tela
function exibirContagem(contagem) {
    const contagemDiv = document.getElementById("contagem-nomes");
    contagemDiv.innerHTML = ""; // Limpa resultados anteriores

    // Cria um contêiner flexível para os itens
    const contenedorFlex = document.createElement("div");
    contenedorFlex.classList.add("contagem-container");

    // Exibe todos os nomes e suas contagens
    for (const [nome, quantidade] of Object.entries(contagem)) {
        // Divide a quantidade por 2 se ela for maior que 1, caso contrário, mantém o valor original
        const contagemExibida = quantidade > 1 ? Math.floor(quantidade / 2) : quantidade; 

        // Cria um div para encapsular o nome e a contagem
        const contagemItem = document.createElement("div");
        contagemItem.classList.add("contagem-item"); // Adiciona uma classe para o estilo

        // Define o conteúdo com borda e padding
        contagemItem.innerHTML = `
            <strong>${nome}</strong>
            <span class="bordered-count">${contagemExibida}</span>
        `;

        contenedorFlex.appendChild(contagemItem);
    }

    contagemDiv.appendChild(contenedorFlex); // Adiciona o contêiner flexível ao DOM
}

// Função para buscar pelo código
function buscarPorCodigo() {
    const codigoInput = document.getElementById("codigo").value.trim();
    const resultadosDiv = document.getElementById("resultado");
    resultadosDiv.innerHTML = ""; // Limpa resultados anteriores

    if (codigoInput === "") {
        resultadosDiv.innerHTML = "Por favor, insira um código para buscar.";
        return;
    }

    // Busca pelo código
    const resultado = dadosPlanilha.find(item => item.codigo.toString() === codigoInput);

    if (resultado) {
        // Usa o nome completo para verificar a contagem
        const nomeDriver = resultado.driver.trim();
        const nomeSemNumeros = nomeDriver.replace(/\d+/g, '').trim(); // Nome sem números

        // Verifica se o nome já foi buscado antes
        if (!nomesBuscados[nomeDriver]) {
            // Subtrai 1 da contagem total apenas se ainda não foi buscado
            if (nomeContagemTotal[nomeSemNumeros] > 0) {
                nomeContagemTotal[nomeSemNumeros]--; // Subtrai 1 da contagem total
            }
            nomesBuscados[nomeDriver] = true; // Marca que o nome foi buscado
        }

        resultadosDiv.innerHTML = `Código: <strong>${resultado.codigo}</strong> - Driver: <span class="highlight">${resultado.driver}</span>`;

        // Adiciona ao histórico de buscas no início
        historicoBuscas.unshift({
            codigo: resultado.codigo,
            driver: resultado.driver
        });
        atualizarHistorico();

        // Chama a função de fala para anunciar o resultado
        speakText(`${resultado.driver}`);

        // Atualiza a exibição da contagem após a subtração
        exibirContagem(nomeContagemTotal);

    } else {
        resultadosDiv.innerHTML = "Nenhum resultado encontrado.";
    }

    // Limpa o campo de busca e mantém o foco
    document.getElementById("codigo").value = "";
    document.getElementById("codigo").focus();
}

// Função para converter texto em fala com velocidade e suavidade ajustadas
function speakText(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 2.0;
    utterance.pitch = 1.3; 

    // Fala o texto
    synth.speak(utterance);
}

// Função para atualizar o histórico de buscas na tela
function atualizarHistorico() {
    const listaHistorico = document.getElementById("lista-historico");
    listaHistorico.innerHTML = "";

    historicoBuscas.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `Código: <strong>${item.codigo}</strong> - Driver: <span class="highlight">${item.driver}</span>`;
        listaHistorico.appendChild(li);
    });
}

// Função para filtrar o histórico de buscas e ordenar numericamente
function filtrarHistorico() {
    const filtro = document.getElementById("filtro").value.toLowerCase();
    const listaHistorico = document.getElementById("lista-historico");
    listaHistorico.innerHTML = "";

    // Filtra os registros que correspondem ao filtro
    const historicoFiltrado = historicoBuscas.filter(item => {
        return item.codigo.toString().toLowerCase().includes(filtro) ||
               item.driver.toLowerCase().includes(filtro);
    });

    // Ordena numericamente com base no número após "Rizzy"
    historicoFiltrado.sort((a, b) => {
        const numeroA = parseInt(a.driver.match(/\d+/)[0], 10);
        const numeroB = parseInt(b.driver.match(/\d+/)[0], 10);
        return numeroA - numeroB;
    });

    // Exibe os registros filtrados e ordenados
    historicoFiltrado.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `Código: <strong>${item.codigo}</strong> - Driver: <span class="highlight">${item.driver}</span>`;
        listaHistorico.appendChild(li);
    });
}

// Função para gerar arquivo XLSX do histórico
function gerarXLSX() {
    const workbook = XLSX.utils.book_new();
    const filtro = document.getElementById("filtro").value.toLowerCase();

    // Se houver filtro, exporta apenas os itens filtrados
    const historicoParaExportar = filtro 
        ? historicoBuscas.filter(item => {
            return item.codigo.toString().toLowerCase().includes(filtro) ||
                   item.driver.toLowerCase().includes(filtro);
        }).sort((a, b) => {
            const numeroA = parseInt(a.driver.match(/\d+/)[0], 10);
            const numeroB = parseInt(b.driver.match(/\d+/)[0], 10);
            return numeroA - numeroB;
        })
        : historicoBuscas;

    // Adiciona os dados do histórico na planilha
    const worksheetData = [
        ["Código", "Driver"], // Cabeçalhos das colunas
        ...historicoParaExportar.map(item => [item.codigo, item.driver]) // Dados do histórico
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Histórico de Buscas");
    
    // Gera o arquivo e dispara o download
    XLSX.writeFile(workbook, "historico_buscas.xlsx");
}

// Adiciona evento de busca ao pressionar a tecla Enter
document.getElementById("codigo").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        buscarPorCodigo(); // Chama a função de busca ao pressionar Enter
    }
});

// Mantém o foco no input a cada 2 segundos
setInterval(() => {
    document.getElementById("codigo").focus();
}, 2000);

// Alerta de confirmação ao recarregar a página
window.addEventListener('beforeunload', function (event) {
    const message = "Deseja recarregar a página? Seu histórico será perdido.";
    event.returnValue = message; // Para a maioria dos navegadores
    return message; // Para Firefox
});
