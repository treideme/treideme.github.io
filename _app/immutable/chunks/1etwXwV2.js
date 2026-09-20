import{$ as e,M as t,P as n,pt as r,tt as i}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as a}from"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var o={title:`MCS-51 / 8051 MCU Revived - Introduction`,date:`2022-05-31`,updated:`2025-10-04`,categories:[`covid-19`,`coding`,`embedded`,`8051`],coverImage:`/images/8051-banner.jpg`,coverWidth:1200,coverHeight:452,excerpt:`This is the first post in a series of posts to shed some light on the 8051 architecture.`},{title:s,date:c,updated:l,categories:u,coverImage:d,coverWidth:f,coverHeight:p,excerpt:m}=o,h=n(`<p>This is the first post in a series of posts to shed some light on the 8051 architecture using practical examples. The
8051 was first developed by Intel in 1980. It was initially used as a keyboard controller for the IBM PC series. The
simplicity and low-interrupt latency made it an attractive part that was supported by Intel well into the 1990s for
all sorts of applications. When Intel finally discontinued the series, a wealth of clones were already marketed by
competitors, since the architecture was not protected like current core architectures from <a href="https://www.electronicdesign.com/technologies/embedded/article/21808309/arm-eases-upfront-licensing-fees-to-head-off-risc-v" rel="nofollow">ARM, RISCV</a>, or <a href="https://www.eejournal.com/article/ibm-gives-away-powerpc-goes-open-source/" rel="nofollow">Power</a> and <a href="https://linuxgizmos.com/mips-isa-to-be-available-under-royalty-free-license/" rel="nofollow">MIPS</a> in the past. Since there is no license fee associated with making an 8051 core these days, they can still be
found in a wealth of modern 8-microcontrollers. Back in my college years in the early 2000s, I was working for <a href="http://erikbuchmann.de/" rel="nofollow">a Ph.D. student</a>,
who is now a tenured Prof., that still has a <a href="https://dbis.ipd.kit.edu/mitarbeiter/buchmann/microcontroller/index.htm" rel="nofollow">German hobbyist site around the Atmel 89C2052</a>. I remember spending
days at the lab or visiting him in his place to pick up tips on how to do custom PCBs, recompile a Linux kernel
(mind you back in the day their loadable module support was primitive), or get started doing embedded stuff with
nearly no development tools. These AT89C2052s were kind of attractive, because you just needed one friend, or a
university with a lab, to flash one to build your own programmer. The assembler was freely available. Off you could go
and do your own burn-and-pray 8051 development on your favorite open-source operating system, and not mess with any
commercial debug and programming tools in order to get started.</p> <p>Currently, I work professionally on complex vision multicore pre-release processors; and when having to pull together
a Linux distribution from scratch with scant documentation in a foreign language, you sometimes want the good old days
back and hack on something simple in your spare time. Working with these rather simple microcontrollers is like
meditation, or <a href="https://en.wikipedia.org/wiki/Kihon" rel="nofollow">Kihon martial arts practice</a> for me.</p> <!> <p>In this series, I will be revisiting a variety of 8051 derivatives. To start with, I picked an 8051 part that has
nearly zero overhead to bootstrap. I stumbled across <a href="https://www.stcmicro.com/index.html" rel="nofollow">STCMicro (STC)</a> a few times. They seem to have initially cloned the
Atmel <a href="http://www.stcmicro.com/datasheet/STC89C51RC-en.pdf" rel="nofollow">89C5x</a> (vs. <a href="https://ww1.microchip.com/downloads/en/DeviceDoc/doc0368.pdf" rel="nofollow">original</a>) and 89C205x series (vs. original), and eventually, put aggressive improvements in part of the
STC8 and STC15 series, almost making them attractive parts for production use. What makes all their parts interesting
is that they seem to all have a UART bootloader. There is no need for any costly flashing tools. Over the years there
is also pretty mature support in <a href="http://sdcc.sourceforge.net/" rel="nofollow">SDCC</a> for the 8051 series. STC provides its own <a href="http://www.stcmicro.com/rjxz.html" rel="nofollow">flasher for Windows</a> and there is an <a href="https://github.com/grigorig/stcgal" rel="nofollow">open-source tool</a> for any other platform. In terms of the bootstrap circuit, you need an external crystal for most of
the older parts, some newer parts, like the <a href="https://www.stcmicro.com/stc/stc15f104w.html" rel="nofollow">STC15-series</a>, have an internal RC oscillator, where this is not needed. The
only other piece needed is a reset circuit, consisting of a pull-down (yes reset is not inverted compared to most other
MCU architectures) resistor and a debouncing capacitor, to VCC. Then you just need the exposed UART signals to wire up
for flashing.</p> <p>If burn-and-pray is not your forte, <a href="https://jaycarlson.net/pf/stcmicro-stc8/" rel="nofollow">some STC devices have support for a UART monitor</a>, however, then you would have to
use Keil uVision instead of SDCC. As far as I know, to this day there does not appear to be an open-source toolchain
with monitor debugging support for these devices. In the next article, I am going to highlight how to bootstrap an
STC89C52 for a simple Hello World application.</p> <p>Addendum. I was asked why would anyone use this chip, and STC as a vendor in this day and age. I think this is
somewhat of a loaded question, but let me discuss some scenarios.</p> <ol><li>It is the only thing people were taught.</li> <li>It is the only thing in stock.</li> <li>It was mandated by a (potential government) customer.</li> <li>It is designed in for a sinister application.</li></ol> <p>The first one is a mundane one. Looking at Aliexpress there seems to be a wealth of dev-kits you can buy for various STC
platforms that were clearly set up not as production programmers but educational devices. I suspect there is likely an
incentive to push Made-in-China aggressively, even with outdated technologies, in Chinese educational institutions.
Given a lot of the western literature about the 8051 that probably made it verbatim into Chinese textbooks, it could
be the path of least resistance.</p> <p>The second one is actually an interesting tangent too. Especially during the past two years, a lot of new chips have
been delayed or are now only available on allocation. I have not seen <a href="https://lcsc.com/brand-detail/151.html" rel="nofollow">STC chips go out of stock on LCSC.com</a> yet while
being asked to wait for 52 weeks or more for other modern counterparts. I would not allege that STC is a stable
supplier, but conceptually, this could drive people to seek to design in (obviously) outdated technologies.</p> <p>The financialization of modern-day warfare puts an interesting tangent on three and four as well. Because these days
integrated circuit manufacturers most likely license IPs from different vendors, export controls and sanctions can
really threaten suppliers. I would not be surprised if this chip would be picked for applications where <a href="https://cset.georgetown.edu/wp-content/uploads/U.S.-Semiconductor-Exports-to-China-Current-Policies-and-Trends.pdf" rel="nofollow">restrictions
of use would bite</a>. For anyone designing things that end up on the wrong side of history, this chip might actually be
appealing. There is no fine print, no licensing agreement, and ample availability to build anything you want. In fact,
the current situation in Ukraine shows that Russian-made weapon systems increasingly rely on western semiconductors.
Instead of going with their <a href="https://www.tomshardware.com/news/russias-biggest-bank-tests-elbrus-cpu-finds-it-unacceptable" rel="nofollow">own sub-par semiconductors</a>, they soften mil-spec requirements and design in
commercial-off-the-shelf integration circuits that are not restricted and are widely available. When they become
unavailable, they seem to resort to tearing apart their <a href="https://www.thedrive.com/the-war-zone/captured-russian-weapons-are-packed-with-foreign-microchips" rel="nofollow">(potentially looted) washing machines</a>. I would not be
surprised to see integrated circuits from their “communist brothers and sisters” in other mundane applications.
This could be spun into a wider discussion on PDIP packages as well. Despite higher manufacturing costs, socketed
microcontrollers could likely be recycled and reused at a better rate than SMT parts.</p> <p><a href="2022.06.04">Continue to part two here</a></p>`,1);function g(n){var o=h(),s=i(e(o),4);a(s,{src:`/images/stc89c52.jpg`,alt:`8051 Architecture`,width:`600`,height:`400`}),r(16),t(n,o)}export{g as default,o as metadata};