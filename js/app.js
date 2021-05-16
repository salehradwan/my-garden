'use strict';

let imageArr = ['Alstroemerias.jpeg','Gardenias.jpeg',
  'Orchids.jpeg','Peonies.jpeg',
  'Roses.jpeg','Sunflowers.jpeg', 'Tulips.jpeg',];

let formData = document.getElementById('formData');
let tableData = document.getElementById('tableData');
let selectImage = document.getElementById('images');
let flower;

function Flower(name, image, season) {
  this.name = name;
  this.image = image.split('.')[0];
  this.img = `./img/${image}`;
  this.season = season;

  Flower.all.push(this);
}

Flower.all = [];

// flower = new Flower([]);
// Flower.prototype.removeFlower = function (flower) {
//   this.Flower.all.splice(flower, 1);
// };
function fillOptionFlower() {
  for (let i = 0; i < imageArr.length; i++) {
    let optionE = document.createElement('option');
    selectImage.appendChild(optionE);
    optionE.textContent = imageArr[i].split('.')[0];
  }
}

function tableHeader() {
  let trH = document.createElement('tr');
  tableData.appendChild(trH);

  let tdRemove = document.createElement('td');
  trH.appendChild(tdRemove);
  tdRemove.textContent = '#';

  let tdImage = document.createElement('td');
  trH.appendChild(tdImage);
  tdImage.textContent = 'Image';

  let tdName = document.createElement('td');
  trH.appendChild(tdName);
  tdName.textContent = 'Name';

  let tdSeason = document.createElement('td');
  trH.appendChild(tdSeason);
  tdSeason.textContent = 'Season';

}
function renderData() {

  for (let i = 0; i < Flower.all.length; i++) {
    let trD = document.createElement('tr');
    tableData.appendChild(trD);

    let tdRemove = document.createElement('td');
    trD.appendChild(tdRemove);
    tdRemove.textContent = 'x';
    tdRemove.classList.add('remover');
    tdRemove.id = i;

    let tdImage = document.createElement('td');
    trD.appendChild(tdImage);
    let img = document.createElement('img');
    tdImage.appendChild(img);
    img.src = Flower.all[i].img;

    let tdName = document.createElement('td');
    trD.appendChild(tdName);
    tdName.textContent = Flower.all[i].name;

    let tdSeason = document.createElement('td');
    trD.appendChild(tdSeason);
    tdSeason.textContent = Flower.all[i].season;


  }
}

function saveTolocallStorage() {
  localStorage.setItem('flower', JSON.stringify(Flower.all));
}
function showDataInTable(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let image = e.target.images.value;
  let season = e.target.season.value;

  new Flower(name, image, season);
  saveTolocallStorage();
  tableData.innerHTML = '';
  tableHeader();
  renderData();

//   console.log(name, image, season);
}
function getData() {
  let data = JSON.parse(localStorage.getItem('flower'));
  if (data) {
    for (let i = 0; i < Flower.all.length; i++) {
      let trD = document.createElement('tr');
      tableData.appendChild(trD);

      let tdRemove = document.createElement('td');
      trD.appendChild(tdRemove);
      tdRemove.textContent = 'x';
      tdRemove.classList.add('remover');
      tdRemove.id = i;

      let tdImage = document.createElement('td');
      trD.appendChild(tdImage);
      tdImage.textContent = Flower.all[i].img;

      let tdName = document.createElement('td');
      trD.appendChild(tdName);
      tdName.textContent = Flower.all[i].name;

      let tdSeason = document.createElement('td');
      trD.appendChild(tdSeason);
      tdSeason.textContent = Flower.all[i].season;
    }
    renderData();
  }
}

function removeFlowerFromTable(e) {
  if (e.target.classList.contains('remover')) {
    flower.removeFlower(parseInt('flower'));
    renderData();
  }
}
tableData.addEventListener('click', removeFlowerFromTable);
formData.addEventListener('submit', showDataInTable);
fillOptionFlower();
getData();
// let data = JSON.parse(localStorage.getItem('flower'));
// console.log(data);
