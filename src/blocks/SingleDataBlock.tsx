import { SectionWrapper } from "./SectionWrapper.tsx";
import { generateID } from "../util.tsx";
import { Block } from "./Block.tsx";
import { h } from "dom-chef";

export class SingleDataBlock implements Block {
    title: string;
    contents: string;
    internalID: string;
    width: number;
    height: number;

    constructor(title: string) {
        this.internalID = generateID();
        this.title = title;
        this.contents = '';
        this.width = 1;
        this.height = 1;
    }

    getElement() {
        let section = new SectionWrapper();

        section.outer.id = this.internalID;
        section.outer.classList.add('single-data-block'); 
    
        let textElement = <p>{this.title}</p>
        let input = <div contentEditable className="input">{this.contents}</div>

        let that: SingleDataBlock = this;
        input.addEventListener("input", function(event) {
            let target: HTMLElement = event.target as HTMLElement
            that.contents = target.textContent ?? "";
        });
    
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
            'internalID': this.internalID
        }
    }
}