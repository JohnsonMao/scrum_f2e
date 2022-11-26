import './index.scss';

function List({ children, className }) {
	const title = '產品代辦清單';
	const subtitle = 'Product Backlog';

	return (
		<div className={`list ${className}`}>
			<div className="list__title">
				<h2>{title}</h2>
				<span className="fz-s">{subtitle}</span>
			</div>
			<div className="list__body">{children}</div>
			<div className="list__bg1"></div>
			<div className="list__bg2"></div>
			<div className="list__bg3"></div>
			<div className="list__bg4"></div>
		</div>
	);
}

export default List;
