import { useEffect, useState } from 'react';

function useWindowClick(time) {
    const [isClick, setIsClick] = useState(false);
    
	useEffect(() => {
        const handleClick = () => {
            setIsClick(true);
        }
		let timer = null;

		window.addEventListener('click', handleClick);
		if (!timer && isClick) {
			timer = setTimeout(() => {
                setIsClick(false);
				timer = null;
			}, time);
		}
		return () => {
            window.removeEventListener('click', handleClick);
            timer && clearTimeout(timer);
        }
	}, [isClick, time]);

    return [isClick]
}

export default useWindowClick;
