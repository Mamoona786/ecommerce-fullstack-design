import React from "react";
import { FiSearch, FiPackage } from "react-icons/fi";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { BsShieldCheck } from "react-icons/bs";

import serviceWarehouseImg from "../../assets/service-warehouse.png";
import serviceCustomizeImg from "../../assets/service-customize.png";
import serviceShippingImg from "../../assets/service-shipping.png";
import serviceInspectionImg from "../../assets/service-inspection.png";

const services = [
  {
    title: (
      <>
        Source from
        <br />
        Industry Hubs
      </>
    ),
    image: serviceWarehouseImg,
    icon: <FiSearch />,
  },
  {
    title: (
      <>
        Customize Your
        <br />
        Products
      </>
    ),
    image: serviceCustomizeImg,
    icon: <FiPackage />,
  },
  {
    title: (
      <>
        Fast, reliable shipping
        <br />
        by ocean or air
      </>
    ),
    image: serviceShippingImg,
    icon: <HiOutlinePaperAirplane />,
  },
  {
    title: (
      <>
        Product monitoring
        <br />
        and inspection
      </>
    ),
    image: serviceInspectionImg,
    icon: <BsShieldCheck />,
  },
];

const ExtraServicesSection = () => {
  return (
    <section className="extra-services-section">
      <div className="container">
        <h2 className="extra-services-heading">Our extra services</h2>

        <div className="extra-services-grid">
          {services.map((service, index) => (
            <article key={index} className="extra-service-card">
              <div className="extra-service-image-wrap">
                <img
                  src={service.image}
                  alt="Service"
                  className="extra-service-image"
                />
              </div>

              <div className="extra-service-body">
                <h3 className="extra-service-title">{service.title}</h3>

                <div className="extra-service-icon">
                  {service.icon}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraServicesSection;
