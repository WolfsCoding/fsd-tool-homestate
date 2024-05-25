import { useToast } from "@/components/ui/toast";
import { LocalStorage } from "../localORM";
import { ENTRY_TYPES, SparbuchEntry } from "../localORM/tables/sparbuch";

const { toast } = useToast();

const sparbuchDB = new LocalStorage<SparbuchEntry>("sparbuch", (data: any) => new SparbuchEntry(data));
const sparbuchEntrys: Ref<SparbuchEntry[]> = ref(await sparbuchDB.getAll());

function getSparbuchAmount(): ComputedRef<number> {
    return computed((): number => {
        let amount = 0;

        for (const entry of sparbuchEntrys.value) {
            if (entry.type == ENTRY_TYPES.Einzahlung) {
                amount += entry.betrag;
            } else if (entry.type == ENTRY_TYPES.Auszahlung) {
                amount -= entry.betrag;
            } else if (entry.type == ENTRY_TYPES.Zinsen) {
                amount += entry.betrag;
            }
        }

        return amount;
    });
}

async function addSparbuchEntry(entry: SparbuchEntry) {
    sparbuchDB.add(entry);
    sparbuchEntrys.value = await sparbuchDB.getAll();
}

async function removeSparbuchEntry(id: string) {
    sparbuchDB.delete(id);

    sparbuchEntrys.value = await sparbuchDB.getAll();

    toast({
        title: "Erfolgreich gelöscht",
        description: "Der Eintrag wurde erfolgreich gelöscht",
    });
}

export function useSparbuch() {
    return {
        removeSparbuchEntry,
        addSparbuchEntry,
        sparbuchEntrys,
        getSparbuchAmount,
    };
}
