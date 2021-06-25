import { Form } from "react-bootstrap";
import './index.less';

const Select = ({items, onChange}:SelectProps) => {
return (<Form.Group>
    <Form.Control onChange={(e) =>{
        onChange(e.target.value)
        }} as="select" size="lg" >
      {items.map((item:any, index) => <option value={item.value} key={index}>{item.name}</option>)}
    </Form.Control>
  </Form.Group>)
} 
export default Select

interface SelectProps{
   items:Array<any> ;
   onChange:(e:any) => void;
}