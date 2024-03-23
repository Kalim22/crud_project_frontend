import React from 'react'

interface Props {
  type: string,
  placeholder: string,
  value: number | string | undefined,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean,
  required?: boolean
}

const InputField = ({name, type, placeholder, value, onChange, disabled, required }: Props) => {
  return (
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className='input__field'
        disabled={disabled || false}
        required={required}
      />
  )
}

export default InputField
