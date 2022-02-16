import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { produce } from 'immer';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { DEFAULT_TEMPLATE, setTemplates } from 'state/templateSlice';

interface TemplateDeleteModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  templateToDelete: string;
  changeTemplate: (templateName: string) => void;
}

export default function TemplateDeleteModal(props: TemplateDeleteModalProps) {
  const dispatch = useAppDispatch();
  const templates = useAppSelector((state) => state.templates.templates);

  const { isOpen, setOpen, templateToDelete, changeTemplate } = props;

  const handleCloseDeleteModal = () => {
    setOpen(false);
  };

  const deleteTemplate = () => {
    const newTemplates = produce(templates, (draftState) => {
      delete draftState[templateToDelete];
    });
    dispatch(setTemplates(newTemplates));
    if (Object.keys(newTemplates).length === 0) {
      dispatch(setTemplates(DEFAULT_TEMPLATE));
      changeTemplate(Object.keys(DEFAULT_TEMPLATE)[0]);
    } else {
      changeTemplate(Object.keys(newTemplates)[0]);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDeleteModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`确定删除 ${templateToDelete} 吗？`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          模板删除后将无法恢复
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseDeleteModal}>
          取消
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            deleteTemplate();
            handleCloseDeleteModal();
          }}
          autoFocus
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
