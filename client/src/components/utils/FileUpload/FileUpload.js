import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload(props) {
	const [Images, setImages] = useState([]);

	const dropHandler = (files) => {
		let formData = new FormData();
		const config = {
			header: { "content-type": "multipart/form-data" },
		};
		formData.append("file", files[0]);

		axios.post("/api/product/image", formData, config).then((response) => {
			if (response.data.success) {
				setImages([...Images, response.data.filePath]);
				props.refreshFunction([...Images, response.data.filePath]);
			} else {
				alert("파일 저장하는데 실패했습니다.");
			}
		});
	};

	const deleteHandler = (image) => {
		// 여기서 image는 이미지 파일의 경로 데이터
		const currentIndex = Images.indexOf(image);

		let newImages = [...Images];
		newImages.splice(currentIndex, 1); //배열에서 인덱스를 통해 원하는 요소에 접근해 삭제를 하는 메소드

		setImages(newImages);
		props.refreshFunction(newImages);
	};

	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<Dropzone onDrop={dropHandler}>
				{({ getRootProps, getInputProps }) => (
					<section
						style={{
							width: 250,
							height: 200,
							border: "1px solid lightgray",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<Icon type="plus" style={{ fontSize: "3rem" }} />
						</div>
					</section>
				)}
			</Dropzone>

			<div
				style={{
					display: "flex",
					width: "300px",
					height: "220px",
					overflowX: "scroll",
					// 실제로는 인라인 스타일 말고 css파일 만들어서 작성해야 스크롤바 없앨 수 있음
				}}
			>
				{Images.map((image, index) => (
					<div onClick={() => deleteHandler(image)} key={index}>
						<img
							style={{ minWidth: "250px", width: "250px", height: "200px" }}
							src={`http://localhost:5000/${image}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default FileUpload;
