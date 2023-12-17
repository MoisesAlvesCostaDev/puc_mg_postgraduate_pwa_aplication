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

      categoria.itens.map((item) => {
        html_content += card(item.nome, item.img, item.link);
      });
    });

    content.innerHTML = html_content;
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
