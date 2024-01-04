import { Block } from './blocks/Block';
import { SingleDataBlock } from './blocks/SingleDataBlock';
import { Settings } from './settings/Settings';
import { InputSetting } from './settings/InputSetting';
import { h } from 'dom-chef';

export class BlockDataContainer {
    blocks: Block[];
    currentIndex: number;
    gridColumns: number;

    constructor() {
        this.blocks = [];
        this.currentIndex = 0;
        
        this.gridColumns = 5;
    }

    add(block: Block) {
        this.blocks.push(block);
    }

    fromJSON(jsonData: any) {
        let blockDataArray = jsonData.blocks;

        let newData: BlockDataContainer = new BlockDataContainer();

        for (const block of blockDataArray) {
            let tempBlock: Block = new SingleDataBlock('temp');

            if (block.type == "SingleDataBlock") {
                tempBlock = new SingleDataBlock(block.title, block.index, block.internalID);
            }

            let tempSettings: Settings = new Settings();
            for (const s of block.settings) {
                tempSettings.add(new InputSetting(s.settingName, s.displayName, s.data, tempBlock))
            }
            
            tempBlock.settings = tempSettings;

            newData.add(tempBlock);

        }
    }

    calculateGridHeight() {
        let sum = 0;
        let maxHeight = 0;
        for (const b of this.blocks) {
            let heightSetting = b.settings.get('height');

            if (heightSetting) {
                let height = parseInt(heightSetting.data);
                sum += height;

                if (height > maxHeight) {
                    maxHeight = height;
                }
            }
        }

        let gridRows = Math.ceil(sum / this.gridColumns);
        
        if (maxHeight > gridRows) {
            return maxHeight;
        }

        return gridRows;
    }

    getBlockById(id: string): Block | undefined {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].internalID === id) {
                return this.blocks[i];
            }
        }

        console.error('no block found ' + id);

        return undefined;
    }

    removeBlockById(id: string) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].internalID === id) {
                this.blocks.splice(i, 1);
                return;
            }
        }
    }

    toJSON() {
        let tempBlocks = [];

        for (let i = 0; i < this.blocks.length; i++) {
            tempBlocks.push(this.blocks[i].toJSON());
        }

        return {blocks: tempBlocks};
    }

    getElement() {
        let wrapper = <></>;
        
        this.blocks.sort(function(a: Block, b: Block) {
            return a.index - b.index;
        });
        
        for (const block of this.blocks) {
            wrapper.appendChild(block.getElement().outer);
        }

        return wrapper;
    }
}