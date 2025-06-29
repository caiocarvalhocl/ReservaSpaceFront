import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorType: string;
  hoverType?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
}

interface SelectOption {
  value: string;
  label: string;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  options: SelectOption[];
}
