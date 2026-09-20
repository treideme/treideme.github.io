import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";var s={title:`On Designing Bootloaders and Grey-box-Testing Firmware (Part 1/2)`,date:`2010-02-06`,updated:`2025-10-04`,categories:[`embedded`,`gradschool`],coverImage:`/images/coldfire.jpg`,coverWidth:200,coverHeight:200,excerpt:`Bootloader for Freescale Coldfire.`},{title:c,date:l,updated:u,categories:d,coverImage:f,coverWidth:p,coverHeight:m,excerpt:h}=s,g=r(`<p>I am currently <a href="https://uwflow.com/course/se350" rel="nofollow">TAing SE350</a>. The students’ deliverable is a small real-time executive kernel (RTX) that runs on a <a href="https://www.nxp.com/products/processors-and-microcontrollers/legacy-mpu-mcus/32-bit-coldfire-mcus-mpus:PC68KCF" rel="nofollow">Freescale Coldfire</a> chip. We got the idea of building an automated embedded test suite for the students’ term projects.
However, instead of having to compile the students’ code from scratch, we would only want to take their firmware binary
directly and test it. This testing would involve injecting several test processes into the students’ OS. These tests would
stress their implementation and dump the results to a serial port of the actual Coldfire board. Having worked in the
embedded field, this problem is similar to integrating bootloaders with firmware. In the project, the bootloader is
the testing code and the actual firmware is the code to be tested.</p> <p>You end up with two pieces of binary code that will be programmed into your device. So the challenge is to make them
talk to each other. In the case of the bootloader, you have the bootloader invoking the firmware, and in the case of
the testing code, the testing code invokes the RTX.
In the following sections, I describe the steps for:</p> <ul><li>Building a toolchain,</li> <li>Developing the bootloader and firmware code,</li> <li>And integrating the different SREC/S19 files</li></ul> <p>In the second part, I will describe how to leverage the established framework to design a native testing suite.</p> <h2 id="what-tools-do-i-need"><a aria-hidden="true" tabindex="-1" href="#what-tools-do-i-need"><span class="icon icon-link"></span></a>What Tools Do I Need?</h2> <p>In order to run code on bare (i.e., no existing OS) chips, you need to have a toolchain that translates your source
code into ELF files (ELF = Executable and Linkable Format) and SREC/S19 files for flashing onto the device. We need:</p> <ul><li><a href="https://www.gnu.org/software/binutils/" rel="nofollow">Binutils</a></li> <li><a href="https://gcc.gnu.org/" rel="nofollow">GCC</a></li> <li><a href="https://github.com/pahihu/coldfire" rel="nofollow">Coldfire Simulator</a></li></ul> <p>A detailed description of how to build these tools is already here on my <a href="2010.02.04">website</a>.</p> <h2 id="step-2-where-to-put-my-firmware-code"><a aria-hidden="true" tabindex="-1" href="#step-2-where-to-put-my-firmware-code"><span class="icon icon-link"></span></a>Step 2: Where to Put My Firmware Code?</h2> <p>If you are going to integrate two pieces of code, you need to make sure they do not overlap in flash and do not access
each other in an undesired fashion. Since you are developing on the bare hardware, you actually have complete control
over the former property and can enforce the latter by careful code design. Your generated ELF file will consist of
three major sections, as follows:</p> <ul><li>The text segment <code>(.text)</code>, where your executable code goes,</li> <li>The data segment <code>(.data)</code>, where initialized global variables go,</li> <li>The BSS segment <code>(.bss)</code>, where uninitialized global variables go.</li></ul> <p>Note that the <code>BSS</code> segment exists for some historic reason, and in almost all OS lectures it is implied by the <code>data</code> segment (i.e., <code>data</code> := <code>data</code> + <code>BSS</code>). By convention, the text segment starts at a lower address than the <code>data</code> and <code>BSS</code> segments.
When your program is executed, the values of the data and BSS segments are copied into the main memory. However,
the size is not established at runtime. The program’s stack for function calls and local variables resides on the heap,
which is by convention allocated after the BSS segment and grows dynamically. The GNU toolchain you just built includes
the GNU Linker, which allows specifying these locations explicitly by linker scripts (i.e., <code>LD</code> files). GNU LD files have
a simple structure describing:</p> <ul><li>The memory banks and locations,</li> <li>How to spread your code across those locations.</li></ul> <p>The following simple example file describes an embedded system (i.e., in my case: CJDesign’s MCF5307 board). Most
evaluation boards, like mine, come with a huge SRAM and actually have a ROM that allows you to load code into main
memory. As such, we will dump all code into SRAM for testing purposes. The following example specifies the assignment
of 1 MB at address 0x10100000 to SRAM and dumps all sections of the code into that segment. Hint: the space after the
section names is required to ensure the uniqueness of the names. The actual code will execute from the SRAM start
address, which is <code>0x10100000</code>.</p> <pre class="language-ld"></pre> <p><em>A note for SE350 students: Please do not attempt to hack the linker file provided by the course. You may run into
serious trouble by using my linker script or hacking the existing one!</em></p> <h2 id="step-3-building-your-firmware"><a aria-hidden="true" tabindex="-1" href="#step-3-building-your-firmware"><span class="icon icon-link"></span></a>Step 3: Building Your Firmware</h2> <p>To compile and link your source (firmware.c) with this file, use the following command:</p> <pre class="language-bash"></pre> <p>You may want to generate a listing of the file to see that everything is at the expected location, as follows:</p> <pre class="language-bash"></pre> <p>In order to flash or deliver this file to the customer, we actually need to convert it into the Motorola <code>S19/SREC</code> file
as follows:</p> <pre class="language-bash"></pre> <h2 id="step-4-building-the-other-piece-of-code"><a aria-hidden="true" tabindex="-1" href="#step-4-building-the-other-piece-of-code"><span class="icon icon-link"></span></a>Step 4: Building the Other Piece of Code</h2> <p>What’s left to build is the bootloader. In order to ensure distinct flash and memory regions, you need to provide another
linker script that puts all the bootloader code into a different location than the other code. A wise choice is to put
this code as far away from the actual firmware as possible, possibly at the end of the available memory. The following
code offsets the memory bank by 1MB and dumps the code there.</p> <pre class="language-ld"></pre> <p>In order to invoke the firmware, we need to put a symbol inside the linker script that identifies the expected starting
address of the firmware, which is in this case called firmware. This symbol can be used from the C code directly as a
function call. In order to avoid any compilation warnings, you should forward declare this function as external. The
compilation and transformation into the S19 file is analogous to creating the firmware code. You should end up with a <code>bootloader.s19</code>.</p> <h2 id="step-5-throwing-things-together"><a aria-hidden="true" tabindex="-1" href="#step-5-throwing-things-together"><span class="icon icon-link"></span></a>Step 5: Throwing Things Together</h2> <p>In practice, when you build an embedded device, it should have the bootloader and some firmware programmed in when it
leaves assembly. In many cases, the interface that the end-user has to the device (i.e., a USB connector) is different
from what you have during assembly (e.g., an in-system flash tool). As such, it is necessary to combine the bootloader
and the firmware together.</p> <p>The <code>S19</code> format is a simple <code>ASCII</code> data exchange format, originally developed by Motorola, for executable code.
It is widely accepted by most programmers for Motorola-based embedded systems. The files are processed line by line;
each line contains a control code, a record size, an address, an optional data sequence, and a checksum. You can find the
details <a href="https://en.wikipedia.org/wiki/Motorola_S-record" rel="nofollow">here</a>.</p> <p>GNU Object Copy usually outputs:</p> <ul><li>A block header (<code>S0</code>),</li> <li>A sequence of data records (<code>S1-S3</code>),</li> <li>And the start address (<code>S5-S9</code>).</li></ul> <p>The block header usually contains the name of the file (e.g., <code>firmware.s19</code> or <code>bootloader.s19</code>). Most ROM loaders on
evaluation boards will actually process the start address record, which is in our case the declared origin of the SRAM,
and fail to load if they do not find it, so it needs to be included.</p> <p>So in order to put the bootloader and the firmware together into one file, you need to provide <em>one header</em>, the <em>data of
both programs</em>, and <em>one starting address</em>:</p> <ul><li><strong>Header</strong>: any of the firmware/bootloader, or a custom header (see below)</li> <li><strong>Data</strong>: concatenate the data records of both original programs</li> <li><strong>Starting address</strong>: the start address of the bootloader</li></ul> <h2 id="step-5a-composing-your-own-header"><a aria-hidden="true" tabindex="-1" href="#step-5a-composing-your-own-header"><span class="icon icon-link"></span></a>Step 5a: Composing Your Own Header</h2> <p>Yes, geeky people like me actually enjoy implementing checksum algorithms and branding their creation. In order to do so, we
need to dive into the checksum procedure used by S-records. According to Wikipedia, the checksum is
”[…] the least significant byte of ones’ complement of the sum of the values represented by the two hex digit pairs
for the byte count, address and data fields.” So guys, it’s time to dig out those algorithm-class notes and figure that
out, … oh wait …, found it:</p> <ul><li>Sum up all bytes starting from the byte count record.</li> <li>Set: <code>checksum = 0xFF – (0x00FF & sum)</code></li></ul> <p><em>Why the hell would anyone use such a checksumming algorithm?</em> The answer is simple: It can be easily checked!
While processing the S19 records, you can actually sum everything up, including the provided checksum, and should get
0xFF. That is a simple compare operation and can be evaluated in no time.</p> <h2 id="step-6-testing-your-creation"><a aria-hidden="true" tabindex="-1" href="#step-6-testing-your-creation"><span class="icon icon-link"></span></a>Step 6: Testing Your Creation</h2> <p>If you build the Coldfire simulator according to my instructions, you can invoke the simulator as follows:</p> <pre class="language-bash"></pre> <p>and load the code like this:</p> <pre class="language-undefined"></pre> <p><strong>Remember to telnet to the above ports if you want to see any output!</strong></p> <pre class="language-undefined"></pre> <h2 id="discussion"><a aria-hidden="true" tabindex="-1" href="#discussion"><span class="icon icon-link"></span></a>Discussion</h2> <p>In this part of the how-to, I explained the basics of building two pieces of binary Coldfire code and integrating them
into a single file that can be processed by most programmers and ROM loaders. A popular application is the integration
of bootloader and firmware code for embedded system assembly. Another application is embedded grey-box testing. In this
technique, instead of a bootloader, a test suite is evaluated against the firmware to check for potential defects. In
the next post, I’ll describe how to design such a test framework.</p> <p>You can find the sample code for this post below. The code will contain some modified linker scripts that deal with
particular alignment problems of the simulator. Furthermore, the bootloader and the firmware should have different
stacks, so some assembly files have been added to do so. The S19 merging is done by the Python script <code>merge.py</code>.</p> <ul><li><a href="/code/bootloader.zip">Sample Code</a></li> <li><a href="2010.02.04">My build instructions for the Coldfire GCC toolchain</a></li> <li><a href="https://www.math.utah.edu/docs/info/ld_3.html" rel="nofollow">Good GNU Linker Script Documentation</a></li> <li>Infos on <a href="https://en.wikipedia.org/wiki/Code_segment" rel="nofollow">text-</a>, <a href="https://en.wikipedia.org/wiki/Data_segment" rel="nofollow">data-</a>,
and <a href="https://en.wikipedia.org/wiki/.bss" rel="nofollow">bss-</a> segments.</li></ul> <hr/> <p><a href="https://survivalengineer.blogspot.com/2010/02/on-designing-boot-loaders-and-grey-box.html" rel="nofollow">Cross posted from my old Blog</a></p>`,1);function _(r){var s=g(),c=o(e(s),28);t(c,()=>`<code class="language-ld">/* firmware.ld */
MEMORY
&#123;
  sram        : ORIGIN = 0x10100000, LENGTH = 1M
&#125;

SECTIONS
&#123;
  .text :
  &#123;
    *(.text)
    *(.rodata*)
  &#125; &gt; sram

  .data :
  &#123;
    *(.data)
  &#125; &gt; sram

  .bss :
  &#123;
    *(.bss)
  &#125; &gt; sram
&#125;</code>`,!0),i(c);var l=o(c,8);t(l,()=>`<code class="language-bash">m68k-elf-gcc <span class="token parameter variable">-Tfirmware.ld</span> <span class="token parameter variable">-Map</span><span class="token operator">=</span>firmware.map <span class="token parameter variable">-o</span> firmware.elf firmware.c</code>`,!0),i(l);var u=o(l,4);t(u,()=>`<code class="language-bash">m68k-elf-objdump <span class="token parameter variable">-xdC</span> firmware.elf <span class="token operator">></span> firmware.lst</code>`,!0),i(u);var d=o(u,4);t(d,()=>`<code class="language-bash">m68k-elf-objcopy --output-format<span class="token operator">=</span>srec firmware.elf firmware.s19</code>`,!0),i(d);var f=o(d,6);t(f,()=>`<code class="language-ld">/* bootloader.ld */
MEMORY
&#123;
  sram        : ORIGIN = 0x10200000, LENGTH = 1M
&#125;

__FIRMWARE__ = 0x10100000;

SECTIONS
&#123;
  .text :
  &#123;
    *(.text)
    *(.rodata*)
  &#125; &gt; sram

  .data :
  &#123;
    *(.data)
  &#125; &gt; sram

  .bss :
  &#123;
    *(.bss)
  &#125; &gt; sram
&#125;</code>`,!0),i(f);var p=o(f,32);t(p,()=>`<code class="language-bash">coldfire <span class="token parameter variable">--board</span> cjdesign-5307.board</code>`,!0),i(p);var m=o(p,4);t(m,()=>`<code class="language-undefined">Use CTRL-C (SIGINT) to cause autovector interrupt 7 (return to monitor)
Loading memory modules...
Loading board configuration...
Opened [/usr/local/coldfire/share/coldfire/cjdesign-5307.board]
Board ID: CJDesign
CPU: 5307 (Motorola Coldfire 5307)
unimplemented instructions: CPUSHL PULSE WDDATA WDEBUG
69 instructions registered
building instruction cache... done.

Memory segments: dram  timer0  timer1  uart0(on port 5206)
uart1(on port 5207)  sim  flash  sram</code>`,!0),i(m);var h=o(m,4);t(h,()=>`<code class="language-undefined">Hard Reset...
Initializing monitor...
Enter &#39;help&#39; for help.
dBug&gt; dl merged.s19
Downloading S-Record...
Done downloading S-Record.

dBug&gt; go 0x10100000 &lt;- the actual firmware
... some garbage, because RTS returns to nowhere...
dBug&gt; go 0x10200000 &lt;- the boot-loader invoking the firmware
You should yield the following output on the terminal (telnet localhost 5206).
Trying ::1...
Trying 127.0.0.1...
Connected to localhost.
Escape character is &#39;^]&#39;.

uart0
Inside firmware! &lt;- 1st go of the firmware
Inside bootloader! &lt;- 2nd go inside firmware!
Inside firmware!
Back in bootloader!</code>`,!0),i(h),a(12),n(r,s)}export{_ as default,s as metadata};