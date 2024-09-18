'use client'
import React from "react";
import {
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Card,
  CardSubtitle,
} from "reactstrap";
import Image from "next/image";
import logo from "../../../../../public/images/logos/aboutLogo.svg"
import user1 from "../../../../../public/images/users/user2.jpg"

const About = () => {
  return (
    <>
      <div className="d-flex pt-4 justify-content-center align-items-center abouts" style={{ height: '80vh', width: '100vw' }}>
        <span className="text-center">
          <h1 className="head1 fw-bolder">Tentang</h1>
          <Image src={logo} alt="" />
          <p className="text-black opacity-50 m-0 mt-5">Subheading for description or instructions</p>
          <p>Body text for your whole article or post. Well put in some lorem ipsum to show how a filled-out page might look</p>
        </span>
      </div>
      <div className="d-flex gap-5 mb-4" style={{ minWidth: '100%', width: '100vw',  overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <div className="card-container d-flex justify-content-between py-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <Card key={index} className="" style={{width: '18rem', height: '400px', margin: 'auto 10px'}}>
              <span className="d-flex flex-column align-items-center justify-content-center">
                <Image src={user1} alt="" width={150} className="rounded-circle mt-3 mb-2 text-center" />
                <CardTitle tag="h5">Muh. Hilmy Noor Fauzi</CardTitle>
                <span className="text-warning">⭐️  ⭐️  ⭐️  ⭐️  ⭐️</span>
              </span>
              <span className="mt-4 px-3 text-center">
                <p>saya sangat senang belajar di Dream Academy karena memiliki banyak contoh soal dan penjelasan yang mudah di pahami.</p>
              </span>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
