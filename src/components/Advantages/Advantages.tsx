import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Advantages.module.scss';

type Props = {
  icon: any;
  text: string;
}
const Advantages = ({ icon, text }: Props) => {
  return (
    <div className={s.containerAdvantages}>
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  )
}

export default Advantages