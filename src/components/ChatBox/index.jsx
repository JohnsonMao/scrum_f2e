import { ReactComponent as TriangleSvg } from '@images/triangle.svg';
import './index.scss';

function CheckBox() {
	const text =
		'_HEIGHTLIGHT_\\ 碰 /_HEIGHTLIGHT_ 我是短衝小精靈 ， 開發 A 組的 PO 。\n_HEIGHTLIGHT_PO 也就是產品負責人（Product Owner）_HEIGHTLIGHT_ ， 產品負責人會負責評估產品待辦清單的價值與重要性 ， 依序排列要執行的優先順序 ， 對齊產品目標 。 \n最後排出產品待辦清單（Product Backlog） 唷 ！';
	const textArray = text.split('_HEIGHTLIGHT_');

	return (
		<p className="chatBox po">
			<i className="chatBox__name">PO</i>
            <span className='chatBox__text'>
                {textArray.map((str, index) => (
                    str &&
                    <span key={index} className={index % 2 ? 'heightlight' : ''}>
                        {str}
                    </span>
                ))}
            </span>
			<TriangleSvg className="chatBox__next" width="32px" />
		</p>
	);
}

export default CheckBox;
