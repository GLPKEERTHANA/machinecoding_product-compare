function getData(url) {
  return fetch(url).then((resp) => resp.json());
}


Node.prototype.appendChildren = function () {
    let children = [...arguments];
    if (
      children.length == 1 &&
      Object.prototype.toString.call(children[0]) === "[object Array]"
    ) {
      children = children[0];
    }
    const documentFragment = document.createDocumentFragment();
    children.forEach((c) => documentFragment.appendChild(c));
    this.appendChild(documentFragment);
  };



const stringToHtml = (str) =>
document.createRange().createContextualFragment(str);


function createHTMLElement(tag, className) {
    const htmlEle = document.createElement(tag);
    htmlEle.className = className || "";
    return htmlEle;
  }