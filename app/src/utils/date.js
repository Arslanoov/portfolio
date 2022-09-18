export const formatHours = (hours) => `${hours < 10 ? '0' + hours : hours}`
export const formatMinutes = (minutes) =>
  `${minutes < 10 ? '0' + minutes : minutes}`
