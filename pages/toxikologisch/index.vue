<script setup lang="ts">
import { MoreHorizontal, Search } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast/use-toast";
import { LocalStorage, Toxi } from "@/lib/localORM";

const router = useRouter();
const { toast } = useToast();

const toxiDB = new LocalStorage<Toxi>("toxi", (data: any) => new Toxi(data));
const analysen: Ref<Toxi[]> = ref(await toxiDB.getAll());

const search = ref("");

function deleteAnalyse(analysenId: string) {
    toxiDB.delete(analysenId);
    analysen.value = analysen.value.filter((analyse) => analyse.id !== analysenId);
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
                            <BreadcrumbPage>Toxikologische Analysen</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div class="relative ml-auto flex-1 md:grow-0">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Suche..." class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" v-model="search" />
                </div>
            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Akz.</TableHead>
                            <TableHead>Erstellt am</TableHead>
                            <TableHead>Gutachter</TableHead>
                            <TableHead>Im Auftrag von</TableHead>
                            <TableHead align="end"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(analyse, analysenIndex) in analysen.filter((x) => x.akz.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || x.forName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || x.gutachter.toLocaleLowerCase().includes(search.toLocaleLowerCase()))" :key="analyse.akz" :href="'/toxikologisch/' + analyse.id">
                            <TableCell> {{ analyse.akz }} </TableCell>
                            <TableCell> {{ analyse.createdAt.getDate().toString().padStart(2, "0") }}.{{ analyse.createdAt.getMonth().toString().padStart(2, "0") }}.{{ analyse.createdAt.getFullYear() }} - {{ analyse.createdAt.getHours().toString().padStart(2, "0") }}:{{ analyse.createdAt.getMinutes().toString().padStart(2, "0") }} Uhr</TableCell>
                            <TableCell> {{ analyse.gutachter }} </TableCell>
                            <TableCell> {{ analyse.forName }} </TableCell>
                            <TableCell align="end" class="[--table-padding:0] pl-4">
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
