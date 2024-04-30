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
import { LocalStorageORM, Gutachten, WeaponNames } from "@/lib/localORM";
import { TextBuilder } from "@/lib/utils";

const { $locally }: { $locally: any } = useNuxtApp() as any;
const route = useRoute();
const { toast } = useToast();

const gutachtenORM = new LocalStorageORM<Gutachten>("gutachten");
const gutachten: Ref<Gutachten | undefined> = ref(await gutachtenORM.get(route.params.uuid));

const createWeaponDialog = ref({
    name: "",
    model: "",
    serial: "",
    schmauchspuren: false,
    zustand: "warm",
    munition: 0,
});

const createSchmauchspurenDialog = ref({
    name: "",
    schmauchspuren: true,
});

const activeTab = ref("weapons");

function addWeapon() {
    if (!gutachten.value) return;
    gutachten.value?.weapons.push({ id: v4(), ...createWeaponDialog.value });
    gutachtenORM.update(gutachten.value.id, gutachten.value);

    createWeaponDialog.value = { name: "", model: "", serial: "", schmauchspuren: false, zustand: "warm", munition: 0 };

    toast({
        title: "Waffe hinzugefügt",
        description: "Die Waffe wurde erfolgreich hinzugefügt.",
    });

    console.log(gutachten.value);
}

function deleteWeapon(uuid: string) {
    if (!gutachten.value) return;

    gutachten.value.weapons = gutachten.value.weapons.filter((weapon) => weapon.id !== uuid);
    gutachtenORM.update(gutachten.value.id, gutachten.value);

    toast({
        title: "Waffe entfernt",
        description: "Die Waffe wurde erfolgreich entfernt.",
    });
}

function addSchmauchspuren() {
    if (!gutachten.value) return;

    gutachten.value.schmauchspuren.push({ id: v4(), ...createSchmauchspurenDialog.value });
    gutachtenORM.update(gutachten.value.id, gutachten.value);

    toast({
        title: "Schmauchspurentest hinzugefügt",
        description: "Der Schmauchspurentest wurde erfolgreich hinzugefügt.",
    });
}

function deleteSchmauchspuren(uuid: string) {
    if (!gutachten.value) return;

    gutachten.value.schmauchspuren = gutachten.value.schmauchspuren.filter((schmauchspuren) => schmauchspuren.id !== uuid);
    gutachtenORM.update(gutachten.value.id, gutachten.value);

    toast({
        title: "Schmauchspurentest entfernt",
        description: "Die Schmauchspurentest wurden erfolgreich entfernt.",
    });
}

function saveDetails() {
    if (!gutachten.value) return;

    gutachtenORM.update(gutachten.value.id, gutachten.value);

    toast({
        title: "Details gespeichert",
        description: "Die Details wurden erfolgreich gespeichert.",
    });
}

function copyGutachten() {
    if (!gutachten.value) return;
    const textBuilder = new TextBuilder();

    textBuilder.addLine("<!-- Titel: [FSD - BA] Akz. " + gutachten.value.akz + " - " + (gutachten.value.weapons.length <= 2 ? gutachten.value.weapons.map((weapon) => weapon.model).join(", ") : "Schusswaffen") + " -->");
    textBuilder.addLine("<!-- Titel: Balistiches Gutachten - " + (gutachten.value.weapons.length <= 2 ? gutachten.value.weapons.map((weapon) => weapon.model).join(", ") : "Schusswaffen") + " -->");
    textBuilder.addLine("");
    textBuilder.addLine("| Name | Schusswaffe | Modell | Seriennummer | Schmauchspuren |  Zustand | Munition");
    textBuilder.addLine("|--------|--------|--------|--------|--------|--------|--------|");

    for (const weapon of gutachten.value.weapons) {
        textBuilder.addLine(`| ${weapon.name} | Ja | ${weapon.model} | ${weapon.serial} | ${weapon.schmauchspuren ? "Ja" : "Nein"} | ${weapon.zustand === "warm" ? "Warm" : "Kalt"} | ${weapon.munition} Schuss Geladen |`);
    }

    if (gutachten.value.schmauchspuren.length > 0) {
        textBuilder.addLine("");
        textBuilder.addLine("---");
        textBuilder.addLine("");
        textBuilder.addLine("`Schmauchspuren Tests:`");
        textBuilder.addLine("");

        for (const schmauchspuren of gutachten.value.schmauchspuren) {
            textBuilder.addLine("- Schmauchspuren Test von **" + schmauchspuren.name + "** » **Ergebnis:** " + (schmauchspuren.schmauchspuren ? "<font color=#004225><b>POSITIV</b></font>" : "<font color=#8d1d2c><b>NEGATIV</b></font>"));
        }
    }

    textBuilder.addLine("");
    textBuilder.addLine("---");
    textBuilder.addLine("");
    textBuilder.addLine(`Gutachter: ${gutachten.value.gutachter}`);

    textBuilder.copyClipboard();

    toast({
        title: "Gutachten kopiert",
        description: "Das Gutachten wurde erfolgreich in deine Zwischenablage kopiert.",
    });
}
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <div class="flex flex-col sm:gap-4 sm:py-4">
            <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb class="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink as-child>
                                <a href="/gutachten">Balistiche Gutachten</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink as-child>
                                <a :href="'/gutachten' + route.path.split('/')[2]">{{ route.path.split("/")[2] }} </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage> {{ gutachten?.akz }} </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div class="relative ml-auto flex-1 md:grow-0">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Suchen..." class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" disabled />
                </div>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs default-value="weapons" v-model="activeTab">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="weapons"> Waffen </TabsTrigger>
                            <TabsTrigger value="schmauchspuren"> Schmauchspurentests </TabsTrigger>
                            <TabsTrigger value="details"> Details </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <Dialog v-if="activeTab === 'weapons'">
                                <DialogTrigger as-child>
                                    <Button size="sm" class="h-7 gap-1">
                                        <PlusCircle class="h-3.5 w-3.5" />
                                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Waffe hinzufügen </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent aria-describedby="undefined">
                                    <CardHeader>
                                        <CardTitle>Waffe hinzufügen</CardTitle>
                                        <CardDescription> Füge dem Gutachten eine Waffe hinzu. </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div class="grid gap-4 py-4">
                                            <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                                <Label for="name" class="text-right"> Täter </Label>
                                                <Input id="name" class="col-span-3" type="text" v-model="createWeaponDialog.name" />
                                            </div>
                                            <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                                <Label for="model" class="text-right"> Model </Label>
                                                <Select class="col-span-3" v-model="createWeaponDialog.model">
                                                    <SelectTrigger class="col-span-3">
                                                        <SelectValue class="col-span-3" placeholder="Suche ein Model aus" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup v-for="weapon in WeaponNames" :key="weapon.title">
                                                            <SelectLabel>{{ weapon.title }}</SelectLabel>
                                                            <SelectItem v-for="model in weapon.models" :value="(weapon.title == 'Sonstige' ? '' : weapon.title + ' ') + model"> {{ model }} </SelectItem>
                                                        </SelectGroup>
                                                        <!-- <SelectItem v-for="weapon in weapons" :value="weapon"> {{ weapon }} </SelectItem> -->
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                                <Label for="serial" class="text-right"> Seriennummer </Label>
                                                <Input id="serial" class="col-span-3" type="text" v-model="createWeaponDialog.serial" />
                                            </div>
                                            <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                                <Label for="schmauchspuren" class="text-right"> Schmauchspuren </Label>
                                                <Select class="col-span-3" v-model="createWeaponDialog.schmauchspuren">
                                                    <SelectTrigger class="col-span-3">
                                                        <SelectValue class="col-span-3" placeholder="Wähle aus" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem :value="true"> Ja </SelectItem>
                                                        <SelectItem :value="false"> Nein </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                                <Label for="zustand" class="text-right"> Zustand </Label>
                                                <Select class="col-span-3" v-model="createWeaponDialog.zustand">
                                                    <SelectTrigger class="col-span-3">
                                                        <SelectValue class="col-span-3" placeholder="Wähle aus" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="warm"> Warm </SelectItem>
                                                        <SelectItem value="kalt"> Kalt </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                                <Label for="munition" class="text-right"> Munition </Label>
                                                <Input id="munition" class="col-span-3" type="number" v-model="createWeaponDialog.munition" />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <DialogFooter>
                                        <DialogClose as-child>
                                            <Button type="submit" @click="addWeapon()"> Hinzufügen </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Dialog v-if="activeTab === 'schmauchspuren'">
                                <DialogTrigger as-child>
                                    <Button size="sm" class="h-7 gap-1">
                                        <PlusCircle class="h-3.5 w-3.5" />
                                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Schmauchspurentest hinzufügen </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent aria-describedby="undefined">
                                    <CardHeader>
                                        <CardTitle>Schmauchspurentest hinzufügen</CardTitle>
                                        <CardDescription> Füge dem Gutachten einen Schmauchspurentest hinzu. </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div class="grid gap-4 py-4">
                                            <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                                <Label for="name" class="text-right"> Name </Label>
                                                <Input id="name" class="col-span-3" type="text" v-model="createSchmauchspurenDialog.name" />
                                            </div>
                                            <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                                <Label for="schmauchspuren" class="text-right"> Schmauchspuren </Label>
                                                <Select class="col-span-3" v-model="createSchmauchspurenDialog.schmauchspuren">
                                                    <SelectTrigger class="col-span-3">
                                                        <SelectValue class="col-span-3" placeholder="Wähle aus" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem :value="true"> Positiv </SelectItem>
                                                        <SelectItem :value="false"> Negativ </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <DialogFooter>
                                        <DialogClose as-child>
                                            <Button type="submit" @click="addSchmauchspuren()"> Hinzufügen </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <TabsContent value="weapons">
                        <Card>
                            <CardHeader>
                                <CardTitle>Waffen</CardTitle>
                                <CardDescription> Alle dem Gutachten hinzugefügte Waffen. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Model</TableHead>
                                            <TableHead>Seriennummer</TableHead>
                                            <TableHead>Schmauchspuren</TableHead>
                                            <TableHead>Zustand</TableHead>
                                            <TableHead>Munitiont</TableHead>
                                            <TableHead>Aktionen</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow v-for="weapon in gutachten?.weapons" :key="weapon.id">
                                            <TableCell class="font-medium"> {{ weapon.name }} </TableCell>
                                            <TableCell class="hidden md:table-cell"> {{ weapon.model }} </TableCell>
                                            <TableCell class="hidden md:table-cell"> {{ weapon.serial }} </TableCell>
                                            <TableCell class="hidden md:table-cell">
                                                <Badge variant="default" class="bg-red-900 hover:bg-red-900 text-white" v-if="weapon.schmauchspuren"> Ja </Badge>
                                                <Badge variant="default" class="bg-green-900 hover:bg-green-900 text-white" v-else> Nein </Badge>
                                            </TableCell>
                                            <TableCell class="hidden md:table-cell">
                                                <Badge variant="default" class="bg-red-900 hover:bg-red-900 text-white" v-if="weapon.zustand == 'warm'"> Warm </Badge>
                                                <Badge variant="default" class="bg-blue-900 hover:bg-blue-900 text-white" v-else> Kalt </Badge>
                                            </TableCell>
                                            <TableCell class="hidden md:table-cell"> {{ weapon.munition }} </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger as-child>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal class="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                                                        <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            @click="
                                                                () => {
                                                                    $locally.copyClipboard(weapon.model + ' - ' + weapon.name + ' - Akz.: ' + gutachten?.akz);
                                                                }
                                                            "
                                                            >Schmauchspuren kopieren</DropdownMenuItem
                                                        >
                                                        <DropdownMenuItem @click="deleteWeapon(weapon.id)">Löschen</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <!-- <CardFooter>
                                <div class="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of <strong>32</strong>
                                    products
                                </div>
                            </CardFooter> -->
                        </Card>
                    </TabsContent>
                    <TabsContent value="schmauchspuren">
                        <Card>
                            <CardHeader>
                                <CardTitle>Schmauchspurentests</CardTitle>
                                <CardDescription> Alle dem Gutachten hinzugefügte Schmauchspurentests. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Ergebnis</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow v-for="schmauchspurentest in gutachten?.schmauchspuren" :key="schmauchspurentest.id">
                                            <TableCell class="font-medium"> {{ schmauchspurentest.name }} </TableCell>
                                            <TableCell class="hidden md:table-cell"> {{ schmauchspurentest.schmauchspuren ? "Positiv" : "Negativ" }} </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger as-child>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal class="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                                                        <DropdownMenuItem
                                                            @click="
                                                                () => {
                                                                    $locally.copyClipboard(schmauchspurentest.name + (gutachten?.akz == '' ? '' : ' - Akz.: ' + gutachten?.akz) + ' - ' + (schmauchspurentest.schmauchspuren ? 'Positiv' : 'Negativ'));
                                                                }
                                                            "
                                                            >Kopieren</DropdownMenuItem
                                                        >
                                                        <DropdownMenuItem @click="deleteSchmauchspuren(schmauchspurentest.id)">Löschen</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <!-- <CardFooter>
                                <div class="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of <strong>32</strong>
                                    products
                                </div>
                            </CardFooter> -->
                        </Card>
                    </TabsContent>
                    <TabsContent value="details">
                        <Card>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                                <CardDescription> Hier kannst du die Details zum Gutachten bearbeiten und das Gutachten kopieren. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div class="grid gap-4 py-4" v-if="gutachten">
                                    <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                        <Label for="aktenzeichen" class="text-right"> Aktenzeichen </Label>
                                        <Input id="aktenzeichen" class="col-span-3" type="text" v-model="gutachten.akz" />
                                    </div>
                                    <div class="grid grid-cols-4 items-center justify-items-start gap-24">
                                        <Label for="gutachter" class="text-right"> Gutachter </Label>
                                        <Input id="gutachter" class="col-span-3" type="text" v-model="gutachten.gutachter" />
                                    </div>

                                    <div class="flex gap-2 justify-start">
                                        <Button @click="saveDetails"> Änderungen speichern </Button>
                                        <Button @click="copyGutachten"> Gutachten kopieren </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>
