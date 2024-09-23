'use client'
import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Card,
    CardSubtitle,
    Input,
    Alert,
} from "reactstrap";
import Image from "next/image";
import logo from "../../../../../public/images/logos/aboutLogo.svg"
import usertry from "../../../../../public/images/users/usertry.svg"
import Link from "next/link";
import SalesChart from "../../components/dashboard/SalesChart";
import FullLayout from "../layout";
import { db } from "../../../../../public/firebaseConfig";
import { getDocs, collection } from 'firebase/firestore';
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../../../../../public/AuthContext";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'tryout_v1'));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchUserAnswers() {
    const querySnapshot = await getDocs(collection(db, 'userAnswer'));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}


const TryOutSaya = () => {
    const [dataTryOut, setDataTryOut] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [filteredTryOuts, setFilteredTryOuts] = useState([]);
    const { currentUser } = useAuth(); // Get the current logged-in user

    useEffect(() => {
        async function fetchData() {
            // Fetch tryout_v1 and userAnswer data
            const tryoutData = await fetchDataFromFirestore();
            const userAnswerData = await fetchUserAnswers();

            // setDataTryOut(tryoutData);
            setUserAnswers(userAnswerData);

            const filteredData = tryoutData.filter(tryout =>
                tryout.claimedUid && tryout.claimedUid.some(claim => 
                    claim.Uid === currentUser.uid && claim.statusPemabyaran === true
                )
            );            

            const matchedTryOuts = tryoutData.filter(tryout =>
                userAnswerData.some(userAnswer =>
                    userAnswer.tryoutId === tryout.id && userAnswer.userId === currentUser.uid
                )
            );

            // Filter the tryouts that don't match any tryoutId or userId
            const unmatchedTryOuts = filteredData.filter(tryout =>
                !userAnswerData.some(userAnswer =>
                    userAnswer.tryoutId === tryout.id && userAnswer.userId === currentUser.uid
                )
            );

            setFilteredTryOuts(matchedTryOuts); // Tryouts that match both tryoutId and userId
            setDataTryOut(unmatchedTryOuts); // Tryouts that don't match
        }
        fetchData();
    }, []);

    console.log('item', currentUser.uid);


    // useEffect(() => {
    //     async function fetchData() {
    //         const data = await fetchDataFromFirestore();
    //         setDataTryOut(data);
    //     }
    //     fetchData();
    // }, []);

    dataTryOut.map(item => {
        console.log('ambong', item.tps);
    })
    return (
        <ProtectedRoute>
            {filteredTryOuts == 0 && dataTryOut == 0 ? (
                <div className="py-3 bg-light bundling w-100 d-flex justify-content-center align-items-center position-relative" style={{ padding: '0 7% 20px', height: '80vh', zIndex: '99', marginTop: '18vh', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <Alert color="danger">Anda belum memiliki TryOut Apapun!</Alert>
                </div>
            ) : (
                <div className="tryOutSaya" style={{ marginTop: window.innerWidth < 576 ? 0 : '18vh' }}>
                    <section className="section-green-bg pb-2 pt-3 w-100" style={{ padding: '0 7% 20px', marginTop: window.innerWidth < 576 ? '18vh' : 0 }}>
                        <h5 className="fw-bolder">Grafik Nilai Try Out UTBK</h5>
                        <p className="text-white">Lihat progresmu disini</p>
                        <SalesChart />
                    </section>
                    <div className="position-relative tryOutSaya" style={{ padding: '0 7% 20px' }}>
                        <section className="mt-5">
                            <Row className="d-flex align-items-center justify-content-between mb-2">
                                <Col sm='12' lg='6'>
                                    <h5 className="m-0">Try Out Belum Selesai</h5>
                                    <p>Lihat somua TO kamu milikl korjakan TO nya sokarang!</p>
                                </Col>
                                <Col sm='12' lg='6' className='text-lg-end'>
                                    <Link href='/pages/tryout/semua-tryout'>
                                        <Button className="rounded-5 border-primer bg-transparent color-primer fw-bolder border-2 px-4">Lihat Semua ≫</Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                {dataTryOut.slice(0, 4).map((item, index) => (
                                    <Col sm="12" lg="6" key={index} className="mb-3">
                                        <Card className="w-100 h-100 p-3 cursor-pointer">
                                            <Row className="h-100">
                                                <Col xs='3' sm="3" lg="3" className="p-0 ps-2">
                                                    <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                        <h3 className="text-white fw-bolder">SNBT</h3>
                                                        <h1 className="fw-bolder m-0">6</h1>
                                                    </div>
                                                </Col>
                                                <Col xs='9' sm="9" lg="9" className="h-100">
                                                    <Link href={`/pages/tryout/question/${item.id}`}>
                                                        <div className="h-100 d-flex flex-column justify-content-between">
                                                            <span>
                                                                <h5>{item.toName}</h5>
                                                                <p>Tes Potensi Skolastik (TPS) dan Tes Literasii</p>
                                                            </span>
                                                            <span className="d-flex justify-content-between">
                                                                <b>Gratis dan Berbayar</b>
                                                                <b className="color-primer">Mulai Mengerjakan</b>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </section>
                        <section className="mt-5">
                            {filteredTryOuts == 0 ? (
                                <div></div>
                            ) : (
                                <Row className="d-flex align-items-center justify-content-between mb-2">
                                    <Col sm='12' lg='6'>
                                        <h5 className="m-0">Try Out Selesai</h5>
                                        <p>Lihat semua Try Out yang telah kamu ikuti</p>
                                    </Col>
                                    <Col sm='12' lg='6' className='text-lg-end'>
                                        <Link href='/pages/tryout/semua-tryout?type=toSelesai'>
                                            <Button className="rounded-5 border-primer bg-transparent color-primer fw-bolder border-2 px-4">Lihat Semua ≫</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            )}
                            <Row>
                                {filteredTryOuts.slice(0, 4).map((item, index) => (
                                    <Col sm="12" lg="6" key={index} className="mb-3">
                                        <Card className="w-100 h-100 p-3 cursor-pointer">
                                            <Row className="h-100">
                                                <Col xs='3' sm="3" lg="3" className="p-0 ps-2">
                                                    <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                        <h3 className="text-white fw-bolder">SNBT</h3>
                                                        <h1 className="fw-bolder m-0">6</h1>
                                                    </div>
                                                </Col>
                                                <Col xs='9' sm="9" lg="9" className="h-100">
                                                    <Link href={`/pages/tryout/question/${item.id}?type=toSelesai`}>
                                                        <div className="h-100 d-flex flex-column justify-content-between">
                                                            <span>
                                                                <h5>{item.toName}</h5>
                                                                <p>Tes Potensi Skolastik (TPS) dan Tes Literasii</p>
                                                            </span>
                                                            <span className="d-flex justify-content-between">
                                                                <b>Rata-rata Nilai : 845</b>
                                                                <b className="color-primer">Detail</b>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                ))}
                                {/* <Col sm="12" lg="6">
                                <Card className="w-100 h-100 p-3 cursor-pointer">
                                    <Row className="h-100">
                                        <Col sm="3" lg="3" className="p-0 ps-2">
                                            <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                <h3 className="text-white fw-bolder">SNBT</h3>
                                                <h1 className="fw-bolder m-0">6</h1>
                                            </div>
                                        </Col>
                                        <Col sm="9" lg="9" className="h-100">
                                            <div className="h-100 d-flex flex-column justify-content-between">
                                                <span>
                                                    <h5>Try Out UTBK 2024 #10 - SNBT</h5>
                                                    <p>Tes Potensi Skolastik (TPS) dan Tes Literasi</p>
                                                </span>
                                                <span className="d-flex justify-content-between">
                                                    <b>Gratis dan Berbayar</b>
                                                    <b className="color-primer">Detail</b>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col> */}
                            </Row>
                        </section>
                    </div>
                </div>
            )}
        </ProtectedRoute>
    );
};

export default TryOutSaya;
