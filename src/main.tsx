import './style.css';
import './reactive-grid.css';

import {h} from 'dom-chef';

import { SingleDataBlock } from './blocks/SingleDataBlock.tsx';
import { BlockDataContainer } from './BlockDataContainer.tsx';
import { createModalAboveElement, removeModalBySection } from './modal.tsx';

var mainGrid: HTMLElement = 
    document.getElementById('main-grid') 
    ?? <div id='NOT-REAL'></div>;
var blockData: BlockDataContainer = new BlockDataContainer();

let addBlockButton: HTMLElement | null = document.getElementById("add"); 

(window as any).mainGrid = mainGrid;
(window as any).blockData = blockData;
(window as any).test_PutBoxAboveElement = createModalAboveElement;
(window as any).test_removePopupModalByElement = removeModalBySection;

function renderBlocks() {
    mainGrid.innerHTML = '';

    mainGrid.appendChild(blockData.getElement());
}

(window as any).renderBlocks = renderBlocks;

for (let i = 0; i < 10; i++) {
    let dataTest = new SingleDataBlock('box ' + i);

    blockData.add(dataTest);
}

console.log(blockData.toJSON());
renderBlocks();

if (addBlockButton) {
    console.log('found add block button');

    addBlockButton.addEventListener('click', function(this: HTMLElement, e: Event) {
        let testElement = new SingleDataBlock('added block');
        blockData.add(testElement);
        console.log(testElement);

        renderBlocks();
    });
}

// fix later

// let loadButton = document.getElementById('load');
// let saveButton = document.getElementById('save');
// let showModalButton = document.getElementById('showModal');
// let modalElement = document.getElementById('modal');

// loadButton.onclick = () => {
    
// }

// saveButton.onclick = () => {
//     console.log('saving data');
//     download('data.json', JSON.stringify(blockData.toJSON()));
// }

// showModalButton.onclick = () => {
//     modalElement.classList.toggle('shown');
// }

// modalElement.onclick = (event) => {
//     if (event.target == this) {
//         return;
//     }   

//     modalElement.classList.toggle('shown');
// }

// window.test_PutBoxAboveElement = test_PutBoxAboveElement;
// window.test_removePopupModalByElement = test_removePopupModalByElement;