import React, { useState } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import './AddCoverModal.scss'
import { updateCard } from 'actions/ApiCall'

function AddCoverModal(props) {
  const { show, toggleShowAddCoverModal, card, onUpdateCardState } = props
  const [selectedCover, setSelectedCover] = useState('') // Lưu trữ ảnh được chọn
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (src) => {
    setSelectedCover(src)
    setSelectedImage(src)
  }

  const handleSaveChanges = () => {
    try {
      const newCard = {
        ...card,
        cover: selectedCover
      }
      updateCard(newCard._id, newCard).then(updatedCard => {
        onUpdateCardState(updatedCard)
      })
      setSelectedCover('')
      setSelectedImage(null)
    } catch (err) {
      console.log('Something went wrong!')
    }
    toggleShowAddCoverModal()
  }

  const images = [
    'https://renniegabriel.com/wp-content/uploads/2020/04/full-background.jpeg',
    'https://i.pinimg.com/originals/6c/7e/48/6c7e48336264661ca1ac3d259f92d74b.jpg',
    'https://th.bing.com/th/id/R.70a52b9279a9a932c8637255c4e4e1da?rik=fpwLm%2f2Q3GBoEA&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/R.892bb645c09c766efcc5bc4d0c93094a?rik=slmcvUaa5yToAw&riu=http%3a%2f%2fwww.wallpapers13.com%2fwp-content%2fuploads%2f2015%2f12%2fNature-Lake-Bled.-Desktop-background-image.jpg&ehk=c2raFC95S12P3OL0%2fwdM60ro3oUxsSEajkuGEN%2fsjbo%3d&risl=1&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/R.19b9cf0fb7dfd87fac5383e655870642?rik=ZdBPt%2bXvDaQF3g&pid=ImgRaw&r=0',
    'https://pericror.com/wp-content/uploads/2020/04/ISS-cupola.jpg'
  ]

  return (
    <Modal
      show={show}
      onHide={() => toggleShowAddCoverModal()}
      backdrop="static"
      className="datetimepicker-modal"
      style={{ left: '70%', width: '30%', height: '100%' }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">Choose a Cover Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {images.map((imageSrc, index) => (
            <Col key={index} xs={4} onClick={() => handleImageClick(imageSrc)}
              className= {selectedImage === imageSrc ? 'selected-image' : ''}
            >
              <img
                src={imageSrc}
                alt={`Image ${index + 1}`}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </Col>
          ))}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => toggleShowAddCoverModal()}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddCoverModal
