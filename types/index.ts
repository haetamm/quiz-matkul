export interface Soal {
  id: number;
  soal: string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  jawaban: "a" | "b" | "c" | "d" | "e";
}

export interface Matakuliah {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  file: string;
}

export type ModeQuiz = "latihan" | "ujian";

export interface JawabanUser {
  [soalId: number]: "a" | "b" | "c" | "d" | "e" | null;
}

export interface HasilQuiz {
  total: number;
  benar: number;
  salah: number;
  belumDijawab: number;
  nilaiPersen: number;
  detailJawaban: {
    soal: Soal;
    jawabanUser: string | null;
    benar: boolean;
  }[];
}
