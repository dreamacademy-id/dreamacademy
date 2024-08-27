'use client'

import Image from "next/image";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import user1 from "../../../../../public/images/users/user1.jpg";
import { useState } from "react";
import { db } from "../../../../../public/firebaseConfig";
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Fungsi untuk menangani operasi Firestore
const handleFirestoreOperation = async (operation, data, id = null) => {
    try {
        const docRef = id ? doc(db, "user", id) : collection(db, "user");
        if (operation === "add") {
            await addDoc(docRef, data);
        } else if (operation === "update") {
            await updateDoc(docRef, data);
        } else if (operation === "delete") {
            await deleteDoc(docRef);
        }
        return true;
    } catch (error) {
        console.error(`Error during ${operation} operation:`, error);
        return false;
    }
};

export default function Profile() {
    const [profile, setProfile] = useState(true);
    const [detail, setDetail] = useState(true);
    const [activeButton, setActiveButton] = useState('profile');
    const router = useRouter();
    const [formState, setFormState] = useState({
        gambar: "", nama: "", username: "", email: "", asal_sekolah: "", kabupaten: "", jurusan1: "", jurusan2: "", kontak: "", motivasi: ""
    });

    // Fungsi untuk menangani perubahan input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const operation = formState.id ? "update" : "add";
        const success = await handleFirestoreOperation(operation, formState);
        if (success) {
            alert("Data berhasil diupload");
            setFormState({
                gambar: "", nama: "", username: "", email: "", asal_sekolah: "", kabupaten: "", jurusan1: "", jurusan2: "", kontak: "", motivasi: ""
            });
        } else {
            alert("Data tidak berhasil diupload");
        }
    };

    return (
        <>
            <div className="position-fixed bg-white d-flex" style={{ width: '100vw', height: '100vh', zIndex: '999999', top: 0, left: 0 }}>
                <div className="w-25 border border-end-1 d-flex flex-column h-100 py-3 px-4">
                    <span className="d-flex align-items-center gap-2 mb-3">
                        <svg className="cursor-pointer" onClick={() => router.back()} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14" cy="14" r="14" fill="#27B262" />
                            <path d="M15.3111 8.31405C15.2128 8.2145 15.0961 8.13552 14.9675 8.08163C14.839 8.02774 14.7012 8 14.5621 8C14.423 8 14.2852 8.02774 14.1567 8.08163C14.0281 8.13552 13.9114 8.2145 13.8131 8.31405L8.93667 13.2431C8.83818 13.3425 8.76004 13.4605 8.70673 13.5904C8.65342 13.7203 8.62598 13.8596 8.62598 14.0002C8.62598 14.1409 8.65342 14.2801 8.70673 14.41C8.76004 14.54 8.83818 14.658 8.93667 14.7573L13.8131 19.6864C13.9115 19.7858 14.0282 19.8647 14.1568 19.9185C14.2853 19.9723 14.423 20 14.5621 20C14.7012 20 14.8389 19.9723 14.9675 19.9185C15.096 19.8647 15.2127 19.7858 15.3111 19.6864C15.4095 19.587 15.4875 19.469 15.5407 19.3391C15.5939 19.2092 15.6213 19.0699 15.6213 18.9293C15.6213 18.7887 15.5939 18.6495 15.5407 18.5196C15.4875 18.3897 15.4095 18.2717 15.3111 18.1722L11.189 13.9949L15.3111 9.82822C15.7148 9.4094 15.7148 8.72212 15.3111 8.31405Z" fill="white" />
                        </svg>
                        <b>Detail TryOut</b>
                    </span>
                    <Button
                        className={`py-2 rounded-3 border-0 mb-3 ${activeButton === 'profile' ? 'bg-primer' : 'bg-transparent text-black'}`}
                        onClick={() => setActiveButton('profile')}>
                        Profile
                    </Button>
                    <Button
                        className={`py-2 rounded-3 border-0 ${activeButton === 'detail' ? 'bg-primer' : 'bg-transparent text-black'}`}
                        onClick={() => setActiveButton('detail')}>
                        Detail Pribadi
                    </Button>
                </div>
                <Form onSubmit={handleSubmit} className="w-75">
                    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="w-75">
                            {activeButton === 'profile' ? (
                                <div className="w-100 bg-primerlg d-flex flex-column justify-content-center align-items-center p-3 rounded-3 mb-3">
                                    <div className="w-75 d-flex align-items-center flex-column mb-5">
                                        <Image src={user1} alt="" className="rounded-circle mb-3" width={150} />
                                        <FormGroup className="w-50 text-center">
                                            <Input id="exampleFile" name="gambar" type="file" onChange={handleInputChange} />
                                            <FormText className="fw-light">
                                                Format file jpg, jpeg, png
                                            </FormText>
                                        </FormGroup>
                                    </div>
                                    <div className="w-100">
                                        <FormGroup>
                                            <Label className="fw-light" for="nama">Nama (Maks. 50 Karekter)</Label>
                                            <Input
                                                className="bg-transparent rounded-3 border border-1 border-black"
                                                id="nama"
                                                name="nama"
                                                type="text"
                                                value={formState.nama}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="fw-light" for="username">Nama Pengguna (Maks. 50 Karekter)</Label>
                                            <Input
                                                className="bg-transparent rounded-3 border border-1 border-black"
                                                id="username"
                                                name="username"
                                                type="text"
                                                value={formState.username}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="fw-light" for="email">Alamat Email</Label>
                                            <Input
                                                className="bg-transparent rounded-3 border border-1 border-black"
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formState.email}
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-100 bg-primerlg d-flex flex-column justify-content-center align-items-center p-3 rounded-3 mb-3">

                                    <div className="w-100">
                                        <FormGroup>
                                            <Label className="fw-light" for="asal_sekolah">Asal Sekolah</Label>
                                            <Input id="asal_sekolah" name="asal_sekolah" type="select" className="bg-transparent rounded-3 border border-1 border-black" value={formState.asal_sekolah} onChange={handleInputChange}>
                                                <option value="">Pilih</option>
                                                <option value="sma">SMA</option>
                                                <option value="smk">SMK</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="fw-light" for="kabupaten">Kabupaten/Kota</Label>
                                            <Input id="kabupaten" name="kabupaten" type="select" className="bg-transparent rounded-3 border border-1 border-black" value={formState.kabupaten} onChange={handleInputChange}>
                                                <option value="">Pilih</option>
                                                <option value="bantul">Bantul</option>
                                                <option value="sleman">Sleman</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="fw-light" for="jurusan1">Pilihan Jurusan 1</Label>
                                            <Input id="jurusan1" name="jurusan1" type="select" className="bg-transparent rounded-3 border border-1 border-black" value={formState.jurusan1} onChange={handleInputChange}>
                                                <option value="">Pilih</option>
                                                <option value="teknik-informatika">Teknik Informatika</option>
                                                <option value="sistem-informasi">Sistem Informasi</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="fw-light" for="jurusan2">Pilihan Jurusan 2</Label>
                                            <Input id="jurusan2" name="jurusan2" type="select" className="bg-transparent rounded-3 border border-1 border-black" value={formState.jurusan2} onChange={handleInputChange}>
                                                <option value="">Pilih</option>
                                                <option value="teknik-informatika">Teknik Informatika</option>
                                                <option value="sistem-informasi">Sistem Informasi</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="fw-light" for="kontak">Kontak (Whatsapp)</Label>
                                            <Input className="bg-transparent rounded-3 border border-1 border-black" id="kontak" name="kontak" type="text" value={formState.kontak} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="fw-light" for="motivasi">Motivasi (Max. 500 karakter)</Label>
                                            <Input className="bg-transparent rounded-3 border border-1 border-black" id="motivasi" name="motivasi" type="textarea" value={formState.motivasi} onChange={handleInputChange} />
                                        </FormGroup>
                                    </div>
                                </div>
                            )}
                            <Button className="bg-primer border-0 w-100" type="submit">
                                Simpan Pembaharuan
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
}
