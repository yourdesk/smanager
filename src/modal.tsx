import { getOffset, Offset } from './util.tsx';

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

export function removeModalBySection(element: HTMLElement): void {
    removeModalById(element.id);
}