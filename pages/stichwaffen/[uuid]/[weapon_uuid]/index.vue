<script setup lang="ts">
import { MoreHorizontal, PlusCircle, Search } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast/use-toast";
import { LocalStorage, Stichwaffen, type IStichwaffe } from "@/lib/localORM";
import { v4 } from "uuid";

const route = useRoute();
const router = useRouter();
const { toast } = useToast();

const stichwaffenDB = new LocalStorage<Stichwaffen>("stichwaffen", (data: any) => new Stichwaffen(data));
const stichwaffe: Ref<Stichwaffen | undefined> = ref(await stichwaffenDB.get(route.params.uuid));

const activeTab = ref("dnas");

const createDialog: Ref<{ name: string }> = ref({
    name: "",
});

function addDNA() {
    if (!stichwaffe.value) return;

    if (createDialog.value.name === "") {
        toast({
            title: "Fehler",
            description: "Bitte fülle alle Felder aus.",
            variant: "destructive",
        });
        return;
    }

    stichwaffe.value?.weapons.find((x) => x.id == route.params.weapon_uuid)?.dnas.push(createDialog.value.name);
    stichwaffenDB.update(route.params.uuid, stichwaffe.value);
    createDialog.value.name = "";

    toast({
        title: "DNA hinzugefügt",
        description: "Die DNA wurde erfolgreich hinzugefügt.",
    });
}

function deleteDNA(dna: string) {
    if (!stichwaffe.value) return;
    const t = stichwaffe.value.weapons.find((x) => x.id == route.params.weapon_uuid);
    if (!t) return;

    stichwaffe.value.weapons.find((x) => x.id == route.params.weapon_uuid)?.dnas.splice(t.dnas.indexOf(dna), 1);
    stichwaffenDB.update(route.params.uuid, stichwaffe.value);

    toast({
        title: "DNA gelöscht",
        description: "Die DNA wurde erfolgreich gelöscht.",
    });
}

function saveDetails() {
    if (!stichwaffe.value) return;

    stichwaffenDB.update(route.params.uuid, stichwaffe.value);

    toast({
        title: "Änderungen gespeichert",
        description: "Die Änderungen wurden erfolgreich gespeichert.",
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
                                <a href="/stichwaffen">Hieb und Stichwaffen Analysen</a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink as-child>
                                <a :href="'/stichwaffen/' + route.params.uuid">{{ stichwaffe?.akz }} </a>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage> {{ stichwaffe?.weapons.find((x) => x.id == route.params.weapon_uuid)?.name }} </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div class="relative ml-auto flex-1 md:grow-0">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Suchen..." class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" disabled />
                </div>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs default-value="dnas" v-model="activeTab">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="dnas"> DNAs </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <Dialog v-if="activeTab === 'dnas'">
                                <DialogTrigger as-child>
                                    <Button size="sm" class="h-7 gap-1">
                                        <PlusCircle class="h-3.5 w-3.5" />
                                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> DNA hinzufügen </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent aria-describedby="undefined">
                                    <CardContent>
                                        <div class="grid gap-4 py-4">
                                            <p class="text-lg font-semibold leading-none tracking-tight">DNA hinzufügen</p>
                                            <p class="text-sm text-muted-foreground -mt-3">Füge der Hieb und/oder Stichwaffe eine DNA hinzu.</p>
                                            <div class="grid grid-cols-4 items-center gap-4">
                                                <Label for="model" class="text-right"> DNA Treffer </Label>
                                                <Input id="name" class="col-span-3" type="text" v-model="createDialog.name" />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <DialogFooter>
                                        <DialogClose as-child>
                                            <Button type="submit" @click="addDNA"> Hinzufügen </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <TabsContent value="dnas">
                        <Card>
                            <CardHeader>
                                <CardTitle>Waffen</CardTitle>
                                <CardDescription> Alle der Analyse hinzugefügten Hieb und/oder Stichwaffen. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>DNA</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow v-for="dna in stichwaffe?.weapons.find((x) => x.id == route.params.weapon_uuid)?.dnas" :key="dna">
                                            <TableCell class="font-medium"> {{ dna }} </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger as-child>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal class="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                                                        <DropdownMenuItem @click="deleteDNA(dna)">Löschen</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="details">
                        <Card>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                                <CardDescription> Hier kannst du die Details zum Gutachten bearbeiten und das Gutachten kopieren. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div class="grid gap-4 py-4" v-if="stichwaffe">
                                    <div class="grid grid-cols-4 items-center gap-4">
                                        <Label for="aktenzeichen" class="text-right"> Aktenzeichen </Label>
                                        <Input id="aktenzeichen" class="col-span-3" type="text" v-model="stichwaffe.akz" />
                                    </div>
                                    <div class="grid grid-cols-4 items-center gap-4">
                                        <Label for="gutachter" class="text-right"> Gutachter </Label>
                                        <Input id="gutachter" class="col-span-3" type="text" v-model="stichwaffe.gutachter" />
                                    </div>

                                    <div class="flex gap-2 justify-start">
                                        <Button @click="saveDetails"> Änderungen speichern </Button>
                                        <Button @click="stichwaffe.copyToClipboard()"> Gutachten kopieren </Button>
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
