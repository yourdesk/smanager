import { BlockDataContainer } from './BlockDataContainer';

declare global {
    var blockData: BlockDataContainer;
    var mainGrid: HTMLElement;
    type int = number;
}