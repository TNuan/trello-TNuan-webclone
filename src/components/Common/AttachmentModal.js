import { React, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utillities/constants'
import { updateCard } from 'actions/ApiCall'
import FileViewer from 'react-file-viewer'
import './AttachmentModal.scss'

function AttachmentModal(props) {
  const { show, toggleShowAttachmentModal, card, onUpdateCardState } = props
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [selectedFile, setSelectedFile] = useState()

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
    setSelectedFile(file)
    setFileInputState(e.target.value)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault()
    if (!selectedFile) return
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => {
      uploadImage(selectedFile.name, reader.result)
    }
    reader.onerror = () => {
      console.log('Something went wrong!')
    }
    toggleShowAttachmentModal()
  }


  const uploadImage = async (filename, base64EncodedImage) => {
    try {
      const newCard = {
        ...card,
        fileAttachment:  {
          filename,
          base64EncodedImage
        }
      }
      updateCard(newCard._id, newCard).then(updatedCard => {
        onUpdateCardState(updatedCard)
      })
      setFileInputState('')
      setPreviewSource('')
    } catch (err) {
      console.log('Something went wrong!')
    }
  }


  return (
    <Modal
      show={show}
      onHide={() => toggleShowAttachmentModal()}
      backdrop="static"
      className="attachment-modal"
      style={{ left: '70%', width: '30%', height: '100%' }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">Attach file</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="import-file">
          <h6>Attach a file from your computer</h6>
          You can also drag and drop files to upload them.
          <Form.Control type="file" className='form-import-file' onChange={handleFileInputChange} value={fileInputState} />
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen"
              style={{ height: '300px' }}
            />
          )}
        </div>

        <div className="search-file">
          <h6>Search or paste a link</h6>
          <Form.Control type="text" placeholder="Text to display" />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => toggleShowAttachmentModal()}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => handleSubmitFile(e)}>
          Insert
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AttachmentModal
