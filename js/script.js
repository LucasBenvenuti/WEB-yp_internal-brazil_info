$(".cont-carrossel-imagens-completo").remove();
$(".img-carrossel-maisBrasil").remove();

var menuAberto = false;
var atualMenu = "mapa";

var nomeEstadoAtual = "";
var idEstadoAtual = "";
var diretorioEstadoAtual = "";
var idCompletoEstadoAtual = "";

var nomeListaAtual = "";
var idListaAtual = "";
var diretorioListaAtual = "";
var idCompletoListaAtual = "";

var carrosselHabilitado = false;

var $carrosselListaTopicos;

var nomeMateriaAtual = "";
var idMateriaAtual = "";
var diretorioMateriaAtual = "";
var idCompletoMateriaAtual = "";

var carrosselMateriasHabilitado = false;

var $carrosselMaterias;

var $carrosselImgsLightbox;

var valorTopicoAtual = "";

async function selecionarItemMenu(estadoID) {
    estadoID = estadoID.split("-");
    var nomeEstadoSelecionado = estadoID[0];
    var idEstadoSelecionado = estadoID[1];

    const mapaCard = await (
        await fetch(
            `${host}/brazilCards/?state=${nomeEstadoSelecionado}&field=Demografico`
        )
    ).json();

    const mapa = await (
        await fetch(`${host}/images/${mapaCard[0].images_id[0]}`)
    ).json();

    //                alert(nomeEstadoSelecionado);

    //                AO PROGRAMAR, PROCURAR NA PASTA DE ITENS DO MENU DE NUMERO 6 ENTRE 0-26

    if (!menuAberto) {
        idCompletoEstadoAtual =
            nomeEstadoSelecionado + "-" + idEstadoSelecionado + "-menu";

        //                    alert(idCompletoEstadoAtual);

        $("#lightbox-mapa-brasil").addClass(
            "lightbox-mapa-brasil-class-apareceu"
        );
        $("#conteudo-lightbox-mapa-brasil").addClass(
            "conteudo-lightbox-mapa-brasil-class-apareceu"
        );

        $("#" + idCompletoEstadoAtual).addClass(
            "item-menu-lateral-selecionado"
        );

        menuAberto = true;
    } else {
        $("#" + idCompletoEstadoAtual).removeClass(
            "item-menu-lateral-selecionado"
        );

        //                    alert(idCompletoEstadoAtual);

        idCompletoEstadoAtual =
            nomeEstadoSelecionado + "-" + idEstadoSelecionado + "-menu";

        //                    alert(idCompletoEstadoAtual);

        if (atualMenu == "estado") {
            $("#mapa-demografico-estados-informacoes").removeClass(
                "cont-infos-apareceu"
            );
        }

        if (atualMenu == "listaTopicos") {
            $("#cont-lista-topicos-informacoes").removeClass(
                "cont-infos-apareceu"
            );
        }

        if ((atualMenu = "materiaSelecionada")) {
            $("#cont-informacoes").removeClass("cont-infos-apareceu");
        }

        $("#" + idCompletoEstadoAtual).addClass(
            "item-menu-lateral-selecionado"
        );
    }

    setTimeout(function () {
        document
            .getElementById("cont-imagens-mapa-maisBrasil")
            .children[0].setAttribute("src", mapa.url);

        document
            .getElementById("mapa-demografico-estados-informacoes")
            .addEventListener(
                "click",
                function () {
                    abrirLightboxImgs("mapaImagens");
                },
                false
            );

        // AQUI A IMAGEM DO MAPA É LIDA:
        $("#mapa-demografico-estados-informacoes").css({
            background: `url(${mapa.url})`,
            "background-repeat": "no-repeat",
            "background-size": "contain",
            "background-position": "center",
        });

        $("#mapa-demografico-estados-informacoes").addClass(
            "cont-infos-apareceu"
        );

        nomeEstadoAtual = nomeEstadoSelecionado;
        idEstadoAtual = idEstadoSelecionado;

        atualMenu = "estado";
    }, 200);
}

async function selecionarListaTopicos(listaID) {
    idCompletoListaAtual = listaID;

    listaID = listaID.split("-");

    var nomeListaSelecionado = listaID[0];
    var idListaSelecionado = listaID[1];

    const cards = await (
        await fetch(
            `${host}/brazilCards/?state=${
                idCompletoEstadoAtual.split("-")[0]
            }&field=${nomeListaSelecionado}`
        )
    ).json();

    if (atualMenu == "estado") {
        $("#mapa-demografico-estados-informacoes").removeClass(
            "cont-infos-apareceu"
        );
    }

    if (atualMenu == "listaTopicos") {
        $("#cont-lista-topicos-informacoes").removeClass("cont-infos-apareceu");
    }

    if ((atualMenu = "materiaSelecionada")) {
        $("#cont-informacoes").removeClass("cont-infos-apareceu");
    }

    setTimeout(function () {
        document.getElementById(
            "nome-topico-selecionado-informacao"
        ).innerHTML = document.getElementById(idCompletoListaAtual).innerHTML;

        nomeListaAtual = nomeListaSelecionado;
        idListaAtual = idListaSelecionado;

        criarListaTopicos(
            nomeEstadoAtual + "_" + nomeListaSelecionado,
            cards.length
        );

        $("#cont-lista-topicos-informacoes").addClass("cont-infos-apareceu");

        atualMenu = "listaTopicos";
    }, 200);
}

async function criarListaTopicos(nomeBaseId, qtdTopicos) {
    [state, field] = nomeBaseId.split("_");
    const cards = await (
        await fetch(`${host}/brazilCards/?state=${state}&field=${field}`)
    ).json();

    $(".cont-topico-materias").remove();

    if (carrosselHabilitado) {
        $carrosselListaTopicos.flickity("destroy");

        carrosselHabilitado = false;
    }

    for (var i = 0; i < qtdTopicos; i++) {
        const card = cards.find((card) => card.topic == `topico_${i}`);
        if (carrosselHabilitado) {
            $carrosselListaTopicos.flickity("destroy");

            carrosselHabilitado = false;
        }

        var parentDiv = document.getElementById("lista-topicos-informacao");

        var novoTopicoID = nomeBaseId + "_topico_" + i;

        //CRIA ELEMENTOS
        var div0Nova = document.createElement("div");
        var div1Nova = document.createElement("div");
        var div2Nova = document.createElement("div");
        var div3Nova = document.createElement("div");
        var div4Nova = document.createElement("div");
        var div5Nova = document.createElement("div");
        var div6Nova = document.createElement("div");

        //CRIA ATRIBUTOS
        var novaID_0_Topico = document.createAttribute("id");
        var novaClasse_0_Topico = document.createAttribute("class");

        var novaClasse_1_Topico = document.createAttribute("class");

        var novaID_2_Topico = document.createAttribute("id");
        var novaClasse_2_Topico = document.createAttribute("class");

        var novaClasse_3_Topico = document.createAttribute("class");

        var novaID_4_Topico = document.createAttribute("id");
        var novaClasse_4_Topico = document.createAttribute("class");

        var novaID_5_Topico = document.createAttribute("id");
        var novaClasse_5_Topico = document.createAttribute("class");

        var novaClasse_6_Topico = document.createAttribute("class");

        //DEFINE VALORES
        novaID_0_Topico.value = novoTopicoID;
        novaClasse_0_Topico.value = "cont-topico-materias";

        novaClasse_1_Topico.value = "topico-materias";

        novaID_2_Topico.value = "img_" + novoTopicoID;
        novaClasse_2_Topico.value = "img-topico-materias";

        novaClasse_3_Topico.value = "cont-txt-topicos-materias";

        novaID_4_Topico.value = "tit_" + novoTopicoID;
        novaClasse_4_Topico.value = "tit-txt-topicos-materias";

        novaID_5_Topico.value = "corpo_" + novoTopicoID;
        novaClasse_5_Topico.value = "corpo-txt-topicos-materias";

        novaClasse_6_Topico.value = "gradiente-final-topicos-materias";

        //DEFINE OS ATRIBUTOS PARA AS DIVS
        div0Nova.setAttributeNode(novaID_0_Topico);
        div0Nova.setAttributeNode(novaClasse_0_Topico);

        div1Nova.setAttributeNode(novaClasse_1_Topico);

        div2Nova.setAttributeNode(novaID_2_Topico);
        div2Nova.setAttributeNode(novaClasse_2_Topico);

        div3Nova.setAttributeNode(novaClasse_3_Topico);

        div4Nova.setAttributeNode(novaID_4_Topico);
        div4Nova.setAttributeNode(novaClasse_4_Topico);

        div5Nova.setAttributeNode(novaID_5_Topico);
        div5Nova.setAttributeNode(novaClasse_5_Topico);

        div6Nova.setAttributeNode(novaClasse_6_Topico);
        //ADICIONA EVENTOS NAS DIVS
        div0Nova.addEventListener(
            "click",
            function () {
                selecionarMateria(this.id);
            },
            false
        );

        //CRIA ESTRUTURA
        parentDiv.appendChild(div0Nova);
        div0Nova.appendChild(div1Nova);
        div1Nova.appendChild(div2Nova);
        div1Nova.appendChild(div3Nova);
        div3Nova.appendChild(div4Nova);
        div3Nova.appendChild(div5Nova);
        div3Nova.appendChild(div6Nova);

        var numeroMateriaId = document.getElementById(novoTopicoID).children[0]
            .id;
        var tituloMateria = document.getElementById(novoTopicoID).children[1]
            .innerHTML;
        var corpoMateria = $("#" + novoTopicoID)
            .find("#corpo-cima-topico-selecionado")
            .html();

        numeroMateriaId = numeroMateriaId.split("_");

        let image;
        if (card.images_id.length > 0) {
            image = await (
                await fetch(`${host}/images/${card.images_id[0]}`)
            ).json();
        }

        // AQUI AS IMAGENS SÃO LIDAS:
        const qtdArqivos = card.images_id.length + 1;
        if (qtdArqivos > 1) {
            $("#img_" + novoTopicoID).css({
                background: `url(${image.url})`,
                "background-repeat": "no-repeat",
                "background-size": "contain",
                "background-position": "center",
            });
        }

        document.getElementById(
            "tit_" + novoTopicoID
        ).innerHTML = tituloMateria;
        document.getElementById(
            "corpo_" + novoTopicoID
        ).innerHTML = corpoMateria;

        $carrosselListaTopicos = $("#lista-topicos-informacao").flickity({
            wrapAround: true,
            contain: true,
            cellAlign: "center",
            autoPlay: true,
            groupCells: 1,
            draggable: false,
        });

        $(".previous").css({
            left: "-25px",
            "z-index": "10",
        });

        $(".next").css({
            right: "-25px",
            "z-index": "10",
        });

        carrosselHabilitado = true;
    }
}

async function selecionarMateria(materiaID) {
    // selecionar CARD
    idCompletoMateriaAtual = materiaID;

    materiaID = materiaID.split("-");

    var nomeListaSelecionado = materiaID[0];
    var idListaSelecionado = materiaID[1];
    $("#cont-lista-topicos-informacoes").removeClass("cont-infos-apareceu");

    setTimeout(function () {
        criarMateriaSelecionada(materiaID);

        document.getElementById(
            "nome-topico-selecionado"
        ).innerHTML = document.getElementById(idCompletoListaAtual).innerHTML;

        $("#cont-informacoes").addClass("cont-infos-apareceu");

        nomeMateriaAtual = nomeListaSelecionado;
        idMateriaAtual = idListaSelecionado;

        atualMenu = "materiaSelecionada";
    }, 200);
}

async function criarMateriaSelecionada(idMateriaSelecionada) {
    var idMateriaSelecionadaAtual = document.getElementById(
        idMateriaSelecionada
    ).id;
    idMateriaSelecionadaAtual = idMateriaSelecionadaAtual.split("_");

    idMateriaSelecionadaAtual = idMateriaSelecionadaAtual[3];

    var numeroMateriaId = document.getElementById(idMateriaSelecionada)
        .children[0].id;
    numeroMateriaId = numeroMateriaId.split("_");

    var valorImgId = numeroMateriaId[1];

    const card = await (
        await fetch(`${host}/brazilCards/${valorImgId}`)
    ).json();

    $(".img-topico-selecionado").remove();
    // ISSO FAZ A APP QUEBRAR VV
    // $("#cont-imagens-maisBrasil").empty();

    var qtdImagensMateria = card.images_id.length;

    if (qtdImagensMateria > 0) {
        $("#cont-carrossel-topico").removeClass(
            "sem-cont-carrossel-topico-class"
        );
        $("#informacoes-topico-selecionado").removeClass(
            "informacoes-topico-selecionado-class-sem-carrossel"
        );
    } else {
        $("#cont-carrossel-topico").addClass("sem-cont-carrossel-topico-class");
        $("#informacoes-topico-selecionado").addClass(
            "informacoes-topico-selecionado-class-sem-carrossel"
        );
    }

    //SOMENTE IMAGENS -p
    for (var i = 0; i < qtdImagensMateria; i++) {
        var parentDivMateria = document.getElementById("cont-imgs-topico");

        var parentDivLightBox = document.getElementById(
            "cont-imagens-maisBrasil"
        );

        //CRIA ELEMENTOS
        var div0Nova_Materia = document.createElement("div");

        //CRIA ELEMENTOS LIGHTBOX
        var novaClasse_0_lightbox_img = document.createElement("img");

        //CRIA ATRIBUTOS
        var novaID_0_Materia = document.createAttribute("id");
        var novaClasse_0_Materia = document.createAttribute("class");

        //DEFINE VALORES
        novaID_0_Materia.value = "img_materia_" + i;
        novaClasse_0_Materia.value = "img-topico-selecionado";

        //DEFINE OS ATRIBUTOS PARA AS DIVS
        div0Nova_Materia.setAttributeNode(novaID_0_Materia);
        div0Nova_Materia.setAttributeNode(novaClasse_0_Materia);

        div0Nova_Materia.addEventListener(
            "click",
            function () {
                abrirLightboxImgs("imagensTopicos");
            },
            false
        );

        //DEFINE VALORES LIGHTBOX
        novaClasse_0_lightbox_img.setAttribute(
            "class",
            "img-carrossel-maisBrasil"
        );

        const image = await (
            await fetch(`${host}/images/${card.images_id[i]}`)
        ).json();

        // IMAGENS SENDO LIDAS AQUI:
        novaClasse_0_lightbox_img.setAttribute("src", image.url);

        //CRIA ESTRUTURA
        parentDivMateria.appendChild(div0Nova_Materia);

        //CRIAR ESTRUTURA LIGHTBOX IMGS
        parentDivLightBox.appendChild(novaClasse_0_lightbox_img);

        // AQUI AS IMAGENS TAMBÉM SÃO LIDAS TAMBÉM:
        $("#img_materia_" + i).css({
            background: `url(${image.url})`,
            "background-position": "center",
            "background-size": "contain",
            "background-repeat": "no-repeat",
        });

        if (carrosselMateriasHabilitado) {
            $carrosselMaterias.flickity("destroy");
            $carrosselImgsLightbox.flickity("destroy");
            carrosselMateriasHabilitado = false;
        }

        $carrosselMaterias = $("#cont-imgs-topico").flickity({
            wrapAround: true,
            contain: true,
            cellAlign: "center",
            autoPlay: true,
            groupCells: 1,
            draggable: false,
        });

        //CARROSSEL LIGHTBOX IMAGES
        $carrosselImgsLightbox = $("#cont-imagens-maisBrasil").flickity({
            wrapAround: true,
            contain: true,
            cellAlign: "center",
            autoPlay: true,
            groupCells: 1,
            draggable: false,
        });

        $(".previous").css({
            left: "-25px",
            "z-index": "10",
        });

        $(".next").css({
            right: "-25px",
            "z-index": "10",
        });

        carrosselMateriasHabilitado = true;
    }

    var tituloMateriaSelecionada = document.getElementById(idMateriaSelecionada)
        .children[1].innerHTML;
    var subtituloMateriaSelecionada = $("#" + idMateriaSelecionada)
        .find("#corpo-cima-topico-selecionado")
        .html();
    var restanteMateriaSelecionada = $("#" + idMateriaSelecionada)
        .find("#corpo-texto-restante")
        .html();
    document.getElementById(
        "titulo-topico-selecionado"
    ).innerHTML = tituloMateriaSelecionada;
    document.getElementById(
        "subtitulo-topico-selecionado"
    ).innerHTML = subtituloMateriaSelecionada;
    document.getElementById(
        "corpo-topico-selecionado"
    ).innerHTML = restanteMateriaSelecionada;
    if (valorImgId == 220) console.log(restanteMateriaSelecionada);
}

async function closeLightbox() {
    $("#lightbox-mapa-brasil").removeClass(
        "lightbox-mapa-brasil-class-apareceu"
    );
    $("#conteudo-lightbox-mapa-brasil").removeClass(
        "conteudo-lightbox-mapa-brasil-class-apareceu"
    );

    setTimeout(function () {
        $("#" + idCompletoEstadoAtual).removeClass(
            "item-menu-lateral-selecionado"
        );

        $(".cont-infos-apareceu").removeClass("cont-infos-apareceu");

        idCompletoEstadoAtual = "";

        nomeEstadoAtual = "";
        idEstadoAtual = "";

        atualMenu = "mapa";

        menuAberto = false;
    }, 200);
}

async function abrirLightboxImgs(tipoImagemView) {
    $("#lightbox-imagens-maisBrasil").addClass("aparecer-lightbox-images");

    if (tipoImagemView == "mapaImagens") {
        $("#cont-imagens-maisBrasil").removeClass(
            "cont-images-maisBrasil-aparecer"
        );
        $("#cont-imagens-mapa-maisBrasil").addClass(
            "cont-images-maisBrasil-aparecer"
        );
    } else {
        $("#cont-imagens-mapa-maisBrasil").removeClass(
            "cont-images-maisBrasil-aparecer"
        );
        $("#cont-imagens-maisBrasil").addClass(
            "cont-images-maisBrasil-aparecer"
        );
    }
}

async function fecharLightboxImgs() {
    $("#lightbox-imagens-maisBrasil").removeClass("aparecer-lightbox-images");
    $("#cont-imagens-maisBrasil").removeClass(
        "cont-images-maisBrasil-aparecer"
    );
    $("#cont-imagens-mapa-maisBrasil").removeClass(
        "cont-images-maisBrasil-aparecer"
    );
}

$(".state").tooltipster({
    animation: "fade",
    animationDuration: 200,
    delay: 0,
    theme: "tooltipster-borderless",
});
$(".state-df").tooltipster({
    animation: "fade",
    animationDuration: 200,
    delay: 0,
    theme: "tooltipster-borderless",
});
