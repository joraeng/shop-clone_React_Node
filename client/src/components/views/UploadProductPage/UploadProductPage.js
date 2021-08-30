import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload/FileUpload";

const { TextArea } = Input;

// select option 데이터
const Contients = [
	{ key: 1, value: "아프리카" },
	{ key: 2, value: "유럽" },
	{ key: 3, value: "아시아" },
	{ key: 4, value: "북아메리카" },
	{ key: 5, value: "남아메리카" },
	{ key: 6, value: "오스트레일리아" },
	{ key: 7, value: "남극" },
];

function UploadProductPage() {
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
	return (
		<div style={{ maxWidth: "700px", margin: "2rem auto" }}>
			<div style={{ textAlign: "center", marginBottom: "2rem" }}>
				<h2>상품 업로드</h2>
			</div>

			<Form>
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
					{Contients.map((item) => {
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
