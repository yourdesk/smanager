import * as drag from '../drag.tsx';
import { h } from 'dom-chef';

export class SectionWrapper {
    outer: HTMLElement;
    inner: HTMLElement;
    constructor() {
        this.outer = <section></section>
        this.inner = <div></div>

        this.inner.classList.add('inner');

        let settingsButton = <img className="settings-btn" src="../../public/gear.svg" alt="Settings" />

        this.inner.appendChild(settingsButton);

        this.outer.draggable = true;
        this.outer.addEventListener('dragstart', drag.handleDragStart);
        this.outer.addEventListener('dragover', drag.handleDragOver);
        this.outer.addEventListener('dragenter', drag.handleDragEnter);
        this.outer.addEventListener('dragleave', drag.handleDragLeave);
        this.outer.addEventListener('dragend', drag.handleDragEnd);
        this.outer.addEventListener('drop', drag.handleDrop);

        this.outer.appendChild(this.inner);
    }
}