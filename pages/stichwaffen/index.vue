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

const props = defineProps(["search"]);

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
    <div class="flex min-h-screen w-full flex-col">
        <div class="flex flex-col sm:gap-4 sm:py-4">
            <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb class="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Hieb und Stichwaffen Analysen</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Akz.</TableHead>
                            <TableHead>Erstellt am</TableHead>
                            <TableHead>Gutachter</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(analyse, analysenIndex) in stichwaffen.filter((x) => x.akz.toLowerCase().includes(props.search.toLowerCase()) || x.gutachter.toLowerCase().includes(props.search.toLowerCase()))" :key="analyse.akz" :href="'/stichwaffen/' + analyse.id">
                            <TableCell> {{ analyse.akz }} </TableCell>
                            <TableCell> {{ analyse.createdAt.getDate().toString().padStart(2, "0") }}.{{ analyse.createdAt.getMonth().toString().padStart(2, "0") }}.{{ analyse.createdAt.getFullYear() }} - {{ analyse.createdAt.getHours().toString().padStart(2, "0") }}:{{ analyse.createdAt.getMinutes().toString().padStart(2, "0") }} Uhr</TableCell>
                            <TableCell> {{ analyse.gutachter }} </TableCell>
                            <TableCell class="[--table-padding:0] pl-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal class="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
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
            </main>
        </div>
    </div>
</template>
