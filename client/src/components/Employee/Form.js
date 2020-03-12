import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { useForm } from 'react-hook-form'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../config/axios'
import EmployeeList from './EmployeeList'
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
            <center>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" ref={register({
                        required: '*',
                    })} />
                    {errors.name && (<span style={{ color: "red" }}>{errors.name.message}</span>)}<br />

                    <label htmlFor="designation">Designation</label>
                    <input type="text" name="designation" id="designation" ref={register({
                        required: '*'
                    })} />
                    {errors.designation && (<span style={{ color: "red" }}>{errors.designation.message}</span>)}<br />

                    <label htmlFor="contact">Contact Details</label>
                    <input type="text" name="conType" ref={register} placeholder="type" disabled={disabled} />
                    {errors.conType && (<span style={{ color: "red" }}>{errors.conType.message}</span>)}

                    <input type="text" maxLength="10" name="number" id="contact" ref={register}
                        onKeyUp={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/, '')
                        }} placeholder="phone number" disabled={disabled} />
                    {errors.number && (<span style={{ color: "red" }}>{errors.number.message}</span>)}

                    <button type="button" onClick={handlePhone} disabled={disabled}>phone</button><br />

                    <label htmlFor="skills">Skills</label>
                    <input type="text" name="skill" id="skills" ref={register} />
                    <button type="button" onClick={handleSkill}>Skill</button><br />

                    <label htmlFor="dob">Date of Birth</label>
                    <DatePicker

                        ref={register({ name: 'dob' })}
                        selected={watch('dob')}
                        onChange={date => {
                            setValue('dob', date)
                        }}
                    /><br />
                    <button type="submit">Add Employee</button>
                </form>
                <button onClick={handleGetData}>View Data</button>
                <EmployeeList empdata={empdata} />
            </center>
        </React.Fragment>
    )
}
export default Form