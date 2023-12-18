import { Block } from './blocks/Block';

export class BlockDataContainer {
    blocks: Block[];
    currentIndex: number;
    constructor() {
        this.blocks = [];
        this.currentIndex = 0;
    }

    add(block: Block) {
        this.blocks.push(block);
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