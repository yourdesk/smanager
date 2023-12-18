import { generateID } from '../util';
import { SectionWrapper } from './SectionWrapper';

export abstract class Block {
    internalID: string;

    constructor() {
        this.internalID = generateID();
    }

    rerender() {
        let elem = document.getElementById(this.internalID);

        if (elem)
            elem.replaceWith(this.getElement().outer);
    }

    abstract toJSON(): Object;
    abstract getElement(): SectionWrapper;
}