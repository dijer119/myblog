import React from 'react'
import EditorTemplate from '../components/editor/EditorTemplate/EditorTemplate'
import EditorHeaderContainer from '../containers/editor/EditorHeaderContainer'
import EditorPaneContainer from '../containers/editor/EditorPaneContainer'
import PreviewPaneContainer from '../containers/editor/PreviewPaneContainer'

const EditorPage = () => (
  <EditorTemplate
      header={<EditorHeaderContainer />}
      editor={<EditorPaneContainer/>}
      preview={<PreviewPaneContainer/>}
  />
)

export default EditorPage