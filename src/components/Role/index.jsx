import rolePoPng from '@images/role_po.png';
import './index.scss';

function Role() {
	return (
		<div className="role">
			<div className="role__frame">
				<img src={rolePoPng} alt="PO" />
			</div>
		</div>
	);
}

export default Role;
