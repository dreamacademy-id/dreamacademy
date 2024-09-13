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
import child from "../../../../../../../../public/images/background/child.png"
import DOMPurify from "dompurify";
import ProtectedRoute from "../../../ProtectedRoute";

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
    const [nextSubTest, setNextSubTest] = useState(false);
    const [formState, setFormState] = useState({
        listQuestion: []
    });

    const handleItemClick = (index) => {
        setSelectedIndex(index);
        setSelectedChoiceIndex(null);
    };

    const waktu = 1800;
    const [timeLeft, setTimeLeft] = useState(waktu);
    const router = useRouter();

    const handlePrevious = () => {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, currentListQuestions.length - 1));
    };

    const [canExecute, setCanExecute] = useState(false);
    const [timeExecute, setTimeExecute] = useState(20); // 120 seconds for 2 minutes


    useEffect(() => {
        // Set an interval to decrease the time left every second
        const timerInterval = setInterval(() => {
            setTimeExecute(prev => {
                if (prev <= 1) {
                    clearInterval(timerInterval); // Clear the interval when timeLeft reaches 0
                    setCanExecute(true); // Enable the button after 2 minutes
                    return 0;
                }
                return prev - 1;
            });
        }, 1000); // Update every second

        // Clean up the interval when the component unmounts
        return () => clearInterval(timerInterval);
    }, []);

    console.log('vela', timeExecute);

    const handleNextSubTest = () => {
        setNextSubTest(true);
    }

    const { id } = useParams();
    const [detailData, setDetailData] = useState(null);
    const [dataTryOut, setDataTryOut] = useState([]);
    const [filteredDataTryOut, setFilteredDataTryOut] = useState([]);
    const [filteredDataTryOutLiterasi, setFilteredDataTryOutLiterasi] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const safeHTML = DOMPurify.sanitize(allQuestions);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

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

    // useEffect(() => {
    //     if (id) {
    //         const fetchDetailData = async () => {
    //             const docRef = doc(db, 'tryout_v1', id);
    //             const docSnap = await getDoc(docRef);
    //             if (docSnap.exists()) {
    //                 const data = docSnap.data();
    //                 setDetailData(data);

    //                 const tpsListSubtests = data.listTest
    //                     .filter(item => item.nameTest === "TPS")
    //                     .flatMap(element => element.listSubtest);

    //                 const literasiListSubtests = data.listTest
    //                     .filter(item => item.nameTest === "Tes Literasi")
    //                     .flatMap(element => element.listSubtest);

    //                 const idQuestionsList = tpsListSubtests.map(subtest => subtest.idQuestions);
    //                 const idQuestionsListLiterasi = literasiListSubtests.map(subtest => subtest.idQuestions);

    //                 const filteredData = dataTryOut.filter(dataItem =>
    //                     idQuestionsList.includes(dataItem.id)
    //                 );

    //                 const filteredDataLiterasi = dataTryOut.filter(dataItem =>
    //                     idQuestionsListLiterasi.includes(dataItem.id)
    //                 );

    //                 setFilteredDataTryOut(filteredData);
    //                 setFilteredDataTryOutLiterasi(filteredDataLiterasi);
    //             } else {
    //                 console.log('No such document!');
    //             }
    //         };
    //         fetchDetailData();
    //     }
    // }, [id, dataTryOut]);

    // useEffect(() => {
    //     const tpsQuestions = [];
    //     const combinedQuestions = [];

    //     if (filteredDataTryOut.length > 0) {
    //         const allQuestionsTPS = filteredDataTryOut.flatMap(tpsItem => {
    //             if (Array.isArray(tpsItem.listQuestions)) {
    //                 return tpsItem.listQuestions;
    //             } else {
    //                 console.warn('No listQuestions found in:', tpsItem);
    //                 return [];
    //             }
    //         });
    //         tpsQuestions.push(...allQuestionsTPS);
    //     } else {
    //         console.warn('filteredDataTryOut is empty or not properly populated.');
    //     }

    //     if (filteredDataTryOutLiterasi.length > 0) {
    //         const allQuestionsLiterasi = filteredDataTryOutLiterasi.flatMap(literasiItem => {
    //             if (Array.isArray(literasiItem.listQuestions)) {
    //                 return literasiItem.listQuestions;
    //             } else {
    //                 console.warn('No listQuestions found in:', literasiItem);
    //                 return [];
    //             }
    //         });
    //         combinedQuestions.push(...allQuestionsLiterasi);
    //     } else {
    //         console.warn('filteredDataTryOutLiterasi is empty or not properly populated.');
    //     }

    //     setAllQuestions(tpsQuestions);
    // }, [filteredDataTryOut, filteredDataTryOutLiterasi]);

    const [currentFilteredIndex, setCurrentFilteredIndex] = useState(0); // Untuk melacak indeks di filteredDataTryOut
    const [currentListQuestions, setCurrentListQuestions] = useState([]); // Untuk menyimpan listQuestions dari indeks saat ini
    const [isFixed, setIsFixed] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);

    console.log('per', currentFilteredIndex);


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

                    setFilteredDataTryOut(filteredData);
                } else {
                    console.log('No such document!');
                }
            };
            fetchDetailData();
        }
    }, [id, dataTryOut]);

    useEffect(() => {
        // Mengambil listQuestions dari indeks filteredDataTryOut saat ini
        if (filteredDataTryOut.length > 0) {
            const questions = filteredDataTryOut[currentFilteredIndex]?.listQuestions || [];
            setCurrentListQuestions(questions);
        }
    }, [filteredDataTryOut, currentFilteredIndex]);

    const handleNextListQuestions = () => {
        if (canExecute) {
            if (currentFilteredIndex < filteredDataTryOut.length - 1) {
                setCurrentFilteredIndex(prevIndex => {
                    const newIndex = prevIndex + 1;
                    setSelectedIndex(0); // Reset selectedIndex to 0 for the new subtest
                    return newIndex;
                });
            } else {
                console.log("End of all listQuestions in filteredDataTryOut");
            }
            setNextSubTest(false);
        }
    };

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


    useEffect(() => {
        const handleScroll = () => {
            const offsetTop = document.getElementById('nomorSoal').offsetTop;
            if (window.scrollY > offsetTop) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(1, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
    };

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
        const currentQuestion = currentListQuestions[selectedIndex];

        setSelectedAnswers(prev => {
            const updatedSubTestAnswers = prev[currentFilteredIndex] || {};
            const updatedChoices = updatedSubTestAnswers[selectedIndex] || [];

            let newChoices;

            if (currentQuestion.type === 'banyak_pilihan') {
                const selectedItem = currentQuestion.options[choiceIndexOrValue];
                newChoices = updatedChoices.includes(selectedItem)
                    ? updatedChoices.filter(item => item !== selectedItem)
                    : [...updatedChoices, selectedItem];
            } else if (currentQuestion.type === 'isian') {
                newChoices = [choiceIndexOrValue.trim()];
            } else if (currentQuestion.type === 'benar_salah') {
                const selectedItem = currentQuestion.options[choiceIndexOrValue].option;
                newChoices = [selectedItem];
            } else {
                const selectedItem = currentQuestion.options[choiceIndexOrValue];
                newChoices = [selectedItem];
            }

            const newSubTestAnswers = {
                ...updatedSubTestAnswers,
                [selectedIndex]: newChoices,
            };

            const newAnswers = [...prev];
            newAnswers[currentFilteredIndex] = newSubTestAnswers;

            return newAnswers;
        });
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
            const userAnswersRef = collection(db, 'userAnswer');
            const newDocRef = doc(userAnswersRef);

            const formattedAnswers = filteredDataTryOut.map((question, subTestIndex) => {
                const updatedListQuestions = question.listQuestions.map((question, questionIndex) => {
                    return {
                        ...question,
                        answerSelect: selectedAnswers[subTestIndex]?.[questionIndex] || [],
                    };
                });

                return {
                    questionId: question.id,
                    listQuestions: updatedListQuestions,
                };
            });

            const userAnswersData = {
                userId: 'user-id-placeholder',
                tryoutId: id,
                answers: formattedAnswers,
                timeLeft: formatTime(timeLeft),
                submittedAt: new Date(),
            };

            await setDoc(newDocRef, userAnswersData);
            console.log('User answers successfully saved to Firestore!');
            await updateYourAnswer();

            router.push(`/pages/tryout/question/${id}/detail/selesai`);

        } catch (error) {
            console.error('Error saving user answers:', error);
        }
    };


    const progressBarWidth = (timeLeft / waktu) * 100;
    const progressBarColor = timeLeft <= 50 ? 'red' : '#007bff';

    const handleFinish = () => {
        router.push(`/pages/tryout/question/${id}/detail/selesai`);
    };

    if (!detailData) {
        return <div>Loading...</div>;
    }

    console.log('time', formatTime(timeLeft));

    currentListQuestions.map((question, index) => {
        console.log('oii', question.question)
    })


    const lastIndex = filteredDataTryOut.length - 1;


    return (
        <ProtectedRoute>
            {!nextSubTest ? (
                <div className="position-absolute bg-white p-3 qustionSaya" style={{ minHeight: '100vh', overflowY: 'auto', width: '100%', zIndex: '99999', top: 0, left: 0 }}>
                    <div className="d-flex justify-content-between mb-2 mb-lg-4 pb-2 pb-lg-0">
                        <h1 className='mx-auto mx-lg-0 mt-lg-0 mt-5'>{detailData.toName}</h1>
                        <span className={`${window.innerWidth < 576 ? 'w-100 px-3 bg-white' : 'w-25'} ms-5 position-fixed pe-2`} style={{ right: 0, top: window.innerWidth < 576 && '0%', zIndex: '999' }}>
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
                        <Col sm="12" lg="9" className='order-2 order-sm-1'>
                            {selectedIndex !== null && currentListQuestions[selectedIndex] && (
                                <span>
                                    <section>
                                        <div className="bg-graylg p-4 rounded-3 pt-lg-4" style={{ minHeight: '45vh', height: '100%' }}>
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentListQuestions[selectedIndex].question) }} />
                                            <div className={`border-primer h-75 ${window.innerWidth < 576 ? 'w-100' : 'w-25'} `}>
                                                Image
                                            </div>
                                        </div>
                                    </section>
                                    {currentListQuestions[selectedIndex].type === 'pilihan_ganda' ? (
                                        <section className="mt-4">
                                            <Form>
                                                {currentListQuestions[selectedIndex].options.map((option, choiceIndex) => (
                                                    <span key={choiceIndex}>
                                                        <FormGroup check>
                                                            <Input
                                                                name={`radio-${selectedIndex}`}
                                                                type="radio"
                                                                // checked={selectedChoices[selectedIndex]?.[0] === option}
                                                                checked={selectedAnswers[currentFilteredIndex]?.[selectedIndex]?.includes(option) || false}
                                                                onChange={() => handleSelect(choiceIndex)}
                                                            />{' '}
                                                            <div
                                                                check
                                                                className={`form-label bg-graylg ${window.innerWidth < 576 ? 'w-100' : 'w-50'} rounded-3 ms-2 p-2`}
                                                                style={{ minHeight: '100px' }}
                                                            >
                                                                {option}
                                                            </div>
                                                        </FormGroup>
                                                    </span>
                                                ))}
                                            </Form>
                                        </section>
                                    ) : currentListQuestions[selectedIndex].type === 'benar_salah' ? (
                                        <section className="mt-4">
                                            {currentListQuestions[selectedIndex].options.map((option, choiceIndex) => (
                                                <span key={choiceIndex} className="d-flex mb-2">
                                                    <div className="bg-graylg rounded-3 me-3 p-2" style={{ height: '100px', width: window.innerWidth < 576 ? '70%' : '85%'  }}>
                                                        {option.option}
                                                    </div>
                                                    <Form style={{ height: '100px', width: window.innerWidth < 576 ? '30%' : '15%' }}>
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
                                    ) : currentListQuestions[selectedIndex].type === 'isian' ? (
                                        <section className="mt-4">
                                            <Form>
                                                <span className="d-flex mb-2">
                                                    <p>Jawaban Anda : </p>
                                                    <FormGroup className="w-75 rounded-3 ms-3">
                                                        <Input
                                                            id="exampleTextarea"
                                                            name="textarea"
                                                            placeholder="misal : dummy text ever since the 1500s"
                                                            type="textarea"
                                                            className="w-100"
                                                            onChange={(e) => handleSelect(e.target.value)}
                                                        // value={selectedAnswers[selectedIndex]?.[0] || ''}
                                                        />
                                                    </FormGroup>
                                                </span>
                                            </Form>
                                        </section>
                                    ) : (
                                        <section className="mt-4">
                                            <Form>
                                                {currentListQuestions[selectedIndex].options.map((option, choiceIndex) => (
                                                    <span key={choiceIndex} className="d-flex align-items-center mb-2">
                                                        <div className={`form-label bg-graylg ${window.innerWidth < 576 ? 'w-100' : 'w-50'} rounded-3 ms-2 p-2 me-2`} style={{ minHeight: '50px' }}>
                                                            {option}
                                                        </div>
                                                        <FormGroup check>
                                                            <Input
                                                                name={`checkbox-${selectedIndex}-${choiceIndex}`}
                                                                type="checkbox"
                                                                onChange={() => handleSelect(choiceIndex)}
                                                                checked={selectedAnswers[currentFilteredIndex]?.[selectedIndex]?.includes(option) || false}
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
                        <Col sm="12" lg="3" className={` ${window.innerWidth < 576 ? 'position-relative' : 'position-fixed'} identitas order-1 order-sm-2 mb-3`} style={{ right: 0 }}>
                            <section className="numberBoard bg-graylg p-4 rounded-3">
                                <div className="text-center">
                                    <Image src={user1} alt="" className="rounded-circle" />
                                    <h5 className="fw-bolder mt-1">Ismail bin Mail</h5>
                                </div>
                                <div>
                                    <div className="grid-container dipilih my-5">
                                        {currentListQuestions.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`grid-item ${selectedIndex === index ? 'selected' : ''} ${selectedAnswers[currentFilteredIndex]?.[index] !== undefined ? 'bg-hijau border-0 text-white' : ''}`}
                                                onClick={() => handleItemClick(index)}
                                            >
                                                {index + 1}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`d-flex justify-content-between w-100 gap-2 mt-4 nomorSoal ${isFixed ? 'fixed w-75 bg-white px-4 py-2' : 'relative'}`} id="nomorSoal" style={isFixed ? { position: 'fixed', top: '2.5%', right: 0, boxShadow: '0px 6px 10px -6px rgba(0,0,0,0.75)' } : { position: 'relative' }}>
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
                                                className={`border-0 w-100 rounded-5 bg-primy ${selectedIndex === currentListQuestions.length - 1 ? 'bg-warning' : 'bg-primy'}`}
                                                // onClick={selectedIndex === currentListQuestions.length - 1 ? handleSubmit : handleNext}
                                                onClick={
                                                    selectedIndex === currentListQuestions.length - 1
                                                        ? (currentFilteredIndex === lastIndex ? handleSubmit : handleNextSubTest)
                                                        : handleNext
                                                }
                                            >
                                                {/* {selectedIndex === currentListQuestions.length - 1 ? "Selesai" : "Selanjutnya ≫"} */}
                                                {selectedIndex === currentListQuestions.length - 1 ? "Selesai" : "Selanjutnya ≫"}
                                            </Button>
                                            {/* <Button onClick={handleNextListQuestions}>Finish</Button> */}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div className="position-fixed" style={{ left: 0, top: 0, height: '100vh', width: '100vw', zIndex: '99999' }}>
                    <div className="position-fixed bg-white w-100 d-flex justify-content-center align-items-center" style={{ height: '100vh', zIndex: '99999', top: 0, left: 0 }}>
                        <div className={` ${window.innerWidth < 576 ? 'w-100' : 'w-50'} py-5 d-flex flex-column justify-content-between align-items-center h-100`}>
                            <section className="text-center">
                                <svg width="121" height="141" viewBox="0 0 121 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M47.0476 13.4286C43.3394 13.4286 40.3333 10.4225 40.3333 6.71428V6.71428C40.3333 3.00609 43.3394 0 47.0476 0H73.9524C77.6606 0 80.6667 3.00609 80.6667 6.71428V6.71428C80.6667 10.4225 77.6606 13.4286 73.9524 13.4286H47.0476ZM53.7778 80.5635C53.7778 84.276 56.7874 87.2857 60.5 87.2857V87.2857C64.2126 87.2857 67.2222 84.276 67.2222 80.5635V53.7222C67.2222 50.0096 64.2126 47 60.5 47V47C56.7874 47 53.7778 50.0096 53.7778 53.7222V80.5635ZM60.5 141C52.2093 141 44.3936 139.406 37.0529 136.219C29.7122 133.032 23.2992 128.695 17.8139 123.207C12.3286 117.719 7.98824 111.312 4.79294 103.984C1.59765 96.6566 0 88.8524 0 80.5714C0 72.2905 1.59765 64.484 4.79294 57.152C7.98824 49.82 12.3286 43.4146 17.8139 37.9357C23.2992 32.4568 29.7145 28.1217 37.0596 24.9301C44.4048 21.7386 52.2182 20.1429 60.5 20.1429C67.4463 20.1429 74.1125 21.2619 80.4986 23.5C84.987 25.073 89.2817 27.1435 93.3826 29.7115C96.3936 31.597 100.353 31.3652 102.867 28.8547L103.192 28.5302C105.788 25.9366 109.995 25.9366 112.592 28.5301V28.5301C115.193 31.1281 115.193 35.3434 112.592 37.9413L112.278 38.2547C109.766 40.7638 109.534 44.7225 111.421 47.7297C113.992 51.8252 116.064 56.1141 117.639 60.5964C119.88 66.975 121 73.6333 121 80.5714C121 88.8524 119.402 96.6588 116.207 103.991C113.012 111.323 108.671 117.728 103.186 123.207C97.7008 128.686 91.2855 133.023 83.9404 136.219C76.5952 139.415 68.7818 141.009 60.5 141ZM60.5 127.571C73.4963 127.571 84.588 122.983 93.775 113.807C102.962 104.631 107.556 93.5524 107.556 80.5714C107.556 67.5905 102.962 56.5119 93.775 47.3357C84.588 38.1595 73.4963 33.5714 60.5 33.5714C47.5037 33.5714 36.412 38.1595 27.225 47.3357C18.038 56.5119 13.4444 67.5905 13.4444 80.5714C13.4444 93.5524 18.038 104.631 27.225 113.807C36.412 122.983 47.5037 127.571 60.5 127.571Z" fill="#27B262" />
                                </svg>
                                <h1 className="fw-bolder my-3">
                                    {formatTime(timeExecute)}
                                </h1>
                                <p className="text-muted">Tuggu hingga waktu selesai untuk melanjutkan Tryout</p>
                            </section>
                            <section className="d-flex flex-column align-items-center">
                                <Image src={child} alt="" className={`${window.innerWidth < 576 && 'object-fit-contain mb-2'}`} style={{width: window.innerWidth < 576 && '100%'}} />
                                <Button className="rounded-5 bg-primy border-0 px-5"
                                    onClick={handleNextListQuestions}
                                >Kembali Ke Try Out Saya</Button>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </ProtectedRoute>
    );
}
