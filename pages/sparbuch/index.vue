<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast/use-toast";
import { ENTRY_TYPES, SparbuchEntry } from "@/lib/localORM/tables/sparbuch";
import { useSparbuch } from "@/lib/hooks/Sparbuch";
import { useDate } from "@/lib/hooks/Date";

const { toast } = useToast();

const props = defineProps(["search"]);
const { addSparbuchEntry, sparbuchEntrys, getSparbuchAmount, removeSparbuchEntry } = useSparbuch();
const { getFormattedDate } = useDate();

const type = ref(null);
const betrag = ref("");
const beschreibung = ref("");

async function handleAddEntry() {
    if (betrag.value === "" || beschreibung.value === "" || type.value === null) {
        toast({
            title: "Fehler",
            description: "Bitte fülle alle Felder aus.",
            variant: "destructive",
        });

        return;
    }

    const value = parseFloat(betrag.value);

    await addSparbuchEntry(
        new SparbuchEntry({
            datum: getFormattedDate(new Date(), "DD.MM.YYYY mm:hh Uhr"),
            betrag: Math.round((type.value === ENTRY_TYPES.Zinsen ? value - getSparbuchAmount().value : type.value === ENTRY_TYPES.Einzahlung ? value : -value + Number.EPSILON) * 100) / 100,
            beschreibung: beschreibung.value,
            type: type.value,
        })
    );

    toast({
        title: "Eintrag hinzugefügt",
        description: "Der Eintrag wurde erfolgreich hinzugefügt.",
    });
}

async function handelRemoveEntry(entry: SparbuchEntry) {
    await removeSparbuchEntry(entry.id);
}
</script>

<template>
    <div class="flex min-h-screen w-full flex-col">
        <div class="flex flex-col sm:gap-4 sm:py-4">
            <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb class="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Sparbuch</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div class="ml-auto">{{ getSparbuchAmount() }} $</div>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div class="grid gap-4 py-4 grid-cols-12">
                    <div class="col-span-3">
                        <Select v-model="type">
                            <SelectTrigger>
                                <SelectValue placeholder="Wähle aus" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="typeT in ENTRY_TYPES" :value="typeT"> {{ typeT }} </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="col-span-3">
                        <Input id="minutesAgo" class="col-span-11" type="text" v-model="betrag" :placeholder="type == ENTRY_TYPES.Zinsen ? 'Betrag auf dem Sparbuch' : 'Betrag'" />
                    </div>
                    <div class="col-span-4">
                        <Input id="ort" class="col-span-11" type="text" v-model="beschreibung" placeholder="Beschreibung" />
                    </div>
                    <div class="col-span-2">
                        <Button id="save" class="w-full" @click="handleAddEntry">Hinzufügen</Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Datum</TableHead>
                            <TableHead>Betrag</TableHead>
                            <TableHead>Beschreibung</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="entry in sparbuchEntrys.filter((x) => true).slice(0, 20)">
                            <TableCell> {{ entry.datum }} </TableCell>
                            <TableCell
                                :class="{
                                    'text-green-500': entry.type === ENTRY_TYPES.Zinsen || entry.type === ENTRY_TYPES.Einzahlung,
                                    'text-red-500': entry.type === ENTRY_TYPES.Auszahlung,
                                }"
                            >
                                {{ entry.type === ENTRY_TYPES.Auszahlung ? "-" : "+" }} {{ entry.type === ENTRY_TYPES.Auszahlung ? entry.betrag * -1 : entry.betrag }} $
                            </TableCell>
                            <TableCell> {{ entry.beschreibung }} </TableCell>
                            <TableCell>
                                <Badge
                                    :class="{
                                        'bg-[#2B2B2B] text-white': entry.type === ENTRY_TYPES.Zinsen,
                                        'bg-[#004A77] text-white': entry.type === ENTRY_TYPES.Einzahlung,
                                        'bg-epa text-white': entry.type === ENTRY_TYPES.Auszahlung,
                                    }"
                                >
                                    {{ entry.type }}
                                </Badge>
                            </TableCell>
                            <TableCell class="[--table-padding:0]">
                                <Button variant="ghost" @click="handelRemoveEntry(entry)">
                                    <i class="fa-duotone fa-trash"></i>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </main>
        </div>
    </div>
</template>
