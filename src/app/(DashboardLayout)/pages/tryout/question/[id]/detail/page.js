'use client';

import {
    Button,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import user1 from "../../../../../../../../public/images/users/user1.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDocs, getDoc, collection, updateDoc, deleteDoc, doc, addDoc, setDoc } from "firebase/firestore";
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
    const [questionsLiterasi, setQuestionsLiterasi] = useState([]);
    const [formState, setFormState] = useState({
        listQuestion: []
    });

    const handleItemClick = (index) => {
        setSelectedIndex(index);
        setSelectedChoiceIndex(null);
    };

    // const waktu = 7220;
    // const [timeLeft, setTimeLeft] = useState(waktu);
    const router = useRouter();

    const handlePrevious = () => {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, allQuestions.length - 1));
    };

    const { id } = useParams();
    const [detailData, setDetailData] = useState(null);
    const [dataTryOut, setDataTryOut] = useState([]);
    const [filteredDataTryOut, setFilteredDataTryOut] = useState([]);
    const [filteredDataTryOutLiterasi, setFilteredDataTryOutLiterasi] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);

    let datas;
    filteredDataTryOut.forEach(element => {
        datas = element.listQuestions.length;
    });

    console.log('ini', filteredDataTryOut);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setDataTryOut(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchDetailData = async () => {
                const docRef = doc(db, 'tryout_v1', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setDetailData(data);

                    const tpsListSubtests = data.listTest
                        .filter(item => item.nameTest === "TPS")
                        .flatMap(element => element.listSubtest);

                    const literasiListSubtests = data.listTest
                        .filter(item => item.nameTest === "Tes Literasi")
                        .flatMap(element => element.listSubtest);

                    const idQuestionsList = tpsListSubtests.map(subtest => subtest.idQuestions);
                    const idQuestionsListLiterasi = literasiListSubtests.map(subtest => subtest.idQuestions);

                    const filteredData = dataTryOut.filter(dataItem =>
                        idQuestionsList.includes(dataItem.id)
                    );

                    const filteredDataLiterasi = dataTryOut.filter(dataItem =>
                        idQuestionsListLiterasi.includes(dataItem.id)
                    );

                    setFilteredDataTryOut(filteredData);
                    setFilteredDataTryOutLiterasi(filteredDataLiterasi);
                } else {
                    console.log('No such document!');
                }
            };
            fetchDetailData();
        }
    }, [id, dataTryOut]);

    useEffect(() => {
        const combinedQuestions = [];

        if (filteredDataTryOut.length > 0) {
            const allQuestionsTPS = filteredDataTryOut.flatMap(tpsItem => {
                if (Array.isArray(tpsItem.listQuestions)) {
                    return tpsItem.listQuestions;
                } else {
                    console.warn('No listQuestions found in:', tpsItem);
                    return [];
                }
            });
            combinedQuestions.push(...allQuestionsTPS);
        } else {
            console.warn('filteredDataTryOut is empty or not properly populated.');
        }

        if (filteredDataTryOutLiterasi.length > 0) {
            const allQuestionsLiterasi = filteredDataTryOutLiterasi.flatMap(literasiItem => {
                if (Array.isArray(literasiItem.listQuestions)) {
                    return literasiItem.listQuestions;
                } else {
                    console.warn('No listQuestions found in:', literasiItem);
                    return [];
                }
            });
            combinedQuestions.push(...allQuestionsLiterasi);
        } else {
            console.warn('filteredDataTryOutLiterasi is empty or not properly populated.');
        }

        setAllQuestions(combinedQuestions);
    }, [filteredDataTryOut, filteredDataTryOutLiterasi]);


    // useEffect(() => {
    //     if (timeLeft <= 0) {
    //         handleSubmit();
    //         router.push(`/pages/tryout/question/${id}/detail/selesai`);
    //         return;
    //     }

    //     const timer = setInterval(() => {
    //         setTimeLeft(prevTime => prevTime - 1);
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, [timeLeft, id]);

    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = seconds % 60;
    //     return `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
    // };

    const updateYourAnswer = async () => {
        const docRef = doc(db, 'questions_v1', id);

        try {
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                console.log('No such document!');
                return;
            }

            const data = docSnap.data();
            let dataQuestion = null;
            const tpsIndex = data.tps.findIndex(item => item.listQuestions);

            if (tpsIndex !== -1) {
                dataQuestion = data.tps[tpsIndex];
            }

            if (!dataQuestion) {
                console.log('Could not find matching tps with listQuestions');
                return;
            }

            const updatedListQuestions = dataQuestion.listQuestions.map((question, index) => ({
                ...question,
                yourAnswer: selectedChoices[index] || []
            }));

            const updatedTps = data.tps.map((item, index) =>
                index === tpsIndex
                    ? { ...item, listQuestions: updatedListQuestions }
                    : item
            );

            await updateDoc(docRef, {
                tps: updatedTps
            });

            console.log('Document successfully updated with yourAnswer!');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleSelect = (choiceIndexOrValue) => {
        const currentQuestion = allQuestions[selectedIndex];

        if (currentQuestion.type === 'banyak_pilihan') {
            setSelectedChoices((prev) => {
                const prevChoices = prev[selectedIndex] || [];
                const selectedItem = currentQuestion.options[choiceIndexOrValue];

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
            const selectedItem = currentQuestion.options[choiceIndexOrValue].option;
            setSelectedChoices((prev) => ({
                ...prev,
                [selectedIndex]: [selectedItem],
            }));
        } else {
            const selectedItem = currentQuestion.options[choiceIndexOrValue];
            setSelectedChoices((prev) => ({
                ...prev,
                [selectedIndex]: [selectedItem],
            }));
        }
    };

    // const handleSubmit = () => {
    //     updateYourAnswer();
    // };



    const idSoal = filteredDataTryOut.map((question, index) => {
        console.log('item', question.listQuestions.answer);
        return {
            questionId: question.id, // The question ID
            listQuestions: question.listQuestions,
            // answer: selectedChoices[index], // User's answer for this question
            // answer: selectedChoices[index + question.listQuestions.length] || [], // User's answer for this question
        };
    });

    console.log('haha', filteredDataTryOut)
    // Create the array for filteredDataTryOutLiterasi
    const idSoalLiterasi = filteredDataTryOutLiterasi.map((question, index) => {
        return {
            questionId: question.id, // The question ID
            listQuestions: question.listQuestions,
            // answer: selectedChoices[index], // User's answer, offset by the length of filteredDataTryOut
            // answer: selectedChoices[index + question.listQuestions.length] || [], // User's answer, offset by the length of filteredDataTryOut
        };
    });
    
    console.log('face', allQuestions)

    // Combine both arrays into one
    const combinedIdSoal = [...idSoal, ...idSoalLiterasi];


    const handleSubmit = async () => {
        try {
            // Create a new document in the "userAnswer" collection with the current user's answers
            const userAnswersRef = collection(db, 'userAnswer');
            const newDocRef = doc(userAnswersRef); // Generate a new document reference
    
            // Initialize a variable to keep track of the current index in selectedChoices
            let currentIndex = 0;
    
            const formattedAnswers = combinedIdSoal.map((item) => {
                // Clone the listQuestions to avoid mutating the original state directly
                const updatedListQuestions = item.listQuestions.map((question) => {
                    // Clone the question object
                    const updatedQuestion = { ...question };
    
                    // Add answerSelect object to the question using currentIndex
                    updatedQuestion.answerSelect = selectedChoices[currentIndex] || [];
    
                    // Increment currentIndex to move to the next answer in selectedChoices
                    currentIndex++;
    
                    return updatedQuestion;
                });
    
                return {
                    questionId: item.questionId,
                    listQuestions: updatedListQuestions,
                };
            });
    
            console.log('see', formattedAnswers);
    
            const userAnswersData = {
                userId: 'user-id-placeholder', // Replace with actual user ID if available
                tryoutId: id, // The ID of the tryout or session
                answers: formattedAnswers, // Now contains listQuestions with updated answerSelect
                submittedAt: new Date(), // Timestamp of submission
            };
    
            await setDoc(newDocRef, userAnswersData);
            console.log('User answers successfully saved to Firestore!');
    
            // Optionally call the existing updateYourAnswer function if you also need to update answers in another collection
            await updateYourAnswer();
    
            // Redirect to the finish page after successful submission
            router.push(`/pages/tryout/question/${id}/detail/selesai`);
    
        } catch (error) {
            console.error('Error saving user answers:', error);
        }
    };

    // const progressBarWidth = (timeLeft / waktu) * 100;
    // const progressBarColor = timeLeft <= 50 ? 'red' : '#007bff';

    const handleFinish = () => {
        router.push(`/pages/tryout/question/${id}/detail/selesai`);
    };

    if (!detailData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="position-absolute bg-white p-3" style={{ minHeight: '100vh', width: '100%', zIndex: '99999', top: 0, left: 0 }}>
                {/* <div className="d-flex justify-content-between mb-4">
                    <h1>{detailData.toName}</h1>
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
                </div> */}
                <Row>
                    <Col sm="12" lg="9">
                        {selectedIndex !== null && allQuestions[selectedIndex] && (
                            <span>
                                <section>
                                    <div className="bg-graylg p-4 rounded-3" style={{ height: '45vh' }}>
                                        <p className="">{allQuestions[selectedIndex].question}</p>
                                        <div className="border-primer h-75 w-25">
                                            Image
                                        </div>
                                    </div>
                                </section>
                                {allQuestions[selectedIndex].type === 'pilihan_ganda' ? (
                                    <section className="mt-4">
                                        <Form>
                                            {allQuestions[selectedIndex].options.map((option, choiceIndex) => (
                                                <span key={choiceIndex}>
                                                    <FormGroup check>
                                                        <Input
                                                            name={`radio-${selectedIndex}`}
                                                            type="radio"
                                                            checked={selectedChoices[selectedIndex]?.[0] === option}
                                                            onChange={() => handleSelect(choiceIndex)}
                                                        />{' '}
                                                        <div
                                                            check
                                                            className="form-label bg-graylg w-50 rounded-3 ms-2 p-2"
                                                            style={{ minHeight: '100px' }}
                                                        >
                                                            {option}
                                                        </div>
                                                    </FormGroup>
                                                </span>
                                            ))}
                                        </Form>
                                    </section>
                                ) : allQuestions[selectedIndex].type === 'benar_salah' ? (
                                    <section className="mt-4">
                                        {allQuestions[selectedIndex].options.map((option, choiceIndex) => (
                                            <span key={choiceIndex} className="d-flex mb-2">
                                                <div className="bg-graylg rounded-3 me-3 p-2" style={{ height: '100px', width: '85%' }}>
                                                    {option.option}
                                                </div>
                                                <Form style={{ height: '100px', width: '15%' }}>
                                                    <div className="bg-graylg rounded-3 d-flex h-100 w-100 justify-content-between" >
                                                        <FormGroup check className="d-flex w-50 m-0 p-0 flex-column align-items-center justify-content-center" >
                                                            <Label>Benar</Label>
                                                            <Input name="radio1" type="radio" className="mx-auto"
                                                                onChange={() => handleSelect(choiceIndex)} />{' '}
                                                        </FormGroup>
                                                        <hr className="border border-1 border-black" />
                                                        <FormGroup check className="d-flex m-0 p-0 w-50 flex-column align-items-center justify-content-center" >
                                                            <Label>Salah</Label>
                                                            <Input name="radio1" type="radio" className="mx-auto"
                                                                onChange={() => handleSelect(choiceIndex)} />{' '}
                                                        </FormGroup>
                                                    </div>
                                                </Form>
                                            </span>
                                        ))}
                                    </section>
                                ) : allQuestions[selectedIndex].type === 'isian' ? (
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
                                                        value={selectedChoices[selectedIndex]?.[0] || ''}
                                                    />
                                                </FormGroup>
                                            </span>
                                        </Form>
                                    </section>
                                ) : (
                                    <section className="mt-4">
                                        <Form>
                                            {allQuestions[selectedIndex].options.map((option, choiceIndex) => (
                                                <span key={choiceIndex} className="d-flex align-items-center mb-2">
                                                    <div className={`form-label bg-graylg w-50 rounded-3 ms-2 p-2 me-2`} style={{ minHeight: '50px' }}>
                                                        {option}
                                                    </div>
                                                    <FormGroup check>
                                                        <Input
                                                            name={`checkbox-${selectedIndex}-${choiceIndex}`}
                                                            type="checkbox"
                                                            onChange={() => handleSelect(choiceIndex)}
                                                            checked={selectedChoices[selectedIndex]?.includes(option) || false}
                                                            className="form-check-input"
                                                        />{' '}
                                                    </FormGroup>
                                                </span>
                                            ))}
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
                                {allQuestions.map((item, index) => (
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
                                        className={`border-0 w-100 rounded-5 bg-primy ${selectedIndex === allQuestions.length - 1 ? 'bg-warning' : 'bg-primy'}`}
                                        onClick={selectedIndex === allQuestions.length - 1 ? handleSubmit : handleNext}
                                    >
                                        {selectedIndex === allQuestions.length - 1 ? "Selesai" : "Selanjutnya ≫"}
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </div>
        </>
    );
}
