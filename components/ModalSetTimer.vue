<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-6 shadow-xl w-80">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">
        ⏱ Set Durasi Ujian
      </h2>
      <input
        v-model.number="menit"
        type="number"
        min="1"
        max="180"
        class="w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-xl font-bold mb-1 focus:outline-none focus:border-blue-400"
      />
      <p class="text-sm text-gray-400 text-center mb-5">menit</p>
      <div class="flex gap-3">
        <button
          @click="$emit('batal')"
          class="flex-1 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          @click="$emit('konfirmasi', menit)"
          class="flex-1 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Mulai
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const menit = ref(30);
defineEmits(["konfirmasi", "batal"]);
</script>
