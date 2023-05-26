import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { InputMain, InputLabel, InputField } from './index.style'
import { TextBodySmall } from '@styles/vars/textStyles.style'

const Input = ({ valueRef, label, type, required }) => {
  const [value, setValue] = useState('')

  const inputRef = useRef()

  const updateValue = () => {
    if (valueRef) valueRef.current = inputRef.current.value
    setValue(inputRef.current.value)
  }

  return (
    <InputMain>
      <InputField
        type={type}
        required={required}
        ref={inputRef}
        onKeyUp={updateValue}
      />
      <InputLabel show={value.length === 0}>
        <TextBodySmall>{label}</TextBodySmall>
      </InputLabel>
    </InputMain>
  )
}

Input.defaultProps = {
  required: false,
}

Input.propTypes = {
  valueRef: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
}

export default Input
