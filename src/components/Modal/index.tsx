
import  {Modal} from 'react-bootstrap';
import Button from '../Button'
import './index.less'
function CustomModal(props:ModalProps) {
    const { headerText, bodyText, size, showModal, showSecondButton, leftButtonClassName, rightButtonClassName, primaryButtonText} = props
    return (
      <Modal
       show ={showModal}
        {...props}
        size={size}
        aria-labelledby="contained-modal-title-vc"
        centered
        className="app-Modal"
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
          {showSecondButton && (<Button label="Close" className={leftButtonClassName} onClick={props.onHide} />)}
          {(<Button label={primaryButtonText|| "Save Changes"} onClick={props.oK} className={rightButtonClassName}/>)}
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
      bodyText:string,
      showModal:boolean,
      showSecondButton?:false,
      leftButtonClassName?:string,
      rightButtonClassName?:string
      primaryButtonText?:string


  }
  export default CustomModal;