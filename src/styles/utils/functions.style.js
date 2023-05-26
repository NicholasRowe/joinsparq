export function flow(scale = 1, direction = 'top') {
  return `
    > * + * {
      margin-${direction}: ${scale}rem;
    }
  `
}
