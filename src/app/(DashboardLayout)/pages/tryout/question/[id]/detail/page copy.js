'use client'

import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row } from "reactstrap"
import user1 from "../../../../../../../../public/images/users/user1.jpg"
import Image from "next/image"
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDocs, getDoc, collection, updateDoc, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../../../../../../../public/firebaseConfig";
import { useParams, useRouter } from "next/navigation";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'questions_v1'));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function DetailSoal() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
    const [selectedChoices, setSelectedChoices] = useState({});
    const [questionss, setQuestionss] = useState([]);

    const [formState, setFormState] = useState({
        listQuestion: []
    });


    const handleItemClick = (index) => {
        setSelectedIndex(index);
        setSelectedChoiceIndex(null);
    };

    const waktu = 7200;
    const [timeLeft, setTimeLeft] = useState(waktu); // 2 hours in seconds
    const router = useRouter();

    const handlePrevious = () => {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    // Go to next question
    const handleNext = () => {
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    };

    const { id } = useParams(); // Ambil parameter dinamis dari URL
    const [detailData, setDetailData] = useState(null);
    const [dataTryOut, setDataTryOut] = useState([]);
    const [filteredDataTryOut, setFilteredDataTryOut] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setDataTryOut(data);
        }
        fetchData();
    }, []);

    console.log('niki', dataTryOut);

    useEffect(() => {
        if (id) {
            const fetchDetailData = async () => {
                const docRef = doc(db, 'tryout_v1', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setDetailData(data);

                    // Ambil semua idQuestions dari listSubtest
                    const tpsListSubtests = data.listTest
                        .filter(item => item.nameTest === "TPS")
                        .flatMap(element => element.listSubtest);

                    const idQuestionsList = tpsListSubtests.map(subtest => subtest.idQuestions);


                    // Filter dataTryOut berdasarkan idQuestions
                    const filteredData = dataTryOut.filter(dataItem =>
                        idQuestionsList.includes(dataItem.id)
                    );
                    
                    console.log('datasel:', filteredData);
                    setFilteredDataTryOut(filteredData);
                } else {
                    console.log('No such document!');
                }
            };
            fetchDetailData();
        }
    }, [id, dataTryOut]);

    console.log('Filtered Data TryOut:', filteredDataTryOut);
    const allQuestions = filteredDataTryOut.flatMap(tpsItem => tpsItem.listQuestions);
    // setQuestions(allQuestions);
    // allQuestions.map(item => {
    // console.log('Fast:', item.question)});

    useEffect(() => {
        if (filteredDataTryOut.length > 0) {
            const allQuestions = filteredDataTryOut.flatMap(tpsItem => {
                if (Array.isArray(tpsItem.listQuestions)) {
                    return tpsItem.listQuestions;
                } else {
                    console.warn('No listQuestions found in:', tpsItem);
                    return [];
                }
            });
            console.log('All Questions:', allQuestions); // Cek apakah allQuestions terisi
            setQuestionss(allQuestions);
        } else {
            console.warn('filteredDataTryOut is empty or not properly populated.');
        }
    }, [filteredDataTryOut]);
    
    console.log('Questions:', questionss);
    

    // console.log('Fast:', questionss);

    
    



    // const tps = detailData?.listTest?.filter(item => item.nameTest === "TPS") ?? [];
    // let tpsListSubtests = tps.flatMap(element => element.listSubtest);

    // const idQuestionsList = tpsListSubtests.map(subtest => subtest.idQuestions);


    // let iknow = [];
    // tpsListSubtests.map((item, index) => {
    //     iknow = item.idQuestions
    // })

    // const filteredData = dataTryOut.filter(dataItem =>
    //     idQuestionsList.includes(dataItem.id)
    // );

    // console.log('nikise', filteredData);

    // const allQuestions = filteredData.flatMap(tpsItem => tpsItem.listQuestions);
    // setQuestions(allQuestions);

    // const suden =




    console.log('index question', filteredDataTryOut);
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            router.push(`/pages/tryout/question/${id}/detail/selesai`);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, id]);

    if (!detailData) {
        return <div>Loading...</div>;
    }


    let ambong;
    detailData.tps.forEach(item => {
        ambong = item;
    });

    // console.log('xaviera', detailData.tps);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
    };

    const updateYourAnswer = async () => {
        const docRef = doc(db, 'questions_v1', id);

        try {
            // Ambil data dokumen saat ini
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                console.log('No such document!');
                return;
            }

            const data = docSnap.data();

            // Log data dokumen untuk debugging
            console.log('Dokumen Data:', data);

            // Temukan elemen `tps` yang berisi `listQuestions` yang sedang digunakan
            let dataQuestion = null;
            const tpsIndex = data.tps.findIndex(item => item.listQuestions);

            if (tpsIndex !== -1) {
                dataQuestion = data.tps[tpsIndex];
            }

            if (!dataQuestion) {
                console.log('Could not find matching tps with listQuestions');
                return;
            }

            console.log('better', dataQuestion.listQuestions);

            // Update `listQuestions` dengan jawaban yang dipilih
            const updatedListQuestions = dataQuestion.listQuestions.map((question, index) => ({
                ...question,
                yourAnswer: selectedChoices[index] || [] // Update with selected choices
            }));

            // Update elemen `tps` yang spesifik
            const updatedTps = data.tps.map((item, index) =>
                index === tpsIndex
                    ? { ...item, listQuestions: updatedListQuestions }
                    : item
            );

            // Perbarui dokumen di Firestore
            await updateDoc(docRef, {
                tps: updatedTps
            });

            console.log('Document successfully updated with yourAnswer!');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleSelect = (choiceIndexOrValue) => {
        const currentQuestion = questions[selectedIndex];

        if (currentQuestion.type === 'banyak_pilihan') {
            setSelectedChoices((prev) => {
                const prevChoices = prev[selectedIndex] || [];
                const selectedItem = currentQuestion.choice[choiceIndexOrValue];

                if (prevChoices.includes(selectedItem)) {
                    return {
                        ...prev,
                        [selectedIndex]: prevChoices.filter((item) => item !== selectedItem),
                    };
                } else {
                    return {
                        ...prev,
                        [selectedIndex]: [...prevChoices, selectedItem],
                    };
                }
            });
        } else if (currentQuestion.type === 'isian') {
            setSelectedChoices((prev) => ({
                ...prev,
                [selectedIndex]: [choiceIndexOrValue.trim()],
            }));
        } else if (currentQuestion.type === 'benar_salah') {
            const selectedItem = currentQuestion.choice[choiceIndexOrValue].option;
            setSelectedChoices((prev) => ({
                ...prev,
                [selectedIndex]: [selectedItem],
            }));
        } else { // Handle 'pilihan_ganda'
            const selectedItem = currentQuestion.choice[choiceIndexOrValue];
            setSelectedChoices((prev) => ({
                ...prev,
                [selectedIndex]: [selectedItem],
            }));
        }
    };


    const handleSubmit = () => {
        updateYourAnswer();
    };

    const progressBarWidth = (timeLeft / waktu) * 100;
    const progressBarColor = timeLeft <= 50 ? 'red' : '#007bff';

    const handleFinish = () => {
        history.push(`/pages/tryout/question/${id}/detail/selesai`);
    };

    console.log('bagi', waktu / 4);


    return (
        <>
            <div className="position-absolute bg-white p-3" style={{ minHeight: '100vh', width: '100%', zIndex: '99999', top: 0, left: 0 }}>
                <div className="d-flex justify-content-between mb-4">
                    <h1>{detailData.name}</h1>
                    <span className="w-25 ms-5 position-fixed pe-2" style={{ right: 0 }}>
                        <span className="d-flex justify-content-between">
                            <p className="m-0">Waktu</p>
                            <b className="m-0">{formatTime(timeLeft)}</b>
                        </span>
                        <div className="w-100 bg-transparent border border-1 border-primer rounded-5" style={{ height: '20px' }}>
                            <div
                                className="bg-primy h-100  rounded-5"
                                style={{ width: `${progressBarWidth}%`, backgroundColor: `${timeLeft <= (waktu / 4) ? 'red' : ''}` }}
                            ></div>
                        </div>
                    </span>
                </div>
                <Row>
                    <Col sm="12" lg="9">
                        {selectedIndex !== null && questions[selectedIndex] && (
                            <span>
                                <section>
                                    <div className="bg-graylg p-4 rounded-3" style={{ height: '45vh' }}>
                                        <p className="">{questions[selectedIndex].questions}</p>
                                        <div className="border-primer h-75 w-25">
                                            Image
                                        </div>
                                    </div>
                                </section>
                                {questions[selectedIndex].type == 'pilihan_ganda' ? (
                                    <section className="mt-4">
                                        <Form>
                                            {questions[selectedIndex].choice.map((item, index) => (
                                                <span key={index}>
                                                    <FormGroup check>
                                                        <Input
                                                            name={`radio-${selectedIndex}`}
                                                            type="radio"
                                                            onChange={() => handleSelect(index)}
                                                            checked={selectedChoices[selectedIndex]?.[0] === item}
                                                        />{' '}
                                                        <div
                                                            check
                                                            className="form-label bg-graylg w-50 rounded-3 ms-2 p-2"
                                                            style={{ minHeight: '100px' }}
                                                        >
                                                            {item}
                                                        </div>
                                                    </FormGroup>
                                                </span>
                                            ))}
                                        </Form>
                                    </section>
                                ) : questions[selectedIndex].type == 'banyak_pilihan' ? (
                                    <section className="mt-4">
                                        <Form>
                                            {questions[selectedIndex].choice.map((item, index) => (
                                                <span key={item} className="d-flex align-items-center mb-2">
                                                    <div className={`form-label bg-graylg w-50 rounded-3 ms-2 p-2 me-2`} style={{ minHeight: '50px' }}>
                                                        {item}
                                                    </div>
                                                    <FormGroup check>
                                                        <Input
                                                            name={`checkbox-${index}`}
                                                            type="checkbox"
                                                            onChange={() => handleSelect(index)}
                                                            checked={selectedChoices[selectedIndex]?.includes(item) || false}
                                                            className="form-check-input"
                                                        />{' '}
                                                    </FormGroup>
                                                </span>
                                            ))}
                                        </Form>
                                    </section>
                                ) : questions[selectedIndex].type == 'benar_salah' ? (
                                    <section className="mt-4">
                                        {questions[selectedIndex].choice.map((item, index) => (
                                            <span key={item} className="d-flex mb-2">
                                                <div className="bg-graylg rounded-3 me-3 p-2" style={{ height: '100px', width: '85%' }}>
                                                    {item.option}
                                                </div>
                                                <Form style={{ height: '100px', width: '15%' }}>
                                                    <div className="bg-graylg rounded-3 d-flex h-100 w-100 justify-content-between" >
                                                        <FormGroup check className="d-flex w-50 m-0 p-0 flex-column align-items-center justify-content-center" >
                                                            <Label>Benar</Label>
                                                            <Input name="radio1" type="radio" className="mx-auto"
                                                                onChange={() => handleSelect(index)} />{' '}
                                                        </FormGroup>
                                                        <hr className="border border-1 border-black" />
                                                        <FormGroup check className="d-flex m-0 p-0 w-50 flex-column align-items-center justify-content-center" >
                                                            <Label>Salah</Label>
                                                            <Input name="radio1" type="radio" className="mx-auto"
                                                                onChange={() => handleSelect(index)} />{' '}
                                                        </FormGroup>
                                                    </div>
                                                </Form>
                                            </span>
                                        ))}
                                    </section>
                                ) : questions[selectedIndex].type == 'isian' && (
                                    <section className="mt-4">
                                        <Form>
                                            <span className="d-flex mb-2">
                                                <p>Jawaban Anda : </p>
                                                <FormGroup className="w-75 rounded-3 ms-3">
                                                    <Input
                                                        id="exampleEmail"
                                                        name="email"
                                                        placeholder="misal : dummy text ever since the 1500s"
                                                        type="textarea"
                                                        className="w-100"
                                                        onChange={(e) => handleSelect(e.target.value)}
                                                        value={selectedChoices[selectedIndex] ? selectedChoices[selectedIndex][0] : ''}
                                                    />
                                                </FormGroup>
                                            </span>
                                        </Form>
                                    </section>
                                )}
                            </span>
                        )}
                    </Col>
                    <Col sm="12" lg="3" className="position-fixed" style={{ right: 0 }}>
                        <section className="numberBoard bg-graylg p-4 rounded-3">
                            <div className="text-center">
                                <Image src={user1} alt="" className="rounded-circle" />
                                <h5 className="fw-bolder mt-1">Ismail bin Mail</h5>
                            </div>
                            <div className="grid-container dipilih my-5">
                                {questions.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`grid-item ${selectedIndex === index ? 'selected' : ''} ${selectedChoices[index] !== undefined ? 'bg-hijau border-0 text-white' : ''}`}
                                        onClick={() => handleItemClick(index)}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-between gap-2 mt-4">
                                <div className="w-100">
                                    <Button
                                        className={`border-0 w-100 buttonPrev rounded-5 ${selectedIndex >= 1 ? 'bg-hijau' : ''}`}
                                        onClick={handlePrevious}
                                        disabled={selectedIndex === 0}
                                    >
                                        ≪ Sebelumnya
                                    </Button>
                                </div>
                                <div className="w-100">
                                    <Button
                                        className={`border-0 w-100 rounded-5 bg-primy ${selectedIndex === questions.length - 1 ? 'bg-warning' : 'bg-primy'}`}
                                        onClick={selectedIndex === questions.length - 1 ? handleFinish : handleNext}
                                    >
                                        {selectedIndex === questions.length - 1 ? "Selesai" : "Selanjutnya ≫"}
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </div>
        </>
    )
}