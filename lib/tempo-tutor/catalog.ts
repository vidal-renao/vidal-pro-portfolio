export interface LessonSlot {
  id: string;
  teacherId: string;
  teacherName: string;
  instrument: "piano" | "voice" | "guitar";
  city: string;
  level: "beginner" | "intermediate" | "advanced";
  durationMinutes: number;
  priceChf: number;
  startsAt: string;
}

export const lessonSlots: LessonSlot[] = [
  {
    id: "89aca45f-9ac6-4d07-b86c-58ed77a1c111",
    teacherId: "bee82778-aa81-41b0-b9a8-d06ecf8bd101",
    teacherName: "Livia Meier",
    instrument: "piano",
    city: "Zurich",
    level: "beginner",
    durationMinutes: 60,
    priceChf: 72,
    startsAt: "2026-06-03T16:30:00+02:00",
  },
  {
    id: "96915663-dc31-47ed-96d5-a836d28c1222",
    teacherId: "48095191-ad82-45ed-a754-58ab5d881202",
    teacherName: "Jonas Keller",
    instrument: "guitar",
    city: "Basel",
    level: "intermediate",
    durationMinutes: 45,
    priceChf: 58,
    startsAt: "2026-06-04T18:00:00+02:00",
  },
  {
    id: "bd64bcb6-8bb4-4f45-9964-a079945f1333",
    teacherId: "ab56ee0b-069d-42b1-a0ce-ef929519d303",
    teacherName: "Sofia Rossi",
    instrument: "voice",
    city: "Lucerne",
    level: "advanced",
    durationMinutes: 60,
    priceChf: 84,
    startsAt: "2026-06-06T10:00:00+02:00",
  },
];

export function findLessonSlot(slotId: string): LessonSlot | undefined {
  return lessonSlots.find((slot) => slot.id === slotId);
}
