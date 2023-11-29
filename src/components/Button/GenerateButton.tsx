import s from './Button.module.scss'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    onClick: () => void;
    text: string;
}

const GenerateButton = ({ onClick, text }: Props) => {

    return (
        <button className={s.greencontainer} onClick={onClick}>
            <FontAwesomeIcon icon={faPlay} />
            <p>{text}</p>
        </button>
    )
}

export default GenerateButton