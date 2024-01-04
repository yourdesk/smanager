import { generateID } from '../util';
import { SectionWrapper } from './SectionWrapper';
import { Settings } from '../settings/Settings';
import { InputSetting } from '../settings/InputSetting';

export abstract class Block {
    internalID: string;
    settings: Settings;
    title: string;
    index: number;

    constructor(title: string, index?: number, internalID?: string) {
        if (typeof index !== "undefined" 
            && typeof internalID !== "undefined") 
        {
            this.index = index;
            this.internalID = internalID;
        }

        this.internalID = generateID();
        this.settings = new Settings();

        this.title = title;

        this.settings.add(new InputSetting('height', 'Height', '1', this));
        this.settings.add(new InputSetting('width', 'Width', '1', this));

        this.index = -1;
    }

    rerender() {
        let elem = document.getElementById(this.internalID);

        if (elem)
            elem.replaceWith(this.getElement().outer);
    }

    fixGrid(section: SectionWrapper) {
        let gridHeight = globalThis.blockData.calculateGridHeight() - 1;

        let blockGridHeight = this.settings.get('height');
        if (blockGridHeight && blockGridHeight.data !== "1") {
            section.outer.style.gridRowEnd = 'span ' + blockGridHeight.data;

            let coeff = ((110 * gridHeight) - 10) / parseInt(blockGridHeight.data);
            
            section.outer.style.height = `${parseInt(blockGridHeight.data) * coeff}px`;
        }
        
        let blockGridWidth = this.settings.get('width');
        if (blockGridWidth && blockGridWidth.data !== "1") {
            section.outer.style.gridColumnEnd = 'span ' + blockGridWidth.data;
        }
    }

    abstract toJSON(): Object;
    abstract getElement(): SectionWrapper;
}