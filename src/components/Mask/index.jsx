import { cx } from '@linaria/core';
import { flexCenter, fixedFullScreen } from '@styles/utils.style';
import MaskStyle from './Mask.style';

function Mask({ show, handleClose, text }) {
	return (
		<MaskStyle
            show={show}
			className={cx(flexCenter, fixedFullScreen)}
			onClick={handleClose}
		>
			{text && <span className="b">{text}</span>}
		</MaskStyle>
	);
}

export default Mask;
