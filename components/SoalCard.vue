<template>
  <div class="bg-white rounded-2xl shadow-sm p-6">
    <p class="text-sm text-gray-400 mb-2">Soal {{ soal.id }}</p>
    <p class="text-gray-800 font-medium text-lg mb-6">{{ soal.soal }}</p>

    <div class="flex flex-col gap-3">
      <button
        v-for="opsi in opsiList"
        :key="opsi.key"
        @click="$emit('pilihJawaban', opsi.key)"
        :class="[
          'flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all',
          getKelas(opsi.key),
        ]"
      >
        <span class="font-bold uppercase text-sm w-5">{{ opsi.key }}.</span>
        <span>{{ opsi.teks }}</span>
      </button>
    </div>

    <!-- Tombol Periksa (mode latihan saja) -->
    <button
      v-if="mode === 'latihan' && jawabanUser && !sudahDiperiksa"
      @click="$emit('periksa')"
      class="mt-6 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl"
    >
      🔍 Periksa Jawaban
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Soal, ModeQuiz } from "~/types";

const props = defineProps<{
  soal: Soal;
  jawabanUser: string | null | undefined;
  sudahDiperiksa: boolean | undefined;
  mode: ModeQuiz;
}>();
defineEmits(["pilihJawaban", "periksa"]);

const opsiList = computed(() =>
  ["a", "b", "c", "d", "e"].map((k) => ({
    key: k as "a" | "b" | "c" | "d" | "e",
    teks: props.soal[k as keyof Soal] as string,
  })),
);

const getKelas = (opsi: string) => {
  if (!props.sudahDiperiksa) {
    return props.jawabanUser === opsi
      ? "border-blue-500 bg-blue-50 text-blue-700"
      : "border-gray-200 hover:border-blue-300";
  }
  if (opsi === props.soal.jawaban)
    return "border-green-500 bg-green-50 text-green-700";
  if (opsi === props.jawabanUser)
    return "border-red-400 bg-red-50 text-red-600";
  return "border-gray-200 text-gray-400";
};
</script>
