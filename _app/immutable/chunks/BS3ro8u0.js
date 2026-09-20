import{$ as e,M as t,P as n,pt as r,tt as i}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as a}from"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var o={title:`Smart Real-Time-Clock on a $2 PCB (1/2)`,date:`2022-10-29`,updated:`2025-10-04`,categories:[`covid-19`,`embedded`],coverImage:`/images/pcb_screenshot.png`,coverWidth:896,coverHeight:679,excerpt:`Ulta low power RTC design.`},{title:s,date:c,updated:l,categories:u,coverImage:d,coverWidth:f,coverHeight:p,excerpt:m}=o,h=n(`<p>All sources and design files can be found on <a href="https://github.com/treideme/rx8901" rel="nofollow">GitHub</a>.</p> <p>After a busy week, I cleaned up my overflowing inbox over the weekend and found some real-time clocks, we got from one
of our reps that we hotlisted to evaluate for an upcoming project. Unfortunately, with brand-new parts, you do not
often get a development board or standard breakout boards. So I used an extended lunch break to fashion one in <a href="https://www.kicad.org/" rel="nofollow">KiCAD 6</a>.</p> <p>Timekeeping in embedded systems can be tricky. For island solutions that are not connected to a network-time protocol
(NTP) source, GPS as a time source may be an option if the sky above the unit is open and there is enough power budget
to operate a GPS receiver. The cost of <a href="https://www.aliexpress.com/item/1005004446888544.html" rel="nofollow">GPS modules</a> has come down a lot over the years. However, for deeply embedded
systems, or solutions that would have to survive on a very low power budget a real-time clock may be needed. A lot of
these systems are often sensor systems that operate over brief periods and sleep most of the time. In many cases, this
can be as simple as reading one or more digital inputs, processing the data, and going back to sleep. If the RTC could
take over some event processing and only wake up the system to process such events in bulk, power consumption could be
greatly reduced. In other applications, wireless sensor networks rely heavily on time-domain-multiplexing for message
exchange. To keep the power consumption low the radio front-end is only switched on for a very brief amount of time on
a schedule to exchange data or route messages to the next hop in the network. Such systems also benefit from really
accurate low-power time-keeping.</p> <p>Well, one of our corporate reps recently introduced us to the <a href="https://www5.epsondevice.com/en/products/rtc/rx8901ce.html" rel="nofollow">Seiko Epson RX8901CE family</a> of RTCs. Compared to
traditional RTCs this one packs quite a few features that make it fairly attractive to keep the BOM part count low. It
has a built-in crystal that on some variants can also be clocked out to other components near the module, it has
monitoring on up to three different event pins and comes in either SPI or I2C interface options, the package is
about the size of a standard small TXO, and has a built-in circuit for battery-failover (if the system power is lost).
It can actually monitor the battery voltage too and brown out if it gets too low. That is quite a powerhouse for
an RTC. Unfortunately, neither Seiko-Epson nor any known third parties provide a dev kit for it, making the evaluation
and prototyping a bit painful.</p> <!> <p>I used an extended lunch break on the weekend to turn the datasheet into a KiCad 6 library and fashion a minimal
break-out board for it, sources, and Gerber exports (for JLCPCB) can be found <a href="https://github.com/treideme/rx8901" rel="nofollow">here</a>.</p> <!> <p>It turns out it is small enough, such that 5 boards could be had for $2 plus shipping. The internal regulator of the RTC
needs a 1uF bypass capacitor placed close to the chip as well, I added some optional 4K7 pull-ups to condition the I2C
interface and one bypass capacitor for VDD to account for switching noise across potentially longer jumper wires. With
snail mail, I am not in a hurry to test this anytime soon, this could be had for the amount I’d typically spend on a
Tim Hortons supply run. If you do not have the 0603 passives handy, you can also get them reasonably priced from LCSC.</p> <!> <p>There you have it, these days you can make your own five PCBs for $2 excluding shipping. With such competitive pricing,
I am hard-pressed to imagine, why anyone would want to invest <a href="https://www.youtube.com/watch?v=N6nEgN4THRE" rel="nofollow">$5K in home PCB-making equipment</a>.</p> <!> <p>Once this board arrives, I will post another update on how to work with it and how to leverage some of these advanced
RTC features.</p>`,1);function g(n){var o=h(),s=i(e(o),8);a(s,{src:`/images/rx8901_block.png`,alt:`RX8901 Block Diagram`,width:`500`});var c=i(s,4);a(c,{src:`/images/pcb_schematic.png`,alt:`PCB Screenshot`,width:`500`});var l=i(c,4);a(l,{src:`/images/pcb_configuration.png`,alt:`PCB LCSC Configuration`,width:`700`});var u=i(l,4);a(u,{src:`/images/pcb_price.png`,alt:`PCB LCSC Pricing`,width:`700`}),r(2),t(n,o)}export{g as default,o as metadata};