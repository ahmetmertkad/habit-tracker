export const habitIcons = [
  '💧', '📚', '🧘', '🏃', '📵', '🥗',
  '💪', '🌅', '✍️', '🚶', '🧹', '🙏',
  '☕', '🎸', '💊', '🛏️', '🦷', '🌱',
]
// Ekranda Pazartesi'den başlıyoruz
// value: dayjs'teki gün numarası (0 = Pazar, 1 = Pazartesi ... 6 = Cumartesi)
export const weekDays = [
  { label: 'Pt', value: 1 },
  { label: 'Sa', value: 2 },
  { label: 'Ça', value: 3 },
  { label: 'Pe', value: 4 },
  { label: 'Cu', value: 5 },
  { label: 'Ct', value: 6 },
  { label: 'Pz', value: 0 },
]

export const formatDays = (days: number[]) => {
  if (days.length === 7) return 'Her gün'

  return weekDays
    .filter((day) => days.includes(day.value))
    .map((day) => day.label)
    .join(', ')
}