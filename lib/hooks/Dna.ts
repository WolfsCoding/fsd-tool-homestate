import { v4 } from "uuid";
import { LocalStorage } from "../localORM";
import { DNA } from "../localORM/tables/dna";

const dnaDB = new LocalStorage<DNA>("dna", (data: any) => new DNA(data));
const analysen: Ref<DNA[]> = ref(await dnaDB.getAll());

async function add(toxi: DNA) {
    await dnaDB.add(toxi);
    analysen.value = await dnaDB.getAll();
}

async function update(toxiId: string, toxi: DNA) {
    await dnaDB.update(toxiId, toxi);
    analysen.value = await dnaDB.getAll();
}

async function remove(id: string) {
    await dnaDB.delete(id);
    analysen.value = await dnaDB.getAll();
}

async function get(id: string) {
    return computed(() => analysen.value.find((x) => x.id === id));
}

async function addDna(analyseId: string, dna: { name: string; dnaType: "Fingerabdruck" | "Blut" | "Speichel" }) {
    const analyse = analysen.value.find((x) => x.id === analyseId);

    if (!analyse) return;

    analyse.dnas.push({
        id: v4(),
        name: dna.name,
        dnaType: dna.dnaType,
    });

    await update(analyseId, analyse);
}

async function removeDna(analyseId: string, dnaId: string) {
    const analyse = analysen.value.find((x) => x.id === analyseId);

    if (!analyse) return;

    analyse.dnas = analyse.dnas.filter((x) => x.id !== dnaId);

    await update(analyseId, analyse);
}

export function useDna() {
    return { analysen, add, update, remove, get, addDna, removeDna };
}
