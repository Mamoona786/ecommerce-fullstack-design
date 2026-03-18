import React from "react";

import uaeFlag from "../../assets/flag-ae.jpg";
import australiaFlag from "../../assets/flag-au.jpg";
import usaFlag from "../../assets/flag-us.jpg";
import russiaFlag from "../../assets/flag-ru.jpg";
import italyFlag from "../../assets/flag-it.jpg";
import denmarkFlag from "../../assets/flag-dk.jpg";
import franceFlag from "../../assets/flag-fr.jpg";
import chinaFlag from "../../assets/flag-cn.jpg";
import ukFlag from "../../assets/flag-gb.jpg";

const suppliers = [
  { flag: uaeFlag, country: "Arabic Emirates", site: "shopname.ae" },
  { flag: australiaFlag, country: "Australia", site: "shopname.ae" },
  { flag: usaFlag, country: "United States", site: "shopname.ae" },
  { flag: russiaFlag, country: "Russia", site: "shopname.ru" },
  { flag: italyFlag, country: "Italy", site: "shopname.it" },
  { flag: denmarkFlag, country: "Denmark", site: "denmark.com.dk" },
  { flag: franceFlag, country: "France", site: "shopname.com.fr" },
  { flag: uaeFlag, country: "Arabic Emirates", site: "shopname.ae" },
  { flag: chinaFlag, country: "China", site: "shopname.ae" },
  { flag: ukFlag, country: "Great Britain", site: "shopname.co.uk" },
];

const SuppliersSection = () => {
  return (
    <section className="suppliers-section">
      <div className="container">
        <h2 className="suppliers-heading">Suppliers by region</h2>

        <div className="suppliers-grid">
          {suppliers.map((supplier, index) => (
            <div key={`${supplier.country}-${index}`} className="supplier-item">
              <div className="supplier-flag-wrap">
                <img
                  src={supplier.flag}
                  alt={supplier.country}
                  className="supplier-flag-image"
                />
              </div>

              <div className="supplier-info">
                <p className="supplier-country">{supplier.country}</p>
                <p className="supplier-site">{supplier.site}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuppliersSection;
