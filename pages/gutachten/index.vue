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
import { Gutachten, LocalStorage } from "@/lib/localORM";

const router = useRouter();
const { toast } = useToast();

const gutachtenDB = new LocalStorage<Gutachten>("gutachten", (data: any) => new Gutachten(data));
const gutachten: Ref<Gutachten[]> = ref(await gutachtenDB.getAll());

const createDialog = ref({
    akz: "",
    gutachter: "",
});

function createGutachten() {
    const createdGutachten = new Gutachten({
        akz: createDialog.value.akz,
        gutachter: createDialog.value.gutachter,
    });
    gutachtenDB.add(createdGutachten);
    gutachten.value.push(createdGutachten);

    createDialog.value = { akz: "", gutachter: "" };

    toast({
        title: "Gutachten erfolgreicherstellt",
        description: "UUID: " + createdGutachten.id,
    });
}

function deleteGutachten(index: number) {
    gutachtenDB.delete(gutachten.value[index].id);
    gutachten.value.splice(index, 1);
    toast({
        title: "Gutachten gelöscht",
        description: "Das Gutachten wurde erfolgreich gelöscht.",
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
                            <BreadcrumbPage>Ballistische Gutachten</BreadcrumbPage>
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
                                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Gutachten erstellen </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Gutachten erstellen</DialogTitle>
                                        <DialogDescription> Erstelle ein neues ballistisches Gutachten.</DialogDescription>
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
                                            <Button type="submit" @click="createGutachten()"> Erstellen </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gutachten</CardTitle>
                                <CardDescription> Finde alle deine ballistischen Gutachten. </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Akz.</TableHead>
                                            <TableHead>Gutachter</TableHead>
                                            <TableHead align="end"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow v-for="(gutachtenItem, gutachtenIndex) in gutachten" :key="gutachtenItem.akz">
                                            <TableCell> {{ gutachtenItem.akz }} </TableCell>
                                            <TableCell> {{ gutachtenItem.gutachter }} </TableCell>
                                            <TableCell align="end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger as-child>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal class="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                                                        <DropdownMenuItem @click="router.push('/gutachten/' + gutachtenItem.id)"> Öffnen </DropdownMenuItem>
                                                        <DropdownMenuItem @click="gutachtenItem.copyToClipboard()">Gutachten kopieren</DropdownMenuItem>
                                                        <DropdownMenuItem @click="deleteGutachten(gutachtenIndex)">Löschen</DropdownMenuItem>
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
