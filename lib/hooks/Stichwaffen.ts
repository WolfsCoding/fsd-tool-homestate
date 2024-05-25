import { LocalStorage, Stichwaffen } from "../localORM";

const stichwaffenDB = new LocalStorage<Stichwaffen>("stichwaffen", (data: any) => new Stichwaffen(data));
const stichwaffen: Ref<Stichwaffen[]> = ref(await stichwaffenDB.getAll());

async function addStichwaffe(stichwaffe: Stichwaffen) {
    stichwaffenDB.add(stichwaffe);
    stichwaffen.value = await stichwaffenDB.getAll();
}

async function deleteStichwaffe(stichwaffenId: string) {
    stichwaffenDB.delete(stichwaffenId);
    stichwaffen.value = await stichwaffenDB.getAll();
}

async function updateStichwaffe(stichwaffenId: string, stichwaffe: Stichwaffen) {
    stichwaffenDB.update(stichwaffenId, stichwaffe);
    stichwaffen.value = await stichwaffenDB.getAll();
}

async function getStichwaffe(stichwaffenId: string) {
    return stichwaffenDB.get(stichwaffenId);
}

export function useStichwaffen() {
    return {
        stichwaffen,
        addStichwaffe,
        deleteStichwaffe,
        updateStichwaffe,
        getStichwaffe,
    };
}
