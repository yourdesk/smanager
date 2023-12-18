import { Block } from './blocks/Block';

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

    toJSON() {
        let tempBlocks = [];

        for (let i = 0; i < this.blocks.length; i++) {
            tempBlocks.push(this.blocks[i].toJSON());
        }

        return {blocks: tempBlocks};
    }
}