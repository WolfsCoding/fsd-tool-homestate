import type { IEntry } from "./BaseEntry";

export class LocalStorageORM<T extends IEntry> {
    private readonly tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    private getStorageKey(): string {
        return `local-storage-${this.tableName}`;
    }

    private getEntries(): T[] {
        const data = localStorage.getItem(this.getStorageKey());
        return data ? JSON.parse(data) : [];
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
