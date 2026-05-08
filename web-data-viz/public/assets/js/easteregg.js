function ativarEasterEggCarro() {
    ativarTemaPinkEdition();
    aplicarRosaGlitter();
    mostrarPopupPinkEdition();
}

function mostrarPopupPinkEdition() {

    const popupExistente = document.querySelector(".popup-pink-edition");

    if (popupExistente) {
        popupExistente.remove();
    }

    const popup = document.createElement("div");

    popup.className = "popup-pink-edition";

    popup.innerHTML = `
        <div class="popup-pink-textos">
            <span>EASTER EGG DESBLOQUEADO</span>
            <h3>Pink Edition</h3>
        </div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("popup-pink-show");
    }, 50);

    setTimeout(() => {

        popup.classList.remove("popup-pink-show");

        setTimeout(() => {
            popup.remove();
        }, 500);

    }, 4500);
}

function ativarTemaPinkEdition() {
    document.documentElement.style.setProperty(
        "--cor-primaria",
        "#ff7adf"
    );

    document.documentElement.style.setProperty(
        "--cor-primaria-solid",
        "#ff4fcf"
    );

    document.documentElement.style.setProperty(
        "--cor-secundaria",
        "#ffb5ef"
    );

    document.documentElement.style.setProperty(
        "--cor-borda-fraca",
        "rgba(255, 122, 223, 0.35)"
    );

    document.documentElement.style.setProperty(
        "--cor-glow",
        "rgba(255, 122, 223, 0.45)"
    );
}

async function aplicarRosaGlitter() {

    const glitterTexture = await modeloCarro.createTexture(
        "./assets/glb/textures/rosa_glitter_basecolor.png"
    );

    const materiais = modeloCarro.model.materials;

    for (let i = 0; i < materiais.length; i++) {

        let mat = materiais[i];

        if (mat.name == "Paint1Mtl") {
            mat.pbrMetallicRoughness.setBaseColorFactor([
                1,
                0.08,
                0.72,
                1
            ]);

            if (mat.pbrMetallicRoughness.baseColorTexture) {
                mat.pbrMetallicRoughness.baseColorTexture.setTexture(
                    glitterTexture
                );
            }

            mat.pbrMetallicRoughness.setMetallicFactor(1);
            mat.pbrMetallicRoughness.setRoughnessFactor(0.04);
            mat.setEmissiveFactor([
                0.22,
                0.03,
                0.12
            ]);
        }

        if (mat.name.includes("Glass")) {

            mat.pbrMetallicRoughness.setBaseColorFactor([
                0.03,
                0.02,
                0.04,
                0.45
            ]);

            mat.pbrMetallicRoughness.setMetallicFactor(0);

            mat.pbrMetallicRoughness.setRoughnessFactor(0.01);
        }

        if (mat.name.includes("Rim")) {

            mat.pbrMetallicRoughness.setBaseColorFactor([
                1,
                0.18,
                0.82,
                1
            ]);

            mat.pbrMetallicRoughness.setMetallicFactor(1);

            mat.pbrMetallicRoughness.setRoughnessFactor(0.02);
        }

        if (mat.name.includes("Black")) {

            // black piano
            mat.pbrMetallicRoughness.setBaseColorFactor([
                0.015,
                0.015,
                0.02,
                1
            ]);

            mat.pbrMetallicRoughness.setMetallicFactor(1);

            mat.pbrMetallicRoughness.setRoughnessFactor(0.08);
        }

        if (mat.name.includes("Reflect")) {

            mat.pbrMetallicRoughness.setBaseColorFactor([
                1,
                0.25,
                0.85,
                1
            ]);

            mat.pbrMetallicRoughness.setMetallicFactor(1);

            mat.pbrMetallicRoughness.setRoughnessFactor(0);
        }

        if (mat.name.includes("Light")) {

            mat.setEmissiveFactor([
                1,
                0.15,
                0.75
            ]);
        }
    }

    nome_carro.innerHTML = "Pink Edition";
}