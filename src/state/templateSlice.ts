import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { persistKey, TEMPLATES_PERSIST_KEY } from 'helpers/permanentStorage';

type TemplateName = string;
type TemplateContent = string;

export interface TemplateState {
  templates: Record<TemplateName, TemplateContent>;
}

export const DEFAULT_TEMPLATE = Object.freeze({
  默认模板: '',
});

const initialState: TemplateState = {
  templates: DEFAULT_TEMPLATE,
};

export const templateSlice = createSlice({
  name: 'userInfo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTemplates: (
      state,
      action: PayloadAction<Record<TemplateName, TemplateContent>>
    ) => {
      state.templates = action.payload;
      persistKey(TEMPLATES_PERSIST_KEY, action.payload);
    },
  },
});

export const { setTemplates } = templateSlice.actions;

export default templateSlice.reducer;
