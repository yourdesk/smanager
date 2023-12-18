import { SectionWrapper } from './SectionWrapper.tsx';
import { Setting } from './Setting.tsx';
import { Settings } from './Settings.tsx';
import { Block } from './Block.tsx';
import { h } from 'dom-chef';

export class SingleDataBlock extends Block {
    title: string;
    contents: string;
    settings: Settings;
    pos: number | undefined;

    constructor(title: string) {
        super();

        this.title = title;
        this.contents = '';

        this.pos = undefined;

        this.settings = new Settings();
        this.settings.add(new Setting('height', 'Height', '1', this));
        this.settings.add(new Setting('width', 'Width', '1', this));
    }

    getElement() {
        let section = new SectionWrapper();

        section.outer.id = this.internalID;
        section.outer.classList.add('single-data-block'); 
    
        let textElement = <p>{this.title}</p>;
        let input = <div contentEditable className='input'>{this.contents}</div>;

        let that: SingleDataBlock = this;

        input.addEventListener('input', function(event) {
            let target: HTMLElement = event.target as HTMLElement;
            that.contents = target.textContent ?? '';
        });

        section.settingsModal = this.settings.getElement();
    
        section.inner.appendChild(textElement);
        section.inner.appendChild(input);

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
            'pos': this.pos
        }
    }
}