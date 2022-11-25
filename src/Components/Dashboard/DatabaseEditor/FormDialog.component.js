import ResponsiveDialog from "../Shared/ResponsiveDialog.component";

const FormDialog = ({open, content, type, actionName, handleSubmit, handleClose}) => {
    return (
        <ResponsiveDialog
            open={open}
            title={type}
            content={content}
            color="success"
            actionName={actionName}
            action={handleSubmit}
            handleClose={handleClose}
        />
    );
}

export {
    FormDialog
};