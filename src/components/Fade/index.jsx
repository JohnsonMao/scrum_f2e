import FadeStyle from './Fade.style';

function Fade({ children, ...transform }) {
	return <FadeStyle {...transform}>{children}</FadeStyle>;
}

export default Fade;
