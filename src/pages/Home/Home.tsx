import { advantagesItem } from '../../constants/advantagesItem';
import axios from 'axios';
import { Slider, Loading, Advantages, InputButton, GenerateButton } from '../../components';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';
import { selectFile, selectResult, selectLoading, setResult, selectBlured, setIsBlured, setSelectedFile, setIsLoading, selectCurrentUser, setToken, selectToken } from '../../store/slices/authSlice';
import s from './Home.module.scss'
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const dispatch = useAppDispatch();
  const selectedFile = useAppSelector(selectFile);
  const currentUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);
  const result = useAppSelector(selectResult);
  const isLoading = useAppSelector(selectLoading);
  const isBlur = useAppSelector(selectBlured);
  const navigate = useNavigate();

  const unBlur = () => {

    if (token < 6) {
      navigate('/price')
    } else {
      dispatch(setIsBlured(false));
      const url = 'https://sexgirl.kz/api/minus';
      const data = {
        userID: currentUser,
        token: 6
      }
      axios.post(url, data);
      dispatch(setToken(token - 6))
    }


  }

  const Image = () => {
    return (
      <img src={selectedFile || undefined} className={s.imageUnBlur} />
    )
  }

  const Result = () => {
    return (
      <div style={{ display: 'flex', flexDirection: "column", gap: 20 }}>
        <img src={"data:image/png;base64," + result || undefined} className={isBlur ? s.imageBlur : s.imageUnBlur} />
        {isBlur && <GenerateButton text='Открыть (6 токенов)' onClick={unBlur} />}
      </div>
    )
  }

  const generate = () => {
    dispatch(setIsLoading(true));
    dispatch(setSelectedFile(null));
    dispatch(setResult(null));
    dispatch(setIsBlured(true));
    const url = 'https://sexgirl.kz/api/generateImage';
    const data = {
      "mask": selectedFile
    };
    axios.post(url, data)
      .then(response => {
        dispatch(setIsLoading(false));
        const res = response.data;
        dispatch(setResult(res));
      })
      .catch(error => {
        setIsLoading(false);
        console.error('POST error:', error);
      });
  }

  const Render = () => {
    if (isLoading) return <Loading />
    if (selectedFile) return <Image />
    if (result) return <Result />
    return <Slider />
  }

  return (
    <div className={s.containerHome}>
      <div className={s.leftContainer}>
        <div>
          <h1>SexGirl</h1>
          <h2>Мечты порой сбываются</h2>
        </div>
        <div className={s.advantages}>
          {
            advantagesItem.map(item => (
              <Advantages icon={item.icon} text={item.name} key={item.id} />
            ))
          }
        </div>
        <div className={s.buttonContainer}>
          <InputButton />
          {selectedFile && <GenerateButton text='Generate' onClick={generate} />}
        </div>
      </div>
      <div className={s.rightContainer}>
        <Render />
      </div>
    </div>
  )
}

export default Home;