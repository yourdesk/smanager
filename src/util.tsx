export function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export function generateID() {
    let temp = '';
    for (let i = 0; i < 10; i++) {
        temp += chars.charAt(rand(0, chars.length));
    }

    return temp;
}

export function download(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export function textToData(text: string) {
    // TODO : load data from a file.
    // this also requires the position of each
    // block to be stored somewhere.
    // preferably, the position in the grid will 
    // be a part of the block itself, and each one
    // will be rendered in order, in its 
    // correct position
}

export function getPositionInGrid(index: number): { row: number, column: number} {
    let nColumns = window.getComputedStyle(globalThis.mainGrid).gridTemplateColumns.split(' ').length;

    return { 
        row: (Math.floor(index / nColumns)), 
        column: (index % nColumns)
    }
}

export function getElementIndex(element: HTMLElement, parent: HTMLElement) {
    let c = parent.children,
        i = 0;
    for (; i < c.length; i++) if (c[i] == element) return i;
}

export type Offset = {
    left: number,
    right: number,
    top: number,
    bottom: number
};

export function getOffset(element: HTMLElement): Offset {
    const rect: DOMRect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
    };
}
