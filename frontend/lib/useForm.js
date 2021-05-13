import {useEffect, useState} from "react";

const useForm = (initial = {}) => {
    const [inputs, setInputs] = useState(initial)
    const initialValues = Object.values(initial).join('')

    useEffect(() => {
        setInputs(initial)
    }, [initialValues])

    const handleChange = e => {
        let {name, value, type} = e.target
        value = type === 'number' ? parseInt(value) : value
        if (type === 'file') [value] = e.target.files

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const resetForm = () => {
        setInputs(initial)
    }

    const clearForm = () => {
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key,value]) => [key, '']))
        setInputs(blankState)
    }

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    }
}

export default useForm