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
import { Gutachten, LocalStorage, Toxi } from "@/lib/localORM";

const router = useRouter();
const { toast } = useToast();

const toxiDB = new LocalStorage<Toxi>("toxi", (data: any) => new Toxi(data));
const analysen: Ref<Toxi[]> = ref(await toxiDB.getAll());

const createDialog = ref({
    akz: "",
    gutachter: "",
    forName: "",
});

function create() {
    if (!createDialog.value.akz || !createDialog.value.gutachter || !createDialog.value.forName) {
        toast({
            title: "Fehler beim Erstellen",
            description: "Bitte fülle alle Felder aus.",
            variant: "destructive",
        });
        return;
    }

    const newAnalyse = new Toxi({
        akz: createDialog.value.akz,
        gutachter: createDialog.value.gutachter,
        forName: createDialog.value.forName,
    });

    toxiDB.add(newAnalyse);
    analysen.value.push(newAnalyse);
    createDialog.value.akz = "";
    createDialog.value.gutachter = "";
    createDialog.value.forName = "";

    toast({
        title: "Analyse erstellt",
        description: "Die Analyse wurde erfolgreich erstellt.",
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
                            <BreadcrumbPage>Toxikologische Analysen</BreadcrumbPage>
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
                                        <DialogDescription> Erstelle ein neues toxikologische Analyse.</DialogDescription>
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
                                        <div class="grid grid-cols-4 items-center gap-4">
                                            <Label for="gutachter" class="text-right"> Im Auftrag von </Label>
                                            <Input id="gutachter" class="col-span-3" type="text" v-model="createDialog.forName" />
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
                                <CardTitle>Toxikologische Analysen</CardTitle>
                                <CardDescription> Finde alle deine toxikologische Analysen. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Akz.</TableHead>
                                            <TableHead>Gutachter</TableHead>
                                            <TableHead>Im Auftrag von</TableHead>
                                            <TableHead align="end"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow v-for="(analyse, analysenIndex) in analysen" :key="analyse.akz">
                                            <TableCell> {{ analyse.akz }} </TableCell>
                                            <TableCell> {{ analyse.gutachter }} </TableCell>
                                            <TableCell> {{ analyse.forName }} </TableCell>
                                            <TableCell align="end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger as-child>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal class="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                                                        <DropdownMenuItem @click="router.push('/toxikologisch/' + analyse.id)"> Öffnen </DropdownMenuItem>
                                                        <DropdownMenuItem @click="analyse.copyToClipboard()">Analyse kopieren</DropdownMenuItem>
                                                        <DropdownMenuItem @click="">Löschen</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <!-- <CardFooter> -->
                            <!-- <div class="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of <strong>32</strong>
                                    products
                                </div> -->
                            <!-- </CardFooter> -->
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>