import './addQuestion.css';
//MaterialUI
import Button from '@material-ui/core/Button';

function ButtonAddQuestion(props:any) {
    return (
        <Button
            href={'/post/create'}
            variant="contained"
            color="primary"
        >
            Ask Question
        </Button>
    )

}

export default ButtonAddQuestion;
