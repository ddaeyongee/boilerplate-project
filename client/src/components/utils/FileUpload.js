import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setImages([...Images, response.data.filePath])

                    //Image status 변경시점에 서버로 전달
                    props.refreshFunction([...Images, response.data.filePath])
                } else {
                    alert('파일을 저장하는 데 실패했습니다.')
                }
            })
    }


    const deleteHandler = (image) => {

        const currentIndex = Images.indexOf(image)

        // console.log('currentIndex', currentIndex) 첫번째 께 -1부터 나오네 ?
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)

        //Image status 변경시점에 서버로 전달
        props.refreshFunction(newImages)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div
                        style={{
                            width: 300,
                            height: 240,
                            border: '1px solid lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        {...getRootProps()} >
                        <input {...getInputProps()} />
                        <p> 이미지 올리기 </p>
                    </div>
                )}
            </Dropzone>

            <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>

                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(Image)} key={index}>
                        <img style={{minWidth: '300px', width: '300px', height: '240px'}}
                             src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload