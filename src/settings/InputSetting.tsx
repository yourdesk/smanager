import { h } from 'dom-chef';
import { Block } from '../blocks/Block';
import { Setting } from './Setting';

export class InputSetting extends Setting {
    constructor(settingName: string, displayName: string, data: string, parent: Block) {
        super(settingName, displayName, data, parent);
    }

    getElement() {
        return <>
            <span>{this.displayName}</span>
            <input type='text' value={this.data} onInput={(event) => {
                this.data = event.currentTarget.value;
                this.parent.rerender();
            }} />
            <br />
        </>
    }

    toJSON(): { [key: string]: Object } {
        return {
            'type': 'input',
            'displayName': this.displayName,
            'settingName': this.settingName,
            'data': this.data,
        };
    }
}