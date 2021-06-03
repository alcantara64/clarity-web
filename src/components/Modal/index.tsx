
import  {Modal} from 'react-bootstrap';
import Button from '../Button'
function CustomModal(props:ModalProps) {
    const { headerText, bodyText, size, } = props
    return (
      <Modal
        {...props}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {headerText}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {bodyText}
        </Modal.Body>
        <Modal.Footer >
          <Button label="Close" onClick={props.onHide} />
          <Button label="Save changes" onClick={props.oK} />
        </Modal.Footer>
      </Modal>
    );
    }
  type ModalProps ={
      size: 'sm' | 'lg' | 'xl' | undefined,
      onHide:any,
      oK:any,
      headerText?:string,
      centered:true,
      bodyText:string

  }
  export default CustomModal;