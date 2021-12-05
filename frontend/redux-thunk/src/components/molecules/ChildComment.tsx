import './ChildComment.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { State } from '../../reducers/index';

interface IChildComment {
    content: string,
    time: string,
    author: any
}

export default function ChildComment (props:IChildComment){

    const userInfo = useSelector((state:State) => state.user);
    return (
        <div className="ChildComment">
            <p>{props.content}</p> - <a href="">{props.author[1]} </a>
            {userInfo.id === props.author[0] ? (<> <a href=""> <EditIcon /> </a>  <a href=""> <DeleteIcon /> </a>  </>): ''}
            <p>{props.time}</p>
        </div>
    )
}