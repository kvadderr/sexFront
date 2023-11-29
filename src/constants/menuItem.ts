import { faDollar, faHouse} from '@fortawesome/free-solid-svg-icons'
import { Menu } from '../@types/Menu'

export const menuItem: Menu[] = [
  {
    id: 1,
    name: "Главная",
    icon: faHouse,
    key: '/'
  },
  {
    id: 4,
    name: "Цены",
    icon: faDollar,
    key: '/price'
  },

]