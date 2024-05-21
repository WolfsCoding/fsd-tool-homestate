<script setup lang="ts">
import { MoreHorizontal, Search } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast/use-toast";
import { LocalStorage, Toxi } from "@/lib/localORM";
import { Beschriftung, TYPES } from "@/lib/localORM/tables/beschriftung";

const router = useRouter();
const { toast } = useToast();

const beschriftungsDB = new LocalStorage<Beschriftung>("beschriftungen", (data: any) => new Beschriftung(data));
const beschriftungen: Ref<Beschriftung[]> = ref(await beschriftungsDB.getAll());

const minutes = ref("");
const ort = ref("");
const akz = ref("");
const type = ref(TYPES.Eigntumsdelikt);

const props = defineProps(["search"]);

async function createBeschriftung() {
    if (minutes.value === "" || ort.value === "") {
        toast({
            title: "Fehler",
            description: "Bitte fülle alle Felder aus.",
            variant: "destructive",
        });

        return;
    }

    const date = calculateOffset(-parseInt(minutes.value));

    beschriftungsDB.add(
        new Beschriftung({
            datum: date.getDate().toString().padStart(2, "0") + "." + date.getMonth().toString().padStart(2, "0") + "." + date.getFullYear(),
            uhrzeit: date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + " Uhr",
            ort: ort.value,
            akz: akz.value,
            type: type.value,
        })
    );

    beschriftungen.value = await beschriftungsDB.getAll();

    toast({
        title: "Beschriftung hinzugefügt",
        description: "Die Beschriftung wurde erfolgreich hinzugefügt.",
    });
}

async function deleteBeschriftung(beschriftung: Beschriftung) {
    beschriftungsDB.delete(beschriftung.id);
    beschriftungen.value = await beschriftungsDB.getAll();

    toast({
        title: "Beschriftung gelöscht",
        description: "Die Beschriftung wurde erfolgreich gelöscht.",
    });
}

function calculateOffset(offsetInMinutes: number): Date {
    const now = new Date();
    const offsetInMilliseconds = offsetInMinutes * 60 * 1000;
    const offsetDate = new Date(now.getTime() + offsetInMilliseconds);

    const roundedMinutes = Math.round(offsetDate.getMinutes() / 5) * 5;
    offsetDate.setMinutes(roundedMinutes);
    if (Math.abs(offsetInMinutes - (offsetDate.getTime() - now.getTime()) / 60000) > 5) {
        if (offsetInMinutes > 0) {
            offsetDate.setMinutes(roundedMinutes - 5);
        } else {
            offsetDate.setMinutes(roundedMinutes + 5);
        }
    }

    return offsetDate;
}
</script>

<template>
    <div class="flex min-h-screen w-full flex-col">
        <div class="flex flex-col sm:gap-4 sm:py-4">
            <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb class="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Asservaten Beschriftung</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div class="grid gap-4 py-4 grid-cols-12">
                    <div class="col-span-2">
                        <Input id="minutesAgo" class="col-span-11" type="text" v-model="minutes" placeholder="Minuten alt" />
                    </div>
                    <div class="col-span-3">
                        <Input id="ort" class="col-span-11" type="text" v-model="ort" placeholder="Ort" />
                    </div>
                    <div class="col-span-3">
                        <Input id="aktenzeichen" class="col-span-11" type="text" v-model="akz" placeholder="Aktenzeichen" />
                    </div>
                    <div class="col-span-3">
                        <Select class="col-span-3" v-model="type">
                            <SelectTrigger class="col-span-3">
                                <SelectValue class="col-span-3" placeholder="Wähle aus" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="typeT in TYPES" :value="typeT"> {{ typeT }} </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="col-span-1">
                        <Button id="save" class="w-full" @click="createBeschriftung">Hinzufügen</Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Datum</TableHead>
                            <TableHead>Uhrzeit</TableHead>
                            <TableHead>Ort</TableHead>
                            <TableHead>Akz.</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <!-- Only show latest 20 entrys -->
                        <TableRow v-for="(beschriftung, analysenIndex) in beschriftungen.filter((x) => x.akz.toLowerCase().includes(props.search.toLowerCase()) || x.datum.toLowerCase().includes(props.search.toLowerCase()) || x.uhrzeit.toLowerCase().includes(props.search.toLowerCase()) || x.ort.toLowerCase().includes(props.search.toLowerCase()) || x.type.toLowerCase().includes(props.search.toLowerCase())).slice(0, 20)">
                            <TableCell> {{ beschriftung.datum }} </TableCell>
                            <TableCell> {{ beschriftung.uhrzeit }} </TableCell>
                            <TableCell> {{ beschriftung.ort }} </TableCell>
                            <TableCell> {{ beschriftung.akz }} </TableCell>
                            <TableCell> {{ beschriftung.type }} </TableCell>
                            <TableCell class="[--table-padding:0]">
                                <Button variant="ghost" @click="beschriftung.copyToClipboard()">
                                    <i class="fa-duotone fa-clipboard"></i>
                                </Button>
                                <Button variant="ghost" @click="deleteBeschriftung(beschriftung)">
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
