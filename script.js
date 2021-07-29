const url = "https://demo2837922.mockable.io/flipkart-compare";

let featuresList = [];
let compareSummary = [];
let items = [];
let selected = [];

function titleView(text) {
  return `<div class="titleNode"><label> ${text} </label></div>`;
}

function getView(feat) {
  const prod1 = selected[0];
  const prod2 = selected[1];
  return `<div class="feature" id="feature">
    <label class = "featureEle">
    ${feat?.featureName} 
    </label>
    <label class = "featureEle">
    ${feat?.values[prod1] || ""} 
    </label>
    <label class = "featureEle">
    ${feat?.values[prod2] || ""} 
    </label>
    </div>`;
}

function getCard(features) {
  return features.map((feat) => stringToHtml(getView(feat)));
}

function getFeatureCard(feature) {
  const { title, features } = feature;
  const featureEle = createHTMLElement("div");
  featureEle.appendChild(stringToHtml(titleView(title)));
  featureEle.appendChildren(getCard(features));
  return featureEle;
}

function renderFeatureList() {
  return featuresList.map((feature) => getFeatureCard(feature));
}
// function getImages(img1, img2) {
//   console.log(img1, img2);
//   return;
// }
function getTitle(title1, title2) {
  return `<div class="feature" id="feature">
    <label class = "featureEle">
    ${""}
    </label>
    <label class = "featureEle"> ${title1?.title || ""}${title1?.subtitle || ""}
    </label>
    <label class = "featureEle">
    ${title2?.title || ""}${title2?.subtitle || ""}
    </label>
    </div>`;
}

function getPrice(title1, title2) {
  return `<div class="feature" id="feature">
      <label class = "featureEle">
      ${""}
      </label>
      <p class = "labelEle">${title1?.finalPrice || ""} <strike> ${
    title1?.price || ""
  }</strike> ${title1?.totalDiscount || ""} 
      </p>
      <p class = "labelEle">
      ${title2?.finalPrice || ""} <strike> ${title2?.price || ""}</strike>  ${
    title2?.totalDiscount || ""
  } 
      </p>
      </div>`;
}
function addDropDownListener() {
  const ele = document.getElementById("selectProduct");
  if (ele)
    ele.addEventListener("change", (event) => {
      selected[event.target.name - 1] = event.target.value;
      console.log(selected);
      render();
    });
}
function removeHandler(event) {
  selected[event.target.id - 1] = "";
  render();
}
function getSummaryView() {
  const featureEle = createHTMLElement("div");
  const { images, titles, productPricingSummary } = compareSummary;
  const prod1 = selected[0];
  const prod2 = selected[1];

  let imagesData = `<div class="imageWrapper"> `;
  imagesData += `<div>`;
  imagesData += `<div class="image">`;
  imagesData += `<label> Image </label>`;
  imagesData += `</div>`;
  imagesData += `</div>`;
  
  imagesData += `<div>`;
  if (selected[0] !== "") {
    imagesData += `<div class="image">`;
    imagesData += `<img src = "${images[prod1]}" class="imgEle"/>`;
    imagesData += `<button id="1" onClick="removeHandler(event)" > Remove</button>`;
    imagesData += `</div>`;
  } else imagesData += createDropDown(1);
  imagesData += `</div>`;

  imagesData += `<div>`;
  if (selected[1] !== "") {
    imagesData += `<div class="image">`;
    imagesData += `<img src="${images[prod2]}" class="imgEle" />`;
    imagesData += `<button id="2" onClick="removeHandler(event)" > Remove</button>`;
    imagesData += `</div>`;
  } else imagesData += createDropDown(2);
  imagesData += `</div>`;
  //   selected.forEach((item, idx) => {

  //     const id = idx + 1;
  //     imagesData += `<div>`;
  //     if (items !== "") {
  //         console.log(item, idx);
  //       imagesData += `<div class="image">`;
  //       imagesData += `<img src = "${images[item]}" class="imgEle"/>`;
  //       imagesData += `<button id="${id}" onClick="removeHandler(event)" > Remove</button>`;
  //       imagesData += `</div>`;
  //     } else imagesData += createDropDown(idx);
  //     imagesData += `</div>`;
  //   });
  imagesData += `</div>`;
  console.log(imagesData);
  featureEle.appendChild(stringToHtml(imagesData));
  featureEle.appendChild(stringToHtml(getTitle(titles[prod1], titles[prod2])));
  featureEle.appendChild(
    stringToHtml(
      getPrice(productPricingSummary[prod1], productPricingSummary[prod2])
    )
  );
  return featureEle;
}
function renderSummary() {
  const featureEle = createHTMLElement("div");

  featureEle.appendChild(getSummaryView());
  return featureEle;
}
function getAllItems(obj) {
  items = Object.keys(obj);
  selected[0] = items[0];
  selected[1] = items[1];
}
function createDropDown(id) {
  let dropEle = `<select id="selectProduct" name="${id}">`;
  dropEle += `<option id="" name=""> </option>`;
  items.forEach((item) => {
    if (!selected.includes(item)) {
      dropEle += `<option id="${item}" name="${item}"> ${item}</option>`;
    }
  });
  dropEle += `</select>`;
  const ele = stringToHtml(dropEle);
  return dropEle;
}
function render() {
  const mainEle = document.getElementById("mainDiv");
  mainDiv.innerHTML = "";
  mainEle.appendChildren(renderSummary());
  mainEle.appendChildren(renderFeatureList());
  addDropDownListener();
}

function getJson() {
  getData(url).then((res) => {
    featuresList = res.products.featuresList;
    compareSummary = res.products.compareSummary;
    getAllItems(compareSummary.images);
    render();
  });
}

getJson();
