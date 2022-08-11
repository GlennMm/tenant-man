import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const PaymentForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.payment?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>
        
          <NumberField
            name="amount"
            defaultValue={props.payment?.amount}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="amount" className="rw-field-error" />

        <Label
          name="invoiceId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Invoice id
        </Label>
        
          <NumberField
            name="invoiceId"
            defaultValue={props.payment?.invoiceId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="invoiceId" className="rw-field-error" />

        <Label
          name="houseId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          House id
        </Label>
        
          <NumberField
            name="houseId"
            defaultValue={props.payment?.houseId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="houseId" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.payment?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PaymentForm
