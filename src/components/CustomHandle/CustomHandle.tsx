import { FC, memo } from "react"
import { Handle, HandleProps, Position } from "reactflow"
import styles from './CustomeHandle.module.scss'
import { classNames } from "@/utils"

interface CustomHandleProps extends HandleProps {
    isVisible: boolean
}

export const CustomHandle: FC<CustomHandleProps> = memo(({ isVisible, ...props }) => {
    return (
        <Handle className={classNames('', { [styles.unVisible]: !isVisible })} {...props} />
    )
})