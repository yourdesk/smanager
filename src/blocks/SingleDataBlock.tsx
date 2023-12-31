import { SectionWrapper } from './SectionWrapper.tsx';
import { Block } from './Block.tsx';
import { Settings } from '../settings/Settings.tsx'
import * as Modal from '../modal.tsx';

import { h } from 'dom-chef';

export class SingleDataBlock extends Block {
    contents: string;

    constructor(title: string, index?: number, internalID?: string) {
        super(title, index, internalID);
        this.contents = '';
    }

    getElement() {
        let section = new SectionWrapper();

        section.outer.id = this.internalID;
        section.outer.classList.add('single-data-block');

        let titleElement = <p contentEditable>{this.title}</p>;
        let input = <div contentEditable className='input'>{this.contents}</div>;

        let that: SingleDataBlock = this;

        input.addEventListener('input', function(event) {
            let target: HTMLElement = event.target as HTMLElement;
            that.contents = target.textContent ?? '';
        });

        titleElement.addEventListener('input', function(event) {
            let target: HTMLElement = event.target as HTMLElement;
            that.title = target.textContent ?? '';
        });

        section.settingsModal = this.settings.getElement();

        section.settingsModal.appendChild(<button className='remove-button' onClick={() => {
            Modal.removeModalById(this.internalID);
            globalThis.blockData.removeBlockById(this.internalID);
            
            renderBlocks();
        }}>
            Remove Block
        </button>)
    
        section.inner.appendChild(titleElement);
        section.inner.appendChild(input);

        this.fixGrid(section);

        return section;
    }

    toJSON() {
        return {
            'type': 'SingleDataBlock',
            'data': {
                title: this.title,
                contents: this.contents
            },
            'settings': this.settings.toJSON(),
            'internalID': this.internalID,
            'index': this.index
        }
    }

    fromJSON(json: { [key: string]: any }) {
        this.title = json.data.title;
        this.contents = json.data.contents;
        this.index = json.index;
        this.internalID = json.internalID;
        this.settings = Settings.fromJSON(json.settings);
        
    }
}