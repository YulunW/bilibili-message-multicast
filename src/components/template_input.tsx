import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { RenderStatus, useLiquid } from 'hooks/useLiquid';
import { ObjectInspector } from 'react-inspector';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import produce from 'immer';
import { DEFAULT_TEMPLATE, setTemplates } from 'state/templateSlice';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

export default function TemplateInput() {
  const dispatch = useAppDispatch();
  const templates = useAppSelector((state) => state.templates.templates);

  const [currentTemplate, setCurrentTemplate] = React.useState(
    Object.keys(templates)[0]
  );
  const [templateValue, setTemplateValue] = React.useState(
    templates[currentTemplate]
  );
  const [newTemplateName, setNewTemplateName] = React.useState('');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);

  const { status, result: preempResult } = useLiquid(templateValue, {
    test: { test2: 123 },
    test3: { test4: 123 },
  });

  let result = '';
  if (status === RenderStatus.RenderFailed) {
    if (preempResult === '') {
      result = '在试图使用模板时发生未知错误';
    } else {
      result = `在试图使用模板时发生以下错误：\n${preempResult}`;
    }
  } else {
    result = preempResult;
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setNewTemplateName('');
  };

  const changeTemplate = (value: string) => {
    // TODO: Add warning when template value is edited but not saved
    setCurrentTemplate(value);
    setTemplateValue(templates[value]);
  };

  const templateNameExist = () => {
    return newTemplateName in templates;
  };

  const saveTemplate = () => {
    const newTemplates = produce(templates, (draftState) => {
      draftState[currentTemplate] = templateValue;
    });
    dispatch(setTemplates(newTemplates));
  };

  const createNewTemplate = () => {
    if (newTemplateName in templates) return;
    const newTemplates = produce(templates, (draftState) => {
      draftState[newTemplateName] = '';
    });
    dispatch(setTemplates(newTemplates));
    changeTemplate(newTemplateName);
  };

  const deleteTemplate = () => {
    const newTemplates = produce(templates, (draftState) => {
      delete draftState[currentTemplate];
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
    <Box sx={{ p: 2 }}>
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`确定删除 ${currentTemplate} 吗？`}</DialogTitle>
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
      <Dialog
        open={openCreateModal}
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
      <Grid container spacing={2} sx={{ pb: 2 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Select
            sx={{
              width: '100%',
              mr: 1,
              maxWidth: '200px',
              flexGrow: 10,
            }}
            variant="standard"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentTemplate}
            label="模板"
            onChange={(event) => changeTemplate(event.target.value)}
          >
            {Object.keys(templates).map((templateName) => (
              <MenuItem key={templateName} value={templateName}>
                {templateName}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            color="error"
            sx={{ mr: 1 }}
            onClick={() => setOpenDeleteModal(true)}
          >
            删除
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 1 }}
            onClick={() => setOpenCreateModal(true)}
          >
            新建
          </Button>
          <Button variant="outlined" color="primary" onClick={saveTemplate}>
            保存
          </Button>
        </Grid>
        <Grid
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
          item
          xs={6}
          md={2}
        >
          <Typography>预览对象</Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Select
            sx={{ width: '100%', maxWidth: '200px' }}
            variant="standard"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={20}
            label="模板"
            onChange={() => {}}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ pb: 1 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="模板"
            multiline
            rows={18}
            value={templateValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTemplateValue(event.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            multiline
            label="文本预览"
            rows={18}
            value={status === RenderStatus.Rendering ? '正在计算……' : result}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box>
        <Tabs value={0} aria-label="basic tabs example">
          <Tab label="参数预览" />
          <Tab label="帮助" />
        </Tabs>
        <TabPanel value={0} index={0}>
          <ObjectInspector name="参数列表" expandLevel={1} data={templates} />
        </TabPanel>
      </Box>
    </Box>
  );
}
