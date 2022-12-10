import { cx } from '@linaria/core';
import { flexCenter, fixedFullScreen } from '@styles/utils.style';
import MaskStyle from './Mask.style';

function Mask({ show, onClick, text }) {
	return (
		<MaskStyle
            show={show}
			className={cx(flexCenter, fixedFullScreen)}
			onClick={onClick}
		>
			{text && <span>{text}</span>}
		</MaskStyle>
	);
}

export default Mask;
