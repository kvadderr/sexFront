import { menuItem } from '../../constants/menuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import s from './BotomMenu.module.scss'

type MenuItemProps = {
  id: number;
  title: string;
  link: string;
  icon: any;
  isActive: boolean;
  clickItem: (id: number) => void;
}
const MenuItem = (props: MenuItemProps) => {

  const navigate = useNavigate();

  const clickItem = (id: number, key: string) => {
    props.clickItem(id);
    navigate(key);
  }

  return (
    <div className={s.menuItemContainer} data-active={props.isActive ? props.isActive : null} onClick={() => clickItem(props.id, props.link)}>
      <FontAwesomeIcon icon={props.icon} className={props.isActive ? s.activeIcon : ''} />
      <p className={s.activeMenuItemText}>{props.title}</p>
    </div>
  )
}

type MenuProps = {
  active: number;
  setActive: (id: number) => void;
}

const BottomMenu = ({ active, setActive }: MenuProps) => {

  const clickItem = (id: number) => {
    setActive(id);
    
  }

  return (
    <div className={s.containerMenu}>
      {
        menuItem.map(item => (
          <MenuItem clickItem={clickItem} link={item.key} icon={item.icon} title={item.name} key={item.id} id={item.id} isActive={active === item.id} />
        ))
      }
    </div>
  )
}

export default BottomMenu;