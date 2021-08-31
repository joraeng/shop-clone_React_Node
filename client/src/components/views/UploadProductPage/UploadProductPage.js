import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload/FileUpload";
import Axios from "axios";

const { TextArea } = Input;

// select option 데이터
const Continents = [
	{ key: 1, value: "아프리카" },
	{ key: 2, value: "유럽" },
	{ key: 3, value: "아시아" },
	{ key: 4, value: "북아메리카" },
	{ key: 5, value: "남아메리카" },
	{ key: 6, value: "오스트레일리아" },
	{ key: 7, value: "남극" },
];

function UploadProductPage(props) {
	const [Title, setTitle] = useState("");
	const [Description, setDescription] = useState("");
	const [Price, setPrice] = useState("");
	const [Continent, setContinent] = useState(1);
	const [Images, setImages] = useState([]);

	const titleChangeHandler = (event) => {
		setTitle(event.currentTarget.value);
	};
	const descriptionChangeHandler = (event) => {
		setDescription(event.currentTarget.value);
	};
	const priceChangeHandler = (event) => {
		setPrice(event.currentTarget.value);
	};
	const continentChangeHandler = (event) => {
		setContinent(event.currentTarget.value);
	};
	const updateImages = (newImages) => {
		setImages(newImages);
	};
	const submitHandler = (event) => {
		event.preventDefault(); //이 조건이 있으면 submit이벤트가 발생할 때 자동으로 새로고침 하는걸 막아줌

		// 모든 input에 값이 입력되지 않은 경우 다음 단계로 넘어가지 못하도록 한다
		if (!Title || !Description || !Price || !Contient || !Images) {
			return alert("모든 값을 입력해주셔야 합니다");
		}

		// 서버에 state 값들을 request로 보낸다
		const body = {
			// 로그인 된 사람의 ID가 리덕스에 있음
			writer: props.user.userData._id,
			title: Title,
			description: Description,
			price: Price,
			images: Images,
			continents: Continent,
		};
		Axios.post("/api/product", body).then((response) => {
			if (response.data.success) {
				alert("상품 업로드에 성공 했습니다");
			} else {
				alert("상품 업로드에 실패 했습니다");
			}
		});
	};

	return (
		<div style={{ maxWidth: "700px", margin: "2rem auto" }}>
			<div style={{ textAlign: "center", marginBottom: "2rem" }}>
				<h2>상품 업로드</h2>
			</div>

			<Form onSubmit={submitHandler}>
				{/* DropZone */}
				<FileUpload refreshFunction={updateImages} />
				<br />
				<br />
				<label>이름</label>
				<Input value={Title} onChange={titleChangeHandler} />
				<br />
				<br />
				<label>설명</label>
				<TextArea value={Description} onChange={descriptionChangeHandler} />
				<br />
				<br />
				<label>가격($)</label>
				<Input type="number" value={Price} onChange={priceChangeHandler} />
				<br />
				<br />
				<select onChange={continentChangeHandler} value={Continent}>
					{Continents.map((item) => {
						return (
							<option key={item.key} value={item.key}>
								{item.value}
							</option>
						);
					})}
				</select>
				<br />
				<br />
				<Button>확인</Button>
			</Form>
		</div>
	);
}

export default UploadProductPage;
