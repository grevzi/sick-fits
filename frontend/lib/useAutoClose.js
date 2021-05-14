import {useCallback, useEffect} from "react";

const useAutoClose = ({setIsOpen, menu}) => {
    console.log(menu);
    const handleClosure = useCallback(
        event => !menu.current.contains(event.target) && setIsOpen(false),
        [setIsOpen, menu]
    )

    useEffect(() => {
        window.addEventListener('click', handleClosure)
        window.addEventListener('focusin', handleClosure)

        return () => {
            window.removeEventListener('click', handleClosure)
            window.removeEventListener('focusin', handleClosure)
        }
    }, [handleClosure, menu])
}

export default useAutoClose