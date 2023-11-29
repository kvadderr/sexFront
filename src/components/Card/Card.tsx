import { Tariff } from '../../@types/Tariff';
import s from './Card.module.scss'

type Props = {
  tariff: Tariff;
  onClick: () => void;
}

const Card = ({ tariff, onClick }: Props) => {
  return (
    <div className={s.containerCard} onClick={onClick}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        <h3>{tariff.status}</h3>
        <p>~ {tariff.KZT} KZT / {tariff.RUB} RUB</p>
      </div>
      <div className={s.tokenData}> 
        <p>{tariff.token} token</p>
      </div>
    </div>
  )
}

export default Card