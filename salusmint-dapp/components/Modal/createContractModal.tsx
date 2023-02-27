import { Modal } from '@nextui-org/react'
import React from 'react'

function CreateContractModal() {
  return (
    <Modal
      scroll
      width="600px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* <Modal.Header>
        <Text id="modal-title" size={18}>
          Modal with a lot of content
        </Text>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => setVisible(false)}>
          Close
        </Button>
        <Button auto onPress={() => setVisible(false)}>
          Agree
        </Button>
      </Modal.Footer> */}
    </Modal>
  )
}

export default CreateContractModal
