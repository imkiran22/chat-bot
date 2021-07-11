import React from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  text: string
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
  theme?: 'primary' | 'secondary' | 'tertiary' | 'default'
  id?: string
  className?: string
}

const randomId = Math.floor(Math.random() * 100).toString()

export const Button: React.FC<ButtonProps> = ({
  id = randomId,
  className = '',
  text,
  onClick,
  theme = 'default'
}) => {
  return (
    <button
      id={id}
      className={styles.button + ' ' + className + ' ' + styles[theme]}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
