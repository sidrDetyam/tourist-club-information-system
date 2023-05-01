import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api from "../http/Api";
import {Button, Col, Row} from "react-bootstrap";
import EditIcon from "../components/icons/EditIcon";
import UploadIcon from "../components/icons/UploadIcon";
import XIcon from "../components/icons/XIcon";
import TrashIcon from "../components/icons/TrashIcon";
import FullPageLoading from "../components/FullPageLoading";


const Hike = () => {

    const params = useParams();
    const hikeId = params.id

    const [hike, setHike] = useState({})
    const [isEdit, setEdit] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [inputs, setInputs] = useState({
        name: "",
    })

    useEffect(() => {
        api.post("hikes/get-by-id", {id: hikeId})
            .then(response => {
                setHike(response.data)
                setInputs(s => {
                    s.name = response.data.name
                    return s
                })
                console.log(response.data)
            })

        setLoading(false)
    }, [hikeId, setHike, setInputs])

    const onEditClick = () => {
        setEdit(!isEdit)
    }

    const onAcceptClick = () => {

    }

    const onDeleteClick = () => {

    }

    if (isLoading) {
        return <FullPageLoading loadingText={"Loading"}/>
    }

    return (
        <div className={"container"}>
            <Row className={"mt-5"}>
                <Col md={4}>
                    {!isEdit && <h2>Поход {hike.name}</h2>}
                    {isEdit && <input className={"form-control"} value={inputs.name}
                                      onChange={e => setInputs({...inputs, name: e.target.value})}/>}
                </Col>

                <Col>
                    {(!isEdit ?
                            <Button onClick={onEditClick}>
                                <EditIcon size={20}/> Редактировать
                            </Button>
                            :
                            <>
                                <Button variant={"primary"} onClick={onAcceptClick}>
                                    <UploadIcon size={20}/>
                                </Button>
                                <Button variant={"outline-primary"} onClick={onEditClick}>
                                    <XIcon size={20}/>
                                </Button>
                                <Button variant={"danger"} onClick={onDeleteClick}>
                                    <TrashIcon size={20}/>
                                </Button>
                            </>
                    )
                    }
                </Col>
            </Row>
        </div>
    );
};

export default Hike;