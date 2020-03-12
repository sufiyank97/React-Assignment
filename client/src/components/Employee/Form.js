import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { useForm } from 'react-hook-form'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../config/axios'
import EmployeeList from './EmployeeList'
import FontAwesome from 'react-fontawesome'
const Form = () => {

    const defaultValues = {
        name: '',
        designation: '',
        Contact: [],
        skills: [],
        dob: ''
    }

    const { register, handleSubmit, errors, getValues, reset, setValue, setError, clearError, watch } = useForm(defaultValues);

    const [skill, setSkill] = useState([])
    const [contacts, setContact] = useState([])
    const [disabled, setDisabled] = useState(false)

    const [empdata, getData] = useState([])

    const onSubmit = (data, e) => {

        const error = () => {
            if (contacts.length === 0) {

                setError([
                    {
                        type: 'required',
                        name: 'conType',
                        message: '*'
                    },
                    {
                        type: 'required',
                        name: 'number',
                        message: '*'
                    }
                ])
            } else {
                data.Contact = contacts
                data.skills = skill
                let { name, designation, Contact, skills, dob } = data
                dob = moment(dob).format("DD-MMM-YYYY")
                const body = {
                    name, designation, Contact, skills, dob
                }
                {
                    (() => {
                        console.log(body)
                    })()
                }
                e.target.reset()
                reset({
                    dob: ''
                })
                setSkill([])
                setContact([])
                getData([])
                const postEmployee = async () => {
                    const res = await axios
                        .post('/employees', body)
                    try {
                        if (res.errors) {
                            console.log(res.errors)
                            window.alert(res.errors)
                        } else {
                            console.log(res.data)
                            window.alert('Sucessfully Added')
                        }

                    } catch (err) {
                        window.alert(err)
                    }
                }
                postEmployee()
            }
        }
        error()
    };

    const handleSkill = (e) => {
        const { skill } = getValues()
        setSkill(prevArray => [...prevArray, skill])
        setValue('skill', '')
    }

    const handlePhone = (e) => {
        const { conType, number } = getValues()
        const error = () => {
            if ((conType === '') || (number === '')) {
                setError([
                    {
                        type: 'required',
                        name: 'conType',
                        message: '*'
                    },
                    {
                        type: 'required',
                        name: 'number',
                        message: '*'
                    }
                ])
            } else if (number.length < 10) {
                setError([
                    {
                        type: 'num',
                        name: 'number',
                        message: 'number should be 10 digits'
                    }
                ])
            }
            else {
                clearError()
                var obj = {}
                obj["type"] = conType
                obj["number"] = number
                setContact([
                    ...contacts,
                    obj
                ])
                if (contacts.length >= 3) {
                    setDisabled(true)
                }
                setValue([
                    { conType: '' },
                    { number: '' }
                ])
            }
        }
        error()
    }

    const handleGetData = () => {
        const getEmpData = async () => {
            const res = await axios
                .get('/employees')
            try {
                getData(res.data)
            } catch (err) {
                window.alert(err)
            }
        }
        getEmpData()
    }

    return (
        <React.Fragment>
            <div className="row mt-5 justify-content-center ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Add Employee</h1>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-5">
                            <input type="text" name="name" id="name" className="form-control" ref={register({
                                required: '*',
                            })} />
                            {errors.name && (<span style={{ color: "red" }}>{errors.name.message}</span>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="designation" className="col-sm-2 col-form-label">Designation</label>
                        <div className="col-sm-5">
                            <input type="text" name="designation" id="designation" className="form-control" ref={register({
                                required: '*'
                            })} />
                            {errors.designation && (<span style={{ color: "red" }}>{errors.designation.message}</span>)}
                        </div>
                    </div>

                    <div className="form-row mb-3">

                        <label htmlFor="contact" className="col-sm-2 col-form-label">Contact</label>
                        <div className="col-sm">
                            <input type="text" name="conType" ref={register} className="form-control" placeholder="type" disabled={disabled} />
                            {errors.conType && (<span style={{ color: "red" }}>{errors.conType.message}</span>)}
                        </div>

                        <div className="col-sm">
                            <input type="text" maxLength="10" name="number" id="contact" className="form-control" ref={register}
                                onKeyUp={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/, '')
                                }} placeholder="phone number" disabled={disabled} />
                            {errors.number && (<span style={{ color: "red" }}>{errors.number.message}</span>)}
                            {/* <button type="button" className="btn btn-primary mb-2" >phone</button> */}

                        </div>
                        <div className="col-sm">
                            <FontAwesome className="fas fa-plus-square" size="2x" type="button" onClick={handlePhone} disabled={disabled} />
                        </div>

                    </div>

                    <div className="form-group row">
                        <label htmlFor="skills" className="col-sm-2 col-form-label">Skills</label>
                        <div className="col-sm-5">
                            <input type="text" name="skill" className="form-control" id="skills" ref={register} />
                        </div>
                        {/* <button type="button" onClick={handleSkill}>Skill</button> */}
                        <FontAwesome className="fas fa-plus-square" size="2x" type="button" onClick={handleSkill} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="dob" className="col-sm-2 col-form-label">Date of Birth</label>
                        <div className="col-sm-5">
                            <DatePicker
                                className="form-control"
                                ref={register({ name: 'dob' })}
                                selected={watch('dob')}
                                onChange={date => {
                                    setValue('dob', date)
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-8 text-center">
                        <button type="submit" className="btn btn-primary mb-4 btn-lg center-block">Add Employee</button>
                    </div>
                </form >

            </div >
            <div className="col-md-9 ml-5 text-center">
                <button onClick={handleGetData} className="btn btn-primary btn-lg mb-4">View Data</button>
                <EmployeeList empdata={empdata} />
            </div>

        </React.Fragment>
    )
}
export default Form