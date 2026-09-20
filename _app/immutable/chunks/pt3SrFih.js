import{$ as e,E as t,M as n,P as r,mt as i,pt as a,tt as o}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import{t as s}from"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import"./DPsrAEoc.js";var c={title:`MCS-51 / 8051 – STC89C52 Emulation`,date:`2022-07-03`,updated:`2025-10-04`,categories:[`covid-19`,`coding`,`embedded`,`8051`],coverImage:`/images/emu-view.png`,coverWidth:512,coverHeight:288,excerpt:`Playing with Chinese knock-offs of the original AT89C5x series.`},{title:l,date:u,updated:d,categories:f,coverImage:p,coverWidth:m,coverHeight:h,excerpt:g}=c,_=r(`<p>In the previous posts, I gave a <a href="2022.05.31">brief introduction</a> to the 8051 series followed by a <a href="2022.06.04">hands-on shallow dive</a> to program a
widely available variant of the chip. Since none of the “simple” & low-cost alternatives offer decent direct debugging
support the best option to take a deeper dive at the architecture is a simulator. Before we get our hands dirty. Let us
revisit the <a href="https://github.com/treideme/stc89c52-demos/tree/main/00_hello" rel="nofollow">Hello World code</a>.</p> <pre class="language-c"></pre> <p>… in machine form. Once you compile the example with sdcc, sdcc will generate an assembly listing of the code as <code>hello.lst</code>, here stripped down to the interesting pieces. Note this is not the disassembled binary flashed to the
board, but the intermediate representation of what is in <code>hello.c</code>.</p> <pre class="language-asm"></pre> <p>The listing shows how the C-code got translated into machine language. We see various jumps and calls to subroutines
and the program entry. There are also numerous data movement instructions to handle subroutine parameters, and local
variables, and to move data from constant locations. From the code, it becomes obvious that the MCS-51 has to have at
least 7 data registers (<code>R0-R7</code>), stack pointer (<code>SP</code>), a 16-bit data pointer (<code>DPTR</code>, broken out as DPL and DPH), an
accumulator (<code>A</code>), and some memory-mapped registers such as <code>P2</code> for IO that appear to be bit-addressable via <code>setb</code> and <code>clr</code>.
Dilling deeper it turns out that all registers except the program counter (<code>PC</code>) are memory-mapped in
what is called <code>IRAM</code> or data ram. STC shows this in their datasheet as follows.</p> <!><br/> <!><br/> <p>The rest of the available internal 256-byte RAM (<code>IRAM</code>) can be used as fast RAM for variables, and the stack. This is
hardly enough for complex operations, as such traditionally the original MCS-51 was able to access up to 64kB of
external memory that can be accessed via the IO pins. In more recent applications such as the STC89C52 there is also <code>XRAM</code> on board that can be accessed as a separate memory partition via <code>movx</code> instructions. In our example, we can fit
everything into <code>IRAM</code>.</p> <p>The execution starts from the reset interrupt vector at location <code>0x0000</code>. Note being a <a href="https://en.wikipedia.org/wiki/Harvard_architecture" rel="nofollow">Harvard Architecture</a> this is a
separate memory region from the memory segments shown before and in the case of the STC89C52xx, it is the first line
in flash memory. Most 8051 implementations service at least five interrupts from fixed memory locations, including
timers, external interrupts, and serial communications. In our case, we are just using the reset vector.</p> <p>The first routine called is the stack and library initialization (<code>__sdcc_gsinit_startup</code>). The source can be found in <code>mcs51/crtstart.asm</code> of the SDCC compiler. In essence, this just sets the stack pointer into <code>IRAM</code> based on the
specifications in the linker file and initializes default memory regions. Then we jump to main (<code>_main</code>).</p> <p>The bit of <code>P2_0</code> is being cleared, and then we call the delay routine, using the <code>DPTR</code> register to pass the timeout
parameter for the delay. Since the 8051 is an 8-bit architecture it cannot operate on 16-bit registers directly. As
such the decrement is split up by the compiler into two stages of decrementing <code>R6</code> and <code>R7</code> in nested loops. As soon as
zero is reached we return back to main, set <code>P2_0</code>, and enter another delay loop.</p> <p>While there are quite a few options available, I really like <a href="https://github.com/jarikomppa/emu8051" rel="nofollow">Jari Komppa’s emu8051</a>.
It is a very straightforward and simple code-base that could simulate a simple MCS-51 clone like the STC89C52 quite easily.
Moreover, the codebase is compact enough that it could be extended for custom peripherals, or easily split up into the
8051 core functions as a library, and the ncurses-based GUI code.</p> <pre class="language-bash"></pre> <p>Let’s look at this in emu8051. Once emu8051 is compiled per instructions it can be called directly on the hex file
generated by sdcc. By default, the simulator is halted at the reset vector. Pressing ‘r‘ starts the program, or one
can do a convenient instruction step with the space key. Pressing ‘v‘ toggles various views including the I/O view. By
default, the processor view is shown.</p> <!> <p>Running through the SDCC initialization takes about 6400 cycles (0.5ms). The change in port registers is shown below
after bit <code>P_2.0</code> is cleared. Alternatively, the simulator also allows setting breakpoints.</p> <!> <p>While this nicely illustrates how the architecture works and demonstrates how crude debugging could be done, the real
beauty of emu8051 lies in its extensibility. The file <a href="https://github.com/treideme/emu8051/blob/master/emu.c" rel="nofollow">emu.c</a> contains the entire execution loop including GUI updates
that mostly consist of function calls to other files of the code-base. It is not that difficult to strip this down into
something that could be used for automated test cases. I created a fork of the simulator that provides a meson file to
separately build the executable and a library of core functions. The file <a href="https://github.com/treideme/emu8051/blob/master/testcase.c" rel="nofollow">testcase.c</a> shows a simple test case that waits
for a certain number of cycles for the LED to be toggled. You could work this into test cases for your favorite
test-runner framework. You can build and test this for yourself by using meson instead of make to build the project.</p> <pre class="language-bash"></pre> <p>This concludes a basic introduction to the STC89C52 series. In future posts, I want to dive further into peripheral
integration. Given the bare nature (i.e. not a lot of peripherals and memory), this is an excellent platform to revisit
some low-profile soft protocol implementations of various data buses. While this might seem archaic in modern times,
these needs arise when by accident the pinmux in an urgent production design was misplaced by the PCB designer, or a
lack of communication between the firmware and electrical teams caused some integration issues.</p>`,1);function v(r){var c=_(),l=o(e(c),2);t(l,()=>`<code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;mcs51/8051.h></span></span>
 
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Toggle LED at P2_0</span>
    P2_0 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    P2_0 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
 
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> t<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>t<span class="token operator">--</span><span class="token punctuation">)</span>
    <span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`,!0),i(l);var u=o(l,4);t(u,()=>`<code class="language-asm">...
      000000                        278 __interrupt_vect:
      000000 02r00r00         [24]  279     ljmp    __sdcc_gsinit_startup
      000000 02r00r03         [24]  294     ljmp    __sdcc_program_startup
      000003                        300 __sdcc_program_startup:
      000003 02r00r00         [24]  301     ljmp    _main
      000000                        314 _main:
                           000007   315     ar7 = 0x07
                           000006   316     ar6 = 0x06
                           000005   317     ar5 = 0x05
                           000004   318     ar4 = 0x04
                           000003   319     ar3 = 0x03
                           000002   320     ar2 = 0x02
                           000001   321     ar1 = 0x01
                           000000   322     ar0 = 0x00
      000000                        323 00102$:
      000000 C2 A0            [12]  325     clr _P2_0
      000002 90 75 30         [24]  327     mov dptr,#0x7530
      000005 12r00r12         [24]  328     lcall   _delay
      000008 D2 A0            [12]  330     setb    _P2_0
      00000A 90 75 30         [24]  332     mov dptr,#0x7530
      00000D 12r00r12         [24]  333     lcall   _delay
      000010 80 EE            [24]  334     sjmp    00102$
      000012                        344 _delay:
      000012 AE 82            [24]  345     mov r6,dpl
      000014 AF 83            [24]  346     mov r7,dph
      000016                        348 00101$:
      000016 8E 04            [24]  349     mov ar4,r6
      000018 8F 05            [24]  350     mov ar5,r7
      00001A 1E               [12]  351     dec r6
      00001B BE FF 01         [24]  352     cjne    r6,#0xFF,00110$
      00001E 1F               [12]  353     dec r7
      00001F                        354 00110$:
      00001F EC               [12]  355     mov a,r4
      000020 4D               [12]  356     orl a,r5
      000021 70 F3            [24]  357     jnz 00101$
      000023 22               [24]  358     ret</code>`,!0),i(u);var d=o(u,4);s(d,{src:`/images/8051_memory_mapped_01.png`,alt:`8051 Memory Map`,width:`500`});var f=o(d,3);s(f,{src:`/images/8051_memory_mapped_02.png`,alt:`8051 Memory Map`,width:`500`});var p=o(f,13);t(p,()=>`<code class="language-bash">emu 00_hello.hex</code>`,!0),i(p);var m=o(p,4);s(m,{src:`/images/emu-view.png`,alt:`emu8051 CPU View`,width:`500`});var h=o(m,4);s(h,{src:`/images/emu_step.png`,alt:`emu8051 CPU View`,width:`500`});var g=o(h,4);t(g,()=>`<code class="language-bash"><span class="token comment"># Build with meson to build static library, test executable, emulator executable</span>
meson build
ninja <span class="token parameter variable">-C</span> build
<span class="token comment"># run test program</span>
./build/testprog <span class="token punctuation">..</span>/stc89c52-demos/build/00_hello.hex
Successfully toggled P2.0 after <span class="token number">534</span> instructions and <span class="token number">6408</span> cycles</code>`,!0),i(g),a(2),n(r,c)}export{v as default,c as metadata};