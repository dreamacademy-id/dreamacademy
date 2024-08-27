'use client'

import { useRouter } from "next/navigation"
import { Button } from "reactstrap"

export default function Riwayat() {
    const router = useRouter();
    return (
        <>
            <div style={{ padding: '13vh 7% 20px' }}>
                <section className="d-flex align-items-center gap-2 mb-3">
                    <svg className="cursor-pointer" onClick={() => router.back()} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14" r="14" fill="#27B262" />
                        <path d="M15.3111 8.31405C15.2128 8.2145 15.0961 8.13552 14.9675 8.08163C14.839 8.02774 14.7012 8 14.5621 8C14.423 8 14.2852 8.02774 14.1567 8.08163C14.0281 8.13552 13.9114 8.2145 13.8131 8.31405L8.93667 13.2431C8.83818 13.3425 8.76004 13.4605 8.70673 13.5904C8.65342 13.7203 8.62598 13.8596 8.62598 14.0002C8.62598 14.1409 8.65342 14.2801 8.70673 14.41C8.76004 14.54 8.83818 14.658 8.93667 14.7573L13.8131 19.6864C13.9115 19.7858 14.0282 19.8647 14.1568 19.9185C14.2853 19.9723 14.423 20 14.5621 20C14.7012 20 14.8389 19.9723 14.9675 19.9185C15.096 19.8647 15.2127 19.7858 15.3111 19.6864C15.4095 19.587 15.4875 19.469 15.5407 19.3391C15.5939 19.2092 15.6213 19.0699 15.6213 18.9293C15.6213 18.7887 15.5939 18.6495 15.5407 18.5196C15.4875 18.3897 15.4095 18.2717 15.3111 18.1722L11.189 13.9949L15.3111 9.82822C15.7148 9.4094 15.7148 8.72212 15.3111 8.31405Z" fill="white" />
                    </svg>
                    Kembali ke Dashboard TryOut
                </section>
                <h3 className="text-center my-4 fw-bolder">Riwayat TryOut</h3>
                <section>
                    {[0, 1, 2, 3, 4].map((index) => (
                        <div key={index} className="d-flex w-100 justify-content-between mb-3 align-items-center bg-graylg rounded-3 px-4 py-3">
                            <span>
                                <p>Sisa Waktu 0 : 19 : 47</p>
                                <p>30 soal dikerjakan</p>
                                <p>0 soal tidak dikerjakan</p>
                            </span>
                            <span>
                                <span className="d-flex gap-3">
                                    <span className="text-center mb-3">
                                        <h3 className="color-primer m-0">21</h3>
                                        <b>Soal Benar</b>
                                    </span>
                                    <span className="text-center mb-3">
                                        <h3 className="text-warning m-0">9</h3>
                                        <b>Soal Salah</b>
                                    </span>
                                </span>
                                <Button className="bg-graybold border-0 rounded-5 px-4">Selengkapnya ≫</Button>
                            </span>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}