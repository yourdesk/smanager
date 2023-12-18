import * as drag from '../drag.tsx';
import * as Modal from '../modal.tsx';
import { h } from 'dom-chef';

export class SectionWrapper {
    outer: HTMLElement;
    inner: HTMLElement;
    settingsModal: HTMLElement;

    constructor() {
        this.outer = <section></section>;
        this.inner = <div className='inner'>
            <img onClick={() => {this.showSettings(this)}} className='settings-btn' src='/gear.svg' alt='Settings' />
        </div>;

        this.outer.draggable = true;
        this.outer.addEventListener('dragstart', drag.handleDragStart);
        this.outer.addEventListener('dragover', drag.handleDragOver);
        this.outer.addEventListener('dragenter', drag.handleDragEnter);
        this.outer.addEventListener('dragleave', drag.handleDragLeave);
        this.outer.addEventListener('dragend', drag.handleDragEnd);
        this.outer.addEventListener('drop', drag.handleDrop);

        this.outer.appendChild(this.inner);

        this.settingsModal = <span>No settings</span>;
    }

    showSettings(section: SectionWrapper) {
        let modalElement = document.getElementById(section.outer.id + '-modal');

        if (modalElement) {
            Modal.removeModalByElement(section.outer);
        } else {
            Modal.createModalAboveElement(section.outer, this.settingsModal);
        }
    }
}