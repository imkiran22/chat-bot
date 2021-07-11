import React from 'react'
import styles from './ConversationView.module.css'
import { Button } from '../../../shared/components/Button/Button'

const EMAIL_REGEX_BUSINESS_ONLY =
  /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/

const RatingComponent: React.FC<{ onClick: (ev: any) => void }> = ({
  onClick
}) => {
  const RATING = [1, 2, 3, 4, 5]
  return (
    <div className={styles.ratingComponent}>
      {RATING.map((rating) => (
        <Button
          theme={'primary'}
          className={styles.buttonRating}
          text={rating.toString()}
          onClick={() => onClick(rating)}
        />
      ))}
    </div>
  )
}

const List: React.FC<{ messages: any[] }> = ({ messages = [] }) => {
  return (
    <React.Fragment>
      {messages.map((c: Record<string, any>, index: number) => (
        <div key={index} className={styles.listItem}>
          {['email', 'plain'].includes(c.type) && (
            <React.Fragment>
              <label className={styles.labelListItem}>{c.label}</label>
              <input
                disabled={true}
                className={styles.input}
                value={c.text}
              ></input>
            </React.Fragment>
          )}
          {!['email', 'plain'].includes(c.type) && <h3>{c.label}</h3>}
        </div>
      ))}
    </React.Fragment>
  )
}

const Input: React.FC<{
  type: string
  keyProp: string
  text: string
  name: string
  onKeyDown: (ev: { [key: string]: any }) => void
}> = ({
  type = 'plain',
  keyProp = 'firstName',
  name = 'firstName',
  text = 'First Name',
  onKeyDown
}) => {
  const [state, setState] = React.useState('')
  const changeListener = (ev: any) => setState(ev.target.value)
  const [error, setError] = React.useState(false)
  const onHandleKeyDown = (ev: any) => {
    if (ev.key === 'Enter' && state.length) {
      if (type === 'email' && !EMAIL_REGEX_BUSINESS_ONLY.test(state)) {
        setError(true)
        return
      }
      onKeyDown({ type, key: keyProp, name, value: state, text })
      setState('')
    }
  }
  return (
    <input
      style={{ outline: error ? '1px solid red' : 'none' }}
      value={state}
      className={styles.input}
      key={keyProp}
      name={type}
      placeholder={text}
      onChange={changeListener}
      onKeyDown={onHandleKeyDown}
    ></input>
  )
}

export { Input, List, RatingComponent }
