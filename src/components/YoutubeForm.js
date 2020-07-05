import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name: 'Peter',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const savedValues = {
    name: 'Peter',
    email: 'peter@gmail.com',
    channel: 'My Channel',
    comments: 'Welcome to Formik',
    address: '221b HCM',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    console.log('Submit props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    channel: Yup.string().required('Required')
})

const validateComments = value => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}

function YoutubeForm() {
    const [formValues, setFormValues] = useState(null)
    return (
        <Formik 
            initialValues={formValues || initialValues} 
            validationSchema={validationSchema} 
            onSubmit={onSubmit}
            // validateOnChange={false}
            // validateOnBlur={false}
            // validateOnMount
            enableReinitialize
        >
            {
                formik => {
                    console.log('Formik props', formik)
                    return (
                        <Form>
                            <div className="form-control">
                                <label htmlFor="name">Name</label>
                                <Field type="text" id="name" name="name" />
                                <ErrorMessage name="name" component={TextError} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="email">Email</label>
                                <Field type="email" id="email" name="email" />
                                <ErrorMessage name="email">
                                    {
                                        errorMsg => <div className="error">{errorMsg}</div>
                                    }
                                </ErrorMessage>
                            </div>
                            <div className="form-control">
                                <label htmlFor="channel">Channel</label>
                                <Field type="text" id="channel" name="channel" placeholder="Youtube channel name" />
                                <ErrorMessage name="channel" />
                            </div>
                            <div className="form-control">
                                <label htmlFor="comments">Comments</label>
                                <Field validate={validateComments} as="textarea" id="comments" name="comments" />
                                <ErrorMessage name="comments" component={TextError} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="address">Address</label>
                                <FastField name="address">
                                    {
                                        props => {
                                            const { field, meta } = props
                                            return (
                                                <div>
                                                    <input type="text" id="address" {...field} />
                                                    {meta.touched && meta.error && <div>{meta.error}</div>}
                                                </div>
                                            )
                                        }
                                    }
                                </FastField>
                            </div>
                            <div className="form-control">
                                <label htmlFor="facebook">Facebook Profile</label>
                                <Field type="text" id="facebook" name="social.facebook" />
                            </div>
                            <div className="form-control">
                                <label htmlFor="twitter">Twitter Profile</label>
                                <Field type="text" id="twitter" name="social.twitter" />
                            </div>
                            <div className="form-control">
                                <label htmlFor="primaryPh">Primary phone number</label>
                                <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
                            </div>
                            <div className="form-control">
                                <label htmlFor="secondaryPh">Secondary phone number</label>
                                <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
                            </div>
                            <div className="form-control">
                                <label>List of phone numbers</label>
                                <FieldArray name="phNumbers">
                                    {
                                        fieldArrayProps => {
                                            const { push, remove, form } = fieldArrayProps
                                            const { values } = form
                                            const { phNumbers } = values
                                            return <div>
                                                {phNumbers.map((phNumber, index) => (
                                                    <div key={index}>
                                                        <Field name={`phNumbers[${index}`} />
                                                        {index > 0 && (
                                                            <button onClick={() => remove(index)} type="button"> - </button>
                                                        )}
                                                        <button onClick={() => push('')} type="button"> + </button>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    }
                                </FieldArray>
                            </div>
                            {/*
                            <button onClick={() => formik.validateField('comments')} type="button">Validate comments</button>
                            <button onClick={() => formik.validateForm()} type="button">Validate all</button>

                            <button onClick={() => formik.setFieldTouched('comments')} type="button">Visit comments</button>
                            <button onClick={() => formik.setTouched({
                                name: true,
                                email: true,
                                channel: true,
                                comments: true
                            })} type="button">Visit fields</button>
                            */}
                            <button onClick={() => setFormValues(savedValues)} type="button">Load save data</button>
                            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                            <button type="reset">Reset</button>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default YoutubeForm
