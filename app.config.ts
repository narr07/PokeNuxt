export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'zinc',
    card: {
      base: 'hover:scale-[.98]  duration-150',
      background: 'bg-primary-50  dark:bg-gray-900',
      divide: 'divide-y divide-primary-100 dark:divide-gray-800',
      ring: 'ring-1 hover:ring-primary-300 ring-gray-200 dark:ring-primary-900',
      rounded: 'rounded-lg ',
      shadow: 'shadow hover:shadow-lg',
      body: {
        base: '',
        background: '',
        padding: 'px-2 py-2 sm:p-4',
      },
      header: {
        base: '',
        background: '',
        padding: 'px-2 py-2 sm:px-4',
      },
      footer: {
        base: '',
        background: '',
        padding: 'px-2 py-2 sm:px-4',
      },
    },

  },
})
