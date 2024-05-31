<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useStichwaffen } from '@/lib/hooks/Stichwaffen';
import { useDate } from '@/lib/hooks/Date';
import { toast } from 'vue-sonner';

const router = useRouter();
const { deleteStichwaffe, stichwaffen } = useStichwaffen();
const { getFormattedDate } = useDate();

const props = defineProps(['search']);

function handleDeleteStichwaffe(analyseId: string) {
  deleteStichwaffe(analyseId);

  toast('Analyse gelöscht', {
    description: 'Die Analyse wurde erfolgreich gelöscht.',
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
            <TableRow
              v-for="(analyse, analysenIndex) in stichwaffen.filter(
                (x) =>
                  x.akz.toLowerCase().includes(props.search.toLowerCase()) ||
                  x.gutachter.toLowerCase().includes(props.search.toLowerCase())
              )"
              :key="analyse.akz"
              :href="'/stichwaffen/' + analyse.id"
            >
              <TableCell> {{ analyse.akz }} </TableCell>
              <TableCell>
                {{ getFormattedDate(analyse.createdAt, 'DD.MM.YYYY hh:mm Uhr') }}
              </TableCell>
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
                    <DropdownMenuItem @click="router.push('/stichwaffen/' + analyse.id)">
                      Öffnen
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="analyse.copyToClipboard()"
                      >Analyse kopieren</DropdownMenuItem
                    >
                    <DropdownMenuItem @click="handleDeleteStichwaffe(analyse.id)"
                      >Löschen</DropdownMenuItem
                    >
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
