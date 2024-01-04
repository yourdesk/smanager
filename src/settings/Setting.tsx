import { Block } from '../blocks/Block';

export abstract class Setting {
    displayName: string;
    settingName: string;
    data: string;
    parent: Block;

    constructor(settingName: string, displayName: string, data: string, parent: Block) {
        this.displayName = displayName;
        this.settingName = settingName;
        this.data = data;
        this.parent = parent;
    }

    abstract getElement(): HTMLElement;
    abstract toJSON(): { [key: string]: Object };

    fromJSON(data: { [key: string]: any }) {
        // if type == input create input etc Bruh balls
    }
}