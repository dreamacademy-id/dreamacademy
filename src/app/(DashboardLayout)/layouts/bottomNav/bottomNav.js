import { Col, Row } from "reactstrap";
import LogoWhite from "../../../../../public/images/logos/logoDa.svg";
import Image from "next/image";

export default function BottomNav() {
    return (
        <div className="bg-white" style={{ minHeight: '25vh' }}>
            <hr className="m-0" />
            <div className="p-3 ps-5">
                <Row className="w-100 h-100 px-0">
                    <Col sm='12' lg="6">
                        <div className="d-flex justify-content-between flex-column w-100 h-100">
                            <Image src={LogoWhite} alt="logo" />
                            <span className="d-flex justify-content-between w-25">
                                <i class="bi bi-facebook"></i>
                                <i class="bi bi-linkedin"></i>
                                <i class="bi bi-youtube"></i>
                                <i class="bi bi-instagram"></i>
                            </span>
                        </div>
                    </Col>
                    <Col sm='12' lg="6">
                        <div className="d-flex justify-content-between pe-5">
                            <div>
                                <p>Topic</p>
                                <p>Page</p>
                                <p>Page</p>
                                <p>Page</p>
                            </div>
                            <div>
                                <p>Topic</p>
                                <p>Page</p>
                                <p>Page</p>
                                <p>Page</p>
                            </div>
                            <div>
                                <p>Topic</p>
                                <p>Page</p>
                                <p>Page</p>
                                <p>Page</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}