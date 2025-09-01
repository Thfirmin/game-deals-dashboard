import { clsx, type ClassValue } from "clsx"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type UseStateReturn<TypeT> = {
  get: () => TypeT
  set: (value: TypeT | ((prevState: TypeT) => TypeT)) => void
}

export function UseState<TypeT>(initialState: TypeT | (() => TypeT)) {
  const [state, setState] = useState(initialState)

  return {
    get() {
      return state
    },
    set(value: TypeT | ((prevState: TypeT) => TypeT)) {
      setState(value)
    }
  }
}

type Currency = 'USD' | 'BRL' | 'EUR'

export function formatMoney(value: string | number, currency: Currency = 'USD') {
  const currencyTable = {
    USD: 'en-US',
    BRL: 'pt-BR',
    EUR: 'de-DE',
  }
  if (!value) {
    return Intl.NumberFormat('en-US', { style: 'currency', currency }).format(0)
  }
  if (typeof value === 'number') {
    value = value.toString()
  }
  return Intl.NumberFormat(currencyTable[currency], { style: 'currency', currency }).format(parseFloat(value))
}