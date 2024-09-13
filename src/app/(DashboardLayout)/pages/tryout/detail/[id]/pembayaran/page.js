'use client'
import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input, FormText, Form, Button, Card } from "reactstrap";
import Link from "next/link";
import { db } from "../../../../../../../../public/firebaseConfig";
import { useParams } from "next/navigation";
import { doc, getDoc } from 'firebase/firestore';
import { Image } from "react-feather";
import ProtectedRoute from "../../../ProtectedRoute";

const Pembayaran2 = () => {
    const eWallet = ["Go-Pay", "OVO", "Dana", "LinkAja"];
    const image = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png",
        "https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/original/0d48ab48-f3b2-48fa-953a-192ad3bcb948.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png",
        "https://i0.wp.com/ifnfintech.com/wp-content/uploads/2020/10/linkaja.png?fit=322%2C150&ssl=1"
    ]
    const [metode, setMetode] = useState(false);
    const [toGratis, setToGratis] = useState(false);
    const [type, setType] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItem2, setSelectedItem2] = useState(null);

    const handleItemClick = (item, index) => {
        setSelectedItem(item);
        setSelectedIndex(index);
    };

    const handleItems = () =>{
        setSelectedItem2(selectedItem);
        setMetode(!metode);
    }

    console.log('yg terklik', selectedItem);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);
            setType(queryParams.get('type'));
        }
    }, []);

    const handleMetode = () => {
        setMetode(!metode);
        setToGratis(!toGratis);
    }

    const { id } = useParams(); // Ambil parameter dinamis dari URL
    const [detailData, setDetailData] = useState(null);

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

    if (!detailData) {
        return <div>Loading...</div>;
    }


    return (
        <ProtectedRoute>
            <div className="w-100 d-flex justify-content-center" style={{ height: '89vh', marginTop: window.innerWidth < 576 ? '0%' : '11vh', zIndex: '99' }}>
                <div className="w-50 w-lg-100 h-100 pb-5" style={{paddingTop: window.innerWidth < 576 ? '13vh' : '0%'}} >
                    <section className="d-flex w-100">
                        <Link href={`/pages/tryout/detail/${id}`}>
                            <svg className="me-2" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14" cy="14" r="14" fill="#27B262" />
                                <path d="M15.3111 8.31405C15.2128 8.2145 15.0961 8.13552 14.9675 8.08163C14.839 8.02774 14.7012 8 14.5621 8C14.423 8 14.2852 8.02774 14.1567 8.08163C14.0281 8.13552 13.9114 8.2145 13.8131 8.31405L8.93667 13.2431C8.83818 13.3425 8.76004 13.4605 8.70673 13.5904C8.65342 13.7203 8.62598 13.8596 8.62598 14.0002C8.62598 14.1409 8.65342 14.2801 8.70673 14.41C8.76004 14.54 8.83818 14.658 8.93667 14.7573L13.8131 19.6864C13.9115 19.7858 14.0282 19.8647 14.1568 19.9185C14.2853 19.9723 14.423 20 14.5621 20C14.7012 20 14.8389 19.9723 14.9675 19.9185C15.096 19.8647 15.2127 19.7858 15.3111 19.6864C15.4095 19.587 15.4875 19.469 15.5407 19.3391C15.5939 19.2092 15.6213 19.0699 15.6213 18.9293C15.6213 18.7887 15.5939 18.6495 15.5407 18.5196C15.4875 18.3897 15.4095 18.2717 15.3111 18.1722L11.189 13.9949L15.3111 9.82822C15.7148 9.4094 15.7148 8.72212 15.3111 8.31405Z" fill="white" />
                            </svg>
                        </Link>
                        <h5 className="w-100 d-flex justify-content-center fw-bolder">Order</h5>
                    </section>
                    <div style={{ height: '90%' }}>
                        <div className="px-4 py-2 h-100 d-flex flex-column justify-content-between">
                            <section>
                                <div className="bg-graylg pe-3 rounded">
                                    <Row>
                                        <Col xs='4' sm="3" lg="3">
                                            <div className="border border-1 h-100 w-100 rounded border-black d-flex justify-content-center align-items-center">
                                                Try Out
                                            </div>
                                        </Col>
                                        <Col xs='8' sm="9" lg="9" className="d-flex py-2 ps-0 flex-column">
                                            <span className="mb-5">{detailData.toName}</span>
                                            <span className="text-end">
                                                {type === 'coin' && (
                                                    <b>4 DA Coin</b>
                                                )}
                                                {type === 'e_wallet' && (
                                                    <b>Rp {detailData.listPrice[1]}</b>
                                                )}
                                                {type === 'toGratis' && (
                                                    <b>Rp 0</b>
                                                )}
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                                {type === 'toGratis' && (
                                    <div className="mt-3">
                                        <Form>
                                            <FormGroup className="border border-1 border-black rounded-3">
                                                <Input
                                                    className="rounded-3"
                                                    id="nama"
                                                    name="nama"
                                                    placeholder="Nama"
                                                    type="text"
                                                />
                                            </FormGroup>
                                            <FormGroup className="border border-1 border-black rounded-3">
                                                <Input
                                                    className="rounded-3"
                                                    id="jurusan"
                                                    name="jurusan"
                                                    placeholder="Jurusan"
                                                    type="text"
                                                />
                                            </FormGroup>
                                            <div className="border border-1 border-black rounded-3 d-flex justify-content-center align-items-center py-4">
                                                <FormGroup className="w-50 text-center">
                                                    <Label for="exampleFile">Upload Bukti Follow</Label>
                                                    <Input id="exampleFile" name="file" type="file" />
                                                    <FormText>
                                                        Format file jpg, jpeg, png
                                                    </FormText>
                                                </FormGroup>
                                            </div>
                                        </Form>
                                    </div>
                                )}
                                {type === 'e_wallet' && (
                                    <span>
                                        <section>
                                            <div className="w-100 d-flex justify-content-end mt-3">
                                                <div className="rounded-2 w-50 w-lg-75 border border-1 border-black text-center py-2 cursor-pointer" onClick={handleMetode}>Metode Pembayaran ﹥</div>
                                            </div>
                                        </section>
                                        {metode && (
                                            <div className="position-fixed w-100 d-flex justify-content-center align-items-center" style={{ height: '100vh', zIndex: '99999', top: 0, left: 0, backgroundColor: 'rgb(000, 000, 000, 0.5)' }}>
                                                <Card className="h-75 py-3 px-2 px-lg-5 d-flex flex-column justify-content-between align-items-center w-lg-90" style={{ width: '40%' }}>
                                                    <span className="w-100">
                                                        <section className="text-end mb-3">
                                                            <svg className="cursor-pointer" onClick={handleMetode} width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="23.4775" y="7.06396" width="2.52178" height="22.4051" rx="1.26089" transform="rotate(45 23.4775 7.06396)" fill="black" />
                                                                <rect x="25.2607" y="22.8384" width="2.52178" height="22.4051" rx="1.26089" transform="rotate(135 25.2607 22.8384)" fill="black" />
                                                            </svg>
                                                        </section>
                                                        <section className="w-100">
                                                            {eWallet.map((item, index) => (
                                                                <div key={index}
                                                                    className={`grid-item border border-1 rounded-3 p-2 mb-3 w-100 cursor-pointer ${selectedIndex === index ? 'border-primer border-3' : ''}`}
                                                                    onClick={() => handleItemClick(item ,index)}>
                                                                    <Row className="w-100">
                                                                        <Col xs='4' sm="3" lg="3" className="d-flex align-items-center">
                                                                            <img src={image[index]} alt="" width={100} />
                                                                        </Col>
                                                                        <Col xs='8' sm="9" lg="9">
                                                                            <h5 className="mb-1 mb-lg-4">{item}</h5>
                                                                            <p className="mb-0 mb-lg-4">Siapkan HP anda yang terpasang {item}</p>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            ))}
                                                        </section>
                                                    </span>
                                                    <section className="w-100">
                                                        <Button className="w-100 rounded-3 bg-primer border-0" tag="h5" onClick={handleItems}>Gunakan</Button>
                                                    </section>
                                                </Card>
                                            </div>
                                        )}
                                    </span>
                                )}
                                {type === 'coin' && (
                                    <div></div>
                                )}
                            </section>
                            <section className="e_wallet2">
                                <h5 className="fw-bolder">Ringkasan</h5>
                                <span className="fw-light">
                                    <p>Harga</p>
                                    {type === 'e_wallet' && (
                                        <p>Rp {detailData.listPrice[1]}</p>
                                    )}
                                    {type === 'coin' && (
                                        <p>4 DA Coin</p>
                                    )}
                                    {type === 'toGratis' && (
                                        <p>Rp 0</p>
                                    )}
                                </span>
                                <span className="fw-light">
                                    <p>Metode Pembayaran</p>
                                    {type === 'e_wallet' && (
                                        <p>{selectedItem2 || 'Pilih metode pembayaran'}</p>
                                    )}
                                    {type === 'coin' && (
                                        <p>DA Coin</p>
                                    )}
                                    {type === 'toGratis' && (
                                        <p>Follow</p>
                                    )}
                                </span>
                                <hr />
                                <span>
                                    <b>Total</b>
                                    {type === 'e_wallet' && (
                                        <b>Rp {detailData.listPrice[1]}</b>
                                    )}
                                    {type === 'coin' && (
                                        <b>4 DA Coin</b>
                                    )}
                                    {type === 'toGratis' && (
                                        <b>Rp 0</b>
                                    )}
                                </span>
                            </section>
                        </div>
                        <Link href={`/pages/tryout/detail/${id}/pembayaran/done`}>
                            <Button className="bg-primer rounded-3 w-100 mb-5 border-0">Daftar Sekarang</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Pembayaran2;
