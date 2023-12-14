import { SectionWrapper } from "./SectionWrapper";

export interface Block {
    internalID: string;
    toJSON(): Object;
    getElement(): SectionWrapper;
}