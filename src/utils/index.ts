const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'full',
  timeStyle: 'short',
});

export const formatCurrency = (value: number) => formatter.format(value)

export const dateFormat = (value: string) => {
  const date = new Date(value)
  return dateFormatter.format(date)
}