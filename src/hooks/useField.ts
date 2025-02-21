import { useState } from 'react';

export default function useField<T>(initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value as T);
    }

    return { value, setValue, onChange };
}