import { useState } from 'react';

import { Card, Input, GenerateButton, Loading } from '../../components';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';
import s from './Price.module.scss'
import { tariff } from '../../constants/tariff';
import { selectToken, selectCurrentUser, setToken, setCurrentUser } from '../../store/slices/authSlice';
import axios from 'axios';
import { Tariff } from '../../@types/Tariff';

const Price = () => {

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const [id, setID] = useState('');
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const onClick = () => {
    const url = 'https://sexgirl.kz/api/me/' + id;
    currentUser && axios.get(url)
      .then(response => {
        dispatch(setToken(response?.data.token));
        dispatch(setCurrentUser(response?.data.id));
      })
      .catch(error => {
        console.error('POST error:', error);
      });
  }

  const payment = (tariff: Tariff) => {
    setIsLoading(true);
    const url = 'https://sexgirl.kz/api/payment/';
    const data = {
      amount: tariff.RUB,
      userID: currentUser,
      token: tariff.token
    }
    axios.post(url, data)
      .then(response => {
        setIsLoading(false);
        window.open(response?.data, '_blank');
      })
      .catch(error => {
        setIsLoading(false);
        console.error('POST error:', error);
      });
  }

  const ProfileData = () => {
    return (
      <>
        <div className={s.smallContainer}>
          <h2>Ваш UUID</h2>
          <p className={s.token}>{currentUser}</p>
          <p className={s.description}>Пожалуйста, сохраните ваш UUID, он является вашим приватным личным ключом</p>
        </div>
        <div className={s.smallContainer}>
          <h2>Количество токенов</h2>
          <p>{token}</p>
        </div>
      </>
    )
  }

  return (
    <div className={s.containerPrice}>
      <div className={s.leftContainer}>
        <div className={s.smallContainer}>
          <h2>Сменить профиль</h2>
          <Input setId={setID} />
          <GenerateButton text='Login' onClick={onClick} />
        </div>
        {<ProfileData />}
      </div>
      <div className={s.rightContainer}>
        <h2>Пополнить токены</h2>
        {isLoading ? <Loading /> :

          <>
            {tariff.map(tariff => (
              <Card tariff={tariff} key={tariff.id} onClick={() => payment(tariff)} />
            ))}
            <p className={s.smalltext}>Зачисление средств произойдет в течении 10-15 минут</p>
          </>

        }
      </div>
    </div>
  )
}

export default Price;