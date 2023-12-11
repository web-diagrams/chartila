import React, { FC, memo, useCallback } from "react";
import s from './StartWindow.module.scss'
import { useAppDispatch } from "@/app/hooks";
import { listActions } from "@/redux/listSlice/listSlice";
import { batch } from "react-redux";
import { flowActions } from "@/redux/flowSlice/flowSlice";
import { dtoToFlow } from "@/redux/flowSlice/flowUtils";
import { classNames } from "@/utils";

const StartWindow: FC = memo(() => {
    const dispatch = useAppDispatch()

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            new Response(e.target.files[0])
                .json()
                .then((json) => {
                    batch(() => {
                        dispatch(listActions.updatePages(json.pages))
                        dispatch(flowActions.onStateUpdate(dtoToFlow(json.pages[0])))
                    })
                })
                .catch((e) => console.log(e))
        }
    }, [])

    const onStartNewProject = useCallback(() => {
        dispatch(flowActions.onStateUpdate({ nodes: [], edges: [] }))
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