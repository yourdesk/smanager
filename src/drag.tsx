var globalDraggedId: string;
var globalDroppedId: string;

function handleDragStart(this: HTMLElement, e: Event) {
    this.style.opacity = '0.4';

    globalDraggedId = this.id;
}

function handleDragEnd(this: HTMLElement, e: Event) {
    this.style.opacity = '1';
}

function handleDragOver(this: HTMLElement, e: Event) {
    e.preventDefault();
    return false;
}

function handleDragEnter(this: HTMLElement, e: Event) {
    this.classList.add('over');
}

function handleDragLeave(this: HTMLElement, e: Event) {
    this.classList.remove('over');
}

function handleDrop(this: HTMLElement, e: Event) {
    globalDroppedId = this.id;
    e.stopPropagation();
    
    let newDraggedBlock = globalThis.blockData.getBlockById(globalDraggedId);
    let newDroppedBlock = globalThis.blockData.getBlockById(globalDroppedId);

    let draggedElement = document.getElementById(globalDraggedId);
    let droppedElement = document.getElementById(globalDroppedId);

    if (!draggedElement) {
        console.error("draggedElement is null or undefined");
        return;
    }

    if (!droppedElement) {
        console.error("droppedElement is null or undefined");
        return;
    }

    if (!newDroppedBlock) {
        console.error("cannot find newDroppedBlock");
        return;
    }

    if (!newDraggedBlock) {
        console.error("cannot find newDraggedBlock");
        return;
    }

    draggedElement.replaceWith(newDroppedBlock.getElement().outer);
    droppedElement.replaceWith(newDraggedBlock.getElement().outer);

    console.log(draggedElement, droppedElement);

    return false;
}

export {
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop
}