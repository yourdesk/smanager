import { h } from 'dom-chef';
import { Block } from './Block';

export class Setting {
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

    getElement() {
        return <>
            <span>{this.displayName}</span>
            <input type='text' value={this.data} onInput={(event) => {
                this.data = event.currentTarget.value;
            }}/>
            <br />
        </>
    }

    toJSON() {
        return { 
            'displayName': this.displayName,
            'settingName': this.settingName,
            'data': this.data, 
        };
    }
}