<script setup lang="ts">
import { Swords, Moon, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users, Axe, Dna, Tablets, Plus } from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { useSettings } from "@/lib/hooks/Settings";
import { useSparbuch } from "@/lib/hooks/Sparbuch";

const navigation: {
    name: string;
    icon: any;
    link: string;
    badge?: string;
}[] = [
    { name: "Ballistische Gutachten", icon: "fa-duotone fa-gun", link: "/gutachten" },
    { name: "Toxikologische Analysen", icon: "fa-duotone fa-pills", link: "/toxikologisch" },
    { name: "Hieb und Stichwaffen", icon: "fa-duotone fa-knife", link: "/stichwaffen" },
    { name: "Beschriftung", icon: "fa-duotone fa-pencil", link: "/beschriftung" },
    { name: "DNA Proben", icon: "fa-duotone fa-dna", link: "/dna" },
];

const router = useRoute();

const dialogType = ref("");

const search = ref("");

const { settings } = useSettings();
const { getSparbuchAmount } = useSparbuch();
</script>

<template>
    <SpeedInsights />
    <div class="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr]">
        <div class="hidden md:block">
            <div class="flex h-full max-h-screen flex-col gap-2">
                <div class="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                    <a href="/" class="flex items-center gap-2 font-semibold">
                        <img src="/logo_2.png" alt="FSD Homestate" class="h-8 w-auto" />
                        <span class="">FSD Homestate</span>
                    </a>
                </div>
                <div class="flex-1">
                    <nav class="grid items-start px-6 text-sm font-medium">
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button class="mx-[-0.65rem] flex items-center justify-center gap-4 rounded-2xl text-foreground hover:bg-[#4A4E53] bg-[#37393b] mb-3 h-14 w-24 shadow-md hover:shadow-lg">
                                        <i class="fa-solid fa-plus"></i>
                                        Neu
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-56">
                                    <DropdownMenuGroup>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>
                                                <i class="fa-solid fa-plus mr-3"></i>
                                                <span>Neu anlegen</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem @click="dialogType = 'Gutachten'">
                                                        <DialogTrigger>
                                                            <i class="fa-solid fa-gun mr-3"></i>
                                                            <span>Ballistisches Gutachten</span>
                                                        </DialogTrigger>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem @click="dialogType = 'Drugs'">
                                                        <DialogTrigger>
                                                            <i class="fa-regular fa-pills mr-3"></i>
                                                            <span>Toxikologische Analyse</span>
                                                        </DialogTrigger>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem @click="dialogType = 'Hieb'">
                                                        <DialogTrigger>
                                                            <i class="fa-duotone fa-knife mr-3"></i>
                                                            <span>Hieb und Stichwaffen Analyse</span>
                                                        </DialogTrigger>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem @click="dialogType = 'Dna'">
                                                        <DialogTrigger>
                                                            <i class="fa-duotone fa-knife mr-3"></i>
                                                            <span>DNA Probe</span>
                                                        </DialogTrigger>
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent class="sm:max-w-[425px]">
                                <DialogGutachten v-if="dialogType == 'Gutachten'" />
                                <DialogDrugs v-else-if="dialogType == 'Drugs'" />
                                <DialogHieb v-else-if="dialogType == 'Hieb'" />
                                <DialogDNA v-else-if="dialogType == 'Dna'" />
                            </DialogContent>
                        </Dialog>

                        <a v-for="navigationItem in navigation" :href="navigationItem.link" class="mx-[-0.30rem] flex items-center gap-3 rounded-full px-3 py-2 text-foreground hover:text-foreground" :class="{ 'bg-[#004A77] text-[#c2e7ff] hover:bg-[#004A77] hover:text-[#c2e7ff]': router.path.startsWith(navigationItem.link), 'hover:bg-[#2B2B2B]': !router.path.startsWith(navigationItem.link) }">
                            <i :class="navigationItem.icon + ''"></i>
                            {{ navigationItem.name }}
                            <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full" v-if="navigationItem.badge"> {{ navigationItem.badge }} </Badge>
                        </a>

                        <a v-if="settings.sparbuch" href="/sparbuch" class="mx-[-0.30rem] flex items-center gap-3 rounded-full px-3 py-2 mt-6 text-foreground hover:text-foreground" :class="{ 'bg-[#004A77] text-[#c2e7ff] hover:bg-[#004A77] hover:text-[#c2e7ff]': router.path.startsWith('/sparbuch'), 'hover:bg-[#2B2B2B]': !router.path.startsWith('/sparbuch') }">
                            <i class="fa-duotone fa-money-bill"></i>
                            Sparbuch
                            <Badge class="ml-auto flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full"> {{ getSparbuchAmount() }} $</Badge>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <header class="flex h-14 items-center gap-4 lg:h-[60px] pr-6">
                <Sheet>
                    <SheetTrigger as-child>
                        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                            <Menu class="h-5 w-5" />
                            <span class="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" class="flex flex-col">
                        <nav class="grid gap-2 text-lg font-medium">
                            <a :href="navigationItem.link" class="mx-[-0.30rem] flex items-center gap-4 rounded-full px-3 py-2 text-foreground hover:text-foreground" v-for="navigationItem in navigation" :class="{ 'bg-[#004A77] text-[#c2e7ff] hover:bg-[#004A77] hover:text-[#c2e7ff]': router.path === navigationItem.link, 'hover:bg-[#2B2B2B]': router.path !== navigationItem.link }">
                                <i :class="navigationItem.icon + ' h-5 w-5'"></i>
                                {{ navigationItem.name }}
                                <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full" v-if="navigationItem.badge"> {{ navigationItem.badge }} </Badge>
                            </a>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div class="relative">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Suche..." class="w-full rounded-full bg-[#282A2C] pl-8 md:w-[320px] lg:w-[560px] focus-visible:[--tw-ring-offset-width:0] focus-visible:[--tw-ring-color:transparent]" v-model="search" />
                </div>
                <DialogSettings />
            </header>

            <!-- <ContextMenu>
                <ContextMenuTrigger> -->
            <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#131314] rounded-2xl mb-4 mr-4">
                <NuxtPage :search="search" />
            </main>
            <!-- </ContextMenuTrigger>
                    <ContextMenuContent>
                    ToDo: Make context Menu
                    <ContextMenuItem>Profile</ContextMenuItem>
                    <ContextMenuItem>Billing</ContextMenuItem>
                    <ContextMenuItem>Team</ContextMenuItem>
                    <ContextMenuItem>Subscription</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu> -->
        </div>
        <Toaster />
    </div>
</template>
