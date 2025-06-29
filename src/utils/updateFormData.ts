interface UpdateFormDataProps<T> {
  key: keyof T;
  value: T[keyof T];
  setState: React.Dispatch<React.SetStateAction<T>>;
}

export function updateFormData<T>({ key, value, setState }: UpdateFormDataProps<T>) {
  setState(prevState => ({
    ...prevState,
    [key]: value,
  }));
}
