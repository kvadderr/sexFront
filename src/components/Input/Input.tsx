import s from './Input.module.scss'

type Props = {
  setId: (id: string) => void;
}
const Input = ({setId}: Props) => {
  return (
    <div className={s.userBox}>
      <input type="text" name="" onChange={(e) => setId(e.target.value)}/>
    </div>
  )
}

export default Input;