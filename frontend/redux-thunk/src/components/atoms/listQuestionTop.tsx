import ButtonAddQuestion from "./addQuestion";

import './listQuestionTop.css';
import Container from '@material-ui/core/Container';

function ListQuestionTop (){
    return (
        <Container maxWidth="md" >
            <div className="ListTop_header">
                <h2 className="ListTop_header-title">Top Questions</h2>
                <ButtonAddQuestion />
            </div>
        </Container>
        
    )
};

export default ListQuestionTop;