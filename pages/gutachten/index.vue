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

const props = defineProps(["search"]);

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
    <div class="flex min-h-screen w-full flex-col">
        <div class="flex flex-col sm:gap-4 sm:py-4">
            <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb class="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Ballistische Gutachten</BreadcrumbPage>
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
                        <TableRow v-for="(gutachtenItem, gutachtenIndex) in gutachten.filter((x) => x.akz.toLowerCase().includes(props.search.toLowerCase()) || x.gutachter.toLowerCase().includes(props.search.toLowerCase()))" :key="gutachtenItem.akz" :href="'/gutachten/' + gutachtenItem.id">
                            <TableCell> {{ gutachtenItem.akz }} </TableCell>
                            <TableCell> {{ gutachtenItem.createdAt.getDate().toString().padStart(2, "0") }}.{{ gutachtenItem.createdAt.getMonth().toString().padStart(2, "0") }}.{{ gutachtenItem.createdAt.getFullYear() }} - {{ gutachtenItem.createdAt.getHours().toString().padStart(2, "0") }}:{{ gutachtenItem.createdAt.getMinutes().toString().padStart(2, "0") }} Uhr</TableCell>
                            <TableCell> {{ gutachtenItem.gutachter }} </TableCell>
                            <TableCell class="[--table-padding:0] pl-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal class="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
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
            </main>
        </div>
    </div>
</template>
