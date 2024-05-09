<script setup lang="ts">
import { MoreHorizontal, PlusCircle, Search } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast/use-toast";
import { LocalStorage, Stichwaffen } from "@/lib/localORM";

const router = useRouter();
const { toast } = useToast();

const stichwaffenDB = new LocalStorage<Stichwaffen>("stichwaffen", (data: any) => new Stichwaffen(data));
const stichwaffen: Ref<Stichwaffen[]> = ref(await stichwaffenDB.getAll());

const createDialog = ref({
    akz: "",
    gutachter: "",
});

async function create() {
    if (createDialog.value.akz === "" || createDialog.value.gutachter === "") {
        toast({
            title: "Fehler",
            description: "Bitte fülle alle Felder aus.",
            variant: "destructive",
        });
        return;
    }

    const newStichwaffe = new Stichwaffen({
        akz: createDialog.value.akz,
        gutachter: createDialog.value.gutachter,
    });

    stichwaffenDB.add(newStichwaffe);
    stichwaffen.value = await stichwaffenDB.getAll();

    createDialog.value.akz = "";
    createDialog.value.gutachter = "";

    toast({
        title: "Analyse erstellt",
        description: "Die Analyse wurde erfolgreich erstellt.",
    });
}

function deleteAnalyse(analyseId: string) {
    const analyseIndex = stichwaffen.value.findIndex((analyse) => analyse.id === analyseId);

    stichwaffenDB.delete(analyseId);
    stichwaffen.value.splice(analyseIndex, 1);

    toast({
        title: "Analyse gelöscht",
        description: "Die Analyse wurde erfolgreich gelöscht.",
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
                            <BreadcrumbPage>Hieb und Stichwaffen Analysen</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div class="relative ml-auto flex-1 md:grow-0">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
                </div>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs default-value="all">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all"> Alle </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <Dialog>
                                <DialogTrigger>
                                    <Button size="sm" class="h-7 gap-1">
                                        <PlusCircle class="h-3.5 w-3.5" />
                                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Analyse erstellen </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Analyse erstellen</DialogTitle>
                                        <DialogDescription> Erstelle ein Analyse zu Hieb und/oder Stichwaffen.</DialogDescription>
                                    </DialogHeader>
                                    <div class="grid gap-4 py-4">
                                        <div class="grid grid-cols-4 items-center gap-4">
                                            <Label for="akz" class="text-right"> Akz. </Label>
                                            <Input id="akz" class="col-span-3" type="text" v-model="createDialog.akz" />
                                        </div>
                                        <div class="grid grid-cols-4 items-center gap-4">
                                            <Label for="gutachter" class="text-right"> Gutachter </Label>
                                            <Input id="gutachter" class="col-span-3" type="text" v-model="createDialog.gutachter" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose as-child>
                                            <Button type="submit" @click="create()"> Erstellen </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader>
                                <CardTitle>Analysen von Hieb und Stichwaffen</CardTitle>
                                <CardDescription> Finde alle deine Analysen von Hieb und Stichwaffen. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Akz.</TableHead>
                                            <TableHead>Erstellt am</TableHead>
                                            <TableHead>Gutachter</TableHead>
                                            <TableHead align="end"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow v-for="(analyse, analysenIndex) in stichwaffen" :key="analyse.akz">
                                            <TableCell> {{ analyse.akz }} </TableCell>
                                            <TableCell> {{ analyse.createdAt.getDate().toString().padStart(2, "0") }}.{{ analyse.createdAt.getMonth().toString().padStart(2, "0") }}.{{ analyse.createdAt.getFullYear() }} - {{ analyse.createdAt.getHours().toString().padStart(2, "0") }}:{{ analyse.createdAt.getMinutes().toString().padStart(2, "0") }} Uhr</TableCell>
                                            <TableCell> {{ analyse.gutachter }} </TableCell>
                                            <TableCell align="end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger as-child>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal class="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                                                        <DropdownMenuItem @click="router.push('/stichwaffen/' + analyse.id)"> Öffnen </DropdownMenuItem>
                                                        <DropdownMenuItem @click="analyse.copyToClipboard()">Analyse kopieren</DropdownMenuItem>
                                                        <DropdownMenuItem @click="deleteAnalyse(analyse.id)">Löschen</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>
