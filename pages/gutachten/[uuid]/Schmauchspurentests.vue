<script setup lang="ts">
import { MoreHorizontal, PlusCircle } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGutachten } from '@/lib/hooks/Gutachten';
import { toast } from 'vue-sonner';
import { useCustomRoute } from '@/lib/hooks/CustomRoute';

const { $locally }: { $locally: any } = useNuxtApp() as any;
const { route, switchTab, getTab } = useCustomRoute();

const {
  getById: getGutachtenById,
  addSchmauchspuren: addSchmauchspurenToGutachten,
  removeSchmauchspuren: removeSchmauchspurenFromGutachten,
} = useGutachten();

const gutachten = await getGutachtenById(route.params.uuid);

const createSchmauchspurenDialog = ref({
  name: '',
  schmauchspuren: 'true',
});

const activeTab = ref('Schmauchspurentests');

function handleAddSchmauchspuren() {
  if (!gutachten.value) return;

  addSchmauchspurenToGutachten(
    gutachten.value.id,
    createSchmauchspurenDialog.value.name,
    createSchmauchspurenDialog.value.schmauchspuren == 'true'
  );

  toast('Schmauchspurentest hinzugefügt', {
    description: 'Der Schmauchspurentest wurde erfolgreich hinzugefügt.',
  });
}

function handleRemoveSchmauchspuren(uuid: string) {
  if (!gutachten.value) return;

  removeSchmauchspurenFromGutachten(gutachten.value.id, uuid);

  toast('Schmauchspurentest entfernt', {
    description: 'Die Schmauchspurentest wurden erfolgreich entfernt.',
  });
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <div class="flex flex-col sm:gap-4 sm:py-4">
      <header
        class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
      >
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
        <Tabs default-value="Waffen" v-model="activeTab" @update:model-value="switchTab(activeTab)">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="Waffen"> Waffen </TabsTrigger>
              <TabsTrigger value="Schmauchspurentests"> Schmauchspurentests </TabsTrigger>
              <TabsTrigger value="Details"> Details </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2">
              <Dialog>
                <DialogTrigger as-child>
                  <Button size="sm" class="h-7 gap-1">
                    <PlusCircle class="h-3.5 w-3.5" />
                    <span class="sm:whitespace-nowrap"> Schmauchspurentest hinzufügen </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <CardHeader>
                    <CardTitle>Schmauchspurentest hinzufügen</CardTitle>
                    <CardDescription>
                      Füge dem Gutachten einen Schmauchspurentest hinzu.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="grid gap-4 py-4">
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right"> Name </Label>
                        <Input
                          id="name"
                          class="col-span-3"
                          type="text"
                          v-model="createSchmauchspurenDialog.name"
                        />
                      </div>
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="schmauchspuren" class="text-right"> Schmauchspuren </Label>
                        <Select
                          class="col-span-3"
                          v-model="createSchmauchspurenDialog.schmauchspuren"
                        >
                          <SelectTrigger class="col-span-3">
                            <SelectValue class="col-span-3" placeholder="Wähle aus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem :value="'true'"> Positiv </SelectItem>
                            <SelectItem :value="'false'"> Negativ </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <DialogFooter>
                    <DialogClose as-child>
                      <Button type="submit" @click="handleAddSchmauchspuren()"> Hinzufügen </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
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
                <TableRow
                  v-for="schmauchspurentest in gutachten?.schmauchspuren"
                  :key="schmauchspurentest.id"
                >
                  <TableCell class="font-medium"> {{ schmauchspurentest.name }} </TableCell>
                  <TableCell class="">
                    {{ schmauchspurentest.schmauchspuren ? 'Positiv' : 'Negativ' }}
                  </TableCell>
                  <TableCell class="[--table-padding:0] pl-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal class="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                        <DropdownMenuItem
                          @click="
                            () => {
                              $locally.copyClipboard(
                                'Schmauchspurentest - ' +
                                  schmauchspurentest.name +
                                  (gutachten?.akz == '' ? '' : ' - Az.: ' + gutachten?.akz) +
                                  ' - ' +
                                  (schmauchspurentest.schmauchspuren ? 'Positiv' : 'Negativ')
                              );
                            }
                          "
                          >Kopieren</DropdownMenuItem
                        >
                        <DropdownMenuItem @click="handleRemoveSchmauchspuren(schmauchspurentest.id)"
                          >Löschen</DropdownMenuItem
                        >
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
