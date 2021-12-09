import './basicModal.css';

interface IModalProps {
    title: string,
    content: string,
    textCloseButton: string,
    textSubmitButton: string,
    onClose: any,
    onSubmit: any
}

function BasicModal(props: IModalProps) {
    return (
        <div className="BasicModal" >
            <div className="modal show" role="dialog">
                <div className="overlay"  onClick={() => props.onClose()}>
                    
                </div>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title}</h5>
                            <button onClick={() => props.onClose()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{props.content}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => {props.onSubmit()}}>
                                {props.textSubmitButton}
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"onClick={() => {props.onClose()}} >
                                {props.textCloseButton}
                            </button>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default BasicModal;
