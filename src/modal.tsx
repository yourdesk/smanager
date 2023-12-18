import { h } from 'dom-chef';

type Offset = {
    left: number,
    right: number,
    top: number,
    bottom: number
};

function getOffset(element: HTMLElement): Offset {
    const rect: DOMRect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
    };
}

function createSetting(name: string): HTMLElement {
    let settingInput: HTMLElement = <input onInput={() => {
        console.log('Balls');
    }}></input>;
    let settingLabel: HTMLElement = <p>{name}</p>; 

    let wrapper = <div>
        {settingLabel}
        {settingInput}
    </div>

    return wrapper;
}

export function createModalAboveElement(element: HTMLElement, elementToPlace: HTMLElement): void {
    let origElementPosition: Offset = getOffset(element);

    elementToPlace.id = element.id + '-modal';
    elementToPlace.classList.add('modal-popup');
    elementToPlace.style.left = origElementPosition.left.toString();

    document.documentElement.appendChild(elementToPlace);

    let height: number = elementToPlace.getBoundingClientRect().height;
    if (origElementPosition.top - height < 0) {
        elementToPlace.style.top = '0';
    } else {
        elementToPlace.style.top = (origElementPosition.top - height).toString();
    }
}

export function removeModalById(id: string): void {
    let temp = document.getElementById(id + '-modal');
    if (!temp) {
        console.error('No modal element to remove: ' + id + '-modal');
        return;
    }
    
    temp.remove();
}

export function removeModalByElement(element: HTMLElement): void {
    removeModalById(element.id);
}