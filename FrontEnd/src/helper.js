
export const toggleClass = (el, classname) => {
    let elem = document.querySelector(el);
    elem.classList.toggle(classname);
}

export const removeClass = (el, classname) => {
    let elem = document.querySelector(el);
    elem.classList.remove(classname);
}

