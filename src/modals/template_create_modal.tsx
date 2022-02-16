import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { produce } from 'immer';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { setTemplates } from 'state/templateSlice';

interface TemplateCreateModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changeTemplate: (templateName: string) => void;
}

export default function TemplateCreateModal(props: TemplateCreateModalProps) {
  const dispatch = useAppDispatch();
  const templates = useAppSelector((state) => state.templates.templates);

  const [newTemplateName, setNewTemplateName] = React.useState('');

  const { isOpen, setOpen, changeTemplate } = props;

  const handleCloseCreateModal = () => {
    setOpen(false);
    setNewTemplateName('');
  };

  const createNewTemplate = () => {
    if (newTemplateName in templates) return;
    const newTemplates = produce(templates, (draftState) => {
      draftState[newTemplateName] = '';
    });
    dispatch(setTemplates(newTemplates));
    changeTemplate(newTemplateName);
  };

  const templateNameExist = () => {
    return newTemplateName in templates;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseCreateModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">创建模板</DialogTitle>
      <DialogContent>
        <DialogContentText>
          请输入模板名。模板名不能与已有模板相同。
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          error={templateNameExist()}
          helperText={templateNameExist() ? '已存在该模板' : ''}
          value={newTemplateName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNewTemplateName(event.target.value);
          }}
          id="name"
          label="模板名"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseCreateModal}>
          取消
        </Button>
        <Button
          variant="outlined"
          disabled={templateNameExist()}
          onClick={() => {
            createNewTemplate();
            handleCloseCreateModal();
          }}
          autoFocus
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
