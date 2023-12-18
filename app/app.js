const ajax = new XMLHttpRequest();

ajax.open("GET", "./data/dados.json", true);

ajax.send();

ajax.onreadystatechange = function () {
  const content = document.getElementById("content");

  if (this.readyState == 4 && this.status == 200) {
    const response = JSON.parse(ajax.responseText);
    let html_content = "";
    response.map((categoria) => {
      html_content += `<div class="row"><div class="col-12"><h2 class="rounded-top-2" > <span></span> ${categoria.categoria} </h2></div></div>`;

      html_content += '<div class="row">';
      categoria.itens.map((item) => {
        html_content += card(item.nome, item.img, item.link);
      });
      html_content += "</div>";
    });

    content.innerHTML = html_content;
    cache_dinamico(response);
  }
};

var card = function (nome, img, link) {
  return `<div class="col-lg-6" >
  <div class="card" >
    <img src=${img} class="card-img-top" alt=${nome}>
    <div class="card-body">
      <h5 class="card-title">Nome: ${nome}</h5>
      <div class="d-grid gap-2 d-md-block mt-2">
        <a href=${link} target="_blank" class="btn btn-dark">Ver mais </a>
      </div>
    </div>
  </div>
</div>`;
};

var cache_dinamico = function (data_json) {
  if ("caches" in window) {
    caches.delete("star-war-app-dinamico").then(function () {
      if (data_json.length > 0) {
        var files = ["data/dados.json"];

        for (let i = 0; i < data_json.length; i++) {
          for (let j = 0; j < data_json[i].itens.length; j++) {
            if (files.indexOf(data_json[i].itens[j].img) == -1) {
              files.push(data_json[i].itens[j].img);
            }
          }
        }
      }

      caches.open("star-war-app-dinamico").then(function (cache) {
        cache.addAll(files).then(function () {
          console.log("Novo cache dinâmico adicionado!");
        });
      });
    });
  }
};

//Botão de Instalação

let disparoInstalacao = null;
const btInstall = document.getElementById("btInstall");

let inicializarInstalacao = function () {
  btInstall.removeAttribute("hidden");
  btInstall.addEventListener("click", function () {
    disparoInstalacao.prompt();

    disparoInstalacao.userChoice.then((choice) => {
      if (choice.outcome === "accepted") {
        console.log("Usuário realizou a instalação");
      } else {
        console.log("Usuário NÃO realizou a instalação");
      }
    });
  });
};
window.addEventListener("beforeinstallprompt", gravarDisparo);

function gravarDisparo(evt) {
  disparoInstalacao = evt;
}
