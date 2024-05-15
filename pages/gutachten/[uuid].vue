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
import { LocalStorage, Gutachten, WeaponNames } from "@/lib/localORM";
import { TextBuilder } from "@/lib/utils";

const { $locally }: { $locally: any } = useNuxtApp() as any;
const route = useRoute();
const { toast } = useToast();

const gutachtenDB = new LocalStorage<Gutachten>("gutachten", (data: any) => new Gutachten(data));
const gutachten: Ref<Gutachten | undefined> = ref(await gutachtenDB.get(route.params.uuid));

const createWeaponDialog = ref({
    name: "",
    model: "",
    serial: "",
    schmauchspuren: false,
    zustand: "kalt",
    munition: 0,
});

const createSchmauchspurenDialog = ref({
    name: "",
    schmauchspuren: true,
});

const activeTab = ref("Waffen");

function addWeapon() {
    if (!gutachten.value) return;
    gutachten.value?.weapons.push({ id: v4(), ...createWeaponDialog.value });
    gutachtenDB.update(gutachten.value.id, gutachten.value);

    createWeaponDialog.value = { name: "", model: "", serial: "", schmauchspuren: false, zustand: "warm", munition: 0 };

    toast({
        title: "Waffe hinzugefügt",
        description: "Die Waffe wurde erfolgreich hinzugefügt.",
    });
}

function deleteWeapon(uuid: string) {
    if (!gutachten.value) return;

    gutachten.value.weapons = gutachten.value.weapons.filter((weapon) => weapon.id !== uuid);
    gutachtenDB.update(gutachten.value.id, gutachten.value);

    toast({
        title: "Waffe entfernt",
        description: "Die Waffe wurde erfolgreich entfernt.",
    });
}

function addSchmauchspuren() {
    if (!gutachten.value) return;

    gutachten.value.schmauchspuren.push({ id: v4(), ...createSchmauchspurenDialog.value });
    gutachtenDB.update(gutachten.value.id, gutachten.value);

    toast({
        title: "Schmauchspurentest hinzugefügt",
        description: "Der Schmauchspurentest wurde erfolgreich hinzugefügt.",
    });
}

function deleteSchmauchspuren(uuid: string) {
    if (!gutachten.value) return;

    gutachten.value.schmauchspuren = gutachten.value.schmauchspuren.filter((schmauchspuren) => schmauchspuren.id !== uuid);
    gutachtenDB.update(gutachten.value.id, gutachten.value);

    toast({
        title: "Schmauchspurentest entfernt",
        description: "Die Schmauchspurentest wurden erfolgreich entfernt.",
    });
}

function saveDetails() {
    if (!gutachten.value) return;

    gutachtenDB.update(gutachten.value.id, gutachten.value);

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
                                <a href="/gutachten">Ballistische Gutachten</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink as-child>
                                <a :href="'/gutachten/' + gutachten?.id">{{ gutachten?.akz }}</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage> {{ activeTab }} </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs default-value="Waffen" v-model="activeTab">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="Waffen"> Waffen </TabsTrigger>
                            <TabsTrigger value="Schmauchspurentests"> Schmauchspurentests </TabsTrigger>
                            <TabsTrigger value="Details"> Details </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <Dialog v-if="activeTab === 'Waffen'">
                                <DialogTrigger as-child>
                                    <Button size="sm" class="h-7 gap-1">
                                        <PlusCircle class="h-3.5 w-3.5" />
                                        <span class="sm:whitespace-nowrap"> Waffe hinzufügen </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent aria-describedby="undefined">
                                    <CardHeader>
                                        <CardTitle>Waffe hinzufügen</CardTitle>
                                        <CardDescription> Füge dem Gutachten eine Waffe hinzu. </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div class="grid gap-4 py-4">
                                            <div class="grid grid-cols-6 items-center gap-4">
                                                <Label for="name" class="col-span-2"> Täter </Label>
                                                <Input id="name" class="col-span-4" type="text" v-model="createWeaponDialog.name" />
                                            </div>
                                            <div class="grid grid-cols-6 items-center gap-4">
                                                <Label for="model" class="col-span-2"> Model </Label>
                                                <Select v-model="createWeaponDialog.model">
                                                    <SelectTrigger class="col-span-4">
                                                        <SelectValue placeholder="Suche ein Model aus" />
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
                                            <div class="grid grid-cols-6 items-center gap-4">
                                                <Label for="serial" class="col-span-2"> Seriennummer </Label>
                                                <Input id="serial" class="col-span-4" type="text" v-model="createWeaponDialog.serial" />
                                            </div>
                                            <div class="grid grid-cols-6 items-center gap-4">
                                                <Label for="schmauchspuren" class="col-span-2"> Schmauchspuren </Label>
                                                <Select v-model="createWeaponDialog.schmauchspuren">
                                                    <SelectTrigger class="col-span-4">
                                                        <SelectValue placeholder="Wähle aus" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem :value="false"> Nein </SelectItem>
                                                        <SelectItem :value="true"> Ja </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div class="grid grid-cols-6 items-center gap-4">
                                                <Label for="zustand" class="col-span-2"> Zustand </Label>
                                                <Select v-model="createWeaponDialog.zustand">
                                                    <SelectTrigger class="col-span-4">
                                                        <SelectValue placeholder="Wähle aus" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="kalt"> Kalt </SelectItem>
                                                        <SelectItem value="warm"> Warm </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div class="grid grid-cols-6 items-center gap-4">
                                                <Label for="munition" class="col-span-2"> Munition </Label>
                                                <Input id="munition" class="col-span-4" type="number" v-model="createWeaponDialog.munition" />
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
                            <Dialog v-if="activeTab === 'Schmauchspurentests'">
                                <DialogTrigger as-child>
                                    <Button size="sm" class="h-7 gap-1">
                                        <PlusCircle class="h-3.5 w-3.5" />
                                        <span class="sm:whitespace-nowrap"> Schmauchspurentest hinzufügen </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent aria-describedby="undefined">
                                    <CardHeader>
                                        <CardTitle>Schmauchspurentest hinzufügen</CardTitle>
                                        <CardDescription> Füge dem Gutachten einen Schmauchspurentest hinzu. </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div class="grid gap-4 py-4">
                                            <div class="grid grid-cols-4 items-center gap-4">
                                                <Label for="name" class="text-right"> Name </Label>
                                                <Input id="name" class="col-span-3" type="text" v-model="createSchmauchspurenDialog.name" />
                                            </div>
                                            <div class="grid grid-cols-4 items-center gap-4">
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
                    <TabsContent value="Waffen">
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
                                    <TableCell class=""> {{ weapon.model }} </TableCell>
                                    <TableCell class=""> {{ weapon.serial }} </TableCell>
                                    <TableCell class="">
                                        <Badge variant="default" class="bg-red-900 hover:bg-red-900 text-white" v-if="weapon.schmauchspuren"> Ja </Badge>
                                        <Badge variant="default" class="bg-green-900 hover:bg-green-900 text-white" v-else> Nein </Badge>
                                    </TableCell>
                                    <TableCell class="">
                                        <Badge variant="default" class="bg-red-900 hover:bg-red-900 text-white" v-if="weapon.zustand == 'warm'"> Warm </Badge>
                                        <Badge variant="default" class="bg-blue-900 hover:bg-blue-900 text-white" v-else> Kalt </Badge>
                                    </TableCell>
                                    <TableCell class=""> {{ weapon.munition }} </TableCell>
                                    <TableCell class="[--table-padding:0] pl-4">
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
                    </TabsContent>
                    <TabsContent value="Schmauchspurentests">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Ergebnis</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="schmauchspurentest in gutachten?.schmauchspuren" :key="schmauchspurentest.id">
                                    <TableCell class="font-medium"> {{ schmauchspurentest.name }} </TableCell>
                                    <TableCell class=""> {{ schmauchspurentest.schmauchspuren ? "Positiv" : "Negativ" }} </TableCell>
                                    <TableCell class="[--table-padding:0] pl-4">
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
                                                            $locally.copyClipboard('Schmauchspurentest - ' + schmauchspurentest.name + (gutachten?.akz == '' ? '' : ' - Akz.: ' + gutachten?.akz) + ' - ' + (schmauchspurentest.schmauchspuren ? 'Positiv' : 'Negativ'));
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
                    </TabsContent>
                    <TabsContent value="Details">
                        <div class="grid gap-4 py-4" v-if="gutachten">
                            <div class="grid grid-cols-12 items-center gap-4">
                                <Label for="aktenzeichen" class=""> Aktenzeichen </Label>
                                <Input id="aktenzeichen" class="col-span-11" type="text" v-model="gutachten.akz" />
                            </div>
                            <div class="grid grid-cols-12 items-center gap-4">
                                <Label for="gutachter" class=""> Gutachter </Label>
                                <Input id="gutachter" class="col-span-11" type="text" v-model="gutachten.gutachter" />
                            </div>

                            <div class="flex gap-2 justify-start">
                                <Button @click="saveDetails"> Änderungen speichern </Button>
                                <Button @click="gutachten.copyToClipboard()"> Gutachten kopieren </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>
