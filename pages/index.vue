<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8"
  >
    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto mb-12 text-center">
      <div
        class="inline-flex items-center justify-center p-2 px-4 mb-4 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full"
      >
        <span class="mr-2">🎓</span> Platform Pembelajaran Interaktif
      </div>
      <h1
        class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
      >
        Quiz Matkul
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto text-lg">
        Pilih mata kuliah favoritmu untuk mulai latihan atau ujian
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="max-w-7xl mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <MatkulCard
          v-for="matkul in daftarMatkul"
          :key="matkul.id"
          :matkul="matkul"
          @click="navigasiKeMatkul(matkul.id)"
        />
      </div>
    </div>

    <!-- Footer Decoration -->
    <div
      class="max-w-7xl mx-auto mt-16 pt-8 text-center border-t border-gray-200/50"
    >
      <p class="text-gray-400 text-sm">🌟 Selamat belajar! 🌟</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Matakuliah } from "~/types";

const daftarMatkul = ref<Matakuliah[]>([]);

onMounted(async () => {
  daftarMatkul.value = await $fetch("/data/matakuliah.json");
});

const router = useRouter();
const navigasiKeMatkul = (id: string) => router.push(`/quiz/${id}`);
</script>
