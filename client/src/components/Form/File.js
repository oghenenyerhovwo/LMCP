import React from 'react'
import { FileSelector } from 'react-rainbow-components';
import { FaTimes } from "react-icons/fa"

import VideoPlayer from "../VideoPlayer"

import "./file.css"

const containerStyles = {
    maxWidth: 300,
};

// Our app
const FileComponent = props => {

  const { accept, icon, name, label, onChange, error, type, preview, clearPreview, loadingPercent, multiple } = props

  return (
    <div className="app_input spacing-md" style={containerStyles}>
        <label className="form__label spacing-sm">{label}</label>
        <div className="spacing-sm"></div>
        {
          !preview  ? (
            <> 
              <div className="file_largescreen">
                <FileSelector
                  className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                  style={containerStyles}
                  uploadIcon={icon}
                  placeholder="Drag & Drop or Click to Browse"
                  bottomHelpText={multiple ? "Can select multiple files" :  "Select only one file"}
                  variant="multiline"
                  onChange={onChange}
                  error={error}
                  accept={accept}
                  name={name}
                  multiple={multiple}
                /> 
              </div>
              <div className="file_smallscreen">
                <FileSelector
                  className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                  style={containerStyles}
                  placeholder="Drag & Drop or Click to Browse"
                  bottomHelpText={multiple ? "Can select multiple files" :  "Select only one file"}
                  uploadIcon={icon}
                  onChange={onChange}
                  error={error}
                  accept={accept}
                  name={name}
                  multiple={multiple}
                />
              </div>
            </>
          )
          :
          <> 
            {
              type === "image" && (
                <div className="preview_file">
                  <img src={preview} alt="preview" />
                  <div className="preview_icon flex flex__center">
                    <FaTimes onClick={clearPreview} />
                  </div>
                  <div className="preview_overlay"></div>
                </div>
              )
            } 
            {
              type === "video" && (
                <div className="preview_file">
                  <VideoPlayer url={preview} />
                  <div className="preview_icon flex flex__center">
                    <FaTimes onClick={clearPreview} />
                  </div>
                </div>
              )
            }

          </>
      }
      {
        loadingPercent > 0 &&
        <div className="file_loader spacing-md">
          <div style={{width: `${loadingPercent}%`}} className="file_loader_inner spacing-md"></div>
        </div>
      }
  </div>
  )
}

export default FileComponent