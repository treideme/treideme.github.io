import{E as e,M as t,P as n,et as r,nt as i,vt as a,yt as o}from"./BHsdRB4o.js";import"./xihTtKlq.js";import"./m_g3X64e.js";import{t as s}from"./BQ7zbU5T.js";import"./DT-fGpIb.js";import"./DjUvI5Mi.js";import{t as c}from"./ClIL91uL.js";var l={title:`MCS-51 Real-World Interfacing - Ethernet`,date:`2025-11-29`,updated:`2026-09-26`,categories:[`coding`,`embedded`,`8051`],coverImage:`/images/1980s_ethernet.jpg`,coverWidth:410,coverHeight:512,excerpt:`An IP-stack in 512 bytes of SRAM`},{title:u,date:d,updated:f,categories:p,coverImage:m,coverWidth:h,coverHeight:g,excerpt:_}=l,v=n(`<blockquote><p>“‘No’ means let’s do it anyway!”</p> <p><em>Gene Frantz</em></p></blockquote> <p>I almost abandoned this project ten months ago. The board would not talk to the Ethernet
chip, I found an erratum saying the chip needs an 8 MHz SPI clock, I could reach
about 35 kHz bit-banged, and that seemed like the end of it. In 2026 I picked it up again
and gave it a second shot.</p> <p>The temptation to get this going anyways remained a bit of a personal challenge.
With so many IP stacks dangling around for the tinyest MCUs I was wondering if we
can pull of IP networking on this chip.</p> <h1 id="ethernet-on-an-stc89c52"><a aria-hidden="true" tabindex="-1" href="#ethernet-on-an-stc89c52"><span class="icon icon-link"></span></a>Ethernet on an STC89C52</h1> <p>None of the STC89 parts have an Ethernet MAC or PHY, so the protocol has to
live in an external controller. Dallas Semiconductor saw this coming in the
90s and shipped the <a href="https://www.analog.com/en/products/ds80c400.html" rel="nofollow">DS80C400</a>,
an MCS-51 derivative with the MAC built in, still in production. But I do not feel
like acquiring another dev kit to catch dust. The low-cost option everyone
reaches for is the <a href="https://www.microchip.com/en-us/product/enc28j60" rel="nofollow">Microchip ENC28J60</a>: a
stand-alone 10BASE-T controller with an SPI interface and 8 KB of buffer
memory, around since the early 2000s and still everywhere in hobby and
industrial gear. It handles framing, Manchester encoding, collision detection
and CRC.</p> <h2 id="protocol-background"><a aria-hidden="true" tabindex="-1" href="#protocol-background"><span class="icon icon-link"></span></a>Protocol Background</h2> <p>Every device on the network carries a unique six-byte <code>MAC</code> address, plus two
special forms: the broadcast address <code>FF:FF:FF:FF:FF:FF</code>, which reaches
everything, and multicast addresses, which reach a group.</p> <!><br/> <p>For a product you register with the <a href="https://standards.ieee.org/products-programs/regauth/" rel="nofollow">IEEE</a> for your own
block. Having built a number of chip-down embedded systems for vision tasks
over the years, I have an example of what that looks like.</p> <!><br/> <p>After laying down a significant amount of funds, you own a turf of 4095
addresses. On the ENC28J60 they live in six registers called <code>MAADR0</code> through <code>MAADR5</code>, and those six registers are where this project fell over.</p> <h2 id="yet-another-ip-stack"><a aria-hidden="true" tabindex="-1" href="#yet-another-ip-stack"><span class="icon icon-link"></span></a>Yet another IP stack</h2> <p>So before writing anything, I went looking for a stack I could borrow. The 8051 has
been around since 1980 and the ENC28J60 since 2004, so somebody must have done this.</p> <p>I built the candidates rather than reading their README files. Each one was compiled
with SDCC 4.5.0 for <code>mcs51</code>, linked against a stub <code>main()</code> and stubbed drivers, and
the sizes read off the linker’s <code>.mem</code> output. That is the same measurement my own
stack reports, so the numbers compare directly.</p> <table><thead><tr><th>stack</th><th align="right">flash</th><th align="right">RAM</th><th align="right">MTU</th></tr></thead><tbody><tr><td>this port, ARP through TCP</td><td align="right"><strong>10,272</strong></td><td align="right"><strong>501</strong></td><td align="right"><strong>1500</strong></td></tr><tr><td>uIP 1.0 + DHCP + DNS</td><td align="right">19,360</td><td align="right">1,113</td><td align="right">~380</td></tr><tr><td>tuxgraphics 3rd gen</td><td align="right">7,451</td><td align="right">776</td><td align="right">~530</td></tr><tr><td>lwIP 2.2.0, minimal</td><td align="right">137,900</td><td align="right">13,503</td><td align="right">n/a</td></tr><tr><td>picoTCP, on ARM</td><td align="right">30,508</td><td align="right">~19,000</td><td align="right">n/a</td></tr></tbody></table> <p>The STC89C52 has 8 KB of flash and 256 bytes of XRAM. Every row except one is over
budget on RAM alone, and RAM is the wall you hit first.</p> <p><strong>lwIP</strong> fails to compile, in six files, with SDCC error 92: <em>functions called via pointers must be reentrant</em>. SDCC overlays
parameters and locals in statically allocated RAM, so an indirect call cannot carry
more than a couple of bytes of arguments. lwIP is built on exactly those calls: <code>netif-&gt;input</code>, <code>netif-&gt;output</code>, <code>pcb-&gt;recv</code>. Making every function reentrant clears
the errors and produces the 137 KB above, which then fails to link.</p> <p><strong>tuxgraphics</strong> was written for an ATmega88 with an ENC28J60, almost exactly this board’s budget,
and it ships the NIC driver. 7.5 KB of flash is genuinely under the limit. Then its
driver reads each frame into <code>buf[]</code> with <code>BUFFER_SIZE 550</code>, and the TCP code indexes
that array everywhere.</p> <p>The pattern across all of them is <strong>keeping a whole frame in MCU RAM</strong>, because
every part they were written for has kilobytes of it to spare.</p> <p>Searching for 8051 ports turned up two that published their build output
rather than a claim.</p> <p>A Keil C51 port of uIP 0.9 has <code>MEMORY MODEL: LARGE, Program Size: data=30.1 xdata=1024 code=20310</code> sitting in its repository. Subtracting the 5,635 bytes of ROM web pages
leaves about 14.7 KB of stack and driver, using the whole 1 KB of XDATA, at an MTU of
233, with UDP compiled out and no DHCP or DNS. Its SPI is bit-banged on P1.5, P1.6 and
P1.7, within one pin of this board.</p> <p>A hand-rolled SDCC stack reports <code>18,181</code> bytes of flash and <code>2,015</code> of XDATA for ARP
plus one TCP connection plus HTTP, with no ICMP and no UDP at all.</p> <p>Both needed large memory model. Both needed at least 1 KB of XDATA. Neither managed
UDP and ICMP and DHCP and DNS together. No published 8051 IP stack I could find runs
below about 14 KB of flash or 1 KB of XDATA.</p> <h2 id="keeping-ip-headers-in-sram"><a aria-hidden="true" tabindex="-1" href="#keeping-ip-headers-in-sram"><span class="icon icon-link"></span></a>Keeping IP Headers in SRAM</h2> <p>This idea comes from <code>UIPEthernet</code>. Headers land in a
42-byte scratch buffer, payloads stream from the NIC’s receive buffer straight to its
transmit buffer through a 32-byte window, and the TCP retransmit copy lives in a slot in
the ENC28J60’s own 8 KB of SRAM. An MTU of 1500 therefore costs no XRAM at all.</p> <p>UIPEthernet reaches the by setting <code>UIP_CONF_BUFFER_SIZE 98</code> so the RAM buffer
holds headers only and carving the payload pool out of the ENC’s transmit SRAM. Microchip’s
own TCP/IP Lite does the same thing. Both are unusable here, one being Arduino C++ and the
other licensed to Microchip silicon, but both had the idea first.</p> <p>Both halves of that conclusion were wrong, and the interesting part is <em>how</em> they
were wrong. The erratum does not apply to any chip you can buy today. And the
8051 turns out to have a hardware SPI port that its datasheet never calls one.</p> <h1 id="rolling-our-own"><a aria-hidden="true" tabindex="-1" href="#rolling-our-own"><span class="icon icon-link"></span></a>Rolling our Own</h1> <p>So picking up the best design lessons from the other stacks, I rolled my own to make it work. It
was quite a bit of work in many stages.</p> <table><thead><tr><th>stage</th><th>feature</th><th align="right">flash</th><th align="right">XRAM</th></tr></thead><tbody><tr><td>1</td><td>ARP reply</td><td align="right">1,827</td><td align="right">78</td></tr><tr><td>2</td><td>IPv4, ICMP echo</td><td align="right">2,510</td><td align="right">78</td></tr><tr><td>3</td><td>UDP echo</td><td align="right">2,630</td><td align="right">78</td></tr><tr><td>4</td><td>DHCP client</td><td align="right">4,025</td><td align="right">97</td></tr><tr><td>5</td><td>MTU 1500</td><td align="right">4,025</td><td align="right">97</td></tr><tr><td>6</td><td>lease, renew, rebind, expiry</td><td align="right">5,137</td><td align="right">126</td></tr><tr><td>7</td><td>ARP client, DNS A records</td><td align="right">7,147</td><td align="right">209</td></tr><tr><td>8</td><td>TCP echo, one connection</td><td align="right">10,272</td><td align="right">279</td></tr></tbody></table> <p>Stage 5 is the one worth staring at. <strong>Going from a 576-byte MTU to 1500 costs no flash
and no RAM at all</strong>, because the MTU is a constant and a different buffer layout inside
the NIC.</p> <p>Stage 8 does not fit the STC89C52RC. Ten kilobytes of flash against an eight kilobyte
part is not a near miss, so TCP needs the pin-compatible STC89C516RD+ with 61 KB. Every
other stage up to 7 fits the small part with room left.</p> <h2 id="why-it-failed-the-first-time"><a aria-hidden="true" tabindex="-1" href="#why-it-failed-the-first-time"><span class="icon icon-link"></span></a>Why It failed the First Time</h2> <p>The document is <a href="https://ww1.microchip.com/downloads/en/DeviceDoc/80349c.pdf" rel="nofollow">DS80349C</a>, and
erratum #1 says exactly what I remembered:</p> <blockquote><p>When the SPI clock from the host microcontroller is run at frequencies of less
than 8 MHz, reading or writing to the MAC registers may be unreliable.</p></blockquote> <p>So the dusty one I had in the box had to be replaced by a newer silicon revision. So the
first thing the firmware does now, before configuring anything, is say what
it is talking to:</p> <pre class="language-undefined"></pre> <p>And if it <em>is</em> an affected die, there is still a way through that does not need
8 MHz. Read what the erratum actually restricts: access is <em>unreliable</em>, not
impossible, and it covers the MAC registers only, not the ETH registers and not the
packet buffer, which is where all the throughput lives. The MAC registers are
written about a dozen times and all of them during initialisation. So write them,
read them back, and retry:</p> <pre class="language-c"></pre> <h1 id="bit-banged-spi"><a aria-hidden="true" tabindex="-1" href="#bit-banged-spi"><span class="icon icon-link"></span></a>Bit-banged SPI</h1> <p>The second failure of the previous attempts were board peripherals. The pins I
initially picked were used for LED control and landed in a logic chip.</p> <p>On the initial attempt. <code>EREVID</code> should read <code>0x06</code>. It read <code>0x0C</code>.
Byte-identical across three cold
boots, which is the shape of a wiring fault rather than noise: noise is not
repeatable to the bit. <code>0x0C</code> is <code>0x06</code> shifted left by one. Every register
read came back doubled.</p> <p>The SPI lines were on P0. On an 8051, P0 has no internal pull-up at all: it is
open-drain, and on this board it is pulled up through a 10k resistor pack into a
bus it shares with an always-enabled 74HC245, the LED matrix rows, and the LCD
data lines. None of that is hidden. It is on page one of the <a href="https://github.com/treideme/stc89c52-demos/blob/main/doc/HC6800-ES%20Schematic.pdf" rel="nofollow">board schematic</a>, which I had not read closely enough to notice what
else was hanging off the port I had chosen.</p> <p>Moving the pins away from things that could cause side effects did the trick. This is
the configuration that actually worked:</p> <table><thead><tr><th>signal</th><th>8051 pin</th><th>ENC28J60 pin</th></tr></thead><tbody><tr><td>clock</td><td>P1.7</td><td><code>SCK</code></td></tr><tr><td>host out, device in</td><td>P1.6</td><td><code>SI</code></td></tr><tr><td>host in, device out</td><td>P1.4</td><td><code>SO</code></td></tr><tr><td>chip select</td><td>P3.3</td><td><code>CS</code></td></tr></tbody></table> <p>Those four are the only pins on this board that are actively driven and not shared
with something else.</p> <p><strong>One thing to get right before powering it on: the module needs 3.3 V, and its
pins tolerate 5 V.</strong> The ENC28J60 core is a 3.3 V part, so feeding the module 5 V destroys
it. Its digital inputs are 5 V tolerant.</p> <p>All sixteen write-and-read-back patterns then came back exact. UDP
echo is 50 of 50, byte-exact, from 1 to 100 bytes. Which is terrible by modern
standards, but impressive for such a low-spec part.</p> <p>Those numbers come from a freshly booted board answering a handful of packets. Run
it for a few minutes and it stopped replying altogether, and stayed deaf until a
reset. Twelve and then fourteen consecutive test runs came back 0 of 5.</p> <h2 id="flaky-connections"><a aria-hidden="true" tabindex="-1" href="#flaky-connections"><span class="icon icon-link"></span></a>Flaky Connections</h2> <p>The SPI link is electrically marginal. A read-only <code>EREVID</code> canary, which must return <code>0x06</code>, misreads one to three times per run once traffic is flowing. Corrupted
headers come back carrying recognisable frame payload, <code>0x4141</code> for two ASCII
letter As, or pointers that are odd, or pointers outside the ring entirely.
Widening the clock made it worse rather than better.</p> <p>Look at the wiring and it stops being mysterious.</p> <!> <p>My former boss and Mentor from 17 years ago that taught me the ins and outs of embedded
design advised that any wired connection off
a PCB needs a checksum and recovery, well good luck doing this with this protocol. So
this required some creativity, that a custom PCB probably does not need.</p> <p>The driver now defends itself rather than trusting what it reads. <code>spi_resync()</code> pulses <code>CS</code> to get a slave stuck mid-opcode back in step. <code>rd_stable()</code> reads twice
and believes a repeat. Every packet header is read twice and validated, with
recovery if the ring pointer is nonsense. There is an <code>RXEN</code> watchdog, because on
this link even control writes get corrupted, and one lost <code>ECON1</code> write leaves the
board deaf while every status register still reads healthy.</p> <p>The board no longer goes deaf. It answers one to five of five pings under sustained
traffic instead of none. That is an improvement and it is not a fix.</p> <h1 id="summary"><a aria-hidden="true" tabindex="-1" href="#summary"><span class="icon icon-link"></span></a>Summary</h1> <p>The chip was never the problem. What made this hard was reading an erratum without
its affected-revisions table, debugging through a console that had quietly stopped
telling the truth, and then putting the bus on the one port that cannot drive it.</p> <p>Four things I would take to the next project of this shape:</p> <ol><li><strong>Read the part number out loud before believing a datasheet.</strong> One <code>EREVID</code> read would have saved ten months.</li> <li><strong>Fix the instrument first.</strong> When the debug channel and the device under test
break in the same week, everything you conclude afterwards is decoration.</li> <li><strong>Audit the port before you audit the protocol.</strong> P0 is open-drain and shared,
and no amount of correct SPI timing survives a line that three other devices
can pull down. A repeatable wrong answer is a wiring fault. Only noise is
random.</li></ol> <h1 id="useful-references"><a aria-hidden="true" tabindex="-1" href="#useful-references"><span class="icon icon-link"></span></a>Useful References</h1> <p>Code is in the <a href="https://github.com/treideme/stc89c52-demos" rel="nofollow">stc89c52-demos</a> repository. The simulator work is not published yet.</p> <ul><li><a href="https://github.com/adamdunkels/uip" rel="nofollow">uIP</a>: Adam Dunkels, BSD-3. The 5 KB figure everyone quotes comes from <a href="https://dunkels.com/adam/mobisys2003.pdf" rel="nofollow">Full TCP/IP for 8-Bit Architectures</a>, MobiSys 2003, measured on AVR with gcc</li> <li><a href="https://github.com/lwip-tcpip/lwip" rel="nofollow">lwIP</a>: BSD-3, and by <a href="https://savannah.nongnu.org/projects/lwip/" rel="nofollow">its own summary</a> it wants “tens of kilobytes of free RAM”</li> <li><a href="http://tuxgraphics.org/electronics/200905/embedded-tcp-ip-stack.shtml" rel="nofollow">tuxgraphics 3rd generation</a>: GPLv2, written for the ATmega88 and shipping its own ENC28J60 driver. Mirrored at <a href="https://github.com/ptrks/AVR-ENC28J60-Examples/tree/master/tuxlib" rel="nofollow">ptrks/AVR-ENC28J60-Examples</a> when the original host is down</li> <li><a href="https://github.com/UIPEthernet/UIPEthernet" rel="nofollow">UIPEthernet</a>: GPLv3, uIP behind the Arduino API, and the one that pools payloads in the NIC’s own SRAM</li> <li><a href="https://github.com/njh/EtherCard" rel="nofollow">EtherCard</a>: GPLv2, the other widely used Arduino ENC28J60 library</li> <li><a href="https://github.com/tass-belgium/picotcp" rel="nofollow">picoTCP</a> and <a href="https://github.com/smoltcp-rs/smoltcp" rel="nofollow">smoltcp</a>: ruled out on architecture rather than on size</li></ul> <p>The two 8051 ports that published their build output, which is what made the
comparison decidable rather than arguable:</p> <ul><li><a href="https://github.com/superjing/Embedded/tree/master/DeviceStatusMon/doc/reference/ENC28J60%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%9D%97/%E6%BA%90%E4%BB%A3%E7%A0%81/51/uIP_0.9_51_ENC28J60" rel="nofollow">uIP 0.9 under Keil C51</a>: with <code>uIP.m51</code> committed, reading <code>xdata=1024 code=20310</code></li> <li><a href="https://github.com/nadgirabhishek/Embedded-_Web_Server_STM32_8051" rel="nofollow">A hand-rolled SDCC stack</a>: 18,181 bytes of flash and 2,015 of XDATA, with no ICMP and no UDP</li></ul> <p>Board and part documentation:</p> <ul><li><a href="https://github.com/treideme/stc89c52-demos/blob/main/doc/HC6800-ES%20Schematic.pdf" rel="nofollow">HC6800-ES V2.0 schematic</a>: the one I should have read before choosing a port</li> <li><a href="https://www.microchip.com/en-us/product/ENC28J60" rel="nofollow">ENC28J60 product page</a>: DS80349 is the errata sheet, and its affected-revisions table is the part that matters</li></ul> <p>To learn more about Ethernet itself, <a href="https://mu.microchip.com/ethernet-fundamentals" rel="nofollow">Microchip University</a> has a good
free course covering the physical layer, data link layer and higher-level
protocols, and there is a solid <a href="https://ww1.microchip.com/downloads/aemDocuments/documents/OTH/ApplicationNotes/ApplicationNotes/01120a.pdf" rel="nofollow">application note</a> on Ethernet as well.</p> <p>The quote at the top is from Gene Frantz. Without some unconventional hacking
there would have been no answering machines and no Speak and Spell. His retirement
symposium talk is worth a watch:</p> <!><br/>`,1);function y(n){var l=v(),u=i(r(l),14);s(u,{src:`/images/ethernet_broadcast_mac.png`,alt:`Diagram of Ethernet unicast, broadcast and multicast MAC address forms`,width:`500`});var d=i(u,5);s(d,{src:`/images/ieee_mac_registration.png`,alt:`An IEEE MA-S registration certificate for a 4095-address MAC block`,width:`500`});var f=i(d,55);e(f,()=>`<code class="language-undefined">ENC28J60 bring-up
EREVID: 0x06  B5/B7 -- errata #1 does NOT apply</code>`,!0),o(f);var p=i(f,4);e(p,()=>`<code class="language-c"><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">enc28j60WriteMacReg</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> address<span class="token punctuation">,</span> <span class="token class-name">uint8_t</span> data<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
	<span class="token class-name">uint8_t</span> attempt<span class="token punctuation">;</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Enc28j60MacVerify<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token function">enc28j60WriteReg</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span>attempt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> attempt <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">;</span> attempt<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token function">enc28j60WriteReg</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">enc28j60ReadReg</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span> <span class="token operator">==</span> data<span class="token punctuation">)</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,!0),o(p);var m=i(p,28);s(m,{src:`/images/enc28j60_jumper_wiring.jpg`,alt:`The ENC28J60 module with a mess of Jumper Wires`,width:`420`});var h=i(m,34);c(h,{id:`MvOP_OZuB2c`,width:`500`}),a(),t(n,l)}export{y as default,l as metadata};