<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
      <div class="text-6xl mb-4">{{ emoji }}</div>
      <h1 class="text-3xl font-bold text-gray-800 mb-1">
        {{ hasil?.nilaiPersen }}%
      </h1>
      <p class="text-gray-500 mb-6">{{ namaMatkul }}</p>
      <div class="grid grid-cols-3 gap-4 mb-8 text-sm">
        <div class="bg-green-50 rounded-xl p-3">
          <p class="font-bold text-green-600 text-xl">{{ hasil?.benar }}</p>
          <p class="text-gray-500">Benar</p>
        </div>
        <div class="bg-red-50 rounded-xl p-3">
          <p class="font-bold text-red-500 text-xl">{{ hasil?.salah }}</p>
          <p class="text-gray-500">Salah</p>
        </div>
        <div class="bg-gray-100 rounded-xl p-3">
          <p class="font-bold text-gray-600 text-xl">
            {{ hasil?.belumDijawab }}
          </p>
          <p class="text-gray-500">Kosong</p>
        </div>
      </div>
      <button
        @click="router.push('/')"
        class="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Kembali ke Beranda
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HasilQuiz, Matakuliah } from "~/types";

const route = useRoute();
const router = useRouter();

const hasil = ref<HasilQuiz | null>(null);
const namaMatkul = ref("");

onMounted(async () => {
  const raw = sessionStorage.getItem("hasilQuiz");
  if (!raw) return router.push("/");
  hasil.value = JSON.parse(raw);

  const daftar: Matakuliah[] = await $fetch("/data/matakuliah.json");
  namaMatkul.value = daftar.find((m) => m.id === route.params.id)?.nama ?? "";
});

const emoji = computed(() => {
  const n = hasil.value?.nilaiPersen ?? 0;
  if (n >= 80) return "🎉";
  if (n >= 60) return "😊";
  if (n >= 40) return "😐";
  return "😔";
});
</script>
