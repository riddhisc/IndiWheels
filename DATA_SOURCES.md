# Catalog data sources

Fetched on **15 November 2026**. Prices are India ex-showroom starting prices from the manufacturer's own site. Where the page showed a lakh amount, the stored integer is that amount times 100,000.

Specs below were copied in this session from the official India page or the official brochure linked from that page. Each figure is the base / lowest listed variant that matches the starting price. Mileage is the OEM figure for that variant, not an average. Power is stored in the unit the page used (`PS`, `bhp`, `kW`, or `hp`). The detail page prints that unit.

`priceSource` is the page the price link opens. Photos are Wikimedia Commons files that show the car, hotlinked from `upload.wikimedia.org`.

The app reads `public/data/cars.json`.

## Price checked again

| Model | Stored price | What this session read | Price link |
| --- | ---: | --- | --- |
| Hyundai Creta | 10,90,700 | Delhi page, Creta 1.5 MPi Petrol MT E, ₹10,90,700. Unchanged. | https://www.hyundai.com/in/en/find-a-car/creta/price-in-delhi |
| Hyundai Venue | 7,99,900 | Price page, ₹7,99,900 ex-showroom. Unchanged. | https://www.hyundai.com/in/en/find-a-car/venue/price |
| Hyundai i20 | 5,99,000 | Price page now says the Era starts at ₹5,99,000 ex-showroom. The 15 Nov homepage figure was ₹5,99,700. Updated. | https://www.hyundai.com/in/en/find-a-car/i20/price |
| Hyundai Verna | 10,99,200 | Price page, ₹10,99,200 ex-showroom. Unchanged. | https://www.hyundai.com/in/en/find-a-car/verna/price |
| Mahindra Scorpio N | 13,69,000 | Z2 Petrol (E) page, ex-showroom ₹13,69,000. Unchanged. | https://auto.mahindra.com/suv/scorpio-n-z2-petrol/SCNM075718103784.html |
| Mahindra Thar | 10,32,000 | Specs page navigation, THAR OG ₹10.32L. Unchanged. | https://auto.mahindra.com/suv/thar/specs-and-features.html |
| Mahindra Bolero | 8,57,000 | Bolero page navigation, ₹8.57L. Unchanged. | https://auto.mahindra.com/suv/bolero/BOL.html |
| Maruti Suzuki Alto K10 | 3,69,900 | Price page, Alto K10 Std (O) ₹3,69,900. Unchanged. | https://www.marutisuzuki.com/arena/alto-k10/price |
| Toyota Innova Crysta | 15,36,000 | Homepage `delhiExShowroomPrice` still 15,36,000. Unchanged. | https://www.toyotabharat.com/ |
| Toyota Fortuner | 26,20,000 | Homepage `delhiExShowroomPrice` still 26,20,000. Unchanged. | https://www.toyotabharat.com/ |
| Toyota Camry | 37,22,300 | Homepage `delhiExShowroomPrice` still 37,22,300 for Camry Hybrid. Unchanged. | https://www.toyotabharat.com/ |
| Honda City | 11,99,900 | City page, starts at ₹11,99,900. Unchanged. | https://www.hondacarindia.com/honda-city |
| Honda Amaze | 7,65,400 | Page meta and visible start, ₹7,65,400. Unchanged. A second schema mentions ₹7,40,800 with benefits; that was not used. | https://www.hondacarindia.com/honda-amaze |
| Honda Elevate | 11,80,000 | Visible "Starts from ₹11,80,000". Unchanged. A schema offer on the same page says 11,80,700; the visible start was kept. | https://www.hondacarindia.com/honda-elevate |
| Škoda Slavia | 9,99,000 | Model page title and meta, ex-showroom starts at ₹9,99,900 / ₹9.99 lakh. Unchanged. | https://www.skoda-auto.co.in/models/slavia/slavia |
| Kia Carnival | 59,64,900 | Showroom page, Limousine+ 2026, ₹59,64,900 ex-showroom, all India. Unchanged. | https://www.kia.com/in/our-vehicles/carnival/showroom.html |
| Volkswagen Virtus | 10,70,900 | Page schema `lowPrice` 1070900. Unchanged. | https://www.volkswagen.co.in/en/models/virtus.html |
| Volkswagen Taigun | 10,99,900 | FAQ on the model page: ex-showroom INR 10 99 900. Schema price 1099900. Unchanged. | https://www.volkswagen.co.in/en/models/taigun.html |

**One price changed: Hyundai i20, from ₹5,99,700 to ₹5,99,000.**

## Specs filled for the starting variant

| Model | Variant used | What was stored | Source |
| --- | --- | --- | --- |
| Creta | 1.5 MPi Petrol MT E | 5 seats, 2025 model date, 1,497 cc, 115 PS, 143.8 Nm, 6-speed manual, petrol, 50 L tank, SUV | Delhi price table; specification schema `vehicleModelDate` 2025 and 5 seats; brochure https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/creta.pdf |
| Venue | 1.2 MPi, HX 2 manual | 5 seats, 2025, 1,197 cc, 83 PS, 114.7 Nm, 5-speed manual, petrol, 45 L, SUV | Price page text; specification schema; brochure https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/venue.pdf |
| i20 | Era, 1.2 Kappa manual | 5 seats, 2025, 1,197 cc, 83 PS (MT, not the 88 PS iVT), 114.7 Nm, 5-speed manual, 37 L, 170 mm clearance, hatchback | Price page; specification FAQ and schema; brochure https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/i20.pdf |
| Verna | HX 2, 1.5 MPi manual | 5 seats, 1,497 cc, 115 PS, 143.8 Nm, 6-speed manual, petrol, 45 L, sedan | Price page; brochure https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/verna.pdf (HX 2 is MT only). Seats from the highlights schema on the current Verna page. |
| Scorpio N | Z2 Petrol (E), 7-seater manual | Petrol, 6-speed manual, 7 seats, 2 L stored as 2,000 cc, 149.14 kW, 370 Nm, 57 L, SUV | Z2 page https://auto.mahindra.com/suv/scorpio-n-z2-petrol/SCNM075718103784.html and brochure https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw6e995936/brochures/SCN/SCN_brochure.pdf |
| Thar | THAR OG AXT, D117 CRDe manual | Diesel, 6-speed manual, 4 seats, 1,497 cc, 87.2 kW, 300 Nm, 55 L tank, 232 mm clearance, SUV | https://auto.mahindra.com/suv/thar/specs-and-features.html AXT is the only grade with the first column, the D117 rear-wheel-drive manual. |
| Bolero | B4, mHawk75 | Diesel, 5-speed manual, 7 seats, 1.5 L stored as 1,500 cc, 55.9 kW, 210 Nm, 60 L, 0-100 in 18 sec, SUV | https://auto.mahindra.com/suv/bolero/BOL.html schema, plus brochure https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dwa762f458/brochure/Bolero-brochure-May-25.pdf for the 60 L tank. The engine figures are the same on B4, B6 and B6(O). |
| Alto K10 | Std (O) petrol, not AGS | Hatchback, petrol, 5-speed manual, 5 seats, 998 cc, 65.7 bhp, 89 Nm, 24.39 km/l, 27 L | https://www.marutisuzuki.com/arena/alto-k10 and the price page. Mileage is the page's petrol (manual) figure, not the 24.90 km/l AGS figure. The same page also says "up to 50.4 kW"; that maximum was not used for the base car. |
| Camry | Camry Hybrid, the only powertrain | Hybrid, e-CVT, 5 seats, 2,487 cc, 230 PS combined, 221 Nm, 25.49 km/l, 50 L | https://www.toyotabharat.com/showroom/camry/specifications.html and https://www.toyotabharat.com/showroom/camry/index.html for 25.49 km/l. Engine-only output on the spec page is 187 PS; the stored power is the stated total hybrid output. |
| City | 2026 petrol, SV manual | Sedan, petrol, 6-speed manual, 5 seats, 1,498 cc, 121 PS, 145 Nm, 17.77 km/l, 40 L, year 2026 | https://www.hondacarindia.com/honda-city and https://www.hondacarindia.com/honda-city/tech-specs. SV is the lowest petrol grade and is manual only. e:HEV is ZX+ only, so it is not the starting car. Brochure https://www.hondacarindia.com/web-data/brochures/The%20New%20City%20Brochure_21.pdf |
| Amaze | 1.2 i-VTEC manual, V is the first listed grade | Sedan, petrol, 5-speed manual, 5 seats, 1,199 cc, 90 hp, 110 Nm, 18.65 km/l | https://www.hondacarindia.com/honda-amaze Car schema. Manual mileage, not the 19.46 km/l CVT figure. Power unit code on the schema is N12 (horsepower). |
| Elevate | 2026 petrol manual | SUV, petrol, 6-speed manual, 5 seats, 1,498 cc, 121 PS, 145 Nm, 15.31 km/l, 40 L, 220 mm, year 2026 | https://www.hondacarindia.com/honda-elevate schema and FAQ. Manual mileage matches the FAQ and the schema. The FAQ's CVT figure (16.61) and the schema's CVT figure (16.92) disagree; CVT is not the base figure used here. |
| Slavia | Classic 1.0 TSI manual | Sedan, petrol, 6-speed manual, 999 cc, 115 PS, 178 Nm, 20.32 kmpl, 45 L, 145 mm laden clearance | Model page for the price. Brochure https://www.skoda-auto.co.in/_doc/9cac9d7e-8cda-4d1c-ad5a-b1669fdb7932 Classic is the only trim limited to the 1.0 TSI manual. |
| Carnival | Limousine+ 2026 | Diesel, 8-speed automatic, 7 seats, 2,151 cc, 193 PS, 45 kgf.m, 72 L, year 2026 | https://www.kia.com/in/our-vehicles/carnival/specs.html and the showroom page for the year and price. One FAQ line also says "2025"; the showroom title says 2026. |
| Virtus | 1.0 TSI 6-speed manual, first brochure column | Sedan, petrol, 999 cc, 115 PS, 178 Nm, 20.08 km/l, 45 L, 179 mm unladen | https://www.volkswagen.co.in/en/models/virtus.html and brochure https://www.volkswagen.co.in/idhub/content/dam/onehub_pkw/importers/in/pdf/volkswagen-virtus-ebrochure.pdf |
| Taigun | 1.0 TSI 6-speed manual, first brochure column | SUV, petrol, 999 cc, 115 PS, 178 Nm, 19.87 km/l, 50 L, 188 mm unladen | https://www.volkswagen.co.in/en/models/taigun.html and brochure https://www.volkswagen.co.in/idhub/content/dam/onehub_pkw/importers/in/pdf/volkswagen-taigun-ebrochure.pdf |
| Fortuner | Not assigned | 7 seats and 80 L tank, shared by the petrol and diesel tables | https://www.toyotabharat.com/showroom/fortuner/index-fortuner.html |

## Still unpublished

These were left empty. They are not on the official page or brochure fetched for the starting variant. They were not filled from CarDekho, CarWale, Zigwheels, or blogs.

- **Mileage:** Creta, Venue, i20, Verna, Scorpio N, Thar, Bolero, Innova Crysta, Fortuner, Carnival.
- **Ground clearance:** Creta (the FAQ describes it and gives no millimetre figure), Venue, Verna, Scorpio N, Bolero, Alto K10, Innova Crysta, Fortuner, Camry, City, Amaze, Carnival.
- **0-100 and top speed:** every car except Bolero's schema 0-100 of 18 seconds. No official top speed was found for any of the 18.
- **Model year:** Verna (brochure print date is March 2026, not a model year; the highlights schema says 2026 but its engine list is the old 1.2 petrol / 1.5 diesel and was not used), Scorpio N, Thar, Bolero (schema `vehicleModelDate` is 2000, the nameplate's origin, and was not stored), Alto K10, Innova Crysta, Fortuner, Camry, Amaze, Slavia, Virtus, Taigun.
- **Innova Crysta engine, fuel, transmission, seats, power, torque, tank:** the showroom page lists a diesel G grade (2,393 cc, 150 PS, 343 Nm, 5-speed manual, 7/8 seats) and also a petrol of 122 kW. The Delhi starting price is not tied to either.
- **Fortuner engine, fuel, transmission, power, torque:** diesel is 2,755 cc / 204 PS and petrol is 2,694 cc / 166 PS. The Delhi starting price is not tied to either.
- **Seating as a number:** Innova Crysta, Slavia, Virtus, Taigun. The Slavia and Volkswagen brochures describe front and rear seats and do not print a seat count.
- **Amaze fuel tank and ground clearance.**
- **Camry body type** is not named on the spec page that was fetched.
- **Carnival body type** is not named on the spec page.
- **Scorpio N displacement in cc:** the brochure says capacity 2 L. That was stored as 2,000 cc.
- **Bolero displacement in cc:** the page says 1.5 L mHawk75. That was stored as 1,500 cc.

## Photos

| Model | What changed | License |
| --- | --- | --- |
| Creta | Replaced the previous crop with a 2021 India Creta front three-quarter. | CC BY-SA 4.0, Dairokkan9 |
| Venue | Replaced the previous crop with a Venue front three-quarter. | CC BY-SA 4.0, Ki hoon |
| i20 | Kept. The file shows the whole hatchback. | CC BY-SA 4.0, Alexander Migl |
| Verna | Added an older-generation Verna sedan. Commons had no current Indian Verna that showed the car. | CC BY-SA 4.0, Damian B Oh |
| Scorpio N | Added a 2024 Scorpio Z8L that shows the whole SUV. | CC BY-SA 4.0, LuvsMG481 |
| Thar | Replaced the cropped file with the uncropped Red Rage photo that shows the whole Thar. | CC BY-SA 4.0, Ank Kumar |
| Bolero | Kept. | CC BY-SA 3.0, RaNK001 |
| Alto K10 | Kept. | CC0, FusWrite |
| Innova Crysta | Kept. | CC BY-SA 4.0, Premnath Kudva |
| Fortuner | Kept. | CC BY-SA 4.0, Dinkun Chen |
| Camry | Kept. | CC BY-SA 4.0, Matti Blume |
| City | Kept. | CC BY-SA 4.0, Ethan Llamas |
| Amaze | Kept. | CC BY-SA 4.0, Saiphani02 |
| Elevate | Kept. | CC BY 3.0, Hulchul TV |
| Slavia | Added the 2021 India Slavia front view. | CC BY 3.0, Athira Murali |
| Carnival | Kept. | CC BY 4.0, OWS Photography |
| Virtus | Kept. | CC BY-SA 4.0, Dairokkan9 |
| Taigun | Kept. | CC BY-SA 4.0, Dairokkan9 |

## Left out

These were in `public/data/test.json` and are not in `cars.json`.

**Tata Motors (Nexon, Safari, Harrier, Punch, Altroz EV).** `cars.tatamotors.com` failed on an expired certificate. `www.tatamotors.com` robots.txt disallows `/passenger-vehicles/`, `/electric-vehicles/`, and press releases. Wikipedia articles cited older launch prices, not a current ex-showroom figure, so they were not used.

**Mahindra XUV700 and Marazzo.** Not on the current Mahindra passenger list. XUV 7XO is a different model and was not substituted.

**Maruti Suzuki Swift, Dzire, Brezza, Baleno.** Swift and Dzire price pages had conflicting meta prices and no single variant table in the HTML. Brezza states Delhi ex-showroom from 24 July 2026 but the HTML had no number. Baleno URLs returned 404.

**Toyota Glanza and Urban Cruiser Hyryder.** Not in the homepage Delhi ex-showroom list. The price API was not fetched.

**Hyundai Tucson.** Not in the current model list with an ex-showroom price.

**Honda City e:HEV, WR-V, Jazz.** The City e:HEV is a higher City grade, not the starting price. WR-V and Jazz were not on the fetched model pages with a price.

**Kia Seltos, Sonet, Carens, EV6.** Seltos and Sonet model paths are disallowed by Kia's robots.txt. The homepage Seltos line did not say ex-showroom on that slide. Carens HTML contained both ₹11,11,900 and ₹10,99,159. EV6 was described as exclusive of all taxes, which was not treated as ex-showroom.

**MG Hector, Astor, ZS EV, Comet EV, Gloster.** Hector showed both ₹12.14 lakh and ₹11.99 lakh, and the lower line also mentioned on-road pricing. Comet, ZS EV, and several others were shown as a lakh amount plus a per-kilometre fee, not an ex-showroom car price.

**Renault Kiger, Kwid, Triber, Duster, Captur.** A Renault page showed starting rupee amounts, including a new Duster, but did not label them ex-showroom.

**Škoda Kushaq, Kodiaq, Octavia RS, Superb.** Model URLs returned 404 and the homepage news module did not state a current ex-showroom price for them.

**Citroën C3, C5 Aircross, eC3, C3 Aircross, C4.** The India homepage HTML that was fetched did not contain ex-showroom prices.

**Volkswagen ID.4 and Polo GT.** Not tied to an ex-showroom figure on the pages that were fetched. Other homepage prices were left unused because the model name next to them was not established.

## Added 15 November 2026

The original 18 prices were left as stored. This pass did not re-read those price pages, so no change is recorded for them. Twenty-nine models were added from pages fetched the same day. A lakh figure on the page is stored as that amount times 100,000. Where the page printed an exact rupee amount, that integer was stored.

| Model | Price (INR) | Source | Image |
| --- | ---: | --- | --- |
| Hyundai Exter | 5,80,600 | Price page, ex-showroom start ₹5,80,600. Schema on that page agrees. A specification-page offer also says ₹5,73,500; it was not used. | CC BY 4.0, Dibyam Das, Commons |
| Hyundai Aura | 5,99,990 | Price page body, ex-showroom start ₹5,99,990. The short description rounds it to ₹5.99 lakh. | CC BY-SA 4.0, Auto Zuto, Commons |
| Hyundai Bayon | 9,99,900 | Price page, ₹9,99,900 ex-showroom. | CC BY-SA 4.0, Alexander Migl, Commons |
| Hyundai Alcazar | 14,50,700 | Price page body and schema, ₹14,50,700. The short description says ₹14.49 lakh. | CC BY 3.0, AMAN AUTOMOBILES, Commons |
| Hyundai Grand i10 Nios | 5,59,700 | Price page body and schema, ₹5,59,700 ex-showroom. The short description says ₹5.55 lakh. | CC BY-SA 4.0, AIMHO'S REBELLION 8490s, Commons |
| Hyundai i20 N Line | 9,27,200 | Price page body and schema, ₹9,27,200 ex-showroom. The short description says ₹9.21 lakh. | CC BY 3.0, DriveSpark, Commons |
| Hyundai Creta N Line | 19,03,300 | Visible sentence, starting ex-showroom ₹19,03,300. A schema offer on the same page says ₹17,83,000 and was not used. | CC BY 3.0, CARS WORLD Kannada, Commons |
| Hyundai Venue N Line | 10,66,100 | Visible starting price ₹10,66,100 on the ex-showroom price page. A schema offer says ₹10,65,400 and was not used. | CC BY-SA 4.0, Gpkp, Commons |
| Hyundai Creta Electric | 18,02,800 | Price page body and schema, ₹18,02,800 ex-showroom. | CC BY 4.0, Avante2025, Commons |
| Mahindra XUV 3XO | 7,79,000 | Page heading “Ex Showroom Price” ₹7.79 lakh. Schema low price ₹7,79,000.02. | CC BY-SA 4.0, LuvsMG481, Commons |
| Mahindra XUV 7XO | 13,99,000 | Schema low price ₹13,99,000, shown as ₹13.99 lakh ex-showroom. | Commons search returned no file. No photo. |
| Mahindra Thar Roxx | 12,52,000 | Shown as ₹12.52 lakh ex-showroom. Schema low price ₹12,52,000.02. | CC BY 4.0, The Drivers Hub, Commons |
| Mahindra Scorpio Classic | 13,43,200 | Schema low price ₹13,43,200.02, shown as ₹13.43 lakh ex-showroom. | Commons search returned no file. No photo. |
| Mahindra Bolero Neo | 9,06,000 | Schema low price ₹9,06,000, shown as ₹9.06 lakh ex-showroom. | Commons only returned 2016 TUV300 files. Those were not used. No photo. |
| Mahindra Bolero Neo+ | 11,46,000 | Schema low price ₹11,46,000, shown as ₹11.46 lakh ex-showroom. | Commons search returned no current Neo+ file. No photo. |
| Mahindra XUV 3XO EV | 13,89,000 | Shown as ₹13.89 lakh ex-showroom. Schema low price ₹13,88,999.85. | Commons search returned no file. No photo. |
| Maruti Suzuki Victoris | 10,49,000 | Price page, ₹10.49 lakh ex-showroom, same figure in the description, Open Graph, and Twitter tags. | Maruti Suzuki price-page image. Commons had no Victoris file. |
| Maruti Suzuki Fronx | 6,85,000 | Nexa page, from ₹6.85 lakh. The site says its prices are ex-showroom. | CC BY 2.0, Jason Lawrence, Commons |
| Maruti Suzuki Grand Vitara | 10,76,000 | Nexa page, prices start at ₹10.76 lakh. The site says its prices are ex-showroom. | CC BY 3.0, Explorer Rider, Commons. European Vitara files were not used. |
| Maruti Suzuki Invicto | 24,97,000 | Nexa page, from ₹24.97 lakh. The site says its prices are ex-showroom. | Commons search returned no file. No photo. |
| Maruti Suzuki Jimny | 12,32,000 | Nexa page, from ₹12.32 lakh. The site says its prices are ex-showroom. | CC BY-SA 4.0, Jakub Hałun, Commons |
| Maruti Suzuki XL6 | 11,52,000 | Nexa page, from ₹11.52 lakh ex-showroom. | CC BY-SA 4.0, Agratsa, Commons |
| Škoda Octavia RS | 56,69,000 | Model page, ₹56.69 lakh ex-showroom. The price module value is ₹56,69,000. | Commons results were the Octavia Combi RS wagon. They were not used for this car. No photo. |
| Honda ZR-V | 49,99,900 | FAQ and homepage, ₹49,99,900 ex-showroom Delhi. A meta description also says ₹47,99,000 and was not used. | CC BY-SA 4.0, Alexander-93, Commons |
| Volkswagen Tayron | 41,99,000 | FAQ, ex-showroom price of Tayron Life ₹41,99,000. | CC BY-SA 4.0, Alexander Migl, Commons. The Chinese FAW-Volkswagen Tayron files were not used. |
| Volkswagen Golf GTI | 50,90,900 | Page label “Ex-showroom Price ₹50,90,900”. The page also says the car is currently sold out. | CC BY-SA 4.0, Alexander Migl, Commons |
| MG Astor | 9,79,000 | Page text and schema, ₹9.79 lakh. The page says ex-showroom prices vary by region. | CC BY-SA 4.0, Alexander Migl, Commons file of the MG ZS facelift. |
| MG Majestor | 43,49,000 | Page text and schema, ₹43.49 lakh. The page says ex-showroom prices vary by region. | MG Motor India model-page image. Commons only returned Maxus D90 files, which were not used. |
| Toyota Innova Touring Sport | 19,23,000 | Homepage `delhiExShowroomPrice`, ₹19,23,000. | CC BY-SA 4.0, Captainmorlypogi1959, Commons |

## Specs filled on the new cars

Only a figure the official page states for that model, or for the only listed powertrain, was stored.

| Model | What was stored | Where |
| --- | --- | --- |
| Exter | SUV, 5 seats, 2025, 1,197 cc, 37 L petrol tank, 185 mm clearance | Specification schema and the fuel-tank FAQ |
| Bayon | Petrol, manual on HX 2, SUV, 1.5 l MPi (not stored as cc; the schema unit is litres) | Price page and specification schema |
| Alcazar | SUV, model year 2024 | Specification schema. Seat count left empty because the price page offers both 6 and 7 seats. |
| Creta N Line | Petrol, SUV, 5 seats | Price-page schema |
| Venue N Line | SUV, 5 seats, 2025, 998 cc | Specification schema |
| Creta Electric | Electric, SUV | Price page. Battery size left empty because both 42 kWh and 51.4 kWh are offered. |
| Scorpio Classic | Diesel, 97 kW, 300 Nm, SUV | Model page, one listed engine |
| Bolero Neo | Diesel, 1,493 cc, 73.5 kW, 260 Nm, SUV | Model page, one listed engine |
| XUV 3XO EV | Electric, SUV, 110 kW, 310 Nm, 0-100 in 8.3 s | Model page, one listed 39.4 kWh pack |
| Octavia RS | Petrol, 7-speed DSG, 195 kW, 370 Nm, 0-100 in 6.4 s, top speed 250 km/h | Model-page FAQ |
| ZR-V | Hybrid, e-CVT, SUV, 5 seats, 2026, 1,993 cc, 184 PS, 315 Nm, 22.8 km/l | Model page and tech-specs schema |

## Still unpublished

Re-read of the Creta, Venue, i20, and Verna brochures and specification pages still has no mileage number. Hyundai’s specification schema leaves `fuelEfficiency` empty. Top speed is still unpublished for every car except the Octavia RS, whose page states an electronically limited 250 km/h. 0-100 is still unpublished except Bolero (18 s, already stored), Octavia RS (6.4 s), and XUV 3XO EV (8.3 s).

The ZR-V tech page says the fuel-tank capacity will be announced later.

XUV 3XO, XUV 7XO, and Thar Roxx list more than one engine, so engine, power, torque, fuel, and transmission were left empty for those starting prices.

Victoris lists petrol manual at 21.18 km/l, petrol automatic at 21.06 km/l, AllGrip automatic at 19.07 km/l, and strong hybrid at 28.65 km/l. The starting price is not tied to one of those, so mileage was left empty.

WagonR was not added. The price page body says ₹4,98,900 ex-showroom, the description says ₹4.98 lakh, and the Twitter description says ₹5.79 lakh.

## Still left out on 15 November 2026

**Tata.** `www.tatamotors.com` robots.txt still disallows `/passenger-vehicles/` and `/electric-vehicles/`. The homepage has no ex-showroom prices. `cars.tatamotors.com` and `tata.cars` still fail certificate checks.

**Mahindra XUV400.** The page schema says ₹17,49,000 and another line says “Starting at INR 15.99 Lakh”, and that line is not labelled ex-showroom.

**Mahindra BE 6, XEV 9e, and XEV 9S.** The guessed product URLs returned 404. Launch headlines were not used as the current price.

**Kia Seltos, Sonet, Syros, Carens, Carens Clavis, Clavis EV, and EV9.** Each showroom page prints more than one ex-showroom start, or a price that is exclusive of taxes, or a battery-as-a-service price plus a per-kilometre fee. Kia’s robots.txt did not disallow the showroom paths on this read.

**MG Hector.** The description says the price starts from ₹11.99 lakh and the schema low price is ₹12,14,000.

**Renault.** The Triber page and the homepage show rupee amounts and do not call them ex-showroom.

**Škoda Kushaq, Kodiaq, and Kylaq.** The price module says “Price from” (₹10,69,000, ₹36,99,000, and ₹7,59,000) and does not say ex-showroom. Superb has no price. Octavia RS does, and was added.

**Citroën.** C3X, BasaltX, AircrossX, and eC3X pages do not show an ex-showroom car price. A C5 Aircross FAQ says the base starts at ₹39.99 lakh and does not call it ex-showroom.

**Maruti Suzuki Swift, Dzire, Brezza, Celerio, Ertiga, S-Presso, and Eeco.** The price pages still disagree with themselves, or the only exact figure is a cargo variant. Baleno and e Vitara pages that were fetched have no starting price. Ignis returned 404.

**Toyota Glanza, Hyryder, Taisor, Rumion, Hycross, Hilux, Ebella, Vellfire, and Land Cruiser 300.** The showroom HTML does not print a Delhi ex-showroom number. The homepage price API returned 403. Only Innova Touring Sport was added, from the homepage Delhi list.

## Added 15 November 2026

Twenty-nine models were added from the manufacturer pages fetched the same day. Prices below are the ex-showroom start used. A lakh figure was stored as that amount times 100,000. Where a page also showed a different schema or meta number, the visible starting sentence was kept and the other number is noted.

| Model | Price (INR) | Source |
| --- | ---: | --- |
| Hyundai Exter | 5,80,600 | https://www.hyundai.com/in/en/find-a-car/exter/price |
| Hyundai Aura | 5,99,990 | https://www.hyundai.com/in/en/find-a-car/aura/price |
| Hyundai Bayon | 9,99,900 | https://www.hyundai.com/in/en/find-a-car/bayon/price |
| Hyundai Alcazar | 14,50,700 | https://www.hyundai.com/in/en/find-a-car/alcazar/price |
| Hyundai Grand i10 Nios | 5,59,700 | https://www.hyundai.com/in/en/find-a-car/grand-i10-nios/price |
| Hyundai i20 N Line | 9,27,200 | https://www.hyundai.com/in/en/find-a-car/i20-n-line/price |
| Hyundai Creta N Line | 19,03,300 | https://www.hyundai.com/in/en/find-a-car/creta-n-line/price (schema also said 17,83,000) |
| Hyundai Venue N Line | 10,66,100 | https://www.hyundai.com/in/en/find-a-car/venue-n-line/price (schema also said 10,65,400) |
| Hyundai Creta Electric | 18,02,800 | https://www.hyundai.com/in/en/find-a-car/creta-electric/price |
| Mahindra XUV 3XO | 7,79,000 | https://auto.mahindra.com/suv/xuv3xo/X3XO.html |
| Mahindra XUV 7XO | 13,99,000 | https://auto.mahindra.com/suv/xuv-7xo.html |
| Mahindra Thar Roxx | 12,52,000 | https://auto.mahindra.com/suv/thar-roxx/TH5D.html |
| Mahindra Scorpio Classic | 13,43,200 | https://auto.mahindra.com/suv/scorpio-classic/SCRC.html (page also shows ₹13.43 lakh) |
| Mahindra Bolero Neo | 9,06,000 | https://auto.mahindra.com/suv/bolero-neo/NEO.html |
| Mahindra Bolero Neo+ | 11,46,000 | https://auto.mahindra.com/suv/bolero-neo-plus/NEOP.html |
| Mahindra XUV 3XO EV | 13,89,000 | https://auto.mahindra.com/suv/xuv3xo-ev.html |
| Maruti Suzuki Victoris | 10,49,000 | https://www.marutisuzuki.com/arena/victoris/price |
| Maruti Suzuki Fronx | 6,85,000 | https://www.nexaexperience.com/fronx |
| Maruti Suzuki Grand Vitara | 10,76,000 | https://www.nexaexperience.com/grand-vitara |
| Maruti Suzuki Invicto | 24,97,000 | https://www.nexaexperience.com/invicto |
| Maruti Suzuki Jimny | 12,32,000 | https://www.nexaexperience.com/jimny |
| Maruti Suzuki XL6 | 11,52,000 | https://www.nexaexperience.com/xl6 |
| Škoda Octavia RS | 56,69,000 | https://www.skoda-auto.co.in/models/octavia-rs/octavia-rs |
| Honda ZR-V | 49,99,900 | https://www.hondacarindia.com/honda-zrv (meta also said 47,99,000) |
| Volkswagen Tayron | 41,99,000 | https://www.volkswagen.co.in/en/models/tayron.html |
| Volkswagen Golf GTI | 50,90,900 | https://www.volkswagen.co.in/en/models/golf-gti.html |
| MG Astor | 9,79,000 | https://www.mgmotor.co.in/vehicles/mgastor |
| MG Majestor | 43,49,000 | https://www.mgmotor.co.in/vehicles/mg-majestor-biggest-suv-india |
| Toyota Innova Touring Sport | 19,23,000 | https://www.toyotabharat.com/ |

Specs filled from those pages, for the starting car or the only powertrain: Exter seats, year, 1,197 cc, 37 L tank, 185 mm clearance; Bayon petrol and manual; Alcazar year; Creta N Line petrol and five seats; Venue N Line five seats, 2025, 998 cc; Creta Electric electric; Scorpio Classic diesel, 97 kW, 300 Nm; Bolero Neo diesel, 1,493 cc, 73.5 kW, 260 Nm; XUV 3XO EV 110 kW, 310 Nm, 0-100 in 8.3 s; Octavia RS petrol, 7-speed DSG, 195 kW, 370 Nm, 0-100 in 6.4 s, top speed 250 km/h; ZR-V hybrid, e-CVT, five seats, 1,993 cc, 184 PS, 315 Nm, 22.8 km/l, 2026; Majestor diesel, 215.5 PS.

Still unpublished after this read: top speed on every car except Octavia RS; mileage on the original 18 that were already empty (Creta, Venue, i20, Verna, Scorpio N, Thar, Bolero, Innova Crysta, Fortuner, Carnival) and on the new cars except ZR-V. Victoris lists 21.18 km/l for petrol manual, but the starting variant is not named, so it was not stored. ZR-V says the fuel-tank figure will be announced later. Hyundai spec pages still have an empty fuel-efficiency field.

Not added, because the fetched page did not give one ex-showroom start: Tata (passenger paths still disallowed; `tata.cars` certificate failed), Kia Seltos, Sonet, Syros, Carens, Carens Clavis, and EV9 (two different ex-showroom figures on the same page), Renault (prices not labelled ex-showroom), Citroën (no ex-showroom label; C5 said ₹39.99 lakh without that label), Škoda Kushaq, Kodiaq, and Kylaq (a “price from” figure without the words ex-showroom), Škoda Superb (no price), Maruti Swift, Dzire, Brezza, Celerio, S-Presso, Ertiga, Eeco, and WagonR (conflicting ex-showroom amounts), Baleno and e Vitara (no price on the page), MG Hector (₹11.99 lakh and ₹12.14 lakh), Mahindra XUV400 (₹15.99 lakh and ₹17.49 lakh), and Toyota models whose Delhi price API returned 403.

Photos are Wikimedia Commons files from the searches already saved. XUV 7XO, Scorpio Classic, Bolero Neo, Bolero Neo+, XUV 3XO EV, Victoris, and Invicto have no photo of that model. Majestor uses the picture embedded on the MG model page. Commons results that were a different car (European Vitara, TUV300, Maxus D90) were not used. The Octavia RS photo on Commons is the estate.
