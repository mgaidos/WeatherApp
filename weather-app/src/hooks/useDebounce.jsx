import { useState, useEffect } from 'react'

const useDebounce = (value, delay = 500) => {

    const [debouncedValue, setDebouncedValue] = useState(null)

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }

    }, [value, delay])

    return debouncedValue
}

export default useDebounce