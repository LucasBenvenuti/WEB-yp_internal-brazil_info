const cardToHTML = (card) => {
    let html = "";

    html = `${html}<div id="tit-topico-selecionado">${card.title}</div>`;
    html = `${html}<div class="cont-corpo-topico-selecionado">
    <p id="corpo-cima-topico-selecionado">${card.subtitle}</p>
    <br />`;
    if (card.images_id.length > 0) {
        html = `${html}  <div id="cont-carrossel-imagens" class="cont-carrossel-imagens-completo">
        <div class="gradiente-carrossel-imagens"></div>
        <div id="itens-carrossel-imagem" class="carrossel-imagens">`;
        card.images_id.forEach((id) => {
            html = `${html}
            <div class="item-carrossel-imagens">
                <div id="img-carrossel-${id}" class="img-carrossel-imagens"></div>
                <div class="legenda-carrossel-imagens">Imagem</div>
            </div>`;
        });

        html = `${html}</div>
    </div>`;
    }
    html = `${html}<div id="corpo-texto-restante">${card.description_text}`;
    html = `${html}<strong>Referência</strong>`;
    html = `${html}${card.sources}
    </div>
    </div>`;

    return html;
};
