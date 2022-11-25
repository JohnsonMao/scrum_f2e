import CheckBox from '../ChatBox';
import Role from '../Role';
import './index.scss';

function Chat() {
	return (
        <div className='chat'>
            <Role />
            <CheckBox />
        </div>
	);
}

export default Chat;
