import React, { FC, memo } from "react";
import s from './StartWindow.module.scss'
import { useAppDispatch } from "@/app/hooks";
import { listActions } from "@/redux/listSlice/listSlice";
import { batch } from "react-redux";
import { flowActions } from "@/redux/flowSlice/flowSlice";
import { dtoToFlow } from "@/redux/flowSlice/flowUtils";

const StartWindow: FC = memo(() => {
    const dispatch = useAppDispatch()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }

    return (
        <div className={s.window}>
            <div className={s.form}>
                <h1 className={s.title}>Выберите способ работы</h1>
                <div className={s.inputContanier}>
                    <p className={s.text}>Локально</p>
                    <input type="file" onInput={handleFileChange} />
                </div>
                <div className={s.inputContanier}>
                    <p className={s.text}>Сервер</p>
                    <button>Тупо кликай</button>
                </div>
            </div>
        </div>
    );
})
StartWindow.displayName = 'StartWindow'
export default StartWindow