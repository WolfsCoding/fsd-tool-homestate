import { v4 as uuidv4 } from "uuid";

export interface IEntry {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
}

export abstract class BaseEntry implements IEntry {
    id: string = uuidv4();
    createdAt: Date = new Date();
    updatedAt?: Date;

    constructor(data?: Partial<IEntry>) {
        if (data) {
            Object.assign(this, data);
            if (!this.updatedAt) {
                this.updatedAt = new Date();
            }
        }
    }
}
