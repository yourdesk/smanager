import { SectionWrapper } from './SectionWrapper.tsx';
import { Block } from './Block.tsx';
import { h } from 'dom-chef';

export class SingleDataBlock extends Block {
    contents: string;
    pos: number | undefined;

    constructor(title: string) {
        super(title);
        this.contents = '';

        this.pos = undefined;
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
            'pos': this.pos
        }
    }
}