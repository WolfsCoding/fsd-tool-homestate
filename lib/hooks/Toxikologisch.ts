import { v4 } from 'uuid';
import { LocalStorage, Toxi, type IDrug } from '../localORM';
import { drugsData, type DrugData } from '@/data/Drugs';

const config = useRuntimeConfig();

const drugs = drugsData;

const toxiDB = new LocalStorage<Toxi>('toxi', (data: any) => new Toxi(data));
const analysen: Ref<Toxi[]> = ref(await toxiDB.getAll());

async function add(toxi: Toxi) {
  await toxiDB.add(toxi);
  analysen.value = await toxiDB.getAll();
}

async function update(toxiId: string, toxi: Toxi) {
  await toxiDB.update(toxiId, toxi);
  analysen.value = await toxiDB.getAll();
}

async function remove(id: string) {
  await toxiDB.delete(id);
  analysen.value = await toxiDB.getAll();
}

async function get(id: string) {
  return computed(() => analysen.value.find((x) => x.id === id));
}

async function addDrug(
  toxiId: string,
  drug: {
    name: string;
    amount: number;
    tested: number;
    unit: string;
    variables: { key: string; value: string }[];
  }
) {
  const toxi = analysen.value.find((x) => x.id === toxiId);

  if (!toxi) return;

  const analyse = ref(drugs.value?.find((x) => x.name === drug.name)?.analyse || '');

  for (const variable of drug.variables) {
    analyse.value = analyse.value.replaceAll(variable.key, variable.value);
  }

  toxi.drugs.push({
    id: v4(),
    name: drug.name,
    amount: drug.amount,
    tested: drug.tested,
    unit: drug.unit,
    analyse: analyse.value,
  });

  await update(toxiId, toxi);
}

async function removeDrug(toxiId: string, drugId: string) {
  const toxi = analysen.value.find((x) => x.id === toxiId);

  if (!toxi) return;

  toxi.drugs = toxi.drugs.filter((x) => x.id !== drugId);

  await update(toxiId, toxi);
}

export function useToxi() {
  return { analysen, add, update, remove, get, addDrug, removeDrug };
}
