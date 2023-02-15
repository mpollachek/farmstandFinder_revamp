import { Button, Col, Modal, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useState } from "react";
import axios from "axios";

const DeleteComment = ({getMyComments, farmstandId, commentId, setRunGetMyComments}) => {

  const [modalOpen, setModalOpen] = useState(false);

  const deleteSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const deleteComment = await axios.delete(
        `http://localhost:8080/api/farms/${farmstandId}/comments/${commentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
    )
    setModalOpen(false)
    setRunGetMyComments(true)
    getMyComments()
    console.log("delete comment: ", deleteComment)
  } catch (error) {
      
      console.error(error);
    }
  }
  
  return(
    <Row>
      <div>
    <Button 
      onClick={() => setModalOpen(true)} 
      color="primary" 
      className="mt-2"
      block
      >
        Delete
    </Button>
            </div>
            <Modal isOpen={modalOpen} size='lg'>
        <ModalHeader toggle={() => setModalOpen(false)}>
        Are you sure you wish to delete?
        </ModalHeader>
        <ModalFooter>
          <Button onClick={deleteSubmit} color="primary">
            Delete
          </Button>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  )
}

export default DeleteComment;


