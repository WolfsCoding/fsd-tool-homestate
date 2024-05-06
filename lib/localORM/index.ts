import type { IEntry } from "./BaseEntry";

export class LocalStorage<T extends IEntry> {
    constructor(private readonly tableName: string, private readonly factory: Factory<T>) {}

    private getStorageKey(): string {
        return `local-storage-${this.tableName}`;
    }

    private getEntries(): T[] {
        const data = localStorage.getItem(this.getStorageKey());
        return data ? JSON.parse(data).map(this.factory).reverse() : [];
    }

    private setEntries(entries: T[]): void {
        localStorage.setItem(this.getStorageKey(), JSON.stringify(entries));
    }

    public getAll(): Promise<T[]> {
        return Promise.resolve(this.getEntries());
    }

    public get(id: string): Promise<T | undefined> {
        return Promise.resolve(this.getEntries().find((entry) => entry.id === id));
    }

    public add(entry: T): Promise<void> {
        const entries = this.getEntries();
        entries.push(entry);
        this.setEntries(entries);
        return Promise.resolve();
    }

    public update(id: string, data: Partial<T>): Promise<void> {
        const entries = this.getEntries();
        const index = entries.findIndex((entry) => entry.id === id);

        if (index !== -1) {
            entries[index] = { ...entries[index], ...data, updatedAt: new Date() };
            this.setEntries(entries);
        }

        return Promise.resolve();
    }

    public delete(id: string): Promise<void> {
        const entries = this.getEntries().filter((entry) => entry.id !== id);
        this.setEntries(entries);
        return Promise.resolve();
    }
}

export { Gutachten, WeaponNames } from "./tables/gutachten";
export type { IGutachten, ISchnmauchspuren, IWeapon } from "./tables/gutachten";
export { Toxi } from "./tables/toxi";
export type { IDrug } from "./tables/toxi";
export { Stichwaffen } from "./tables/stichwaffen";
export type { IStichwaffe } from "./tables/stichwaffen";
