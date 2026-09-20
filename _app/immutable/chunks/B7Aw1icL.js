import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as s}from"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var c={title:`Turning a STM32 EVM into a Programmer`,date:`2013-01-27`,updated:`2025-10-04`,categories:[`postdoc`,`coding`,`embedded`],coverImage:`/images/stm32_debug_1.jpg`,coverWidth:800,coverHeight:644,excerpt:`How to save money on a ST-Link programmer.`},{title:l,date:u,updated:d,categories:f,coverImage:p,coverWidth:m,coverHeight:h,excerpt:g}=c,_=r(`<p>The <a href="http://www.st.com/internet/evalboard/product/252419.jsp" rel="nofollow">STM32F4Discovery</a> evaluation board is allegedly build to
program remote targets. It features a header that that has a debug-out Serial Wire Debug (SWD) configuration. The
documentation and examples that exemplify this technique are sparse. The header features the following signals
(see <a href="http://www.st.com/internet/com/TECHNICAL_RESOURCES/TECHNICAL_LITERATURE/USER_MANUAL/DM00039084.pdf" rel="nofollow">UM1472</a> for
further info):</p> <ul><li>Pin1 Voltage from target application (do not use),</li> <li>Pin2 SWD Clock: Connect to SWCLK of the target (PA14 on STM32s),</li> <li>Pin3 GND: Connect to GND of the target (needed to share the signal ground),</li> <li>Pin4 SWD I/O: Connect to SWDIO of the target (PA13 on STM32s),</li> <li>Pin5 NRST: Connect to the target reset pin (RST on STM32s),</li> <li>Pin6 SWO: SWD trace data line (optional and therefore not subject to this post).</li></ul> <p>If it would be that easy to just connect the signals then this tutorial could stop here. Unfortunately, to get things setup the board has to be modified further. The SWD data lines are obviously used by the STM32F407 that sits on the board. It is easy to have exclusive access to these lines as follows:</p> <ul><li>Remove the jumpers on CN3.</li></ul> <!> <p>That way thedebugger portion of the discovery board will only share the SWD signals with the SWD connector.</p> <p>Furthermore, the debugger shares the reset line of the target with the on-board chip as well. If this line is not cut, the internal circuit of the on-board chip will prevent the signal to be properly used for remote applications. Instead of adding a jumper that would make it easy for people to fix this, the STM guys decided to add a solder bride.</p> <ul><li>Replace the solder bridge SB11 with a jumper as shown in the following.</li></ul> <!><br/> <!> <p>In order to be safe and avoid adverse affects, one can remove the power to the on-board chip. The STM people added a jumper that can be replaced with an ampere-meter to measure the power consumption of the chip.</p> <ul><li>Remove JP1/PPI to cut the power to the on-board chip.</li></ul> <!> <p>In order to be sure that I can program other chips of the STM32-family, I used a <a href="http://www.st.com/internet/evalboard/product/250863.jsp" rel="nofollow">STM32VLDiscovery</a> board as my guinea
pig. As seen in the picture, I shared the signal ground (GND) and provided 3V to the 3.3V pin of the target board from
the STM32F4Discovery. The reset line and SWD signals were connected as described above.</p> <!> <p>All people who have no real operating system (i.e., M$ Windows), can download and use the STLink utility from STM. It
provides crude access to the chip that is connected to the SWD port.</p> <ul><li>Select “Target” -> “Connect…”
Watch the status line and confirm that the connected chip matches the outcome you expect. In my case I use the debugger to connect to a STM32VLDiscovery that has a <a href="http://www.st.com/internet/mcu/product/216844.jsp" rel="nofollow">STM32F100</a> chip.</li></ul> <!> <ul><li>Select “Target” -> “Program”
This allows you to upload an ELF or HEX file to the target board. The programming process should not take longer than a few milliseconds.</li></ul> <p>For all the advanced people there is OpenOCD for Linux. I am using a development version (v0.7.x) from their git repository. When you build OpenOCD from source (not covered in this article) make sure you enable the STLink support. Shown below is my example file to flash the ELF file into the STM32VLDiscovery.</p> <p>OpenOCD can be invoked by just calling “openocd” in the directory where the ELF- and the configuration files reside.</p> <pre class="language-tcl"></pre> <p>STM32F4Discovery in a debug-out configuration to debug an external target. To make it hard, I picked a different chip
from their value line series.</p> <p>Although I am not a big fan of Windows, the STLink software seems to be a great way to upgrade the firmware of the
debugger itself. The reader should note that the STM engineers already use internal pull-ups for the debug circuit of
the STM. As a result it is possible to just connect the power supply, ground pins, PA13, and PA14 on a remote target on
most STM32 processors. Be sure to check out the “Getting started with XXX hardware development” application notes of
your STM32 target to confirm this.</p> <!> <hr/> <p><a href="https://survivalengineer.blogspot.com/2013/01/turning-stm32-evaluation-board-into.html" rel="nofollow">Crossposted from my old blog</a></p>`,1);function v(r){var c=_(),l=o(e(c),8);s(l,{src:`/images/stm32_debug_2.jpg`,width:`500`});var u=o(l,8);s(u,{src:`/images/stm32_debug_3.jpg`,width:`500`});var d=o(u,3);s(d,{src:`/images/stm32_debug_4.jpg`,width:`500`});var f=o(d,6);s(f,{src:`/images/stm32_debug_5.jpg`,width:`500`});var p=o(f,4);s(p,{src:`/images/stm32_debug_6.jpg`,width:`500`});var m=o(p,6);s(m,{src:`/images/stm32_debug_stlink1.png`,width:`500`});var h=o(m,8);t(h,()=>`<code class="language-tcl"><span class="token comment">## openocd.cfg file for STLINK/v2 to program</span>
<span class="token comment"># an STM32F1xx chip.</span>
<span class="token comment">#</span>
<span class="token comment"># @author Thomas Reidemeister</span>

<span class="token comment"># Use STLink/V2 protocol</span>
<span class="token keyword">source</span> <span class="token punctuation">[</span>find interface<span class="token operator">/</span>stlink<span class="token operator">-</span>v2.cfg<span class="token punctuation">]</span>

<span class="token comment"># Use STM32F1x</span>
<span class="token keyword">source</span> <span class="token punctuation">[</span>find target<span class="token operator">/</span>stm32f1x_stlink.cfg<span class="token punctuation">]</span>

<span class="token comment"># Connect to target</span>
init

<span class="token comment"># Reset target into halt</span>
<span class="token comment"># Hint: _reset_ clears breakpoint buffer and puts the </span>
<span class="token comment">#  system in defined state.</span>
<span class="token comment">#  The target must be _halted_ to write to flash.</span>
reset halt

<span class="token comment"># Write the image to the target</span>
flash write_image erase main.elf
<span class="token comment"># uncomment the line if you want to have things verified</span>
<span class="token comment">#verify_image main.elf</span>

<span class="token comment"># execute the target</span>
reset run

<span class="token comment"># close down OpenOCD</span>
shutdown </code>`,!0),i(h);var g=o(h,6);s(g,{src:`/images/stm32_debug_7.jpg`,width:`500`}),a(4),n(r,c)}export{v as default,c as metadata};