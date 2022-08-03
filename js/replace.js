const host = "http://200.160.31.194:8001";

window.addEventListener("load", async () => {
    const items = document.getElementsByClassName("item-menu-secundario");
    items.forEach((item) => item.classList.add("hidden"));

    const response = await fetch(`${host}/brazilCards`);
    const cardsJson = await response.json();
    const cards = cardsJson.filter((card) => card.field != "Demografico");

    const caixasInvisiveis = document.getElementsByClassName(
        "caixas-invisiveis"
    )[0];

    caixasInvisiveis.innerHTML = "";

    cards.forEach((card) => {
        const div = document.createElement("div");
        div.setAttribute("id", `${card.state}_${card.field}_${card.topic}`);
        div.innerHTML = `<div id="materia_${card.id}"></div> ${cardToHTML(
            card
        )}`;
        caixasInvisiveis.appendChild(div);
    });
    items.forEach((item) => item.classList.remove("hidden"));
    fullyLoaded(true);
});
