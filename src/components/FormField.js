import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import TextField from './TextField';

// Único punto donde un input de texto se conecta con React Hook Form
const FormField = forwardRef(function FormField({ control, name, label, ...inputProps }, ref) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
        <TextField
          ref={ref}
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          valido={isTouched && !error && String(value ?? '').trim().length > 0}
          {...inputProps}
        />
      )}
    />
  );
});

export default FormField;
