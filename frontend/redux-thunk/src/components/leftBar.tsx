import './leftBar.css';

function LeftBar() {
    return (
        <div className="side_bar">
            <ul>
                <li className="li-home active" onClick={()=>window.location.pathname = "/"}>
                    <p>Home</p>
                </li>
                <li>
                    <p>Public</p>
                    <ul>
                        <li className="li-public">
                            <a href="">
                                Question
                            </a>
                        </li>
                        <li className="li-public">
                            <a href="">
                                Tags
                            </a>
                        </li>
                        <li  className="li-public">
                            <a href="">
                                Users
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default LeftBar;
