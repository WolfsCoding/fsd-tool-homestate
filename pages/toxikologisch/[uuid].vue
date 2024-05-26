<script setup lang="ts">
import { MoreHorizontal, PlusCircle } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { drugs } from "@/data/Drugs";
import { useToxi } from "@/lib/hooks/Toxikologisch";
import { toast } from "vue-sonner";

const { params } = useRoute();
const { get: getToxi, update: updateToxi, addDrug, removeDrug } = useToxi();
const analyse = await getToxi(params.uuid);

const activeTab = ref("Drogen");

const createDialog: Ref<{
    name: string;
    amount: number;
    tested: number;
    unit: string;
    variables: { key: string; name: string; value: string }[];
}> = ref({
    name: "",
    amount: 0,
    tested: 0,
    unit: "",
    variables: [],
});

async function handelAddDrug() {
    if (!analyse.value) return;

    addDrug(analyse.value.id, {
        name: createDialog.value.name,
        amount: createDialog.value.amount,
        tested: createDialog.value.tested,
        unit: createDialog.value.unit,
        variables: createDialog.value.variables,
    });

    toast("Droge hinzugefügt", {
        description: "Die Droge wurde erfolgreich hinzugefügt.",
    });
}

async function handleRemoveDrug(drugId: string) {
    if (!analyse.value) return;

    removeDrug(params.uuid, drugId);

    toast("Droge gelöscht", {
        description: "Die Droge wurde erfolgreich gelöscht.",
    });
}

function selectDrug() {
    const drug = drugs.find((x) => x.name === createDialog.value.name);
    createDialog.value.variables = drug?.variables.map((x) => ({ key: x.placeholder, name: x.name, value: "" })) || [];
}

function saveDetails() {
    if (!analyse.value) return;

    updateToxi(analyse.value.id, analyse.value);

    toast("Details gespeichert", {
        description: "Die Details wurden erfolgreich gespeichert.",
    });
}
</script>

<template>
    <div class="flex min-h-screen w-full flex-col">
        <div class="flex flex-col sm:gap-4 sm:py-4">
            <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb class="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink as-child>
                                <a href="/toxikologisch">Toxikologische Analysen</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage> {{ analyse?.akz }} </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage> {{ activeTab }} </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs default-value="Drogen" v-model="activeTab">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="Drogen"> Drogen </TabsTrigger>
                            <TabsTrigger value="Details"> Details </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <Dialog v-if="activeTab === 'Drogen'">
                                <DialogTrigger as-child>
                                    <Button size="sm" class="h-7 gap-1">
                                        <PlusCircle class="h-3.5 w-3.5" />
                                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Droge hinzufügen </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent aria-describedby="undefined">
                                    <CardContent>
                                        <div class="grid gap-4 py-4">
                                            <p class="text-lg font-semibold leading-none tracking-tight">Droge hinzufügen</p>
                                            <p class="text-sm text-muted-foreground -mt-3">Füge hier die generellen Werte der Analyse ein.</p>
                                            <div class="grid grid-cols-4 items-center gap-4">
                                                <Label for="model" class="text-right"> Droge </Label>
                                                <Select class="col-span-3" v-model="createDialog.name" @update:model-value="selectDrug">
                                                    <SelectTrigger class="col-span-3">
                                                        <SelectValue class="col-span-3" placeholder="Suche ein Model aus" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem v-for="drug in drugs.map((x) => x.name)" :key="drug" :value="drug">
                                                            {{ drug }}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div class="grid grid-cols-4 items-center gap-4">
                                                <Label for="name" class="text-right"> Anzahl </Label>
                                                <Input id="name" class="col-span-3" type="text" v-model="createDialog.amount" />
                                            </div>
                                            <div class="grid grid-cols-4 items-center gap-4">
                                                <Label for="serial" class="text-right"> Davon getestet </Label>
                                                <Input id="serial" class="col-span-3" type="text" v-model="createDialog.tested" />
                                            </div>
                                            <div class="grid grid-cols-4 items-center gap-4">
                                                <Label for="serial" class="text-right"> Einheit </Label>
                                                <Input id="serial" class="col-span-3" type="text" v-model="createDialog.unit" />
                                            </div>
                                            <p class="text-lg font-semibold leading-none tracking-tight" v-if="createDialog.variables.length > 0">Drogenspezifiche Werte</p>
                                            <p class="text-sm text-muted-foreground -mt-3" v-if="createDialog.variables.length > 0">Füge hier die Drogenspezifiche Werte der Analyse ein.</p>
                                            <div class="grid grid-cols-4 items-center gap-4" v-for="variable in createDialog.variables" :key="variable.key">
                                                <Label for="serial" class="text-right"> {{ variable.name }} </Label>
                                                <Input id="serial" class="col-span-3" type="text" v-model="variable.value" />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <DialogFooter>
                                        <DialogClose as-child>
                                            <Button type="submit" @click="handelAddDrug"> Hinzufügen </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <TabsContent value="Drogen">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Anzahl</TableHead>
                                    <TableHead>Davon getestet</TableHead>
                                    <TableHead>Einnheit</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="drug in analyse?.drugs" :key="drug.id">
                                    <TableCell class="font-medium"> {{ drug.name }} </TableCell>
                                    <TableCell class=""> {{ drug.amount }} </TableCell>
                                    <TableCell class=""> {{ drug.tested }} </TableCell>
                                    <TableCell class=""> {{ drug.unit }} </TableCell>
                                    <TableCell class="[--table-padding:0] pl-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger as-child>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal class="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                                                <DropdownMenuItem @click="handleRemoveDrug(drug.id)">Löschen</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="Details">
                        <div class="grid gap-4 py-4" v-if="analyse">
                            <div class="grid grid-cols-12 items-center gap-4">
                                <Label for="aktenzeichen" class=""> Aktenzeichen </Label>
                                <Input id="aktenzeichen" class="col-span-11" type="text" v-model="analyse.akz" />
                            </div>
                            <div class="grid grid-cols-12 items-center gap-4">
                                <Label for="gutachter" class=""> Gutachter </Label>
                                <Input id="gutachter" class="col-span-11" type="text" v-model="analyse.gutachter" />
                            </div>
                            <div class="grid grid-cols-12 items-center gap-4">
                                <Label for="gutachter" class=""> Im Auftrag von </Label>
                                <Input id="gutachter" class="col-span-11" type="text" v-model="analyse.forName" />
                            </div>

                            <div class="flex gap-2 justify-start">
                                <Button @click="saveDetails"> Änderungen speichern </Button>
                                <Button @click="analyse.copyToClipboard()"> Gutachten kopieren </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>
