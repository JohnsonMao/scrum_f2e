import { ListStyle, ListHeaderStyle, ListBodyStyle } from './List.style';

function List({ children, type, className, title, subtitle }) {
	return (
		<ListStyle type={type || 'primary'} className={className}>
			<ListHeaderStyle>
				<h2>{title}</h2>
				<div className="fz-s">{subtitle}</div>
			</ListHeaderStyle>
			<ListBodyStyle>{children}</ListBodyStyle>
		</ListStyle>
	);
}

export default List;
