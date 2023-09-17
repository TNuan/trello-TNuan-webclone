import { React, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utillities/constants'
import FileViewer from 'react-file-viewer'
import './FilePreviewer.scss'

function FilePreviewer(props) {
  const { fileAttachment } = props
  const [show, setShow] = useState(false)

  return (
    <div>
      <Button onClick={() => setShow(true)}>
        {fileAttachment.name}
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        className="file-previewer"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5">Attach file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FileViewer fileType={fileAttachment.name.split('.').pop()} filePath={URL.createObjectURL(fileAttachment)} />
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default FilePreviewer
