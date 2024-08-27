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
} from "reactstrap";
import Image from "next/image";
import logo from "../../../../../public/images/logos/aboutLogo.svg"
import usertry from "../../../../../public/images/users/usertry.svg"
import Link from "next/link";
import SalesChart from "../../components/dashboard/SalesChart";
import { db } from "../../../../../public/firebaseConfig";
import { getDocs, collection } from 'firebase/firestore';

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'tryout'));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

const AllTryOut = () => {
    const [dataTryOut, setDataTryOut] = useState([]);
    const [detail, setDetail] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setDataTryOut(data);
        }
        fetchData();
    }, []);

    const handleDetail = () => {
        setDetail(!detail);
    }
    return (
        <>
            <div className="py-3 mt-5" style={{ padding: '12vh 7% 20px' }}>
                <section className="mt-1 mb-5">
                    <h5>Try Out Kerjasama</h5>
                    <div className="d-flex w-50">
                        <span className="d-flex border-2 ps-2 border-primer align-items-center rounded-5 w-50 me-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="black" fill-opacity="0.1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.027 12.3304C10.7827 13.0421 9.19588 12.6143 8.47844 11.3717C7.75921 10.1259 8.18603 8.533 9.43178 7.81377C10.6775 7.09454 12.2705 7.52136 12.9897 8.76711C13.7071 10.0096 13.2843 11.5976 12.0459 12.3194C12.0428 12.3212 12.0397 12.323 12.0365 12.3248C12.0333 12.3267 12.0302 12.3285 12.027 12.3304ZM11.737 14.0386C10.0063 14.4769 8.12629 13.7384 7.18951 12.1158C6.05929 10.1582 6.73002 7.65506 8.68762 6.52484C10.6452 5.39462 13.1484 6.06534 14.2786 8.02295C15.2153 9.64534 14.915 11.6425 13.6703 12.9222L15.7938 16.6002C16.1021 17.1341 15.9191 17.8168 15.3853 18.125C14.8514 18.4332 14.1687 18.2503 13.8604 17.7164L11.737 14.0386Z" fill="black" fill-opacity="0.5" />
                            </svg>
                            <input type="text" placeholder="Masukkan kode TO Khusus..." className="border-0 bg-transparent ps-2 w-100" style={{ outline: 'none' }} />
                        </span>
                        <Button className="rounded-5 bg-primy border-0 px-4 fw-bold">Daftar</Button>
                    </div>
                </section>
                <section>
                    <h5 className="m-0">Try Out Sedang Berlangsung</h5>
                    <p>5 Juli - 7 Juli 2024</p>
                    <Row>
                        <Col sm="12" lg="6">
                            <Link href="/pages/tryout/detail" className="text-decoration-none">
                                <Card className="w-100 h-100 p-3 cursor-pointer">
                                    <Row className="h-100">
                                        <Col sm="3" lg="3" className="p-0 ps-2">
                                            <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                <h3 className="text-white fw-bolder">SNBT</h3>
                                                <h1 className="fw-bolder m-0">11</h1>
                                            </div>
                                        </Col>
                                        <Col sm="9" lg="9" className="h-100">
                                            <div className="h-100 d-flex flex-column justify-content-between">
                                                <span>
                                                    <h5>Try Out UTBK 2024 #11 - SNBT</h5>
                                                    <p>Tes Potensi Skolastik (TPS) dan Tes Literasi</p>
                                                </span>
                                                <span className="d-flex justify-content-between">
                                                    <b>Gratis dan Berbayar</b>
                                                    <b className="color-primer">Daftar</b>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </section>
                <section className="mt-5">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>
                            <h5 className="m-0">Try Out Tersedia</h5>
                            <p>Butuh tantangan? Ikuti Try Out ini!</p>
                        </span>
                        <span>
                            <Button className="rounded-5 border-primer bg-transparent color-primer fw-bolder border-2 px-4">Lihat Semua ≫</Button>
                        </span>
                    </div>
                    <Row>
                        {dataTryOut.map((item, index) => (
                            <Col sm="12" lg="6" className="mb-3" key={index}>
                                <Link href={`/pages/tryout/detail/${item.id}`}>
                                    <Card className="w-100 h-100 p-3 cursor-pointer">
                                        <Row className="h-100">
                                            <Col sm="3" lg="3" className="p-0 ps-2">
                                                <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                    <h3 className="text-white fw-bolder">SNBT</h3>
                                                    <h1 className="fw-bolder m-0">9</h1>
                                                </div>
                                            </Col>
                                            <Col sm="9" lg="9" className="h-100">
                                                <div className="h-100 d-flex flex-column justify-content-between">
                                                    <span>
                                                        <h5>{item.name}</h5>
                                                        <p>Tes Potensi Skolastik (TPS) dan Tes Literasi</p>
                                                    </span>
                                                    <span className="d-flex justify-content-between">
                                                        <b>Gratis dan Berbayar</b>
                                                        <b className="color-primer">Daftar</b>
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                        {/* <Col sm="12" lg="6">
                            <Card className="w-100 h-100 p-3 cursor-pointer">
                                <Row className="h-100">
                                    <Col sm="3" lg="3" className="p-0 ps-2">
                                        <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                            <h3 className="text-white fw-bolder">SNBT</h3>
                                            <h1 className="fw-bolder m-0">10</h1>
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
                                                <b className="color-primer">Daftar</b>
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col> */}
                    </Row>
                </section>
                <section className="mt-5">
                    <Row>
                        <Col sm="6" lg="3">
                            <div class="border-2 border-primer border-secondary rounded-3 p-4 " aria-hidden="true">
                                <span className="text-center d-flex justify-content-center">
                                    <b className="mb-3">/1 months</b>
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm="6" lg="3">
                            <div class="border-2 border-primer border-secondary rounded-3 p-4 " aria-hidden="true">
                                <span className="text-center d-flex justify-content-center">
                                    <b className="mb-3">/3 months</b>
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm="6" lg="3">
                            <div class="border-2 border-primer border-secondary rounded-3 p-4 " aria-hidden="true">
                                <span className="text-center d-flex justify-content-center">
                                    <b className="mb-3">/6 months</b>
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm="6" lg="3">
                            <div class="border-2 border-primer border-secondary rounded-3 p-4 " aria-hidden="true">
                                <span className="text-center d-flex justify-content-center">
                                    <b className="mb-3">/1 year</b>
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
                <Button className="d-flex align-items-center px-3 border-0 bg-primy rounded-5 position-fixed cursor-pointer" onClick={handleDetail} style={{ top: '90%', left: '90%', zIndex: '9999' }}>
                    <svg className="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="18" width="18" height="18" rx="9" transform="rotate(-90 0 18)" fill="white" />
                        <rect x="10" y="8" width="7" height="2" rx="1" transform="rotate(90 10 8)" fill="#27B262" />
                        <rect x="10" y="4" width="2" height="2" rx="1" transform="rotate(90 10 4)" fill="#27B262" />
                    </svg>
                    Infor Paket
                </Button>
            </div>
            {detail && (
                <div className="detail position-fixed bg-white" style={{ top: 0, left: 0, width: '100vw', height: '100vh', zIndex: '99999' }}>
                    <h2>Halaman detail</h2>
                </div>
            )}
        </>
    );
};

export default AllTryOut;
