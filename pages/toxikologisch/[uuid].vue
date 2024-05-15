<script setup lang="ts">
import { CircleUser, File, Home, LineChart, ListFilter, MoreHorizontal, Package, Package2, PanelLeft, PlusCircle, Search, Settings, ShoppingCart, Users2 } from "lucide-vue-next";
import { v4 } from "uuid";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/toast/use-toast";
import { LocalStorage, Gutachten, WeaponNames, Toxi, type IDrug } from "@/lib/localORM";
import { TextBuilder } from "@/lib/utils";
import { drugs } from "@/lib/Drugs";

const { $locally }: { $locally: any } = useNuxtApp() as any;
const route = useRoute();
const { toast } = useToast();

const toxiDB = new LocalStorage<Toxi>("toxi", (data: any) => new Toxi(data));
const analyse: Ref<Toxi | undefined> = ref(await toxiDB.get(route.params.uuid));

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

function addDrug() {
    if (!analyse.value) return;

    const drug: IDrug = {
        id: v4(),
        name: createDialog.value.name,
        amount: createDialog.value.amount,
        tested: createDialog.value.tested,
        unit: createDialog.value.unit,
        analyse:
            drugs
                .find((x) => x.name === createDialog.value.name)
                ?.analyse.replaceVariables(
                    createDialog.value.variables.map((x) => {
                        return { key: x.key, value: x.value };
                    })
                )
                .getAsString() || "",
    };

    analyse.value?.drugs.push(drug);
    toxiDB.update(analyse.value.id, analyse.value);

    toast({
        title: "Droge hinzugefügt",
        description: "Die Droge wurde erfolgreich hinzugefügt.",
    });

    createDialog.value = {
        name: "",
        amount: 0,
        tested: 0,
        unit: "",
        variables: [],
    };
}

function deleteDrug(drugId: string) {
    if (!analyse.value) return;

    analyse.value.drugs = analyse.value.drugs.filter((x) => x.id !== drugId);
    toxiDB.update(analyse.value.id, analyse.value);

    toast({
        title: "Droge gelöscht",
        description: "Die Droge wurde erfolgreich gelöscht.",
    });
}

function selectDrug() {
    const drug = drugs.find((x) => x.name === createDialog.value.name);
    createDialog.value.variables = drug?.variables.map((x) => ({ key: x.placeholder, name: x.name, value: "" })) || [];
}

function saveDetails() {
    if (!analyse.value) return;

    toxiDB.update(analyse.value.id, analyse.value);

    toast({
        title: "Details gespeichert",
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
                                            <Button type="submit" @click="addDrug"> Hinzufügen </Button>
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
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger as-child>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal class="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                                                <!-- <DropdownMenuItem>Bearbeiten</DropdownMenuItem> -->
                                                <DropdownMenuItem @click="deleteDrug(drug.id)">Löschen</DropdownMenuItem>
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
