import React, { FC, memo, useCallback } from "react";
import s from './StartWindow.module.scss'
import { useAppDispatch } from "@/app/hooks";
import { listActions } from "@/redux/list/listSlice";
import { batch } from "react-redux";
import { classNames } from "@/utils";
import { flowActions } from "@/redux/flow/slice/flowSlice";
import { uploadFile } from "@/redux/flow/services/uploadFile";

const StartWindow: FC = memo(() => {
    const dispatch = useAppDispatch()

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            dispatch(uploadFile(e.target.files))
        }
    }, [])

    const onStartNewProject = useCallback(() => {
        batch(() => {
            dispatch(flowActions.onInitState())
            dispatch(listActions.initPages())
        })
    }, [])

    return (
        <div className={s.window}>
            <div className={s.form}>
                <h1 className={s.title}>Начало работы</h1>
                <ul className={s.list}>
                    <li className={s.listItem}>
                        <label className={classNames(s.button, {}, [s.button_type_label])}>
                            <input onInput={handleFileChange} type="file" />
                            Загрузить с компьютера
                        </label>
                    </li>
                    <li className={s.listItem}>
                        <button onClick={onStartNewProject} className={s.button}>Создать новый</button>
                    </li>
                </ul>
            </div>
        </div>
    );
})
StartWindow.displayName = 'StartWindow'
export default StartWindow