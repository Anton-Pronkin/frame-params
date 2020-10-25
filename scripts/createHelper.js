function createListItem(className) {
    return createElement("li", className);
}

function createList(className) {
    return createElement("ul", className);
}

function createBlock(className, content) {
    return createElement("div", className, content);
}

function createElement(tag, className, content) {
    let element = document.createElement(tag);
    element.classList.add(className);

    if (content) {
        let contentElement = document.createTextNode(content);
        element.appendChild(contentElement);
    }

    return element;
}

function createInput(className, value) {
    let element = document.createElement("input");
    element.classList.add(className);

    if (value) {
        element.value = value;
    }

    return element;
}
