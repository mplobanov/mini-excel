import styles from './UploadPage.module.css';
import React, {useCallback, useRef, useState} from "react";
import {DefaultService} from "../../services/openapi";
import {useNavigate} from "react-router-dom";
import ReactLoading from 'react-loading';

export const UploadPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string | null>(null);
    const navigate = useNavigate();


    const onClick = useCallback(() => {
        const event = new MouseEvent('click');
        ref.current?.dispatchEvent(event);
    }, []);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = Array.from(e.target.files ?? []).at(0)

        if (file) {
            setName(file.name);
            console.log('hi');
            DefaultService.createUploadFileUploadPost({file}).then((res) => {
                navigate(`/${res.file_id}`);
            })
        }

    }

    return <div className={styles.container}>
        <div className={styles.block}>
            <div className={styles.header}>
                Загрузить таблицу
            </div>
            <div className={styles.upload}>

                <div role={'button'} className={styles.button} onClick={onClick}>{name ? <span className={styles.fileName}>{name} <ReactLoading type={"spin"} height={"20px"} width={"20px"} /></span> : 'Загрузить'}</div>
                <div className={styles.description}>Загрузите файл в формате .xlsx</div>
                <input type={'file'} ref={ref} hidden={true} onChange={onChange} accept={'.xlsx'}/>
            </div>
        </div>
    </div>;
}