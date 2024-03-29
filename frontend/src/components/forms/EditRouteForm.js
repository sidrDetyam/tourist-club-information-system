import React, {useEffect, useState} from 'react';
import api, {api_rejected} from "../../http/Api";
import {Button, Row} from "react-bootstrap";
import InputTemplate from "./InputTemplate";
import CheckIcon from "../icons/CheckIcon";
import TrashIcon from "../icons/TrashIcon";
import SelectForm from "./SelectForm";
import EntityTable from "../EntityTable";
import useSelect from "../../hooks/UseSelect";
import PlusIcon from "../icons/PlusIcon";

const GET_ROUTE_URL = "/routes/get-by-id"
const EDIT_ROUTE_URL = "/routes/edit"
const DELETE_ROUTE_URL = "/routes/delete"
const GET_TOURISTS_CATS = "/tourists/category-info"
const GET_ALL_POINTS_URL = "/points/get-all"

const EditRouteForm = ({id, updateStateCb}) => {

    const [inputs, setInputs] = useState({name: "", curCat: 0, cat: 0, descr: ""})
    const [cats, setCats] = useState([])
    const [points, setPoints] = useState([])

    const check = useSelect()

    useEffect(() => {
        api.get(GET_ALL_POINTS_URL)
            .then(pointsR => {
                setPoints(pointsR.data)

                api_rejected.post(GET_ROUTE_URL, {id: id})
                    .then(response => {
                        console.log(response.data)
                        setInputs(prev => {
                            prev.name = response.data.name;
                            if(response.data.description !== null){
                                prev.descr = response.data.description
                            }
                            else{
                                prev.descr = ""
                            }
                            return prev;
                        })

                        const checked = []
                        const pointIds = response.data.points.map(p => p.id)
                        pointsR.data.forEach((p, i) => {
                            if(pointIds.includes(p.id)){
                                checked.push(i)
                            }
                        })
                        check.setChecked(checked)

                        // setInputs(p => {
                        //     p.cat = response.data.category.id
                        //     return p
                        // })
                    })
            })
            .then(() => {
                api_rejected.get(GET_TOURISTS_CATS)
                    .then(response => {
                        setCats(response.data)
                        setInputs(prev => {
                            prev.curCat = 0
                            const index = response.data.map(v => v.id).indexOf(prev.cat)
                            if(index !== -1){
                                prev.curCat = index
                            }
                            return prev
                        })
                    })
            })
    }, [id, setInputs, check.setChecked, setCats])

    const onDeleteRouteClick = () => {
        api_rejected.post(DELETE_ROUTE_URL, {id: id})
            .then(() => updateStateCb())
    }

    const onSaveClick = () => {
        const rp = []
        points.forEach((p, i) => {
            if (check.isChecked(i)) {
                rp.push(p.id)
            }
        })
        const request = {
            id: id,
            pointIds: rp,
            name: inputs.name,
            categoryId: cats[inputs.curCat].id,
            description: inputs.descr
        }

        // console.log(request)
        api_rejected.post(EDIT_ROUTE_URL, request)
    }

    return (
        <div className={"container"}>
            <Row className={"mt-5"}>
                <InputTemplate inputs={inputs} setInputs={setInputs} field={"name"} ph={"Имя маршрута"}/>
            </Row>

            <Row className={"mt-3"}>
                <div style={{maxWidth: 300}}>
                    <SelectForm options={cats.map(c => c.value)}
                                onIndexChanged={(ind) => setInputs({...inputs, curCat: ind})}></SelectForm>
                </div>
            </Row>

            <Row className={"mt-3"}>
                <EntityTable data={points}
                             fields={["point", "description"]}
                             head={["Точка", "Описание"]}

                             rowComponentFactory={(index) => {
                                 const flag = check.isChecked(index)

                                 return (<Button variant={flag ? "secondary" : "outline-secondary"}
                                                 onClick={check.handleCheck(index)}>
                                     {flag ? <CheckIcon size={20}/> : <PlusIcon size={20}/>}
                                 </Button>)
                             }}
                />
            </Row>

            <Row className={"mt-3"}>
                <textarea className={"form-control"}
                    value={inputs.descr} onChange={e => setInputs({...inputs, descr: e.target.value})}
                    placeholder={"Описание маршрута"}
                >
                </textarea>
            </Row>

            <Row className={"mt-5"}>
                <div>
                    <Button variant={"secondary"} onClick={onSaveClick}>
                        <CheckIcon size={20}/>
                    </Button>

                    {
                        id !== undefined &&
                        <Button variant={"outline-danger"} onClick={onDeleteRouteClick}>
                            <TrashIcon size={20}/>
                        </Button>
                    }
                </div>
            </Row>
        </div>
    );
};

export default EditRouteForm;