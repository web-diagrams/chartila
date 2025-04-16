import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useEffect, useState } from 'react';

export const ChangeDocName = () => {
    const dispatch = useAppDispatch();
    const { docName } = useAppSelector(state => state.doc.currentState);
    const [docNameState, setDocNameState] = useState<string>(docName);
  
    const onChangeDocName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDocNameState(e.target.value);
    }
  
    const onBlurDocName = () => {
      dispatch(docActions.onChangeDocName(docNameState));
    };

    useEffect(() => {
        setDocNameState(docName);
      }, [docName]);

    return (
        <input
            placeholder='Имя документа'
            value={docNameState}
            onChange={onChangeDocName}
            onBlur={onBlurDocName}
      />
    )
}