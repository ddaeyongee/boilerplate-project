import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios'

// const {Title} = Typography;
const {TextArea} = Input;

const Continents = [
    {key: 1, value: "대구 광역시"},
    {key: 2, value: "경북 경산시"},
    {key: 3, value: "경북 구미시"},
    {key: 4, value: "경북 칠곡군"}
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentsChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)

    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Continent || !Images) {
            return alert(" 모든 항목을 채워 주세요. ")
        }

        const body = {
            // 로그인 된 사람의 ID (auth.js 참고)
            writer: props.user.userData.id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }
        //서버에 채운 값들을 request 로 보낸다.
        axios.post("/api/product/", body)
            .then(response => {
                if (response.data.success) {
                    alert(" 정보 업로드에 성공했습니다. ")
                    // 다 저장하고 랜딩페이지로 가도록
                    props.history.push('/')
                } else {
                    alert(" 정보 업로드에 실패했습니다. ")
                }
            })
    }
    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                {/*<Title level={2}> 보호소 봉사 상품 업로드 based Luppy World </Title>*/}
                <p> 보호소 봉사 상품 업로드 based Luppy World </p>
            </div>

            <Form onSubmitCapture={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages}/>

                <br/>
                <br/>
                <label>보호소 이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/>
                <br/>
                <label>주소</label>
                <br/>
                <br/>
                <label>준비물</label>
                {/*<Input onChange={titleChangeHandler} value={Title}/>*/}

                <br/>
                <br/>
                <label>보호소 이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/>
                <br/>
                <label>설명</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/>
                <br/>
                <label>가격(원)</label>
                <Input type="number" onChange={priceChangeHandler} vaule={Price}/>
                <br/>
                <br/>
                <label>지역</label>
                <select onChange={continentsChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}> {item.value} </option>
                    ))}
                </select>
                <br/>
                <br/>

                {/*
                장소 : 주소
                시간 : 캘린더 형태, 시간, 날짜 선택
                할일 : list로 선택 가능하도록
                        ex) 청소, 설거지, 밥주기, 물주기, 산책, 입양 프로필 만들기, 미용, 목욕, 그 외 입력
                        준비물 : list로 선택 가능하도록
                        ex) 지저분해져도 되는 신발, 지저분해져도되는 옷, 얼음물 그외 입력
                        주의사항 : list로 선택 가능하도록 철저한 문 단속, 모르면 물어보기, 아이들이 싸우면 소리 치면서 말리기, 풀려 있을 때 간식 주지 말기 그외 입력

                */}
                <Button htmlType="submit">
                    올리기
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage