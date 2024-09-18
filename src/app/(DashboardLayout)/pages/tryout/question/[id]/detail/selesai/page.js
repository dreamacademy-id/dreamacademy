'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"
import youtube from "../../../../../../../../../public/images/background/youtube.png"
import { useParams, useRouter } from "next/navigation";
import { db } from "../../../../../../../../../public/firebaseConfig";
import { getDocs, getDoc, collection, updateDoc, deleteDoc, doc, addDoc, setDoc, where, query } from "firebase/firestore";
import DOMPurify from "dompurify";
import { element } from "prop-types";
import ProtectedRoute from "../../../../ProtectedRoute";
import { useAuth } from "../../../../../../../../../public/AuthContext";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'userAnswer'));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function Selesai() {
    let jawabanAda = { ada: 0, kosong: 0 };
    const TPS = ["Kemampuan Penalaran Umum", "Pengetahuan dan Pemahaman Umum", "Kemampuan Memahami Bacaan & Menulis", "Pengetahuan Kuantitatif"];
    const TL = ["Literasi dalam Bahasa Indonesia", "Literasi datam Bahasa Inggris"];
    const ket = ["Benar", "Salah", "Kosong"]
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [detail, setDetail] = useState(true);
    const [icon, setIcon] = useState(true);
    const [detailIndex, setDetailIndex] = useState(0);
    const [dataUserAnswers, setdataUserAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setdataUserAnswers(data);
        }
        fetchData();
    }, []);

    let emelents = [];
    let indexQuestio = [];
    emelents = element.answers
    dataUserAnswers?.answers?.listQuestions.map(element => {

    });
    console.log('hee', dataUserAnswers);

    // emelents.forEach(items => {
    //     indexQuestio = items.listQuestions;
    // })


    const handleDetail = (index) => {
        setDetail(false);
        setIcon(false);
        setDetailIndex(index);
    }

    const handelIcon = (index) => {
        setIcon(true);
        setDetail(true);
        setDetailIndex(index);
    }

    const { id } = useParams(); // Ambil parameter dinamis dari URL
    const { currentUser } = useAuth(); // Get the current logged-in user
    const [detailData, setDetailData] = useState(null);
    const [allQuestions, setAllQuestions] = useState([]);
    const [dataUserAnswer, setDataUserAnswer] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState([]); // State for tracking selected questions

    useEffect(() => {
        if (allQuestions.length > 0) {
            // Automatically set the first question as selected when allQuestions is populated
            setSelectedQuestion([allQuestions[0]]); // Set first question as array
        }
    }, [allQuestions]);

    const handleItemClick = (item, index) => {
        // Ensure item is added as an array, even if it's a single element
        if (Array.isArray(item)) {
            setSelectedQuestion(item);
        } else {
            setSelectedQuestion([item]);
        }
        setSelectedIndex(index)
    };

    // Safely check if selectedQuestion is an array before using forEach
    if (Array.isArray(selectedQuestion)) {
        selectedQuestion.forEach(element => {
            console.log('detail', element);
        });
    } else {
        console.warn('selectedQuestion is not an array:', selectedQuestion);
    }

    console.warn('selectedQuestion:', selectedQuestion);

    useEffect(() => {
        if (id) {
            const fetchDetailData = async () => {
                const docRef = doc(db, 'tryout_v1', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDetailData(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            };
            fetchDetailData();
        }
    }, [id]);

    useEffect(() => {
        const fetchUserAnswers = async () => {
            if (!currentUser || !id) return;

            try {
                // Query to get the current user's answers for this specific tryout
                const q = query(
                    collection(db, 'userAnswer'),
                    where('userId', '==', currentUser.uid), // Only fetch answers by the logged-in user
                    where('tryoutId', '==', id) // Only fetch answers for the current tryout
                );

                const querySnapshot = await getDocs(q);
                const userAnswers = [];

                querySnapshot.forEach(doc => {
                    userAnswers.push(doc.data());
                });

                console.log('Filtered user answers:', userAnswers);

                setDataUserAnswer(userAnswers);
            } catch (error) {
                console.error('Error fetching user answers:', error);
            }
        };

        fetchUserAnswers();
    }, [currentUser, id]);


    useEffect(() => {
        const combinedQuestions = [];

        if (dataUserAnswer.length > 0) {
            const allQuestions = dataUserAnswer.flatMap(tpsItem => {
                if (Array.isArray(tpsItem.answers)) {
                    return tpsItem.answers.flatMap(answerItem => {
                        if (Array.isArray(answerItem.listQuestions)) {
                            return answerItem.listQuestions.map(question => ({
                                ...question,
                                answerSelect: question.answerSelect || [] // Default to empty array if undefined
                            }));
                        } else {
                            console.warn('No listQuestions found in:', answerItem);
                            return [];
                        }
                    });
                } else {
                    console.warn('No answers found in:', tpsItem);
                    return [];
                }
            });

            combinedQuestions.push(...allQuestions);
        } else {
            console.warn('dataUserAnswer is empty or not properly populated.');
        }

        setAllQuestions(combinedQuestions);
    }, [dataUserAnswer]);

    console.log('ques', allQuestions);

    useEffect(() => {
        // Set a timeout of 5 seconds (5000 milliseconds) for loading
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        // Clear timeout if the component unmounts before the 5 seconds
        return () => clearTimeout(loadingTimer);
    }, []);

    if (isLoading || !detailData) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <h3 className="loading-text">Loading, please wait...</h3>
            </div>
        );
    }


    // Filter and flatten the listSubtest arrays for both TPS and Literasi tests
    const tpsName = detailData?.listTest
        ?.filter(item => item.nameTest === "TPS")
        ?.flatMap(element => element.listSubtest || []);


    const literasiName = detailData?.listTest
        ?.filter(item => item.nameTest === "Tes Literasi")
        ?.flatMap(element => element.listSubtest || []);

    // Log the name property of each item in the tpsName array
    tpsName.forEach(subtest => {
        if (subtest && typeof subtest === 'object') {
            console.log('TPS Test Name:', subtest.name);
        } else {
            console.warn('Unexpected item in tpsName:', subtest);
        }
    });

    console.log('tps', tpsName);

    // Log the name property of each item in the literasiName array
    literasiName.forEach(subtest => {
        if (subtest && typeof subtest === 'object') {
            console.log('Literasi Test Name:', subtest.name);
        } else {
            console.warn('Unexpected item in literasiName:', subtest);
        }
    });

    const checkCorrectAnswer = (answerSelect, trueAnswer) => {
        if (Array.isArray(trueAnswer) && Array.isArray(answerSelect)) {
            // Case 1: Both trueAnswer and answerSelect are arrays of objects
            if (typeof trueAnswer[0] === 'object' && typeof answerSelect[0] === 'object') {
                return answerSelect.every(selectItem =>
                    trueAnswer.some(trueItem =>
                        selectItem.option === trueItem.option && selectItem.answer === trueItem.trueAnswer
                    )
                );
            }
            // Case 2: trueAnswer and answerSelect are both arrays of strings or values
            const filledTrueAnswer = trueAnswer.filter(ans => ans.trim());  // Filter out empty or whitespace answers

            // Check if the number of non-empty elements in trueAnswer matches answerSelect's length
            if (filledTrueAnswer.length !== answerSelect.length) {
                return false;
            }

            // Ensure every value in answerSelect exists in trueAnswer (ignoring empty strings)
            return answerSelect.every(ans => filledTrueAnswer.includes(ans));
        }
        // Case 3: trueAnswer is a string or value, answerSelect is an array
        else if (!Array.isArray(trueAnswer) && Array.isArray(answerSelect)) {
            return answerSelect.includes(trueAnswer);
        }
        // Case 4: trueAnswer is an array, answerSelect is a single value
        else if (Array.isArray(trueAnswer) && !Array.isArray(answerSelect)) {
            return trueAnswer.includes(answerSelect);
        }
        // Case 5: trueAnswer and answerSelect are both single values
        else {
            return answerSelect === trueAnswer;
        }
    };

    let benar = 0;
    let salah = 0;
    let kosong = 0;

    allQuestions.forEach((data) => {
        // Periksa apakah answerSelect tidak kosong
        if (data.answerSelect && data.answerSelect.length > 0) {
            // Periksa apakah answerSelect dan trueAnswer memiliki nilai yang sama
            const isCorrect = data.answerSelect.every(
                (answer, index) => data.trueAnswer.includes(answer)
            );

            if (isCorrect) {
                benar += 1;
            } else {
                salah += 1;
            }
        } else {
            kosong += 1;
        }
        console.log('do', data);
    });


    console.log('Jumlah benar:', benar);
    console.log('Jumlah salah:', salah);
    console.log('Jumlah kosong:', kosong);


    const right = [benar, salah, kosong];


    const avarage = (benar / 10) * 1000;

    return (
        <ProtectedRoute>
            <div className="mt-0 mt-lg-5 pt-5 selesai">
                <Row className="mt-5 mt-lg-0">
                    <Col sm="12" lg="3">
                        <Link href="/pages/tryout#tryoutsaya">
                            <Button className="bg-primy w-100 rounded-5 border-0 mb-3">Kembali ke Dashboard TryOut</Button>
                        </Link>
                        <div className="bg-graylg p-2 rounded-3">
                            <section className="text-center d-flex flex-column align-items-center py-3">
                                <h4 className="w-75 text-center fw-bolder">{detailData.toName}</h4>
                            </section>
                            <section className="selesNilai">
                                <div>
                                    <h1 className="color-primer">{avarage}</h1>
                                    <b>Nilai rata-rata</b>
                                </div>
                                <div className="bg-transparent p-0">
                                    <div className="flex-row bg-transparent m-0 gap-2 p-0">
                                        {right.map((item, index) => (
                                            <div key={index}>
                                                <h1 className={`fw-bolder ${index === 1 ? 'color-third' : index === 2 ? 'text-black' : 'color-primer'}`}>
                                                    {item}
                                                </h1>
                                                <b>{ket[index]}</b>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                            <div className="selesaiBot">
                                <section className="mb-3">
                                    <strong>Leaderboard</strong>
                                    <div className="d-flex justify-content-between bg-white rounded-3  p-2">
                                        <p className="m-0">Peringkat</p>
                                        <b>100 / 40.000 peserta</b>
                                    </div>
                                </section>
                                <section className="mb-3">
                                    <strong>Rasionalisasi Jurusan</strong>
                                    <div className="bg-white rounded-3 d-flex flex-column justify-content-between  p-2">
                                        <span className="d-flex justify-content-between align-items-center mb-2">
                                            <span>
                                                <b>STEI</b>
                                                <p className="m-0">Institute Teknologi Bandung</p>
                                            </span>
                                            <b>50/1000</b>
                                        </span>
                                        <span className="d-flex justify-content-between align-items-center">
                                            <span>
                                                <b>Kedokteran</b>
                                                <p className="m-0">Universitas Hasanuddin</p>
                                            </span>
                                            <b>5/1500</b>
                                        </span>
                                    </div>
                                </section>
                                <section className="mb-3">
                                    <span className="d-flex justify-content-between align-items-center">
                                        <strong>Nilai dan Pembahasan</strong>
                                        <Link href="">
                                            <b className="text-decoration-underline">Report TO</b>
                                        </Link>
                                    </span>
                                    <div className="rounded-5 border-primer bg-transparent w-100" >
                                        <div className="bg-primy w-75 rounded-5" style={{ height: '10px' }}></div>
                                    </div>
                                </section>
                                <section className="mb-3">
                                    <div className="bg-white rounded-3 p-2">
                                        <span className="d-flex gap-2 align-items-center">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect y="18" width="18" height="18" rx="9" transform="rotate(-90 0 18)" fill="#9B9B9B" />
                                                <rect x="10" y="8" width="7" height="2" rx="1" transform="rotate(90 10 8)" fill="white" />
                                                <rect x="10" y="4" width="2" height="2" rx="1" transform="rotate(90 10 4)" fill="white" />
                                            </svg>
                                            <strong>Cara Melihat Pembahasan</strong>
                                        </span>
                                        <p className="my-1">
                                            Klik nomor soal untuk melihat pembahasan
                                        </p>
                                    </div>
                                </section>
                                <section>
                                    <div>
                                        <div className="mb-3">
                                            <strong className="ms-3">Tes Potensi Skolastik</strong>
                                            {tpsName.map((item, index) => (
                                                <div key={item} className="bg-white rounded-3 d-flex justify-content-between p-2 mb-2 w-100">
                                                    <p className="w-50 m-0">{item.name}</p>
                                                    <span className="d-flex justify-content-end align-items-center w-50 pe-2">
                                                        <div className={`px-3 me-2 rounded-5 text-white fw-bold ${avarage <= 900 && avarage >= 600 ? 'bg-hijau' : avarage <= 600 && avarage >= 300 ? 'bg-third' : 'bg-danger'}`}>{avarage}</div>
                                                        <svg className="cursor-pointer" width="13" height="7" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="1.59375" width="6.73825" height="1.29582" rx="0.647908" transform="rotate(45 1.59375 0)" fill="black" />
                                                            <rect x="10.207" y="0.916016" width="6.73825" height="1.29582" rx="0.647908" transform="rotate(135 10.207 0.916016)" fill="black" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <strong className="ms-3">Tes Literasi</strong>
                                            {tpsName.map((item, index) => (
                                                <div className="bg-white rounded-3 mb-2" key={index}>
                                                    <div
                                                        className="bg-white rounded-3 d-flex justify-content-between p-2 w-100"
                                                        style={{ boxShadow: '0 4px 4px 0px rgba(0,0,0,0.3)' }}
                                                    >
                                                        <p className="w-50 m-0">{item.name}</p>
                                                        <span className="d-flex justify-content-end align-items-center w-50 pe-2">
                                                            <div className="px-3 bg-warning me-2 rounded-5 text-white fw-bold">300</div>
                                                            {icon && detailIndex === index ? (
                                                                <Button className='bg-transparent m-0 p-0 border-0' onClick={() => handleDetail(index)}>
                                                                    <svg
                                                                        className="cursor-pointer"
                                                                        width="11"
                                                                        height="6"
                                                                        viewBox="0 0 11 6"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            x="9.29102"
                                                                            y="5.68164"
                                                                            width="6.73825"
                                                                            height="1.29582"
                                                                            rx="0.647908"
                                                                            transform="rotate(-135 9.29102 5.68164)"
                                                                            fill="black"
                                                                        />
                                                                        <rect
                                                                            x="0.677734"
                                                                            y="4.76562"
                                                                            width="6.73825"
                                                                            height="1.29582"
                                                                            rx="0.647908"
                                                                            transform="rotate(-45 0.677734 4.76562)"
                                                                            fill="black"
                                                                        />
                                                                    </svg>
                                                                </Button>
                                                            ) : (
                                                                <Button className='bg-transparent m-0 p-0 border-0' onClick={() => handelIcon(index)}>
                                                                    <svg
                                                                        className="cursor-pointer"
                                                                        width="13"
                                                                        height="7"
                                                                        viewBox="0 0 11 6"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            x="1.59375"
                                                                            width="6.73825"
                                                                            height="1.29582"
                                                                            rx="0.647908"
                                                                            transform="rotate(45 1.59375 0)"
                                                                            fill="black"
                                                                        />
                                                                        <rect
                                                                            x="10.207"
                                                                            y="0.916016"
                                                                            width="6.73825"
                                                                            height="1.29582"
                                                                            rx="0.647908"
                                                                            transform="rotate(135 10.207 0.916016)"
                                                                            fill="black"
                                                                        />
                                                                    </svg>
                                                                </Button>
                                                            )}
                                                        </span>
                                                    </div>
                                                    {detail && detailIndex === index && (
                                                        <div className="grid-container pb-3">
                                                            {dataUserAnswer[0].answers[index]?.listQuestions.map((question, questionIndex) => (
                                                                <div key={questionIndex}>
                                                                    {checkCorrectAnswer(question.answerSelect, question.trueAnswer) ? (
                                                                        <svg className="position-relative" style={{ left: '67%', top: '14%' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill="#27B262" />
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8C1.6 11.5346 4.46538 14.4 8 14.4ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="white" />
                                                                            <path d="M3.48873 7.40555C3.87474 7.02957 4.5006 7.02957 4.88661 7.40556L7.5053 9.95624C7.89132 10.3322 7.89132 10.9418 7.5053 11.3178C7.11929 11.6938 6.49344 11.6938 6.10742 11.3178L3.48873 8.76713C3.10272 8.39114 3.10272 7.78154 3.48873 7.40555Z" fill="white" />
                                                                            <path d="M12.5097 5.0818C12.8957 5.45778 12.8957 6.06738 12.5097 6.44337L7.5053 11.3178C7.11929 11.6938 6.49344 11.6938 6.10742 11.3178C5.72141 10.9418 5.7214 10.3322 6.10742 9.95623L11.1118 5.0818C11.4978 4.70581 12.1237 4.70581 12.5097 5.0818Z" fill="white" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg className="position-relative" style={{ left: '67%', top: '14%' }} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M16 8.45898C16 12.8773 12.4183 16.459 8 16.459C3.58172 16.459 0 12.8773 0 8.45898C0 4.04071 3.58172 0.458984 8 0.458984C12.4183 0.458984 16 4.04071 16 8.45898Z" fill="#B22727" />
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.859C11.5346 14.859 14.4 11.9936 14.4 8.45898C14.4 4.92436 11.5346 2.05898 8 2.05898C4.46538 2.05898 1.6 4.92436 1.6 8.45898C1.6 11.9936 4.46538 14.859 8 14.859ZM8 16.459C12.4183 16.459 16 12.8773 16 8.45898C16 4.04071 12.4183 0.458984 8 0.458984C3.58172 0.458984 0 4.04071 0 8.45898C0 12.8773 3.58172 16.459 8 16.459Z" fill="white" />
                                                                            <path d="M10.0343 4.79353C10.4838 4.34747 11.2126 4.34747 11.6621 4.79353C12.1116 5.23959 12.1116 5.96279 11.6621 6.40885L5.96489 12.0625C5.5154 12.5086 4.78662 12.5086 4.33712 12.0625C3.88763 11.6164 3.88763 10.8932 4.33712 10.4472L10.0343 4.79353Z" fill="white" />
                                                                            <path d="M4.3379 6.4708C3.88841 6.02474 3.88841 5.30154 4.3379 4.85548C4.7874 4.40942 5.51618 4.40942 5.96568 4.85548L11.6629 10.5091C12.1124 10.9552 12.1124 11.6784 11.6629 12.1244C11.2134 12.5705 10.4846 12.5705 10.0351 12.1244L4.3379 6.4708Z" fill="white" />
                                                                        </svg>
                                                                    )}
                                                                    <div
                                                                        className={`grid-item ${selectedIndex === questionIndex ? 'selected' : ''}`}
                                                                        onClick={() => handleItemClick(question, questionIndex)}
                                                                    >
                                                                        {questionIndex + 1}
                                                                    </div>
                                                                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M5.94595 0L7.28089 4.10855H11.6009L8.10594 6.64777L9.44089 10.7563L5.94595 8.2171L2.45101 10.7563L3.78595 6.64777L0.291015 4.10855H4.611L5.94595 0Z" fill="#F9A419" />
                                                                        <path d="M20.0006 0L21.3356 4.10855H25.6556L22.1606 6.64777L23.4956 10.7563L20.0006 8.2171L16.5057 10.7563L17.8406 6.64777L14.3457 4.10855H18.6657L20.0006 0Z" fill="#F9A419" />
                                                                        <path d="M34.0553 0L35.3903 4.10855H39.7103L36.2153 6.64777L37.5503 10.7563L34.0553 8.2171L30.5604 10.7563L31.8953 6.64777L28.4004 4.10855H32.7204L34.0553 0Z" fill="#D9D9D9" />
                                                                    </svg>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </Col >
                    <Col sm="12" lg="9">
                        <h1> soal : </h1>
                        {selectedQuestion.map((items, index) => (
                            <span key={items}>
                                <div className="d-flex">
                                    <span>
                                        <div className="px-3 py-2 bg-graylg rounded-3">
                                            {selectedIndex + 1}
                                        </div>
                                    </span>
                                    <span className="ps-3 w-100">
                                        <section>
                                            <div className={`p-3 bg-graylg rounded-3`}>
                                                <div className="m-0" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(items.question) }} />
                                            </div>
                                        </section>
                                        <section className="my-3">
                                            {items.type === 'banyak_pilihan' && (
                                                <Form>
                                                    <div className="row row-cols-3 w-100">
                                                        {items.options.map((tdata, index2) => (
                                                            <span key={tdata} className="d-flex align-items-center mb-3">
                                                                <FormGroup check>
                                                                    <Input
                                                                        name={`checkbox-${index2}`}
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        checked={items.answerSelect?.includes(tdata)}
                                                                        onChange={() => handleCheckboxChange(index, tdata)} // Add onChange handler
                                                                        readOnly
                                                                    />{' '}
                                                                </FormGroup>
                                                                <div
                                                                    check
                                                                    className={`bg-graylg w-50 rounded-3 ms-2 w-100 p-2 ${items.trueAnswer.includes(tdata) && items.answerSelect?.includes(tdata) ? 'bg-hijau text-white' : !items.trueAnswer.includes(tdata) && items.yourAnswer?.includes(tdata) || items.trueAnswer.includes(tdata) ? 'bg-third text-white' : ''}`}
                                                                    style={{ minHeight: '30px' }}
                                                                >
                                                                    {tdata}
                                                                </div>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </Form>
                                            )}
                                            {items.type == 'pilihan_ganda' && (
                                                <Form>
                                                    <div class="row row-cols-3 w-100">
                                                        {items.options.map((tdata, index2) => (
                                                            <span key={tdata} className="d-flex align-items-center mb-3">
                                                                <div class="col">
                                                                    <FormGroup check >
                                                                        <Input name="radio1" type="radio"
                                                                            checked={tdata == items.answerSelect} readOnly />{' '}
                                                                        <div check
                                                                            className={`bg-graylg w-50 rounded-3 ms-2 w-100 p-2 ${items.answerSelect[0] === items.trueAnswer && tdata === items.trueAnswer ? 'bg-hijau text-white' : items.answerSelect[0] !== items.trueAnswer && tdata === items.answerSelect[0] ? 'bg-third text-white' : ''}`} style={{ minHeight: '30px' }}
                                                                        >
                                                                            {tdata}
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </Form>
                                            )}
                                            {items.type === 'benar_salah' && (
                                                <Form>
                                                    <div className="row row-cols-2 w-100">
                                                        {items.trueAnswer.map((tdata, index2) => (
                                                            <span key={index2} className="d-flex mb-2">
                                                                <div
                                                                    className={`bg-graylg rounded-3 me-3 p-2 ${items.answerSelect[index2] && items.answerSelect[index2].answer === tdata.trueAnswer
                                                                        ? 'bg-hijau text-white'
                                                                        : items.answerSelect[index2] && items.answerSelect[index2].answer !== tdata.trueAnswer
                                                                            ? 'bg-warning text-white'
                                                                            : ''
                                                                        }`}
                                                                    style={{ height: '100px', width: '70%' }}
                                                                >
                                                                    {tdata.option}
                                                                </div>

                                                                <Form style={{ height: '100px', width: '30%' }}>
                                                                    <div className="bg-graylg rounded-3 d-flex h-100 w-100 justify-content-between">
                                                                        <FormGroup check className="d-flex w-50 m-0 p-0 flex-column align-items-center justify-content-center">
                                                                            <Label>Benar</Label>
                                                                            <Input
                                                                                name="radio1"
                                                                                type="radio"
                                                                                className="mx-auto"
                                                                                checked={items.answerSelect[index2] && items.answerSelect[index2].answer === true}
                                                                                readOnly
                                                                            />{' '}
                                                                        </FormGroup>
                                                                        <hr className="border border-1 border-black" />
                                                                        <FormGroup check className="d-flex m-0 p-0 w-50 flex-column align-items-center justify-content-center">
                                                                            <Label>Salah</Label>
                                                                            <Input
                                                                                name="radio1"
                                                                                type="radio"
                                                                                className="mx-auto"
                                                                                checked={items.answerSelect[index2] && items.answerSelect[index2].answer === false}
                                                                                readOnly
                                                                            />{' '}
                                                                        </FormGroup>
                                                                    </div>
                                                                </Form>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </Form>
                                            )}

                                            {items.type === 'isian' && (
                                                <Form>
                                                    <FormGroup check>
                                                        <Input
                                                            name="text"
                                                            type="textarea"
                                                            className={`w-100 ${items.answerSelect[0]?.toLowerCase() === items.trueAnswer.toLowerCase() ? 'bg-hijau text-white' : items.answerSelect[0]?.toLowerCase() !== items.trueAnswer.toLowerCase() && items.answerSelect.length !== 0 ? 'bg-third text-white' : ''}`}
                                                            value={items.answerSelect}
                                                            readOnly
                                                        />{' '}
                                                    </FormGroup>
                                                </Form>
                                            )}
                                        </section>
                                        <section>
                                            {items.type == 'banyak_pilihan' && (
                                                <span>
                                                    <strong>Pemabahasan</strong>
                                                    <div className="bg-graylg rounded-3 p-3">
                                                        <p className="m-0">{items.answer}</p>
                                                        <Image src={youtube} alt="" style={{ objectFit: window.innerWidth < 576 && 'contain' }} className={`${window.innerWidth < 576 && 'w-100 h-100'}`} />
                                                    </div>
                                                </span>
                                            )}
                                            {items.type == 'benar_salah' && (
                                                <span>
                                                    <strong>Pemabahasan</strong>
                                                    <div className="bg-graylg rounded-3 p-3">
                                                        <p className="m-0">{items.answer}</p>
                                                        <Image src={youtube} alt="" style={{ objectFit: window.innerWidth < 576 && 'contain' }} className={`${window.innerWidth < 576 && 'w-100 h-100'}`} />
                                                    </div>
                                                </span>
                                            )}
                                            {items.type == 'isian' && (
                                                <span>
                                                    <strong>Pemabahasan</strong>
                                                    <div className="bg-graylg rounded-3 p-3">
                                                        <p className="m-0">{items.answer}</p>
                                                        <Image src={youtube} alt="" style={{ objectFit: window.innerWidth < 576 && 'contain' }} className={`${window.innerWidth < 576 && 'w-100 h-100'}`} />
                                                    </div>
                                                </span>
                                            )}
                                        </section>
                                    </span>
                                </div>
                            </span>
                        ))}
                    </Col>
                </Row >
            </div >
        </ProtectedRoute>
    )
}