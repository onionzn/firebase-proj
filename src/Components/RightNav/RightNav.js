import '../../App.css';
import './RightNav.css';

import TodoList from '../TodoList/TodoList';

function RightNav() {

    return (
        <div id={'grid-item-right-nav'}>
            <h2>Tasks</h2>
            <TodoList />
        </div>
    );
}

export default RightNav;