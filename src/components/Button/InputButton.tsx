import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '../../store/storeHooks'
import { setSelectedFile } from '../../store/slices/authSlice'
import s from './Button.module.scss'

const InputButton = () => {

  const dispatch = useAppDispatch();

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
              dispatch(setSelectedFile(reader.result));
            };
            reader.readAsDataURL(selectedFile);
          }
    };

    return (
        <label className={s.fileInputLabel}>
            <input
                type="file"
                accept="image/*"
                className={s.fileInput}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <div className={s.containerInput}>
                <FontAwesomeIcon icon={faUpload} />
                <p>Upload</p>
            </div>
        </label>
    )
}

export default InputButton