'use client'

import { useEffect, useRef, useState } from 'react'

const isFormControl = (el: Element): el is HTMLInputElement | HTMLSelectElement =>
  el instanceof HTMLInputElement || el instanceof HTMLSelectElement

// Each step is a <fieldset>; all steps stay mounted (just hidden) so the final submit sees every field.
// The form uses noValidate because the browser would otherwise block submit on the hidden steps' empty
// required fields; each step is checked here instead, before moving on or sending.
export function useDoorSteps(stepCount: number) {
  const [step, setStep] = useState(0)
  const stepRefs = useRef<(HTMLFieldSetElement | null)[]>([])
  const hasMovedRef = useRef(false)

  useEffect(() => {
    if (!hasMovedRef.current) return
    stepRefs.current[step]?.querySelector<HTMLElement>('input:not([type=checkbox]), select')?.focus()
  }, [step])

  const isCurrentStepValid = (): boolean => {
    const controls = Array.from(stepRefs.current[step]?.elements ?? []).filter(isFormControl)
    return controls.every((control) => control.reportValidity())
  }

  const goNext = () => {
    if (!isCurrentStepValid()) return
    hasMovedRef.current = true
    setStep((current) => Math.min(current + 1, stepCount - 1))
  }

  const goBack = () => {
    hasMovedRef.current = true
    setStep((current) => Math.max(current - 1, 0))
  }

  const registerStep = (index: number) => (el: HTMLFieldSetElement | null) => {
    stepRefs.current[index] = el
  }

  return { step, isLastStep: step === stepCount - 1, isCurrentStepValid, goNext, goBack, registerStep }
}
