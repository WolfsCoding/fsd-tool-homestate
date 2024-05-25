import { LocalStorage } from "../localORM";
import { Beschriftung } from "../localORM/tables/beschriftung";

const beschriftungsDB = new LocalStorage<Beschriftung>("beschriftungen", (data: any) => new Beschriftung(data));
const beschriftungen: Ref<Beschriftung[]> = ref(await beschriftungsDB.getAll());

async function add(beschriftung: Beschriftung) {
    await beschriftungsDB.add(beschriftung);
    beschriftungen.value = await beschriftungsDB.getAll();
}

async function remove(id: string) {
    await beschriftungsDB.delete(id);
    beschriftungen.value = await beschriftungsDB.getAll();
}

export function useBeschriftungen() {
    return {
        beschriftungen,
        add,
        remove,
    };
}
