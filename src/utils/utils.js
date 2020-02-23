export const clipboardCopy = (text) => {
    const aux = document.createElement("input");
    aux.setAttribute("value", text);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export function pfunctionColorClass(gapi) {
    let colorClass = '';
    if (gapi.type === 'event') {
        colorClass = 'event';
    } else if (gapi.payable) {
        colorClass = 'payable';
    } else if (!gapi.constant) {
        colorClass = 'nonconstant';
    }
    return colorClass;
};

export const colorMap = {
    event: '#C9DEBB',
    payable: '#CDE0F2',
    nonconstant: '#E9DEDE',
};

export function pfunctionColor(gapi) {
    const colorClass = pfunctionColorClass(gapi);
    return colorMap[colorClass];
};
