---
layout: post
title: "Hydrogen-powered aviation part 1: a history"
header_image: https://drive.google.com/uc?id=1m7veVzNxKp_1OGRatHtzCPyJSvki7JFf
tags: [hydrogen, NASA, pipistrel, dlr, fuel cell]
categories: [electric flight]
permalink: /blog/hydrogen-powered-aviation-part-one-history/
---

Hydrogen fuel for aircraft, while seemingly a recent idea, is almost as historic as jet aviation itself.
This post, the start of a series on hydrogen power for aviation applications, will dive into the history of hydrogen-powered flight, from the secretive days of the Cold War to the clean power demonstrator projects of the present day.

<!--more-->

### Theoretical background
Hydrogen has long seemed attractive to aircraft designers as a fuel source because it has desirable physical properties. Compared to kerosene jet fuel, it holds tremendous energy per unit weight: hydrogen measures as high as **142 MJ/kg**, while jet fuel holds about 42 MJ/kg. This promises longer range.
Per the Breguet range equation:

$$R=\frac{\eta H_v}{g}\frac{L}{D}ln\Big(\frac{W_{init}}{W_{final}}\Big)$$

where $$H_v$$ is the fuel heating value (a.k.a. specific energy), $$\eta$$ is the propulsive and thermodynamic combined efficiency, $$g$$ is the gravitational constant, $$L/D$$ is the lift to drag ratio, and $$W$$ is the weight.

We see that the range is, to first order, linear with specific energy of the fuel. In this simple analysis, hydrogen looks about three times better than kerosene on range!
Hydrogen also burns very easily, which improves engine operability at the corners of the operating envelope (especially at high altitude).

Hydrogen also burns cleanly, producing only water vapor and heat (when burned very lean - NOx is a concern otherwise). When used in a fuel cell, no carbon emissions are produced. In the modern era, the environmental benefits of hydrogen fuel could be its greatest selling point (assuming that it can be generated in a sustainable way).

In reality, the range benefit is greatly reduced due to the low density of hydrogen, which causes the airframe to grow (increasing weight and drag). I will discuss these tradeoffs in the next post.

### NACA's Project Bee

An early German turbojet experiment ran using gaseous hydrogen as early as 1937. Following the war, engineers at NACA began studying hydrogen fuels for strategic missile applications [[1](https://history.nasa.gov/SP-4404/ch5-1.htm)]. Liquid hydrogen for rockets was first produced in the early 1950s.

By 1954, NACA's Lewis Field laboratories were actively studying hydrogen for aircraft applications where **high altitude** was a mission requirement [[2](https://history.nasa.gov/SP-4404/ch6-2.htm)]. At high altitude, the low density of hydrogen was less of a penalty (as the high altitude necessitates a larger wing and fuselage anyway). Preliminary trade studies included a subsonic reconnaissance  airplane designed to fly at high altitude (it's unclear to me whether the authors at NACA were aware of the existence of the U-2).

![](https://drive.google.com/uc?id=1EjA6RdTBHqwG0wTXzMonWLQLGrY1FokZ){: .img-responsive .center-block}

High-altitude reconnaissance airplane with liquid hydrogen fuel (NACA concept by Abe Silverstein and Eldon Hall) [[3](https://history.nasa.gov/SP-4404/ch6-3.htm)]
{: .caption}

As a proof of concept for liquid hydrogen airbreathing propulsion, NACA modified a Martin B-57 bomber to run one engine on hydrogen - *the world's first hydrogen-powered airplane* (as far as I can tell). Known as "Project Bee", the aircraft first switched to hydrogen fuel in flight in 1957, eventually making 38 transitions from jet fuel to hydrogen and back.

![](https://drive.google.com/uc?id=12Xw92aaVYBGsG7UxkuMr8uPzYlX7uGFT){: .img-responsive .center-block}

NACA's converted B-57 hydrogen testbed - the world's first airplane to run (partially) on hydrogen fuel [[4](https://history.nasa.gov/SP-4404/ch6-4.htm)]
{: .caption}

The tests validated the feasibility of using hydrogen as an aviation fuel and noted several other findings:
- Conversion of turbojet engines from JP-4 to hydrogen is not very difficult
- The fast flame speed of hydrogen enables engines to be built more compactly
- It is possible to handle LH2 safely during ground operations

<iframe width="560" height="315" class="center-block" src="https://www.youtube.com/embed/Icy7W2qOTOE?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### CL-400 Suntan
In the late 1950s, a few proposals for hydrogen-powered military aircraft circulated, but one stands above all the rest in scope and cost: the Lockheed CL-400 "Suntan". Jealous of the CIA's success with the U-2 program, the Air Force wanted a high-speed, high-altitude reconnaissance airplane, and they wanted it fast.

In 1956, Lockheed's legendary Skunk Works director and aircraft design chief Kelly Johnson developed a proposal for two prototypes designed to fly at Mach 2.5 at 90,000+ feet. The Air Force was enthusiastic and the project moved ahead in secrecy (full access was restricted to only 25 people!) Lockheed was the prime and Pratt and Whitney was to be the engine contractor.

![](https://drive.google.com/uc?id=1dlVBhlgMuYRK8gsmUl0to7ZMMmySyGuc){: .img-responsive .center-block}

Concept drawing of the CL-400 Suntan reconnaissance aircraft [[5](https://history.nasa.gov/SP-4404/ch8-3.htm)]
{: .caption}

The strange dimensions of the airplane are attributable to the low volumetric density of hydrogen. While hydrogen has extremely high energy per unit mass, it has relatively low energy per unit *volume*. This results in oversized fuselage tanks, a problem compounded by the need to insulate the cryogenic liquid fuel from the extreme skin temperatures at supersonic speeds.

For the Suntan program, Lockheed developed an industrial-scale liquid hydrogen infrastructure in the United States from scratch and demonstrated that it is possible to work with hydrogen without extreme accident risk at Fort Robertson, near Burbank, CA.

Meanwhile, on the propulsion side, Pratt and Whitney evaluated several ideas for the engine. A 1957 patent shows what may be Pratt and Whitney's first concept for a geared turbofan engine. This concept morphed into the model 304 engine for the CL400 program which was tested in 1957 and 1958. The performance of the engine was promising.



![](https://drive.google.com/uc?id=1oaH38DLURvoCKsbvkXvyM38MFOu75sRP){: .img-responsive .center-block}

Pratt and Whitney patent for a hydrogen-powered geared turbofan engine concept [[6](https://history.nasa.gov/SP-4404/ch8-7.htm)]
{: .caption}

In the modern era, Pratt and Whitney's kerosene-powered GTF engines have resulted in huge noise and fuel burn reductions for the A320neo and Bombardier C-series programs. It is interesting to think that the roots for this innovation reach back to the early days of the Cold War!

Unfortunately, the range specification at the airplane level began to look less and less favorable to the Air Force, and by the end, even Kelly Johnson was advocating for the program to be cancelled. While the Suntan never flew, the innovations in liquid hydrogen production, handling, and lightweight tankage contributed to the space program. The program was still amazingly expensive in 1957 dollars: up to \$250 million! [[7](https://history.nasa.gov/SP-4404/ch8-13.htm)]

For a more personal perspective on the Suntan program, be sure to read Ben Rich's book *Skunk Works* which devotes a chapter to the topic.


### Hydrogen power in the modern era
After the problem of high-altitude propulsion was eventually solved without using hydrogen fuel, there was little further research in the area until the oil crisis and environmental movements provided a boost.

The Soviet Union, with growing nuclear generating capacity and limited (at the time) petroleum resources, was interested in producing hydrogen as aviation fuel for economic reasons. As a proof of concept, a Tu-154 airliner was heavily modified so that the right engine would run on $$LH_2$$. The project was similar in scope to NACA's Project Bee thirty years earlier.

![](https://drive.google.com/uc?id=1sAXIs2yDh5U6qiGpmsSw8ZlQRV2KSkY9){: .img-responsive .center-block}

Tu-155 cryogenic fuels demonstrator [[9](https://web.archive.org/web/20130218231656/http://www.tupolev.ru/English/Show.asp?SectionID=82)]
{: .caption}

The Tu-155 demonstrator first flew using partial hydrogen fuel in 1988 - the first "passenger" aircraft to do so, though clearly it was not a practical passenger aircraft in that form [[10](https://www.nytimes.com/1988/05/24/science/clean-hydrogen-beckons-aviation-engineers.html)]. The aircraft's aft fuselage was entirely consumed by a huge cryotank. As more natural gas production came online in Russia, the aircraft was modified to run on liquid natural gas instead of hydrogen!

As far as I can tell, no other hydrogen-powered manned aircraft flew again for about twenty years. In the meantime, public awareness of climate change rose, and car manufacturers started experimenting with zero-emission fuel cell vehicles. While fuel cell technology had been known for decades, space power applications helped mature the technology to the point that terrestrial applications became feasible.

The **NASA/Aerovironment Helios** HALE program (1999-2003) was designed to use a hydrogen fuel cell system as a means of storing energy during the night. Solar cells provide excess power during the day which can be used to generate hydrogen through electrolysis. However, it seems that the aircraft never actually used this capability before it broke apart in 2003 [[11](https://arc.aiaa.org/doi/10.2514/1.42234)].

Two other large UAS have flown using liquid hydrogen fuel: the **Aerovironment Global Observer** in 2011 (which used  fuel cells in a distributed architecture) and the **Boeing Phantom Eye** in 2012 (which used a turbocharged internal combustion engine) [[12](https://www.boeing.com/defense/phantom-eye/)].

![](https://drive.google.com/uc?id=1m7veVzNxKp_1OGRatHtzCPyJSvki7JFf){: .img-responsive style="width: 100%"}

The Boeing Phantom Eye long-endurance demonstrator [[12](https://www.boeing.com/defense/phantom-eye/)]
{: .caption }

The first manned aircraft powered by fuel cells was the **Boeing Fuel Cell Demonstrator**, a modified Diamond HK36 motor glider built by Boeing Research and Technology Europe. The aircraft, which flew in 2008, used a 75kW (peak) motor and 24 kW fuel cell system consuming *gaseous* hydrogen, supplementing with battery power on takeoff and climb. The fuel cell alone was sufficient for level cruise flight. The demonstrator identified several challenges for future tech development:

- Weight of the hybrid power system (in particular, "balance of plant" - the supporting systems for the fuel cells, which were not flight-optimized)
- Thermal management of motor and fuel cell waste heat
- Weight and cost increase of mitigating hydrogen hazards

![](https://drive.google.com/uc?id=1TlWnG9ravpGEiPRhZjr5SBvJ-jY8PyKe
){: .img-responsive style="width: 100%"}

Internal configuration of the Boeing Fuel Cell demonstrator [[11](https://arc.aiaa.org/doi/10.2514/1.42234)]
{: .caption }

The team estimated that the hybrid propulsion system added about 150kg weight compared to the conventional internal combustion engine. For a small aircraft, that is a huge weight increase, consuming most of the aircraft's useful load. However, the authors note that newly-available, improved fuel cell systems with specific power 0.5-1.0 kW/kg would have reduced the weight penalty substantially [[11](https://arc.aiaa.org/doi/10.2514/1.42234)].

Two similar motorglider conversions projects were completed in Europe. The **DLR H2** (2009) is the first 100% hydrogen-powered manned aircraft. A converted Antares 20E, its 33kW fuel cell system provides sufficient power for takeoff without using batteries. DLR claims the aircraft can stay aloft for five hours, but because the base airframe is a sailplane, that figure might depend on using soaring techniques. [[13](https://www.dlr.de/tt/en/Portaldata/41/Resources/dokumente/ec/Antares-DinA5-V6_E_WEB.pdf)] [[14](https://www.dlr.de/content/en/articles/aeronautics/research-fleet-infrastructure/dlr-research-aircraft/antares-dlr-h2-out-of-operation.html)]

<iframe width="560"  class="center-block" height="315" src="https://www.youtube.com/embed/B46iDZUya3s?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The **DLR HY4** (2016) is a striking four-seat twin-fuselage configuration which claims to be the first hydrogen-powered "passenger airplane." It has **80kW** fuel cell power, by far the most of any existing aircraft. It is a converted Pipistrel Taurus G4 [[15](https://www.aerospace-technology.com/projects/hy4-aircraft/)]. The the same airframe won the NASA Green Flight challenge.

![](https://drive.google.com/uc?id=1PBm6stN8n0C28YIxGLxv8abvbS4Swvkm){: .img-responsive style="width: 100%"}

DLR HY4 demonstrator on its maiden flight in 2016 [[15](https://www.aerospace-technology.com/projects/hy4-aircraft/)]
{: .caption }

### Summary

While electric propulsion has been highly visible in the press, hydrogen-based aircraft propulsion has a longer history and is arguably more practical in the current state. In my next post, I will compare the rate of progress of hydrogen fuel cells and all-electric systems and identify key performance measures which are currently limiting the potential usefulness of hydrogen for aircraft.