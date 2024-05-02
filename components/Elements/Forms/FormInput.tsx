"use client";
import { number } from 'prop-types';
import { useFormContext } from 'react-hook-form';

type Option = {
    value: string;
    label: string;
};
type FormInputProps = {
    label?: string
    type: string
    name: string
    required?: boolean
    value: string | undefined
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    options?: Option[] // Array of options for select type
    disabled?: boolean;
}

export default function FormInput({ label, type, name, required, value, placeholder, onChange, options, disabled }: FormInputProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex flex-col space-y-3'>
                <label htmlFor={label}>{label}</label>
                {type === "select" ? (
                    <select placeholder={placeholder} value={value}  {...register(name)} onChange={onChange} className='bg-transparent border-[#FB4552] border-[1px] h-12 rounded-lg px-4 text-white'>
                        <option  value="" disabled >{placeholder}</option>
                        {options && options.map((option, index) => (
                            <option key={index} value={option.value} className='bg-gray-700'>{option.label}</option>
                        ))}
                    </select>
                ) : (
                    <input placeholder={placeholder} value={value} type={type} {...register(name)} required={required} onChange={onChange} disabled={disabled} className='bg-transparent border-[#FB4552] border-[1px] h-12 rounded-lg px-4' />
                )}
                
            </div>
            {errors[name] && (
                <span className='text-red-500 text-xs pt-1 block'>
                {errors[name]?.message as string}
                </span>
            )}
        </div>
    )
}
