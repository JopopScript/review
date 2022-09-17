export type NonUndefined<T, K extends keyof T> = T & {
  [P in keyof Pick<T, K>]-?: Pick<T, K>[P]
}