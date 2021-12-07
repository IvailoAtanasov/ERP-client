import { React, useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useForm } from '../../components/useForm'
import { Controls } from '../../components/controls/controls'
import { Alert } from '@material-ui/lab'
import { Form } from '../../components/useForm'

const initialValues = {
    id: 0,
    exitDate: new Date(),
    cakeName: "",
    numberOfPieces: 0,
    cakeFilling: "",
    deliveryMethod: "",
    takeAwayPlace: "",
    deliveryAddress: "",
    customerFirstName: "",
    customerLastName: "",
    customerPhone: "",
    additionalInfo: "",
    paymentMethod: "",
    partialPayment: "",
    createdBy: "",
    executedBy: "",
    status: "received",
    executionLocation: ""
}

const numberOfPiecesList = [
    { id: '1', title: '1' },
    { id: '4', title: '4' },
    { id: '6', title: '6' },
    { id: '8', title: '8' },
    { id: '12', title: '12' },
]

const deliveryMethodList = [
    { id: 'takeAway', title: 'Взимане на място' },
    { id: 'delivery', title: 'Доставка' }
]

const takeAwayPlaceList = [
    { id: 'center', title: 'Център' },
    { id: 'mladost', title: 'Младост' },
    { id: 'lozenec', title: 'Лозенец' }
]

const paymentMethodList = [
    { id: 'payed', title: 'Платена' },
    { id: 'partialPayment', title: 'Капарирана' },
    { id: 'forPayment', title: 'За Плащане' },
]





const OrdersForm = props => {

    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [successMessage, setSuccessMessage] = useState()
    const [userReadOnly, setUserReadOnly] = useState()
    const [allReadOnly, setAllReadOnly] = useState(false)

    const { readOnly, recordForEdit, addOne, editOne, statusList } = props
    

    useEffect(() => {

        if (localStorage.getItem('userRole') === 'user') {
            setUserReadOnly(true)
        } else {
            setUserReadOnly(false)
        }
            
            

        if (userReadOnly) {
            setAllReadOnly(true)
        } else if (readOnly) {
            setAllReadOnly(true)
        }
        else {
            setAllReadOnly(false)
        }
    }, [readOnly])


    localStorage.setItem("userReadOnly", userReadOnly)


    initialValues.createdBy = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('exitDate' in fieldValues)
            temp.exitDate = fieldValues.exitDate ? "" : "Това поле е задължително"
        if ('cakeName' in fieldValues)
            temp.cakeName = fieldValues.cakeName ? "" : "Това поле е задължително"
        if ('numberOfPieces' in fieldValues)
            temp.numberOfPieces = fieldValues.numberOfPieces ? "" : "Това поле е задължително"
        if ('cakeFilling' in fieldValues)
            temp.cakeFilling = fieldValues.cakeFilling ? "" : "Това поле е задължително"
        if ('deliveryMethod' in fieldValues)
            temp.deliveryMethod = fieldValues.deliveryMethod ? "" : "Това поле е задължително"
        if ('customerFirstName' in fieldValues)
            temp.customerFirstName = fieldValues.customerFirstName ? "" : "Това поле е задължително"

        if ('customerLastName' in fieldValues)
            temp.customerLastName = fieldValues.customerLastName ? "" : "Това поле е задължително"

        if ('customerPhone' in fieldValues)
            temp.customerPhone = fieldValues.customerPhone && (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(fieldValues.customerPhone)// eslint-disable-line
                ? ""
                : "Невалиден телефонен номер"

        if ('status' in fieldValues)
            temp.status = fieldValues.status ? "" : "Това поле е задължително"

        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")

    }








    const { values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm } = useForm(initialValues, true, validate);



    const registerHandler = async (e) => {
        e.preventDefault()

        if (validate()) {
            console.log(values)
            try {
                if (values.id === 0) {
                    addOne('/api/orders/register', values)
                    setSuccessMessage('Успешна регистрация на поръчка')
                }
                else {
                    editOne(`/api/orders/order/${values._id}`, values)
                    setSuccessMessage('Записът за служителя е обновен')
                }

                setSuccess('success');
                resetForm()

                setTimeout(() => {
                    setSuccess("")
                }, 3000)

            } catch (error) {
                setError(error.response.data.error);
                setTimeout(() => {
                    setError("")
                }, 5000)
            }


        }
    }


    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })

    }, [recordForEdit])

    return (
        <Form onSubmit={registerHandler}>
            {success && <Alert severity="success">{successMessage}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Controls.Input
                        name="cakeName"
                        label='Торта'
                        value={values.cakeName}
                        onChange={handleInputChange}
                        error={errors.cakeName}
                        inputProps={{
                            readOnly: Boolean(allReadOnly),
                            disabled: Boolean(allReadOnly),
                        }}
                    />
                    <Controls.Input
                        name="cakeFilling"
                        label='Пълнеж'
                        value={values.cakeFilling}
                        onChange={handleInputChange}
                        error={errors.cakeFilling}
                        inputProps={{
                            readOnly: Boolean(allReadOnly),
                            disabled: Boolean(allReadOnly),
                        }}
                    />
                    <Controls.Input
                        name="customerFirstName"
                        label='Име на клиент'
                        value={values.customerFirstName}
                        onChange={handleInputChange}
                        error={errors.customerFirstName}
                        inputProps={{
                            readOnly: Boolean(allReadOnly),
                            disabled: Boolean(allReadOnly),
                        }}
                    />
                    <Controls.Input
                        name="customerLastName"
                        label='Фамилия на клиент'
                        value={values.customerLastName}
                        onChange={handleInputChange}
                        error={errors.customerLastName}
                        inputProps={{
                            readOnly: Boolean(allReadOnly),
                            disabled: Boolean(allReadOnly),
                        }}
                    />
                    <Controls.Input
                        name='customerPhone'
                        label='Телефон на клиент'
                        value={values.customerPhone}
                        onChange={handleInputChange}
                        error={errors.customerPhone}
                        inputProps={{
                            readOnly: Boolean(allReadOnly),
                            disabled: Boolean(allReadOnly),
                        }}
                    />
                    <Controls.Input
                        name="additionalInfo"
                        label='Допълнителна информация'
                        value={values.additionalInfo}
                        onChange={handleInputChange}
                        error={errors.additionalInfo}
                        inputProps={{
                            readOnly: Boolean(allReadOnly),
                            disabled: Boolean(allReadOnly),
                        }}
                        multiline
                        rows={4}
                    />

                </Grid>

                <Grid item xs={12} sm={6}>

                    <Controls.DatePicker
                        name="exitDate"
                        label="Дата на издаване"
                        value={values.exitDate}
                        onChange={handleInputChange}
                    />

                    <Controls.Select
                        name='numberOfPieces'
                        label='Брой парчета'
                        value={values.numberOfPieces}
                        onChange={handleInputChange}
                        options={numberOfPiecesList}
                        error={errors.numberOfPieces}
                        readOnly={allReadOnly}
                    />

                    <Controls.RadioGroup
                        name='deliveryMethod'
                        label="Метод за доставка"
                        value={values.deliveryMethod}
                        onChange={handleInputChange}
                        items={deliveryMethodList}
                        readOnly={allReadOnly}
                    />
                    {
                        values.deliveryMethod === 'takeAway'
                            ? <Controls.Select
                                name='takeAwayPlace'
                                label='Обект за взимане на поръчка'
                                value={values.takeAwayPlace}
                                onChange={handleInputChange}
                                options={takeAwayPlaceList}
                                error={errors.takeAwayPlace}
                                readOnly={allReadOnly}
                            />
                            : values.deliveryMethod === 'delivery'
                                ? <Controls.Input
                                    name="deliveryAddress"
                                    label='Адрес за доставка'
                                    value={values.deliveryAddress}
                                    onChange={handleInputChange}
                                    error={errors.deliveryAddress}
                                    inputProps={{
                                        readOnly: Boolean(allReadOnly),
                                        disabled: Boolean(allReadOnly),
                                    }}
                                />
                                : ""
                    }




                    <Controls.RadioGroup
                        name='paymentMethod'
                        label="Статус на плащане"
                        value={values.paymentMethod}
                        onChange={handleInputChange}
                        items={paymentMethodList}
                        readOnly={allReadOnly}
                    />

                    {
                        values.paymentMethod === 'partialPayment'
                            ? <Controls.Input
                                name='partialPayment'
                                label='Капаро'
                                value={values.partialPayment}
                                onChange={handleInputChange}
                                error={errors.partialPayment}
                                type="number"
                                inputProps={{
                                    readOnly: Boolean(allReadOnly),
                                    disabled: Boolean(allReadOnly),
                                }}
                            />
                            : ""
                    }

                    <Controls.Select
                        name='executionLocation'
                        label='Обект за издаване на поръчка'
                        value={values.executionLocation}
                        onChange={handleInputChange}
                        options={takeAwayPlaceList}
                        error={errors.executionLocation}
                        readOnly={allReadOnly}
                    />

                    <Controls.Select
                        name='status'
                        label='Статус'
                        value={values.status}
                        onChange={handleInputChange}
                        options={statusList}
                        error={errors.status}
                        readOnly={readOnly}
                    />

                    {
                        !readOnly
                            ? <div>
                                <Controls.Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    text='Регистрирай'
                                />
                                <Controls.Button
                                    variant='contained'
                                    color='default'
                                    size='large'
                                    text='Ресет'
                                    onClick={resetForm}
                                />
                            </div>
                            : ""
                    }


                </Grid>
            </Grid>
        </Form>
    )
}

export default OrdersForm