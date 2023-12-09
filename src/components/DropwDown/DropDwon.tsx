import React, { FC, useState } from 'react';
import { BsCaretDownFill, BsCaretRightFill } from 'react-icons/bs';
import styles from './DropDown.module.scss'
import { classNames } from '@/utils';

export enum DropDownType {
    DEFAULT = 'default',
    TABLESECTION = 'tableSection'
}

export interface DropDownProps {
    type?: DropDownType
    isOpenWindow?: boolean;
    title?: string;
    buttons?: React.ReactNode;
    className?: string;
    children: React.ReactNode
}

const DropDown: FC<DropDownProps> = ({
    type = DropDownType.DEFAULT,
    isOpenWindow = false,
    title,
    buttons,
    className,
    children
}) => {
    const [isOpen, setIsOpen] = useState(isOpenWindow)

    return (
        <div className={classNames(
            styles.container,
            { [styles.containerTableSection]: type === DropDownType.TABLESECTION },
            [className])}
        >
            <div
                onClick={() => setIsOpen(prev => !prev)}
                className={classNames(styles.titleWithButtons)}
            >
                <div className={classNames(styles.titleContainer, {
                    [styles.titleTableSection]: type === DropDownType.TABLESECTION
                })}>
                    {/* DropDown button */}
                    <div>
                        {isOpen ? <BsCaretDownFill /> : <BsCaretRightFill />}
                    </div>
                    {/* Заголовок */}
                    {title &&
                        <p className={styles.title}>{title}</p>
                    }
                </div>
                {/* Дополнительные кнопки */}
                {buttons && buttons}
            </div>
            {isOpen && children}
        </div>
    )
}

DropDown.displayName = 'DropDown'

export { DropDown };
