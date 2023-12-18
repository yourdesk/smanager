// Unused...?

import { h } from 'dom-chef';
import { Setting } from './Setting';

export class Settings {
    settings: Map<string, Setting>;
    constructor() {
        this.settings = new Map<string, Setting>();
    }

    add(setting: Setting) {
        this.settings.set(setting.settingName, setting);
    }

    get(name: string) {
        return this.settings.get(name);
    }

    getElement() {
        let wrapper = <div></div>;

        for (const [str, setting] of this.settings) {
            wrapper.appendChild(setting.getElement());
        }

        return wrapper;
    }

    toJSON() {
        let settingsJSON: { [key: string]: Object } = {};

        for (const [str, setting] of this.settings) {
            settingsJSON[str] = setting.toJSON();
        }

        return settingsJSON;
    }
}