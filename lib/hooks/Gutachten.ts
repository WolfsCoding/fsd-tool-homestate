import { v4 } from "uuid";
import { Gutachten, LocalStorage } from "../localORM";

const gutachtenDB = new LocalStorage<Gutachten>("gutachten", (data: any) => new Gutachten(data));
const gutachten: Ref<Gutachten[]> = ref(await gutachtenDB.getAll());

async function add(gutachtenToAdd: Gutachten) {
    await gutachtenDB.add(gutachtenToAdd);
    gutachten.value = await gutachtenDB.getAll();
}

async function remove(id: string) {
    await gutachtenDB.delete(id);
    gutachten.value = await gutachtenDB.getAll();
}

async function update(gutachtenId: string, gutachtenToUpdate: Gutachten) {
    await gutachtenDB.update(gutachtenId, gutachtenToUpdate);
    gutachten.value = await gutachtenDB.getAll();
}

async function getById(id: string) {
    return computed(() => gutachten.value.find((x) => x.id === id));
}

async function addWeapon(gutachtenId: string, weapon: { name: string; model: string; serial: string; schmauchspuren: boolean; zustand: string; munition: number }) {
    const gutachtenToManipulate = gutachten.value.find((x) => x.id === gutachtenId);

    if (!gutachtenToManipulate) return;

    gutachtenToManipulate?.weapons.push({ id: v4(), ...weapon });

    update(gutachtenId, gutachtenToManipulate);
}

async function removeWeapon(gutachtenId: string, weaponId: string) {
    const gutachtenToManipulate = gutachten.value.find((x) => x.id === gutachtenId);

    if (!gutachtenToManipulate) return;

    gutachtenToManipulate.weapons = gutachtenToManipulate.weapons.filter((x) => x.id !== weaponId);

    update(gutachtenId, gutachtenToManipulate);
}

async function addSchmauchspuren(gutachtenId: string, name: string, schmauchspuren: boolean) {
    const gutachtenToManipulate = gutachten.value.find((x) => x.id === gutachtenId);

    if (!gutachtenToManipulate) return;

    gutachtenToManipulate.schmauchspuren.push({ id: v4(), name, schmauchspuren });

    update(gutachtenId, gutachtenToManipulate);
}

async function removeSchmauchspuren(gutachtenId: string, schmauchspurenId: string) {
    const gutachtenToManipulate = gutachten.value.find((x) => x.id === gutachtenId);

    if (!gutachtenToManipulate) return;

    gutachtenToManipulate.schmauchspuren = gutachtenToManipulate.schmauchspuren.filter((x) => x.id !== schmauchspurenId);

    update(gutachtenId, gutachtenToManipulate);
}

export function useGutachten() {
    return {
        gutachten,
        add,
        remove,
        update,
        getById,
        addWeapon,
        removeWeapon,
        addSchmauchspuren,
        removeSchmauchspuren,
    };
}
