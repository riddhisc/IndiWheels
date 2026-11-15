import React from 'react';

const sources = [
  { name: 'Hyundai', href: 'https://www.hyundai.com' },
  { name: 'Mahindra', href: 'https://auto.mahindra.com' },
  { name: 'Maruti Suzuki', href: 'https://www.marutisuzuki.com' },
  { name: 'Maruti Suzuki Nexa', href: 'https://www.nexaexperience.com' },
  { name: 'Toyota', href: 'https://www.toyotabharat.com' },
  { name: 'Honda', href: 'https://www.hondacarindia.com' },
  { name: 'Škoda', href: 'https://www.skoda-auto.co.in' },
  { name: 'Kia', href: 'https://www.kia.com' },
  { name: 'Volkswagen', href: 'https://www.volkswagen.co.in' },
  { name: 'MG Motor', href: 'https://www.mgmotor.co.in' },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#1A1B25] text-white">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-6">About IndiWheels</h1>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            IndiWheels is a showcase of cars sold in India. Each model is listed with its ex-showroom starting price, specifications, and a photograph.
          </p>
          <p>
            The prices are ex-showroom starting prices, read from each manufacturer’s own India website. They are not on-road prices. An on-road price adds tax, RTO, and insurance, and those amounts are not shown here.
          </p>
          <p>
            Specifications are taken from those official model and price pages, or from the official brochure linked there, for the base variant that matches the starting price.
          </p>
          <p>
            Photographs are Wikimedia Commons files with a free license. Commons is the image source, and each photo is credited on the car’s detail page.
          </p>
          <p>
            The catalog was last read from the manufacturer sites on 15 November 2026. These are the sites used:
          </p>
          <ul className="space-y-2">
            {sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-400"
                >
                  {source.name}
                  <span className="text-gray-400"> — {source.href.replace('https://', '')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
